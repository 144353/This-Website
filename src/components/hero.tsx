export function Hero() {
  return (
    <div className="hero">
      <h1 className="hero-tldr">TL;DR</h1>

      <div className="hero-section">
        <p className="hero-section-label">Currently I am...</p>
        <p className="hero-section-body">
          studying <a href="#">physics at UIUC</a>, researching <a href="#">AI/ML at UC Berkeley</a>,
          an AI Engineer at <a href="#">NCSA</a>, building <a href="#">AgAnswers.ai</a>, researching
          robotics at UIUC, and <a href="#">reading</a>
        </p>
      </div>

      <div className="hero-section">
        <p className="hero-section-label">Not so currently, I am...</p>
        <p className="hero-section-body">
          playing hockey for UIUC d1, <a href="#">the founder of aaxiom.org</a>, and playing
          competitive chess (although I do currently play a lot of blitz)
        </p>
      </div>
    </div>
  )
}
