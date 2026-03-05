import { useState } from 'react'
import SupplierForm from './components/SupplierForm'
import Dashboard from './components/Dashboard'

type View = 'form' | 'dashboard'

export default function App() {
  const [view, setView] = useState<View>('form')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setRefreshKey(k => k + 1)
    setView('dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Supplier Management</h1>
          <nav className="flex gap-2">
            <button
              onClick={() => setView('form')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                view === 'form'
                  ? 'bg-white text-indigo-700'
                  : 'text-indigo-100 hover:bg-indigo-600'
              }`}
            >
              Register Supplier
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                view === 'dashboard'
                  ? 'bg-white text-indigo-700'
                  : 'text-indigo-100 hover:bg-indigo-600'
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {view === 'form' ? (
          <SupplierForm onSuccess={handleSuccess} />
        ) : (
          <Dashboard key={refreshKey} />
        )}
      </main>
    </div>
  )
}
