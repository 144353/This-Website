interface ImportantDocument {
  label: string
  url: string
}

const documents: ImportantDocument[] = [
  { label: 'Official-Transcript', url: '#' },
  { label: 'Resume', url: '#' },
]

export function renderDocuments(): string {
  return `
    <section class="documents-wrap fade-in" id="documents">
      <h2 class="documents-title">Important Documents</h2>
      <div class="documents-links">
        ${documents
          .map(
            (document) => `
              <a href="${document.url}" class="document-link">${document.label}</a>
            `
          )
          .join('')}
      </div>
    </section>
  `
}
