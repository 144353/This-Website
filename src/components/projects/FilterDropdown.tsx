import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface FilterDropdownProps {
  options: string[]
  selectedOption: string
  onSelect: (value: string) => void
  label: string
  paramName?: string
}

export function FilterDropdown({
  options,
  selectedOption,
  onSelect,
  label,
  paramName,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    if (!paramName) return

    const valueFromUrl = searchParams.get(paramName)
    if (!valueFromUrl || valueFromUrl === selectedOption) return
    if (options.includes(valueFromUrl)) onSelect(valueFromUrl)
  }, [onSelect, options, paramName, searchParams, selectedOption])

  const handleSelect = (value: string) => {
    onSelect(value)

    if (paramName) {
      const nextParams = new URLSearchParams(searchParams)
      if (value === 'All') nextParams.delete(paramName)
      else nextParams.set(paramName, value)
      setSearchParams(nextParams, { replace: true })
    }

    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative inline-flex min-w-56 flex-col">
      <span className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">{label}</span>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center justify-between rounded-2xl border border-[color-mix(in_oklch,var(--color-primary)_14%,transparent)] bg-white px-4 py-3 text-left text-sm text-neutral-900 shadow-sm transition hover:border-[color-mix(in_oklch,var(--color-primary)_28%,transparent)] hover:shadow-md"
      >
        <span>{selectedOption}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-neutral-500"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M5.25 7.5L10 12.25L14.75 7.5" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[color-mix(in_oklch,var(--color-primary)_14%,transparent)] bg-white p-2 shadow-xl"
          >
            <div className="flex min-w-56 flex-col gap-1">
              {options.map((option) => {
                const isSelected = option === selectedOption

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                      isSelected
                        ? 'bg-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] text-[var(--color-primary)]'
                        : 'text-neutral-700 hover:bg-[color-mix(in_oklch,var(--color-primary)_7%,transparent)] hover:text-neutral-950'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
