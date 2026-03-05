import { useState, FormEvent, ChangeEvent } from 'react'
import { Supplier } from '../types/supplier'

const API_BASE = 'https://andritz-test-dashboard.onrender.com'

type FormState = Omit<Supplier, 'id'>

const INITIAL_STATE: FormState = {
  materialGroup: '',
  registrationDate: new Date().toISOString().split('T')[0],
  supplierName: '',
  address: '',
  postalCode: '',
  city: '',
  state: '',
  country: '',
  telephone: '',
  telephone2: '',
  email: '',
  orderCurrency: 'USD',
  paymentTerms: '',
  incoterms: '',
  contactPerson: '',
  mobileNo: '',
  gstNo: '',
  panNo: '',
  reason: '',
  isOneTimeVendor: false,
  expectedYearlyPvo: 0,
}

interface Props {
  onSuccess: () => void
}

const inputCls =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'

const labelCls = 'block text-sm font-medium text-gray-700 mb-1'

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wide border-b border-indigo-100 pb-2 mb-4">
      {title}
    </h3>
  )
}

export default function SupplierForm({ onSuccess }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? parseFloat(value) || 0
          : value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/suppliers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Server responded with status ${res.status}`)
      setForm(INITIAL_STATE)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Supplier Registration</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── Company Information ─────────────────────────────── */}
        <section>
          <SectionHeader title="Company Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Material Group *</label>
              <input
                name="materialGroup"
                value={form.materialGroup}
                onChange={handleChange}
                required
                placeholder="e.g. Raw Materials"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Supplier Name *</label>
              <input
                name="supplierName"
                value={form.supplierName}
                onChange={handleChange}
                required
                placeholder="Legal company name"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Registration Date *</label>
              <input
                type="date"
                name="registrationDate"
                value={form.registrationDate}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className={labelCls}>Address *</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Street address"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Postal Code *</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
                placeholder="Postal / ZIP code"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>City *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="City"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>State / Province *</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                placeholder="State or Province"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Country *</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                placeholder="Country"
                className={inputCls}
              />
            </div>
          </div>
        </section>

        {/* ── Contact Information ─────────────────────────────── */}
        <section>
          <SectionHeader title="Contact Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Contact Person *</label>
              <input
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleChange}
                required
                placeholder="Full name"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="contact@supplier.com"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Mobile No *</label>
              <input
                name="mobileNo"
                value={form.mobileNo}
                onChange={handleChange}
                required
                placeholder="+1 555 000 0000"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Telephone *</label>
              <input
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                required
                placeholder="+1 555 000 0000"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Telephone 2</label>
              <input
                name="telephone2"
                value={form.telephone2 ?? ''}
                onChange={handleChange}
                placeholder="Optional secondary number"
                className={inputCls}
              />
            </div>
          </div>
        </section>

        {/* ── Financial & Trade Terms ─────────────────────────── */}
        <section>
          <SectionHeader title="Financial & Trade Terms" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Order Currency *</label>
              <select
                name="orderCurrency"
                value={form.orderCurrency}
                onChange={handleChange}
                required
                className={inputCls}
              >
                <option value="USD">USD – US Dollar</option>
                <option value="EUR">EUR – Euro</option>
                <option value="GBP">GBP – British Pound</option>
                <option value="INR">INR – Indian Rupee</option>
                <option value="JPY">JPY – Japanese Yen</option>
                <option value="CAD">CAD – Canadian Dollar</option>
                <option value="AUD">AUD – Australian Dollar</option>
                <option value="CHF">CHF – Swiss Franc</option>
                <option value="CNY">CNY – Chinese Yuan</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Payment Terms *</label>
              <input
                name="paymentTerms"
                value={form.paymentTerms}
                onChange={handleChange}
                required
                placeholder="e.g. Net 30, Net 60"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Incoterms *</label>
              <select
                name="incoterms"
                value={form.incoterms}
                onChange={handleChange}
                required
                className={inputCls}
              >
                <option value="">Select Incoterm</option>
                <option value="EXW">EXW – Ex Works</option>
                <option value="FCA">FCA – Free Carrier</option>
                <option value="CPT">CPT – Carriage Paid To</option>
                <option value="CIP">CIP – Carriage and Insurance Paid</option>
                <option value="DAP">DAP – Delivered at Place</option>
                <option value="DPU">DPU – Delivered at Place Unloaded</option>
                <option value="DDP">DDP – Delivered Duty Paid</option>
                <option value="FAS">FAS – Free Alongside Ship</option>
                <option value="FOB">FOB – Free on Board</option>
                <option value="CFR">CFR – Cost and Freight</option>
                <option value="CIF">CIF – Cost, Insurance and Freight</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Expected Yearly PVO ({form.orderCurrency}) *</label>
              <input
                type="number"
                name="expectedYearlyPvo"
                value={form.expectedYearlyPvo}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className={inputCls}
              />
            </div>
          </div>
        </section>

        {/* ── Tax & Compliance ────────────────────────────────── */}
        <section>
          <SectionHeader title="Tax & Compliance" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>GST No *</label>
              <input
                name="gstNo"
                value={form.gstNo}
                onChange={handleChange}
                required
                placeholder="GST registration number"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>PAN No *</label>
              <input
                name="panNo"
                value={form.panNo}
                onChange={handleChange}
                required
                placeholder="PAN number"
                className={inputCls}
              />
            </div>
          </div>
        </section>

        {/* ── Additional Information ──────────────────────────── */}
        <section>
          <SectionHeader title="Additional Information" />
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Reason for Registration *</label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe the reason for registering this supplier..."
                className={inputCls}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isOneTimeVendor"
                name="isOneTimeVendor"
                checked={form.isOneTimeVendor}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isOneTimeVendor" className="text-sm font-medium text-gray-700">
                This is a one-time vendor
              </label>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Submitting…' : 'Register Supplier'}
          </button>
        </div>
      </form>
    </div>
  )
}
