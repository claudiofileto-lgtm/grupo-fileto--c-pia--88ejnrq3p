import fs from 'node:fs'
import zlib from 'node:zlib'

function inspectPng(filePath) {
  const buf = fs.readFileSync(filePath)
  if (buf.toString('ascii', 1, 4) !== 'PNG') {
    throw new Error('Not a PNG')
  }

  let pos = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  const idatChunks = []

  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos)
    const type = buf.toString('ascii', pos + 4, pos + 8)
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8)
      height = buf.readUInt32BE(pos + 12)
      bitDepth = buf[pos + 16]
      colorType = buf[pos + 17]
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(pos + 8, pos + 8 + length))
    } else if (type === 'IEND') {
      break
    }
    pos += 12 + length
  }

  const compressed = Buffer.concat(idatChunks)
  const decompressed = zlib.inflateSync(compressed)

  const bytesPerPixel = 4
  const rowSize = 1 + width * bytesPerPixel
  const pixels = []

  let prevRow = new Uint8Array(width * bytesPerPixel)
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize
    const filter = decompressed[rowOffset]
    const currentRow = new Uint8Array(width * bytesPerPixel)

    for (let x = 0; x < width * bytesPerPixel; x++) {
      const raw = decompressed[rowOffset + 1 + x]
      const a = x >= bytesPerPixel ? currentRow[x - bytesPerPixel] : 0
      const b = prevRow[x]
      const c = x >= bytesPerPixel ? prevRow[x - bytesPerPixel] : 0

      let val = 0
      if (filter === 0) val = raw
      else if (filter === 1) val = (raw + a) & 0xff
      else if (filter === 2) val = (raw + b) & 0xff
      else if (filter === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff
      else if (filter === 4) {
        const p = a + b - c
        const pa = Math.abs(p - a)
        const pb = Math.abs(p - b)
        const pc = Math.abs(p - c)
        let pr = 0
        if (pa <= pb && pa <= pc) pr = a
        else if (pb <= pc) pr = b
        else pr = c
        val = (raw + pr) & 0xff
      }
      currentRow[x] = val
    }
    prevRow = currentRow

    for (let x = 0; x < width; x++) {
      const r = currentRow[x * 4]
      const g = currentRow[x * 4 + 1]
      const b = currentRow[x * 4 + 2]
      const alpha = currentRow[x * 4 + 3]

      if (alpha > 50) {
        // compute HSL
        const rn = r / 255
        const gn = g / 255
        const bn = b / 255
        const max = Math.max(rn, gn, bn)
        const min = Math.min(rn, gn, bn)
        let h = 0
        let s = 0
        const l = (max + min) / 2

        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case rn:
              h = (gn - bn) / d + (gn < bn ? 6 : 0)
              break
            case gn:
              h = (bn - rn) / d + 2
              break
            case bn:
              h = (rn - gn) / d + 4
              break
          }
          h *= 60
        }
        pixels.push({ x, y, r, g, b, h, s, l, alpha })
      }
    }
  }

  const toHex = (r, g, b) => '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')

  console.log(`Image: ${width}x${height}, total non-transparent pixels: ${pixels.length}`)

  // Opaque pixels (alpha >= 240)
  const fullyOpaque = pixels.filter((p) => p.alpha >= 240)
  console.log(`Fully opaque pixels (alpha >= 240): ${fullyOpaque.length}`)

  // Breakdown by lightness ranges:
  const ranges = [
    [0, 0.2],
    [0.2, 0.4],
    [0.4, 0.5],
    [0.5, 0.6],
    [0.6, 0.7],
    [0.7, 0.85],
    [0.85, 1.0],
  ]

  for (const [minL, maxL] of ranges) {
    const inRange = fullyOpaque.filter((p) => p.l >= minL && p.l < maxL)
    if (inRange.length === 0) continue
    const avgR = Math.round(inRange.reduce((s, p) => s + p.r, 0) / inRange.length)
    const avgG = Math.round(inRange.reduce((s, p) => s + p.g, 0) / inRange.length)
    const avgB = Math.round(inRange.reduce((s, p) => s + p.b, 0) / inRange.length)
    const avgH = inRange.reduce((s, p) => s + p.h, 0) / inRange.length
    const avgS = inRange.reduce((s, p) => s + p.s, 0) / inRange.length
    const avgL = inRange.reduce((s, p) => s + p.l, 0) / inRange.length
    console.log(
      `L [${minL}-${maxL}]: ${inRange.length} px | RGB: rgb(${avgR},${avgG},${avgB}) ${toHex(avgR, avgG, avgB)} | HSL: ${avgH.toFixed(1)}deg ${(avgS * 100).toFixed(1)}% ${(avgL * 100).toFixed(1)}%`,
    )
  }

  // Find most frequent exact / near RGB colors
  const colorMap = new Map()
  for (const p of fullyOpaque) {
    const key = `${p.r},${p.g},${p.b}`
    colorMap.set(key, (colorMap.get(key) || 0) + 1)
  }
  const topColors = [...colorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)
  console.log('\nTop 15 exact colors:')
  for (const [rgbStr, count] of topColors) {
    const [r, g, b] = rgbStr.split(',').map(Number)
    console.log(`${toHex(r, g, b)} count=${count}`)
  }

  // Overall average of all fully opaque pixels
  const allAvgR = Math.round(fullyOpaque.reduce((s, p) => s + p.r, 0) / fullyOpaque.length)
  const allAvgG = Math.round(fullyOpaque.reduce((s, p) => s + p.g, 0) / fullyOpaque.length)
  const allAvgB = Math.round(fullyOpaque.reduce((s, p) => s + p.b, 0) / fullyOpaque.length)
  console.log(
    `\nOverall All Opaque Avg: rgb(${allAvgR},${allAvgG},${allAvgB}) ${toHex(allAvgR, allAvgG, allAvgB)}`,
  )

  // Median of all fully opaque pixels
  fullyOpaque.sort((a, b) => a.l - b.l)
  const med = fullyOpaque[Math.floor(fullyOpaque.length / 2)]
  console.log(`Overall Median: rgb(${med.r},${med.g},${med.b}) ${toHex(med.r, med.g, med.b)}`)
}

inspectPng('src/assets/logolatgf2douradoantescov-sf-bfed0.png')
console.log('\n--- Also checking logofbronze-sf-07c40.png ---')
inspectPng('src/assets/logofbronze-sf-07c40.png')
