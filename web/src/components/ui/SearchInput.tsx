'use client'

import React from 'react'

interface SearchInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  id,
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  className = '',
}: SearchInputProps) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className={className}
    />
  )
}
