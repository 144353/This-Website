const EMAIL = 'qj20050505@gmail.com'
const EMAIL_DISPLAY = 'me [at] gmail (dot) com'

export function renderFooter(): string {
  return `
    <footer>
      <div class="footer-inner">
        <div class="footer-line">
          <span class="footer-bio">Dip. Information Systems, 3+ years of hobbyist engineering experience</span>
          <span class="footer-sep">·</span>
          <span class="footer-item">GitHub: <a href="https://github.com/144353" target="_blank" class="footer-link">@144353</a></span>
          <span class="footer-sep">·</span>
          <span class="footer-item">email: <button class="footer-email-btn" data-email="${EMAIL}">${EMAIL_DISPLAY}</button></span>
          <span class="footer-sep">·</span>
        </div>
        <a href="#top" class="footer-top">Back to top</a>
      </div>
      <div class="footer-toast" id="footer-toast">Copied to clipboard!</div>
    </footer>
  `
}

export function initFooter(): void {
  const btn = document.querySelector<HTMLButtonElement>('.footer-email-btn')
  const toast = document.getElementById('footer-toast')!

  btn?.addEventListener('click', async () => {
    await navigator.clipboard.writeText(btn.dataset.email!)
    toast.classList.add('show')
    setTimeout(() => toast.classList.remove('show'), 2000)
  })

  document.querySelector<HTMLAnchorElement>('a[href="#top"]')
    ?.addEventListener('click', (e) => {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}