interface AuthHeadingProps {
  title: string
  subtitle?: React.ReactNode
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="text-center mb-10 md:mb-12">
      <h1 className="text-[36px] md:text-[56px] font-semibold tracking-tight text-slate-900 leading-[1.05]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 md:mt-4 text-[15px] md:text-[17px] text-slate-600 tracking-tight">
          {subtitle}
        </p>
      )}
    </div>
  )
}
