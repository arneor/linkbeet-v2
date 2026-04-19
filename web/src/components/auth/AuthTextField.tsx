'use client'

import { cn } from '@linkbeet/utils'
import { Eye, EyeOff } from 'lucide-react'
import React, { useId, useState } from 'react'

export interface AuthTextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'id'
> {
  label: string
  error?: string
  hint?: React.ReactNode
}

export function AuthTextField({ label, error, hint, type = 'text', ...rest }: AuthTextFieldProps) {
  const id = useId()
  const [revealed, setRevealed] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && revealed ? 'text' : type

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn(
            'peer w-full h-[56px] bg-white text-[17px] text-slate-900',
            'border-b border-slate-300 focus:border-accent',
            'pt-5 pb-2 px-0 outline-none transition-colors',
            isPassword && 'pr-10',
            error && 'border-red-500',
          )}
          {...rest}
        />
        <label
          htmlFor={id}
          className={cn(
            'absolute left-0 top-4 text-[15px] text-slate-500 pointer-events-none',
            'transition-all duration-150',
            'peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-accent',
            'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[12px]',
            'peer-[:not(:placeholder-shown)]:text-slate-600',
          )}
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 rounded-md"
          >
            {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-[12px] text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-slate-500">{hint}</p>
      ) : null}
    </div>
  )
}
