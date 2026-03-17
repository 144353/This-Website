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
    if (!valueFromUrl) {
      if (selectedOption !== 'All') onSelect('All')
      return
    }

    if (valueFromUrl === selectedOption) return
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
    <div ref={containerRef} className="relative inline-flex min-w-[190px] flex-col">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center justify-between gap-2.5 rounded-xl border-2 border-neutral-950 bg-white px-4 py-2.5 text-left text-[13px] font-medium text-neutral-950 shadow-[0_3px_0_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:border-[#c96e10] hover:text-[#c96e10] hover:shadow-[0_8px_18px_color-mix(in_oklch,#c96e10_16%,transparent)]"
        aria-label={`${label}: ${selectedOption}`}
      >
        <span className="whitespace-nowrap">
          {label}:{' '}
          <span className="rounded-md bg-[color-mix(in_oklch,#c96e10_18%,white)] px-1.5 py-0.5 font-semibold text-[#c96e10]">
            {selectedOption}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-neutral-700"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
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
            className="absolute right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border-2 border-neutral-950 bg-white p-1.5 shadow-[0_16px_34px_rgba(0,0,0,0.16)]"
          >
            <div className="flex min-w-[190px] flex-col gap-1">
              {options.map((option) => {
                const isSelected = option === selectedOption

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`rounded-lg px-3 py-2 text-left text-[13px] font-medium transition duration-150 ${
                      isSelected
                        ? 'bg-[color-mix(in_oklch,#c96e10_16%,white)] text-[#c96e10] shadow-[inset_0_0_0_1px_color-mix(in_oklch,#c96e10_22%,transparent)] hover:bg-[color-mix(in_oklch,#c96e10_22%,white)] hover:text-[#a35407]'
                        : 'text-neutral-700 hover:bg-[color-mix(in_oklch,#c96e10_22%,white)] hover:pl-4 hover:text-[#a35407]'
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
