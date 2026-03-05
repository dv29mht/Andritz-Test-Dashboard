import { useEffect, useState } from 'react'
import { Supplier } from '../types/supplier'

const API_BASE = 'https://andritz-test-dashboard.onrender.com'

const COLUMNS: { label: string; key: keyof Supplier }[] = [
  { label: 'ID',              key: 'id' },
  { label: 'Supplier Name',   key: 'supplierName' },
  { label: 'Material Group',  key: 'materialGroup' },
  { label: 'Reg. Date',       key: 'registrationDate' },
  { label: 'City',            key: 'city' },
  { label: 'State',           key: 'state' },
  { label: 'Country',         key: 'country' },
  { label: 'Email',           key: 'email' },
  { label: 'Contact Person',  key: 'contactPerson' },
  { label: 'Telephone',       key: 'telephone' },
  { label: 'Mobile',          key: 'mobileNo' },
  { label: 'Currency',        key: 'orderCurrency' },
  { label: 'Payment Terms',   key: 'paymentTerms' },
  { label: 'Incoterms',       key: 'incoterms' },
  { label: 'Expected PVO',    key: 'expectedYearlyPvo' },
  { label: 'GST No',          key: 'gstNo' },
  { label: 'PAN No',          key: 'panNo' },
  { label: 'One-Time Vendor', key: 'isOneTimeVendor' },
]

function formatCell(key: keyof Supplier, value: Supplier[keyof Supplier]): React.ReactNode {
  if (key === 'isOneTimeVendor') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${value ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
        {value ? 'One-Time' : 'Recurring'}
      </span>
    )
  }
  if (key === 'registrationDate' && typeof value === 'string') {
    return new Date(value).toLocaleDateString()
  }
  if (key === 'expectedYearlyPvo' && typeof value === 'number') {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 })
  }
  return value != null && value !== '' ? String(value) : <span className="text-gray-300">—</span>
}

export default function Dashboard() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/suppliers`)
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`)
        return res.json() as Promise<Supplier[]>
      })
      .then(setSuppliers)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading suppliers...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
        {error}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Registered Suppliers</h2>
        <span className="text-sm text-gray-500">{suppliers.length} record{suppliers.length !== 1 ? 's' : ''}</span>
      </div>

      {suppliers.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
          No suppliers registered yet. Use the form to add one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {COLUMNS.map(col => (
                  <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {suppliers.map(s => (
                <tr key={s.id} className="hover:bg-indigo-50 transition-colors">
                  {COLUMNS.map(col => (
                    <td key={col.key} className={`px-4 py-3 whitespace-nowrap ${col.key === 'supplierName' ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      {formatCell(col.key, s[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
