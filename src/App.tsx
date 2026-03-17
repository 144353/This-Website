import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/nav'
import { Footer } from './components/footer'
import { HomePage } from './pages/HomePage'
import { ProjectView } from './pages/ProjectView'

export function App() {
  const location = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/projects/:id" element={<ProjectView />} />
      </Routes>
      <Footer />
    </>
  )
}
