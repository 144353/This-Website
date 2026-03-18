interface DriveItem {
  title: string
  quote: string
  paragraphs: string[]
  imageSrc: string
  imageAlt: string
}

const driveItems: DriveItem[] = [
  {
    title: 'What Drives Me',
    quote:
      '"I approach every challenge with a dedication to positive impact, safety, and a deep respect for the work."',
    paragraphs: [
      'This mindset guides me as I build software that solves real problems, explore machine learning ideas with care, and work toward creating tools that are genuinely useful to the people who rely on them.',
      "I'm constantly trying to grow both technically and personally. For me, learning is not separate from building. Each project is a chance to improve, think more deeply, and contribute something meaningful.",
    ],
    imageSrc: '/DSCF0458.jpg',
    imageAlt: 'What drives me',
  },
  {
    title: 'Who Drives Me',
    quote: `"The people who believe in me give me the courage to keep building."`,
    paragraphs: [
      'My family, mentors, and the people who support me have shaped how I approach work and growth. Their encouragement reminds me that progress is rarely individual, even when the effort feels personal.',
      "That support system motivates me to keep aiming higher, stay grounded, and use what I learn to create things that can make a positive difference for others too.",
    ],
    imageSrc: '/appreciation dinner.jpg',
    imageAlt: 'Who drives me',
  },
]

export function DriveSection() {
  return (
    <section className="mx-auto flex w-full max-w-[900px] flex-col gap-16 px-6 pb-16 pt-8 md:px-8">
      {driveItems.map((item, index) => (
        <article key={item.title} className="flex flex-col gap-8">
          <header className="flex flex-col gap-5">
            <h2 className="text-[2rem] font-bold leading-tight">{item.title}</h2>
            <blockquote className="max-w-[48rem] border-l-4 border-[#0b67d1] pl-4 text-[clamp(0.9rem,1.35vw,1.05rem)] italic leading-8 text-current/80">
              {item.quote}
            </blockquote>
          </header>

          <div className="grid items-start gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.95fr)] md:gap-10">
            <div className="flex flex-col gap-5 text-[12px] leading-7 text-current/85">
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="overflow-hidden rounded-[1.15rem] bg-[color-mix(in_oklch,var(--color-primary)_6%,white)] shadow-sm ring-1 ring-[color-mix(in_oklch,var(--color-primary)_12%,transparent)]">
              <img 
                src={item.imageSrc}
                alt={item.imageAlt}
                className={`h-full w-full object-cover ${index === 0 ? 'aspect-[1.08/1]' : 'aspect-[1.08/1.05]'}`}
              />
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
