import { Link, useLocation } from 'react-router-dom'

export function Nav() {
  const location = useLocation()
  const active = location.pathname.startsWith('/projects') ? 'projects' : 'about'

  return (
    <nav className="section-nav-wrap">
      <ul className="section-nav-links">
        <li>
          <a
            href="/#about"
            className={`section-nav-link${active === 'about' ? ' active' : ''}`}
          >
            About
          </a>
        </li>
        <li>
          <Link
            to="/projects"
            className={`section-nav-link${active === 'projects' ? ' active' : ''}`}
          >
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  )
}
