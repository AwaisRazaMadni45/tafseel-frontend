import { FormEvent, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getGalleryPhotos, createGalleryPhoto, deleteGalleryPhoto, uploadImage } from '../api';

interface GalleryPhoto { _id: string; category: string; image: string; caption: { en: string; ar: string }; }
const emptyForm = { category: 'sofas', captionEn: '', captionAr: '' };

export default function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); try { setPhotos(await getGalleryPhotos()); } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) { setError('Please choose a photo'); return; }
    setSaving(true); setError('');
    try {
      const up = await uploadImage(imageFile);
      await createGalleryPhoto({ category: form.category, image: up.url, caption: { en: form.captionEn, ar: form.captionAr } });
      setShowForm(false); await load();
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    try { await deleteGalleryPhoto(id); await load(); } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Gallery</h1>
          <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Photos shown on the Gallery page.</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setImageFile(null); setShowForm(true); }} className="rounded-lg font-semibold px-4 py-2.5 text-sm" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>Add photo</button>
      </div>
      {error && <p className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ color: '#B14A32', backgroundColor: 'rgba(177,74,50,0.1)' }}>{error}</p>}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(28,27,25,0.5)' }}>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>Add photo</h2>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }}><option value="sofas">Sofas</option><option value="curtains">Curtains</option><option value="majlis">Majlis</option></select></div>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Caption (English)</label><input required value={form.captionEn} onChange={(e) => setForm({ ...form, captionEn: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Caption (Arabic)</label><input required dir="rtl" value={form.captionAr} onChange={(e) => setForm({ ...form, captionAr: e.target.value })} className="w-full rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(28,27,25,0.15)' }} /></div>
            <div><label className="block text-sm mb-1" style={{ color: 'rgba(28,27,25,0.6)' }}>Photo</label><input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" /></div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 rounded-lg font-semibold py-2.5 disabled:opacity-60" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>{saving ? 'Saving...' : 'Add photo'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2.5 text-sm" style={{ borderColor: 'rgba(28,27,25,0.15)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Loading...</p> : photos.length === 0 ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>No photos yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo._id} className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
              <img src={photo.image} alt={photo.caption.en} className="w-full h-28 object-cover" />
              <div className="p-3">
                <p className="text-sm truncate" style={{ color: '#1C1B19' }}>{photo.caption.en}</p>
                <button onClick={() => handleDelete(photo._id)} className="mt-2 w-full rounded-lg border py-1.5 text-sm" style={{ borderColor: 'rgba(177,74,50,0.3)', color: '#B14A32' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
