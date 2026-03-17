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
    company: 'PwC',
    role: 'Software Engineering Intern',
    dates: '7th July 2024 - 11th April 2025',
    description:
      'Software engineering intern responsible for managing internal application tools as well as developing new ones.',
    links: [
      { label: 'View site', href: 'https://www.pwc.com/sg/en.html' },
    ],
  },
]

function PwCLogo() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-[0_8px_22px_color-mix(in_oklch,var(--green)_24%,transparent)]">
      <img src="/PwC_Company_Logo.svg" alt="PwC" className="h-full w-full rounded-full object-contain" />
    </div>
  )
}

export function WorkExperience() {
  return (
    <section className="mx-auto flex w-full max-w-[var(--max-w)] flex-col gap-8 px-8 py-10 fade-in">
      <header className="flex flex-col gap-2">
        <h2 className="text-4xl font-semibold tracking-tight text-[var(--text)]">Work Experience</h2>
      </header>

      <div className="flex flex-col gap-5">
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className="grid grid-cols-1 gap-6 rounded-[28px] border border-[color-mix(in_oklch,var(--border)_72%,white)] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--bg-card)_96%,white)_0%,color-mix(in_oklch,var(--bg-card-hover)_86%,white)_100%)] px-6 py-7 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition duration-200 hover:border-[color-mix(in_oklch,var(--green)_22%,transparent)] hover:shadow-[0_18px_40px_color-mix(in_oklch,var(--green)_12%,transparent)] md:grid-cols-4 md:items-start"
          >
            <div className="flex flex-col items-start gap-4 md:col-span-1 md:pl-2">
              <PwCLogo />
              <p className="text-sm text-[var(--text-dim)]">{experience.dates}</p>
            </div>

            <div className="flex flex-col gap-4 md:col-span-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-[2rem] font-semibold leading-tight tracking-tight text-[var(--text)]">
                  {experience.company}
                </h3>
                <p className="text-xl font-medium text-[var(--green)]">{experience.role}</p>
              </div>

              <p className="max-w-3xl text-base leading-8 text-[var(--text-dim)]">{experience.description}</p>

              <div className="flex flex-wrap gap-3 pt-1">
                {experience.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-[color-mix(in_oklch,var(--green)_12%,transparent)] bg-[color-mix(in_oklch,var(--green)_8%,white)] px-4 py-2 text-sm font-medium text-[var(--green-dim)] transition hover:border-[color-mix(in_oklch,var(--green)_22%,transparent)] hover:bg-[color-mix(in_oklch,var(--green)_12%,white)] hover:text-[var(--green)]"
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
