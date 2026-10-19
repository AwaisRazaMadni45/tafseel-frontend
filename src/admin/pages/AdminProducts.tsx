import { FormEvent, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '../api';

interface Product {
  _id: string; category: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  images: string[]; price?: number;
  isFeatured: boolean; views: number;
}

const emptyForm = { category: 'sofas', nameEn: '', nameAr: '', descEn: '', descAr: '', price: '', isFeatured: false };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setProducts(await getProducts()); }
    catch (err) { setError(err instanceof Error ? err.message : 'Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setImageFile(null); setExistingImageUrl(''); setShowForm(true); };

  const openEdit = (p: Product) => {
    setEditingId(p._id);
    setForm({ category: p.category, nameEn: p.name.en, nameAr: p.name.ar, descEn: p.description.en, descAr: p.description.ar, price: p.price?.toString() || '', isFeatured: p.isFeatured });
    setImageFile(null); setExistingImageUrl(p.images[0] || ''); setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      let imageUrl = existingImageUrl;
      if (imageFile) { const up = await uploadImage(imageFile); imageUrl = up.url; }
      if (!imageUrl) throw new Error('Please choose an image');
      const payload = { category: form.category, name: { en: form.nameEn, ar: form.nameAr }, description: { en: form.descEn, ar: form.descAr }, images: [imageUrl], price: form.price ? Number(form.price) : null, isFeatured: form.isFeatured };
      if (editingId) await updateProduct(editingId, payload); else await createProduct(payload);
      setShowForm(false); await load();
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try { await deleteProduct(id); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Failed to delete'); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Products</h1>
          <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Add, edit, or remove items from your catalog.</p>
        </div>
        <button onClick={openAdd} className="rounded-lg font-semibold px-4 py-2.5 transition-colors text-sm" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>Add product</button>
      </div>

      {error && <p className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ color: '#B14A32', backgroundColor: 'rgba(177,74,50,0.1)' }}>{error}</p>}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(28,27,25,0.5)' }}>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>{editingId ? 'Edit product' : 'Add product'}</h2>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: 'rgba(28,27,25,0.15)' }}>
                <option value="sofas">Sofas</option><option value="curtains">Curtains</option><option value="majlis">Majlis</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Name (English)</label><input required value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Name (Arabic)</label><input required dir="rtl" value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Description (EN)</label><textarea required value={form.descEn} onChange={(e) => setForm({ ...form, descEn: e.target.value })} className="w-full rounded-lg px-3 py-2 border h-20" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
              <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Description (AR)</label><textarea required dir="rtl" value={form.descAr} onChange={(e) => setForm({ ...form, descAr: e.target.value })} className="w-full rounded-lg px-3 py-2 border h-20" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            </div>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Price (optional)</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: 'rgba(28,27,25,0.15)' }} placeholder="e.g. 1500" /></div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Image</label>
              {existingImageUrl && !imageFile && <img src={existingImageUrl} className="w-20 h-20 object-cover rounded-lg mb-2" alt="" />}
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
            </div>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'rgba(28,27,25,0.7)' }}>
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Featured on homepage
            </label>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 rounded-lg font-semibold py-2.5 transition-colors disabled:opacity-60" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>{saving ? 'Saving...' : 'Save product'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg px-4 py-2.5 text-sm border" style={{ borderColor: 'rgba(28,27,25,0.15)', color: 'rgba(28,27,25,0.7)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Loading...</p> : products.length === 0 ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>No products yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
              <img src={p.images[0]} alt={p.name.en} className="w-full h-32 object-cover" />
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide font-medium" style={{ color: '#A9782F' }}>{p.category}</p>
                <p className="font-medium text-sm mt-0.5" style={{ color: '#1C1B19' }}>{p.name.en}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(28,27,25,0.4)' }}>{p.views} views</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(p)} className="flex-1 rounded-lg py-1.5 text-sm border" style={{ borderColor: 'rgba(28,27,25,0.15)' }}>Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="flex-1 rounded-lg py-1.5 text-sm border" style={{ borderColor: 'rgba(177,74,50,0.3)', color: '#B14A32' }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
