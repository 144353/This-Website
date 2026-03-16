interface BlogPost {
  title: string
  date: string
  excerpt: string
  url: string
}

const latestPost: BlogPost = {
  title: 'On Living with Yourself',
  date: '2026-03-05',
  excerpt: `When I was growing up, many of my friends' parents worked in aerospace and defense.
    Later, when I entered the software industry, many of my peers followed the same path.
    Their salaries were almost always higher than mine. I had, and still have, many friends w...`,
  url: '#',
}

// function renderWave(): string {
//   const path = "M0,30 C180,10 360,50 540,30 C720,10 900,50 1080,30 C1260,10 1440,50 1440,30"
//   return `
//     <div class="wave-divider" aria-hidden="true">
//       <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
//         <path d="${path}" />
//         <path d="${path}" />
//         <path d="${path}" />
//       </svg>
//     </div>
//   `
// } ${renderWave()}

export function renderBlog(): string {
  return `
    
    <div class="latest-post-wrap fade-in" id="blog">
      <div class="latest-post">
        <p class="post-eyebrow">Latest from the blog</p>
        <div class="post-title-row">
          <a href="${latestPost.url}" class="post-title">${latestPost.title}</a>
          <span class="post-date">· ${latestPost.date}</span>
        </div>
        <p class="post-excerpt">${latestPost.excerpt}</p>
        <a href="${latestPost.url}" class="post-read-more">Read post →</a>
      </div>
    </div>
  `
}