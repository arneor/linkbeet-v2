import { auth } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="text-slate-500">Welcome back, {session?.user?.name ?? 'User'} 👋</p>
      {/* Dashboard content will be built here */}
    </div>
  )
}
