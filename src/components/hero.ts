// const EMAIL = 'qj20050505@gmail.com'
// const EMAIL_DISPLAY = 'me [at] gmail (dot) com'

// export function renderHero(): string {
//   return `
//     <div class="hero">
//       <h1>TL;DR</h1>
//       <p class="hero-bio">
//         I'm a Information Systems student at Temasek Polytechnic
//       </p>
//       <p class="hero-cta-line">
//         Interested in computational pathology or medical AI architecture? Let's talk.</a>
//       </p>
//       <div class="hero-links">
//         <div><span class="link-label">github: </span><a href="https://github.com/144353" target="_blank">@144353</a></div>
//         <div><span class="link-label">email: <button class="footer-email-btn" data-email="${EMAIL}">${EMAIL_DISPLAY}</button></a></div>
//       </div>
//     </div>
//   `
// }

export function renderHero(): string {
  return `
    <div class="hero">
      <h1 class="hero-tldr">TL;DR</h1>

      <div class="hero-section">
        <p class="hero-section-label">Currently I am...</p>
        <p class="hero-section-body">
          studying <a href="#">physics at UIUC</a>, researching
          <a href="#">AI/ML at UC Berkeley</a>, an AI Engineer at
          <a href="#">NCSA</a>, building <a href="#">AgAnswers.ai</a>,
          researching robotics at UIUC, and <a href="#">reading</a>
        </p>
      </div>

      <div class="hero-section">
        <p class="hero-section-label">Not so currently, I am...</p>
        <p class="hero-section-body">
          playing hockey for UIUC d1, <a href="#">the founder of aaxiom.org</a>,
          and playing competitive chess (although I do currently play a lot of blitz)
        </p>
      </div>
    </div>
  `
}
