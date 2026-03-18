import { useEffect, useMemo, useState } from 'react'
import type { ThemeMode } from '../App'
import { IntroHeader } from '../components/IntroHeader'
import { Nav } from '../components/nav'
import { FilterDropdown } from '../components/projects/FilterDropdown'
import { ProjectCard } from '../components/projects/ProjectCard'
import { fetchProjects, type ProjectMeta } from '../lib/projects'

interface ProjectsProps {
  themeMode: ThemeMode
  onToggleTheme: () => void
}

export function Projects({ themeMode, onToggleTheme }: ProjectsProps) {
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
    <main className="pb-16">
      <IntroHeader themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <Nav />
      <section className="mx-auto flex w-full max-w-[980px] flex-col gap-6 px-6 pt-10 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <header className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Projects</h1>
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
          <div className="rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-[var(--bg-card)] px-6 py-10 text-sm text-[var(--text-dim)] shadow-sm">
            Loading projects...
          </div>
        ) : null}

        {error ? (
          <div className="rounded-3xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-6 py-10 text-sm text-[var(--danger-text)]">
            {error}
          </div>
        ) : null}

        {!isLoading && !error && filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-[var(--bg-card)] px-6 py-10 text-sm text-[var(--text-dim)] shadow-sm">
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
    </main>
  )
}
