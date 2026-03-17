import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { fetchProjectMarkdown, fetchProjects, type ProjectDetail, type ProjectMeta } from '../lib/projects'

export function ProjectView() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Missing project id.')
      setIsLoading(false)
      return
    }

    let isActive = true

    const loadProject = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [content, metadata] = await Promise.all([fetchProjectMarkdown(id), fetchProjects()])
        const projectMeta = metadata.find((item: ProjectMeta) => item.id === id)

        if (!projectMeta) {
          throw new Error(`No metadata found for "${id}".`)
        }

        if (isActive) {
          setProject({
            ...projectMeta,
            content,
          })
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load project.')
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadProject()

    return () => {
      isActive = false
    }
  }, [id])

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-4xl px-6 pb-16 pt-28 md:px-8">
        <div className="w-full rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-white px-6 py-10 text-sm text-neutral-600 shadow-sm">
          Loading project...
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-4xl px-6 pb-16 pt-28 md:px-8">
        <div className="w-full rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-sm text-red-700">
          {error ?? 'Project not found.'}
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[var(--max-w)] flex-col gap-8 px-6 pb-16 pt-24 md:px-8">
      <Link to="/#projects" className="text-sm font-medium text-neutral-700 transition hover:text-[var(--color-primary)]">
        ← Back to Projects
      </Link>

      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color-mix(in_oklch,var(--color-primary)_14%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_8%,white)] px-3 py-1 text-xs font-medium text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 text-base">
          {project.githubLink ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neutral-950 transition hover:text-[var(--color-primary)]"
            >
              GitHub →
            </a>
          ) : null}
          {project.demoLink ? (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neutral-950 transition hover:text-[var(--color-primary)]"
            >
              Live Demo →
            </a>
          ) : null}
        </div>
      </header>

      <MarkdownRenderer
        content={project.content}
        className="prose prose-neutral max-w-none pt-2 prose-headings:tracking-tight prose-a:text-[var(--color-primary)]"
      />
    </main>
  )
}
