interface EducationLink {
  label: string
  href: string
}

interface EducationItem {
  institution: string
  program: string
  dates: string
  description: string
  links: EducationLink[]
}

const educationItems: EducationItem[] = [
  {
    institution: 'Temasek Polytechnic',
    program: 'Dip. Information Systems',
    dates: '3.38 GPA',
    description: 'Completed a full-time diploma covering software development, cloud computing, data analytics, and cybersecurity. ',
    links: [
      { label: 'View site →', href: 'https://www.tp.edu.sg/' },
    ],
  },
]

function SchoolLogo() {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full">
      <img src="idZE6J-3BF_logos.jpeg" alt="Temasek Polytechnic" className="h-full w-full rounded-full object-contain" />
    </div>
  )
}

export function Education() {
  return (
    <section className="fade-in mx-auto flex w-full max-w-[900px] flex-col gap-6 px-6 pt-8 md:px-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Education</h2>
      </header>

      <div className="flex flex-col gap-6">
        {educationItems.map((education) => (
          <article
            key={`${education.institution}-${education.program}`}
            className="flex flex-col gap-6 rounded-xl border border-transparent p-5 transition duration-200 hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg md:flex-row md:items-start md:gap-8"
          >
            <div className="flex flex-col items-start gap-3 md:w-[10.5rem] md:flex-none md:items-center">
              <SchoolLogo />
              <span className="inline-flex items-center rounded-full border border-[color-mix(in_oklch,var(--color-primary)_18%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_10%,white)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-primary)]">
                {education.dates}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-semibold leading-tight text-[#e8831a]">{education.institution}</h3>
                <p className="text-[15px] font-medium leading-snug text-current">{education.program}</p>
              </div>

              <p className="max-w-2xl text-sm leading-relaxed text-current/75">{education.description}</p>

            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
