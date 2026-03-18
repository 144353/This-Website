import { About } from '../components/about'
import { Documents } from '../components/Documents'
import { Hero } from '../components/hero'
import { WorkExperience } from '../components/WorkExperience'
import { Projects } from './Projects'
import GitHubChart from "../components/Git";

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Documents />
      <WorkExperience />
      <GitHubChart username="144353" />
      <Projects />
    </main>
  )
}
