'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { AuthHeading, AuthShell, AuthTextField, SocialButton } from '@/components/auth'

interface FormState {
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  email?: string
  confirmEmail?: string
  password?: string
  confirmPassword?: string
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!emailRe.test(form.email.trim())) errors.email = 'Enter a valid email address'

  if (!form.confirmEmail.trim()) errors.confirmEmail = 'Please confirm your email'
  else if (form.email.trim() !== form.confirmEmail.trim())
    errors.confirmEmail = 'Emails do not match'

  if (!form.password) errors.password = 'Password is required'
  else if (form.password.length < 8) errors.password = 'Password must be at least 8 characters'

  if (!form.confirmPassword) errors.confirmPassword = 'Please confirm your password'
  else if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match'

  return errors
}

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const setField =
    <K extends keyof FormState>(key: K) =>
    (value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }))
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = validate(form)
    if (Object.keys(result).length > 0) {
      setErrors(result)
      return
    }
    router.push('/auth/industry')
  }

  return (
    <AuthShell>
      <AuthHeading
        title="Sign up"
        subtitle={
          <span className="block">
            LinkBeet is your business, in one link.
            <br />
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-accent hover:underline font-medium">
              Log In
            </Link>
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-0 items-start">
        <form onSubmit={handleSubmit} className="w-full md:pr-12 flex flex-col gap-6" noValidate>
          <AuthTextField
            label="Email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setField('email')(e.target.value)}
            error={errors.email}
          />
          <AuthTextField
            label="Confirm email"
            type="email"
            autoComplete="email"
            value={form.confirmEmail}
            onChange={(e) => setField('confirmEmail')(e.target.value)}
            error={errors.confirmEmail}
          />
          <AuthTextField
            label="Choose a password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setField('password')(e.target.value)}
            error={errors.password}
            hint={!errors.password ? 'At least 8 characters' : undefined}
          />
          <AuthTextField
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) => setField('confirmPassword')(e.target.value)}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="mt-2 self-start h-[44px] px-8 rounded-full border border-accent text-accent font-medium text-[15px] hover:bg-accent/5 transition-colors active:scale-[0.98]"
          >
            Sign Up
          </button>
        </form>

        <div className="hidden md:flex flex-col items-center px-8">
          <div className="w-px flex-1 bg-slate-200" />
          <span className="my-3 text-[13px] text-slate-500">or</span>
          <div className="w-px flex-1 bg-slate-200" />
        </div>

        <div className="md:hidden relative text-center">
          <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
          <span className="relative inline-block bg-white px-3 text-[13px] text-slate-500">or</span>
        </div>

        <div className="w-full md:pl-12 flex flex-col gap-3">
          <SocialButton provider="google" />
          <SocialButton provider="facebook" />
        </div>
      </div>

      <footer className="mt-16 md:mt-20 text-center text-[12px] text-slate-500 leading-relaxed">
        <p>
          * By signing up, you agree to our{' '}
          <Link href="#" className="underline underline-offset-2 hover:text-slate-700">
            Terms of Use
          </Link>{' '}
          and acknowledge you&apos;ve read our{' '}
          <Link href="#" className="underline underline-offset-2 hover:text-slate-700">
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
    </AuthShell>
  )
}
