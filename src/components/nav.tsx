import { useEffect, useState } from "react"

export function Nav() {
  const [active, setActive] = useState<'about' | 'projects'>('about')

  useEffect(() => {
    const sections = ['about', 'projects']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id === 'projects') setActive('projects')
        if (visibleEntry?.target.id === 'about') setActive('about')
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.5, 0.8] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="section-nav-wrap">
      <ul className="section-nav-links">
        <li>
          <a
            href="/#about"
            className={`section-nav-link${active === 'about' ? ' active' : ''}`}
            onClick={() => setActive('about')}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/#projects"
            className={`section-nav-link${active === 'projects' ? ' active' : ''}`}
            onClick={() => setActive('projects')}
          >
            Projects
          </a>
        </li>
      </ul>
    </nav>
  )
}
