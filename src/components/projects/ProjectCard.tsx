import { motion } from 'framer-motion'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProjectMeta } from '../../lib/projects'

interface ProjectCardProps {
  project: ProjectMeta
  index: number
  compact?: boolean
  onClick?: (project: ProjectMeta) => void
}

export function ProjectCard({ project, index, compact = false, onClick }: ProjectCardProps) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (onClick) {
      onClick(project)
      return
    }

    navigate(`/projects/${project.id}`)
  }

  const stopCardNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNavigate()
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      className="group relative overflow-hidden rounded-3xl border border-transparent bg-white p-6 text-left shadow-sm outline-none transition hover:-translate-y-1 hover:border-[color-mix(in_oklch,var(--color-primary)_18%,transparent)] hover:shadow-xl focus-visible:border-[color-mix(in_oklch,var(--color-primary)_24%,transparent)] focus-visible:shadow-xl"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--color-primary)_22%,transparent),transparent_68%)] transition duration-300 group-hover:scale-110" />

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-neutral-950 transition group-hover:text-[var(--color-primary)]">
            {project.title}
          </h3>
        </div>

        <p
          className={`overflow-hidden text-sm leading-7 text-neutral-600 [display:-webkit-box] [-webkit-box-orient:vertical] ${
            compact ? '[-webkit-line-clamp:3]' : '[-webkit-line-clamp:2]'
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color-mix(in_oklch,var(--color-primary)_14%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_7%,transparent)] px-3 py-1 text-xs font-medium text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.githubLink ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              onClick={stopCardNavigation}
              className="text-sm font-medium text-neutral-700 transition hover:text-[var(--color-primary)]"
            >
              GitHub
            </a>
          ) : null}
          {project.demoLink ? (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noreferrer"
              onClick={stopCardNavigation}
              className="text-sm font-medium text-neutral-700 transition hover:text-[var(--color-primary)]"
            >
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
