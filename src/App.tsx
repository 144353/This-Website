import { useEffect } from 'react'
import { Nav } from './components/nav'
import { Hero } from './components/hero'
import { About } from './components/about'
import { Documents } from './components/Documents'
import { Projects } from './components/projects/projectSection'
import { Footer } from './components/footer'

export function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Documents />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
