import Image from 'next/image'

export function LogoBlock() {
  return (
    <div className="flex items-center gap-3 mb-8 animate-[fadeInUp_0.6s_ease-out_both]">
      <Image
        src="/linkbeet-text-logo.svg"
        alt="LinkBeet"
        width={170}
        height={50}
        className="md:h-[50px] h-[36px] w-auto object-contain"
        priority
        unoptimized
      />
    </div>
  )
}
