export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Overview</h1>
      <div className="grid grid-cols-4 gap-6">
        {['Total Users', 'Active Today', 'Total Links', 'Revenue'].map((label) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
