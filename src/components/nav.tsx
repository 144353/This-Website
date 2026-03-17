import { useEffect, useState } from "react"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      style={{
        transition: "opacity 0.3s ease",
        opacity: scrolled ? 0.85 : 1,
      }}
    >
      <ul className="nav-links">
        <li>
          <a href="/#projects" className="nav-link">Projects</a>
        </li>
        <li>
          <a href="/#documents">Documents</a>
        </li>
        <li>
          <a href="https://github.com/144353" target="_blank" rel="noreferrer">GitHub</a>
        </li>
        <li>
          <a href="/#contact">Contact</a>
        </li>
      </ul>
    </nav>
  )
}