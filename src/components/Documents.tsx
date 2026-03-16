interface ImportantDocument {
  label: string
  url: string
}

const documents: ImportantDocument[] = [
  { label: 'Official-Transcript', url: '#' },
  { label: 'Resume', url: '#' },
]

export function Documents() {
  return (
    <section className="documents-wrap fade-in" id="documents">
      <h2 className="documents-title">Important Documents</h2>
      <div className="documents-links">
        {documents.map((document) => (
          <a key={document.label} href={document.url} className="document-link">
            {document.label}
          </a>
        ))}
      </div>
    </section>
  )
}
