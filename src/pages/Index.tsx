import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { PracticeAreas } from '@/components/sections/PracticeAreas'
import { Team } from '@/components/sections/Team'
import { Contact } from '@/components/sections/Contact'
import { useEffect } from 'react'

export default function Index() {
  useEffect(() => {
    // Handle scroll if navigating back with a hash
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className="bg-background">
      <Hero />
      <About />
      <PracticeAreas />
      <Team />
      <Contact />
    </div>
  )
}
