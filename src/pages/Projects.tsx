import { useEffect, useMemo, useState } from 'react'
import { FilterDropdown } from '../components/projects/FilterDropdown'
import { ProjectCard } from '../components/projects/ProjectCard'
import { fetchProjects, type ProjectMeta } from '../lib/projects'

export function Projects() {
  const [projects, setProjects] = useState<ProjectMeta[]>([])
  const [selectedTag, setSelectedTag] = useState('All')
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
          setError(loadError instanceof Error ? loadError.message : 'Unable to load projects.')
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

  const tags = useMemo(() => {
    const uniqueTags = new Set<string>()
    projects.forEach((project) => {
      project.tags.forEach((tag) => uniqueTags.add(tag))
    })

    return ['All', ...Array.from(uniqueTags).sort((a, b) => a.localeCompare(b))]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return projects
    return projects.filter((project) => project.tags.includes(selectedTag))
  }, [projects, selectedTag])

  return (
    <section id="projects" className="mx-auto flex w-full max-w-[980px] flex-col gap-6 px-6 pb-16 pt-10 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <header className="flex flex-col gap-2">
          {/* <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Projects</p> */}
          {/* <h2 className="text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">Projects</h2> */}
          <h2 className="text-2xl font-bold">Current Projects</h2>
        </header>

        <FilterDropdown
          label="Filter by Tag"
          options={tags}
          selectedOption={selectedTag}
          onSelect={setSelectedTag}
          paramName="tag"
        />
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-white px-6 py-10 text-sm text-neutral-600 shadow-sm">
          Loading projects...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error && filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-white px-6 py-10 text-sm text-neutral-600 shadow-sm">
          No projects matched the selected tag.
        </div>
      ) : null}

      {!isLoading && !error && filteredProjects.length > 0 ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>
      ) : null}
    </section>
  )
}
