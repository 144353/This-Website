import { About } from '../components/about'
import { Documents } from '../components/Documents'
import { IntroHeader } from '../components/IntroHeader'
import { Nav } from '../components/nav'
import { TldrSection } from '../components/TldrSection'
import { WorkExperience } from '../components/WorkExperience'
import GitHubChart from "../components/Git";

export function HomePage() {
  return (
    <main>
      <IntroHeader />
      <Nav />
      <TldrSection />
      <About />
      <Documents />
      <WorkExperience />
      <GitHubChart username="144353" />
    </main>
  )
}
