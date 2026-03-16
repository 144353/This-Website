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

function screenshotPlaceholder(bg: string, name: string): string {
  return `<div class="project-screenshot" style="background:${bg};display:flex;align-items:center;justify-content:center;">
    <span style="font-size:0.6rem;color:#3d6b4a;letter-spacing:0.12em;text-transform:uppercase;">[${name}]</span>
  </div>`
}

function renderCard(p: Project): string {
  const cls = p.badge === 'open source' ? 'open' : 'closed'
  return `
    <div class="project-card fade-in">
      <div class="project-card-header">
        <span class="project-name">${p.name}</span>
        <span class="project-badge ${cls}">${p.badge}</span>
      </div>
      ${screenshotPlaceholder(p.screenshotBg, p.name)}
      <p class="project-subtitle">${p.subtitle}</p>
      <p class="project-desc">${p.description}</p>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
  `
}

export function renderProjects(): string {
  return `
    <div class="projects-wrap" id="projects">
      <div class="projects-grid">${projects.map(renderCard).join('')}</div>
    </div>
  `
}
