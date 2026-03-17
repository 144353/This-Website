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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.486 2 12.017a10.02 10.02 0 0 0 6.838 9.503c.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.37-1.344-3.37-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.027A9.56 9.56 0 0 1 12 6.845c.85.004 1.705.115 2.504.337 1.909-1.297 2.748-1.027 2.748-1.027.546 1.378.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3Z" />
      <path d="M5 5h6v2H7v10h10v-4h2v6H5V5Z" />
    </svg>
  )
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

        <div className="mt-auto flex flex-wrap gap-4 pt-2">
          {project.githubLink ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              onClick={stopCardNavigation}
              className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-neutral-700 transition hover:bg-[color-mix(in_oklch,var(--color-primary)_9%,transparent)] hover:text-[var(--color-primary)]"
              aria-label={`Open ${project.title} GitHub repository`}
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          ) : null}
          {project.demoLink ? (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noreferrer"
              onClick={stopCardNavigation}
              className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-neutral-700 transition hover:bg-[color-mix(in_oklch,var(--color-primary)_9%,transparent)] hover:text-[var(--color-primary)]"
              aria-label={`Open ${project.title} live demo`}
            >
              <ExternalLinkIcon />
              <span>Live Demo</span>
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
