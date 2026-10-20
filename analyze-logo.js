import fs from 'node:fs'
import zlib from 'node:zlib'

// Read PNG and parse IDAT to extract pixels
function parsePng(filePath) {
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
      console.log({ width, height, bitDepth, colorType })
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(pos + 8, pos + 8 + length))
    } else if (type === 'IEND') {
      break
    }
    pos += 12 + length
  }

  const compressed = Buffer.concat(idatChunks)
  const decompressed = zlib.inflateSync(compressed)
  console.log('Decompressed length:', decompressed.length)

  // Color type 6 is RGBA (8 bit)
  if (colorType !== 6 || bitDepth !== 8) {
    console.log('Handling non-standard PNG type:', colorType, bitDepth)
    return
  }

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
      if (filter === 0) {
        val = raw
      } else if (filter === 1) {
        val = (raw + a) & 0xff
      } else if (filter === 2) {
        val = (raw + b) & 0xff
      } else if (filter === 3) {
        val = (raw + Math.floor((a + b) / 2)) & 0xff
      } else if (filter === 4) {
        // Paeth
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

      // Filter out fully transparent or nearly transparent pixels
      if (alpha > 200) {
        // Convert to HSL
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

        // We only care about golden/yellowish-warm tones:
        // Hue roughly 25 to 55 deg, saturation > 0.15, lightness between 0.2 and 0.85
        if (h >= 25 && h <= 55 && s >= 0.15 && l >= 0.25 && l <= 0.85) {
          pixels.push({ r, g, b, h, s, l, alpha })
        }
      }
    }
  }

  console.log(`Found ${pixels.length} golden pixels with alpha > 200`)
  if (pixels.length === 0) return

  // Calculate median and mean
  pixels.sort((p1, p2) => p1.l - p2.l)
  const median = pixels[Math.floor(pixels.length / 2)]

  const avgR = Math.round(pixels.reduce((sum, p) => sum + p.r, 0) / pixels.length)
  const avgG = Math.round(pixels.reduce((sum, p) => sum + p.g, 0) / pixels.length)
  const avgB = Math.round(pixels.reduce((sum, p) => sum + p.b, 0) / pixels.length)
  const avgH = pixels.reduce((sum, p) => sum + p.h, 0) / pixels.length
  const avgS = pixels.reduce((sum, p) => sum + p.s, 0) / pixels.length
  const avgL = pixels.reduce((sum, p) => sum + p.l, 0) / pixels.length

  const toHex = (r, g, b) => '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')

  console.log('--- STATS ---')
  console.log('Median pixel:', median, 'Hex:', toHex(median.r, median.g, median.b))
  console.log(`Average RGB: rgb(${avgR}, ${avgG}, ${avgB}), Hex: ${toHex(avgR, avgG, avgB)}`)
  console.log(
    `Average HSL: ${avgH.toFixed(1)}deg ${(avgS * 100).toFixed(1)}% ${(avgL * 100).toFixed(1)}%`,
  )

  // Also let's inspect the distribution of lightness (25th, 50th, 75th percentiles)
  const p25 = pixels[Math.floor(pixels.length * 0.25)]
  const p50 = pixels[Math.floor(pixels.length * 0.5)]
  const p75 = pixels[Math.floor(pixels.length * 0.75)]
  console.log('25th percentile:', p25, toHex(p25.r, p25.g, p25.b))
  console.log('50th percentile:', p50, toHex(p50.r, p50.g, p50.b))
  console.log('75th percentile:', p75, toHex(p75.r, p75.g, p75.b))

  // Group by color clusters / histogram
  const colorCounts = {}
  for (const p of pixels) {
    // Quantize RGB slightly to find dominant cluster
    const qr = Math.round(p.r / 4) * 4
    const qg = Math.round(p.g / 4) * 4
    const qb = Math.round(p.b / 4) * 4
    const key = `${qr},${qg},${qb}`
    colorCounts[key] = (colorCounts[key] || 0) + 1
  }
  const sortedClusters = Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  console.log(
    'Top 5 quantized colors:',
    sortedClusters.map(([c, count]) => {
      const [r, g, b] = c.split(',').map(Number)
      return { rgb: c, hex: toHex(r, g, b), count }
    }),
  )
}

parsePng('src/assets/logolatgf2douradoantescov-sf-bfed0.png')
