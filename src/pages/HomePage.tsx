import { About } from '../components/about'
import { Documents } from '../components/Documents'
import { Hero } from '../components/hero'
import { WorkExperience } from '../components/WorkExperience'
import { Projects } from './Projects'

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Documents />
      <WorkExperience />
      <Projects />
    </main>
  )
}
