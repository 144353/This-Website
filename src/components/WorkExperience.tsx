interface ExperienceLink {
  label: string
  href: string
}

interface ExperienceItem {
  company: string
  role: string
  dates: string
  description: string
  links: ExperienceLink[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'PricewaterHouse Coopers',
    role: 'Software Engineering Intern',
    dates: 'July 2024 - April 2025',
    description:
      'Software engineering intern responsible for managing internal application tools as well as developing new ones.',
    links: [
      { label: 'View site →', href: 'https://www.pwc.com/sg/en.html' },
    ],
  },
]

function PwCLogo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full">
      <img src="/PwC_Company_Logo.svg" alt="PwC" className="h-full w-full rounded-full object-contain" />
    </div>
  )
}

export function WorkExperience() {
  return (
    <section className="fade-in mx-auto flex w-full max-w-[900px] flex-col gap-6 px-6 md:px-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Work Experience</h2>
      </header>

      <div className="flex flex-col gap-6">
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className="flex flex-col gap-5 rounded-xl border border-transparent p-5 transition duration-200 hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg md:flex-row md:gap-0"
          >
            <div className="flex flex-col items-start gap-3 md:w-1/4">
              <PwCLogo />
              <p className="text-xs text-current/70">{experience.dates}</p>
            </div>

            <div className="flex flex-col gap-3 md:w-3/4">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">{experience.company}</h3>
                {/* <p className="text-sm font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]"> */}
                <p className="text-sm font-medium text-[#e8831a]">
                  {experience.role}
                </p>
              </div>

              <p className="max-w-3xl text-xs leading-relaxed text-current/75">{experience.description}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {experience.links.map((link) => (
                  <a target="_blank" rel="noopener noreferrer"
                    key={link.label}
                    href={link.href}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium transition bg-[#ffe294] ${
                      link.label.toLowerCase().includes('view site')
                        ? 'border-[color-mix(in_oklch,var(--color-primary)_16%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_8%,white)] text-[var(--color-primary)] hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--color-primary)_42%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_22%,white)] hover:text-[var(--color-primary)] hover:shadow-md'
                        : 'border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_6%,white)] text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:border-[color-mix(in_oklch,var(--color-primary)_18%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_10%,white)]'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
