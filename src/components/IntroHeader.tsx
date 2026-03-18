export function IntroHeader() {
  return (
    <section className="hero hero-intro-shell">
      <section className="hero-intro">
        <div className="hero-intro-media">
          <img src="lol.png" alt="Qiu Jie" className="hero-intro-image" />
        </div>

        <div className="hero-intro-copy">
          <h1 className="hero-intro-name">Qiu Jie</h1>
          <p className="hero-intro-contact">qj20050505[at]gmail[dot]com</p>
          <p className="hero-intro-summary">
            I enjoy building software, exploring AI/ML, and figuring out what kind of engineer I want to become.
          </p>
          <p className="hero-intro-roles">
            <span>Student.</span> <span>Builder.</span> <span>Engineer.</span>
          </p>
          <div className="hero-intro-links">
            <a href="https://github.com/144353" target="_blank" rel="noreferrer">GitHub</a>
            <span className="hero-intro-sep">|</span>
            <a href="/#projects">Projects</a>
            <span className="hero-intro-sep">|</span>
            <a href="/#documents">Documents</a>
          </div>
        </div>
      </section>
    </section>
  )
}
