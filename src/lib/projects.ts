export interface ProjectMeta {
  id: string
  title: string
  description: string
  tags: string[]
  githubLink?: string
  demoLink?: string
}

export interface ProjectDetail extends ProjectMeta {
  content: string
}

export const RAW_GITHUB_BASE_URL = 'https://raw.githubusercontent.com/144353/144353.github.io/main/projects.json'

function getConfiguredBaseUrl() {
  const configuredUrl = RAW_GITHUB_BASE_URL.trim()

  if (!configuredUrl || configuredUrl.includes('[INSERT YOUR RAW GITHUB BASE URL HERE]')) {
    throw new Error('Set RAW_GITHUB_BASE_URL in src/lib/projects.ts before loading remote project content.')
  }

  if (configuredUrl.endsWith('/projects.json')) {
    return configuredUrl.slice(0, -'/projects.json'.length)
  }

  return configuredUrl.replace(/\/+$/, '')
}

export function getProjectsJsonUrl() {
  return `${getConfiguredBaseUrl()}/projects.json`
}

export function getProjectMarkdownUrl(id: string) {
  return `${getConfiguredBaseUrl()}/projects/${id}.md`
}

function slugifyProjectId(id: string) {
  return id
    .trim()
    .replace(/\s+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

function getProjectMarkdownCandidates(id: string) {
  const baseUrl = getConfiguredBaseUrl()
  const slug = slugifyProjectId(id)

  return Array.from(
    new Set([
      `${baseUrl}/projects/${id}.md`,
      `${baseUrl}/projects/${slug}.md`,
      `${baseUrl}/${id}.md`,
      `${baseUrl}/${slug}.md`,
    ])
  )
}

export async function fetchProjects() {
  const response = await fetch(getProjectsJsonUrl())

  if (!response.ok) {
    throw new Error(`Failed to fetch projects.json (${response.status})`)
  }

  return (await response.json()) as ProjectMeta[]
}

export async function fetchProjectMarkdown(id: string) {
  const candidates = getProjectMarkdownCandidates(id)

  for (const url of candidates) {
    const response = await fetch(url)
    if (response.ok) {
      return response.text()
    }
  }

  throw new Error(
    `Failed to fetch markdown for "${id}". Tried: ${candidates
      .map((url) => url.replace(getConfiguredBaseUrl(), '...'))
      .join(', ')}`
  )
}
