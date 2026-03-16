interface Project {
  name: string
  badge: 'open source' | 'closed source'
  subtitle: string
  description: string
  tags: string[]
  screenshotBg: string
}

const projects: Project[] = [
  {
    name: 'Eosin',
    badge: 'open source',
    subtitle: 'Next-generation WSI workbench',
    description: `A Whole-Slide Imaging (WSI) platform built for computational pathology and
      microbiology. Gigapixel slide images become viewable within seconds of upload as an
      event-driven compiler processes them into read-optimized multiscale pyramids. A
      viewport-based tile service streams only the tiles relevant to the user over WebSocket,
      providing a fluid, microscope-like experience even on commodity hardware. Sharded NVMe-backed
      storage with read-only replicas maximizes throughput and availability.`,
    tags: ['Rust', 'WebSocket', 'NATS', 'NVMe', 'Kubernetes'],
    screenshotBg: '#1a0f1a',
  },
  {
    name: 'Synapse',
    badge: 'closed source',
    subtitle: 'AI-native LMS. Working title.',
    description: `An institution-scale Learning Management System designed around medical curricula.
      Synapse combines content-aware AI assistance, event-driven workflows, and telecommunications
      to support both in-person and remote education. A non-AI tooling layer enforces answer
      correctness via formal logic (Lean + Prolog) which yields direct citations into the curriculum.
      The Rust + NATS JetStream + Postgres + Kubernetes backend delivers reliable, low-friction
      operations while respecting institutional data privacy.`,
    tags: ['TypeScript', 'Lean', 'Prolog', 'Postgres', 'Kubernetes'],
    screenshotBg: '#0f1a2e',
  },
  {
    name: 'seer',
    badge: 'closed source',
    subtitle: 'Hybrid neural/keyword search engine',
    description: `A multimodal search engine that blends neural and "old school" keyword approaches
      for robustness, predictability, and controllable retrieval. While general purpose, seer
      specializes in the full spectrum of medical school curriculum assets — slideshows, PDFs,
      videos, images, Anki decks — via Kafka-backed pipelines and a Rust + Postgres + Kubernetes
      core. Each pipeline phase is tagged with a cryptographically verifiable audit token,
      providing full lineage and reproducibility across ingestion, processing, and retrieval.`,
    tags: ['Rust', 'Kafka', 'Postgres', 'ONNX', 'Kubernetes'],
    screenshotBg: '#0a0a1a',
  },
]

function ScreenshotPlaceholder({ bg, name }: { bg: string; name: string }) {
  return (
    <div
      className="project-screenshot"
      style={{ background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span style={{ fontSize: '0.6rem', color: '#3d6b4a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        [{name}]
      </span>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const badgeClass = project.badge === 'open source' ? 'open' : 'closed'

  return (
    <div className="project-card fade-in">
      <div className="project-card-header">
        <span className="project-name">{project.name}</span>
        <span className={`project-badge ${badgeClass}`}>{project.badge}</span>
      </div>
      <ScreenshotPlaceholder bg={project.screenshotBg} name={project.name} />
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <div className="projects-wrap" id="projects">
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  )
}
