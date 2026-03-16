import './style.css'
import { renderNav } from './components/nav'
import { renderHero } from './components/hero'
import { renderAbout } from './components/about'
import { renderDocuments } from './components/Documents'
import { renderProjects } from './components/projects/projectSection'
import { renderFooter, initFooter } from './components/footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  ${renderNav()}
  <main>
    ${renderHero()}
    ${renderAbout()}
    ${renderDocuments()}
    ${renderProjects()}
  </main>
  ${renderFooter()}
`

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href')!)
    target?.scrollIntoView({ behavior: 'smooth' })
  })
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible')
  })
}, { threshold: 0.08 })

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

initFooter()
