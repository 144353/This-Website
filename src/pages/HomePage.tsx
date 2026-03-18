import { About } from '../components/about'
import { CurrentProjects } from '../components/CurrentProjects'
import { Documents } from '../components/Documents'
import { DriveSection } from '../components/DriveSection'
import { Education } from '../components/Education'
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
      <Education />
      <GitHubChart username="144353" />
      <CurrentProjects />
      <DriveSection />
    </main>
  )
}
