import { useEffect, useMemo, useState } from 'react'
import { ProjectCard } from './projects/ProjectCard'
import { fetchProjects, type ProjectMeta } from '../lib/projects'

const CURRENT_PROJECT_IDS = [
  'Libby-Book-Recommender',

  
]

export function CurrentProjects() {
  const [projects, setProjects] = useState<ProjectMeta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const loadProjects = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchProjects()
        if (isActive) setProjects(data)
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load current projects.')
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadProjects()

    return () => {
      isActive = false
    }
  }, [])

  const filteredProjects = useMemo(() => {
    const currentProjectMap = new Map(projects.map((project) => [project.id, project]))
    return CURRENT_PROJECT_IDS.map((id) => currentProjectMap.get(id)).filter(Boolean) as ProjectMeta[]
  }, [projects])

  return (
    <section className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-6 pb-16 pt-10 md:px-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Current Projects</h2>
        <p>Building meaningful projects is how I translate my ideas into reality. Each project represents a problem I found worth solving or a question I wanted to explore. While I have many interests, these featured projects showcase my current focus on creating practical tools that help people learn, work, and research more effectively.</p>
      </header>

      {isLoading ? (
        <div className="rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-white px-6 py-10 text-sm text-neutral-600 shadow-sm">
          Loading current projects...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error && filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-white px-6 py-10 text-sm text-neutral-600 shadow-sm">
          No current projects are configured yet.
        </div>
      ) : null}

      {!isLoading && !error && filteredProjects.length > 0 ? (
        <>
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} squarish />
            ))}
          </section>

          <p className="mx-auto max-w-[46rem] text-center text-[10px] italic leading-6 text-current/65">
            These projects are just a small sample of my work. I'm constantly building and experimenting with new ideas.
            Check out my GitHub for more or reach out if you'd like to collaborate!
          </p>
        </>
      ) : null}
    </section>
  )
}
