import { FormEvent, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getOrders, createOrder, deleteOrder } from '../api';

interface Order { _id: string; productName: string; quantity: number; price: number; customerName: string; customerPhone?: string; createdAt: string; }
const emptyForm = { productName: '', quantity: '1', price: '', customerName: '', customerPhone: '' };

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); try { const d = await getOrders(); setOrders(d.orders); setTotalRevenue(d.totalRevenue); } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try { await createOrder({ productName: form.productName, quantity: Number(form.quantity), price: Number(form.price), customerName: form.customerName, customerPhone: form.customerPhone }); setShowForm(false); setForm(emptyForm); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } finally { setSaving(false); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Sales</h1><p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Record sales from WhatsApp or Contact inquiries.</p></div>
        <button onClick={() => setShowForm(true)} className="rounded-lg font-semibold px-4 py-2.5 text-sm" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>Add sale</button>
      </div>
      <div className="bg-white rounded-2xl p-5 mb-6 inline-block" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
        <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Total revenue</p>
        <p className="text-3xl font-bold mt-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Rs {totalRevenue.toLocaleString()}</p>
      </div>
      {error && <p className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ color: '#B14A32', backgroundColor: 'rgba(177,74,50,0.1)' }}>{error}</p>}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(28,27,25,0.5)' }}>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>Add sale</h2>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Product name</label><input required value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Qty</label><input type="number" min="1" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Price/unit</label><input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            </div>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Customer name</label><input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Customer phone (optional)</label><input value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 rounded-lg font-semibold py-2.5 disabled:opacity-60" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>{saving ? 'Saving...' : 'Add sale'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2.5 text-sm" style={{ borderColor: 'rgba(28,27,25,0.15)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Loading...</p> : orders.length === 0 ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>No sales yet.</p> : (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b" style={{ borderColor: 'rgba(28,27,25,0.1)', color: 'rgba(28,27,25,0.5)' }}>
              <th className="px-4 py-3 font-medium">Product</th><th className="px-4 py-3 font-medium">Qty</th><th className="px-4 py-3 font-medium">Price</th><th className="px-4 py-3 font-medium">Customer</th><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b last:border-0" style={{ borderColor: 'rgba(28,27,25,0.05)' }}>
                  <td className="px-4 py-3" style={{ color: '#1C1B19' }}>{o.productName}</td>
                  <td className="px-4 py-3" style={{ color: 'rgba(28,27,25,0.7)' }}>{o.quantity}</td>
                  <td className="px-4 py-3" style={{ color: 'rgba(28,27,25,0.7)' }}>Rs {o.price.toLocaleString()}</td>
                  <td className="px-4 py-3" style={{ color: 'rgba(28,27,25,0.7)' }}>{o.customerName}</td>
                  <td className="px-4 py-3" style={{ color: 'rgba(28,27,25,0.5)' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right"><button onClick={async () => { if (!confirm('Delete?')) return; try { await deleteOrder(o._id); await load(); } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } }} className="text-sm hover:underline" style={{ color: '#B14A32' }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
