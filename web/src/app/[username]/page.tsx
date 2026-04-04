import type { Metadata } from 'next'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  return {
    title: `@${username} | Linkbeet`,
    description: `Check out ${username}'s links on Linkbeet`,
  }
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params

  // TODO: fetch profile from profile microservice
  const profile = null

  if (!profile) {
    // For now render a placeholder; later uncomment notFound()
    // notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-linear-to-br from-violet-50 to-indigo-100 px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Avatar */}
        <div className="mb-4 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-violet-200" />
          <h1 className="mt-4 text-xl font-bold text-slate-900">@{username}</h1>
          <p className="mt-1 text-sm text-slate-500">Bio goes here</p>
        </div>
        {/* Links */}
        <div className="space-y-3">
          <div className="rounded-xl bg-white px-6 py-4 text-center shadow-sm">Link 1</div>
          <div className="rounded-xl bg-white px-6 py-4 text-center shadow-sm">Link 2</div>
        </div>
      </div>
    </main>
  )
}
