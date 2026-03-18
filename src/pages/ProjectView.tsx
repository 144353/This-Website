import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { ThemeMode } from '../App'
import { IntroHeader } from '../components/IntroHeader'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { Nav } from '../components/nav'
import { fetchProjectMarkdown, fetchProjects, type ProjectDetail, type ProjectMeta } from '../lib/projects'

interface ProjectViewProps {
  themeMode: ThemeMode
  onToggleTheme: () => void
}

export function ProjectView({ themeMode, onToggleTheme }: ProjectViewProps) {
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
      <main className="pb-16">
        <IntroHeader themeMode={themeMode} onToggleTheme={onToggleTheme} />
        <Nav />
        <div className="mx-auto flex min-h-[40vh] w-full max-w-4xl px-6 pt-14 md:px-8">
          <div className="w-full rounded-3xl border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] bg-[var(--bg-card)] px-6 py-10 text-sm text-[var(--text-dim)] shadow-sm">
            Loading project...
          </div>
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="pb-16">
        <IntroHeader themeMode={themeMode} onToggleTheme={onToggleTheme} />
        <Nav />
        <div className="mx-auto flex min-h-[40vh] w-full max-w-4xl px-6 pt-14 md:px-8">
          <div className="w-full rounded-3xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-6 py-10 text-sm text-[var(--danger-text)]">
            {error ?? 'Project not found.'}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pb-16">
      <IntroHeader themeMode={themeMode} onToggleTheme={onToggleTheme} />
      <Nav />
      <section className="mx-auto flex min-h-screen w-full max-w-[920px] flex-col gap-7 px-6 pb-16 pt-14 md:px-8">
        <Link to="/projects" className="text-sm font-medium text-[var(--text-dim)] transition hover:text-[var(--color-primary)]">
          ← Back to Projects
        </Link>

        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] md:text-[2.6rem]">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[color-mix(in_oklch,var(--color-primary)_14%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_8%,var(--bg-card))] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-dim)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-5 text-[15px]">
            {project.githubLink ? (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--text)] transition hover:text-[var(--color-primary)]"
              >
                GitHub →
              </a>
            ) : null}
            {project.demoLink ? (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--text)] transition hover:text-[var(--color-primary)]"
              >
                Live Demo →
              </a>
            ) : null}
          </div>
        </header>

        <MarkdownRenderer
          content={project.content}
          className="prose max-w-none pt-1 text-[14px] text-[var(--text-dim)] prose-headings:text-[var(--text)] prose-strong:text-[var(--text)] prose-li:text-[var(--text-dim)] prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-7 prose-li:leading-7 prose-a:text-[var(--color-primary)]"
        />
      </section>
    </main>
  )
}
