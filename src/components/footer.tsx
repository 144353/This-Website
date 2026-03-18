import { useEffect, useState, type MouseEvent } from 'react'

const EMAIL = 'qj20050505@gmail.com'
const EMAIL_DISPLAY = 'qj20050505 [at] gmail (dot) com'

export function Footer() {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!showToast) return

    const timeout = window.setTimeout(() => setShowToast(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [showToast])

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setShowToast(true)
  }

  const handleBackToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact">
      <div className="footer-inner">
        <div className="footer-line">
          <span className="footer-bio">
            Dip. Information Systems, 3+ years of hobbyist engineering experience
          </span>
          <span className="footer-sep">·</span>
          <span className="footer-item">
            GitHub:{' '}
            <a href="https://github.com/144353" target="_blank" rel="noreferrer" className="footer-link">
              @144353
            </a>
          </span>
          <span className="footer-sep">·</span>
          <span className="footer-item">
            email:{' '}
            <button type="button" className="footer-email-btn" onClick={handleCopyEmail}>
              {EMAIL_DISPLAY}
            </button>
          </span>
          <span className="footer-sep">·</span>
        </div>
        <a href="#top" className="footer-top" onClick={handleBackToTop}>
          Back to top
        </a>
      </div>
      <div className={`footer-toast${showToast ? ' show' : ''}`}>Copied to clipboard!</div>
    </footer>
  )
}
