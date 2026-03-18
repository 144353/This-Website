export function IntroHeader() {
  return (
    <section className="hero hero-intro-shell">
      <section className="hero-intro">
        <div className="hero-intro-media">
          <img src="lol.png" alt="Qiu Jie" className="hero-intro-image" />
        </div>

        <div className="hero-intro-copy">
          <h1 className="hero-intro-name">Qiu Jie</h1>
          <p className="hero-intro-contact">qj20050505[at]gmail[dot]com <span>•</span> jie.q.qiu[at]gmail[dot]com</p>
          <p className="hero-intro-summary">
            I enjoy building software and exploring AI/ML in robotics.
          </p>
          <p className="hero-intro-roles">
            <span>Student.</span> <span>Builder.</span> <span>Engineer.</span>
          </p>
          <div className="hero-intro-links">
            <a
              href="https://github.com/144353"
              target="_blank"
              rel="noreferrer"
              className="hero-intro-icon-link"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" className="hero-intro-icon" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.486 2 12.017a10.02 10.02 0 0 0 6.838 9.503c.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.37-1.344-3.37-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.027A9.56 9.56 0 0 1 12 6.845c.85.004 1.705.115 2.504.337 1.909-1.297 2.748-1.027 2.748-1.027.546 1.378.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hero-intro-icon-link"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="hero-intro-icon" fill="currentColor" aria-hidden="true">
                <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.5 9.75h2.88V18H5.5V9.75Zm4.69 0h2.76v1.13h.04c.38-.73 1.32-1.5 2.73-1.5 2.92 0 3.46 1.92 3.46 4.42V18H16.3v-3.68c0-.88-.02-2.01-1.23-2.01-1.23 0-1.42.96-1.42 1.95V18h-2.88V9.75Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </section>
  )
}
