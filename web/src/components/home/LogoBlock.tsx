import Image from 'next/image'

export function LogoBlock() {
  return (
    <div className="flex items-center gap-3 mb-8 animate-[fadeInUp_0.6s_ease-out_both]">
      <Image
        src="/black-logo.png"
        alt="LinkBeet"
        width={48}
        height={48}
        className="md:w-[48px] md:h-[48px] w-[40px] h-[40px] object-contain"
        priority
        unoptimized
      />
      <span className="text-[36px] md:text-[52px] font-medium tracking-tight text-slate-900 leading-none">
        LinkBeet
      </span>
    </div>
  )
}
