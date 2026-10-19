import { FormEvent, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getReviews, createReview, deleteReview } from '../api';

interface Review { _id: string; name: { en: string; ar: string }; text: { en: string; ar: string }; location: { en: string; ar: string }; rating: number; }
const emptyForm = { nameEn: '', nameAr: '', textEn: '', textAr: '', locationEn: '', locationAr: '', rating: '5' };

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); try { setReviews(await getReviews()); } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      await createReview({ name: { en: form.nameEn, ar: form.nameAr }, text: { en: form.textEn, ar: form.textAr }, location: { en: form.locationEn, ar: form.locationAr }, rating: Number(form.rating) });
      setShowForm(false); setForm(emptyForm); await load();
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } finally { setSaving(false); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Reviews</h1><p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Customer testimonials on homepage.</p></div>
        <button onClick={() => setShowForm(true)} className="rounded-lg font-semibold px-4 py-2.5 text-sm" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>Add review</button>
      </div>
      {error && <p className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ color: '#B14A32', backgroundColor: 'rgba(177,74,50,0.1)' }}>{error}</p>}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(28,27,25,0.5)' }}>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>Add review</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Name (EN)</label><input required value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Name (AR)</label><input required dir="rtl" value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Location (EN)</label><input required value={form.locationEn} onChange={(e) => setForm({ ...form, locationEn: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} placeholder="Riyadh, KSA" /></div>
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Location (AR)</label><input required dir="rtl" value={form.locationAr} onChange={(e) => setForm({ ...form, locationAr: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Review (EN)</label><textarea required value={form.textEn} onChange={(e) => setForm({ ...form, textEn: e.target.value })} className="w-full rounded-lg border px-3 py-2 h-20" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Review (AR)</label><textarea required dir="rtl" value={form.textAr} onChange={(e) => setForm({ ...form, textAr: e.target.value })} className="w-full rounded-lg border px-3 py-2 h-20" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            </div>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Rating</label><select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }}>{[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} stars</option>)}</select></div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 rounded-lg font-semibold py-2.5 disabled:opacity-60" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>{saving ? 'Saving...' : 'Add review'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2.5 text-sm" style={{ borderColor: 'rgba(28,27,25,0.15)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Loading...</p> : reviews.length === 0 ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>No reviews yet.</p> : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r._id} className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
              <div className="flex items-start justify-between">
                <div><p className="font-medium text-sm" style={{ color: '#1C1B19' }}>{r.name.en}</p><p className="text-xs" style={{ color: 'rgba(28,27,25,0.4)' }}>{r.location.en} · {r.rating}★</p></div>
                <button onClick={async () => { if (!confirm('Delete?')) return; try { await deleteReview(r._id); await load(); } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } }} className="rounded-lg border px-3 py-1.5 text-sm" style={{ borderColor: 'rgba(177,74,50,0.3)', color: '#B14A32' }}>Delete</button>
              </div>
              <p className="text-sm mt-3" style={{ color: 'rgba(28,27,25,0.7)' }}>{r.text.en}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
