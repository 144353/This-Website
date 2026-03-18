import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/footer'
import { HomePage } from './pages/HomePage'
import { Projects } from './pages/Projects'
import { ProjectView } from './pages/ProjectView'

export type ThemeMode = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'color-theme'

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system'

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
    ? storedTheme
    : 'system'
}

export function App() {
  const location = useLocation()
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getStoredTheme())

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

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('force-light', 'force-dark')

    if (themeMode === 'light') {
      root.classList.add('force-light')
      window.localStorage.setItem(THEME_STORAGE_KEY, 'light')
      return
    }

    if (themeMode === 'dark') {
      root.classList.add('force-dark')
      window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')
      return
    }

    window.localStorage.removeItem(THEME_STORAGE_KEY)
  }, [themeMode])

  const handleToggleTheme = () => {
    setThemeMode((currentTheme) => {
      if (currentTheme === 'system') return 'light'
      if (currentTheme === 'light') return 'dark'
      return 'system'
    })
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage themeMode={themeMode} onToggleTheme={handleToggleTheme} />} />
        <Route path="/projects" element={<Projects themeMode={themeMode} onToggleTheme={handleToggleTheme} />} />
        <Route path="/projects/:id" element={<ProjectView />} />
      </Routes>
      <Footer />
    </>
  )
}
