interface ImportantDocument {
  label: string
  url: string
}

const documents: ImportantDocument[] = [
  { label: 'Official-Transcript', url: 'public/Transcript(Poly).pdf' },
  { label: 'Resume', url: 'public/Qiu Jie resume.pdf' },
]

export function Documents() {
  return (
    <section className="documents-wrap fade-in" id="documents">
      <h2 className="documents-title">Important Documents</h2>
      <div className="documents-links">
        {documents.map((document) => (
          <a key={document.label} href={document.url} className="document-link" target="_blank"
            rel="noopener noreferrer">
            {document.label}
          </a>
        ))}
      </div>
    </section>
  )
}
