import { ChangeEvent, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { createProduct, uploadImage } from '../api';

interface Row {
  file: File; previewUrl: string; category: string;
  nameEn: string; nameAr: string; descEn: string; descAr: string; price: string;
  status: 'pending' | 'saving' | 'done' | 'error'; errorMessage?: string;
}

export default function AdminBulkAdd() {
  const [rows, setRows] = useState<Row[]>([]);
  const [saving, setSaving] = useState(false);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setRows((prev) => [...prev, ...files.map((file) => ({ file, previewUrl: URL.createObjectURL(file), category: 'sofas', nameEn: '', nameAr: '', descEn: '', descAr: '', price: '', status: 'pending' as const }))]);
    e.target.value = '';
  };

  const update = (i: number, c: Partial<Row>) => setRows((p) => p.map((r, j) => j === i ? { ...r, ...c } : r));
  const remove = (i: number) => setRows((p) => p.filter((_, j) => j !== i));
  const allFilled = rows.every((r) => r.nameEn && r.nameAr && r.descEn && r.descAr);

  const saveAll = async () => {
    setSaving(true);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status === 'done') continue;
      update(i, { status: 'saving' });
      try {
        const up = await uploadImage(rows[i].file);
        await createProduct({ category: rows[i].category, name: { en: rows[i].nameEn, ar: rows[i].nameAr }, description: { en: rows[i].descEn, ar: rows[i].descAr }, images: [up.url], price: rows[i].price ? Number(rows[i].price) : null, isFeatured: false });
        update(i, { status: 'done' });
      } catch (err) { update(i, { status: 'error', errorMessage: err instanceof Error ? err.message : 'Failed' }); }
    }
    setSaving(false);
  };

  const done = rows.filter((r) => r.status === 'done').length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Bulk Add</h1>
        <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Select many photos, fill details, save all at once.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
        <label className="block text-sm mb-2" style={{ color: 'rgba(28,27,25,0.6)' }}>Select product photos</label>
        <input type="file" accept="image/*" multiple onChange={handleFiles} className="text-sm" />
        <p className="text-xs mt-2" style={{ color: 'rgba(28,27,25,0.4)' }}>Hold Ctrl/Shift to select multiple.</p>
      </div>
      {rows.length > 0 && (
        <>
          <div className="space-y-4">
            {rows.map((row, i) => (
              <div key={i} className={`bg-white rounded-2xl p-4 flex gap-4`} style={{ border: `1px solid ${row.status === 'done' ? 'rgba(75,93,74,0.4)' : row.status === 'error' ? 'rgba(177,74,50,0.4)' : 'rgba(28,27,25,0.1)'}` }}>
                <img src={row.previewUrl} className="w-20 h-20 object-cover rounded-lg shrink-0" alt="" />
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <select value={row.category} onChange={(e) => update(i, { category: e.target.value })} disabled={row.status === 'done'} className="col-span-2 rounded-lg border px-3 py-1.5 text-sm" style={{ borderColor: 'rgba(28,27,25,0.15)' }}>
                    <option value="sofas">Sofas</option><option value="curtains">Curtains</option><option value="majlis">Majlis</option>
                  </select>
                  <input placeholder="Name (EN)" value={row.nameEn} onChange={(e) => update(i, { nameEn: e.target.value })} disabled={row.status === 'done'} className="rounded-lg border px-3 py-1.5 text-sm" style={{ borderColor: 'rgba(28,27,25,0.15)' }} />
                  <input placeholder="Name (AR)" dir="rtl" value={row.nameAr} onChange={(e) => update(i, { nameAr: e.target.value })} disabled={row.status === 'done'} className="rounded-lg border px-3 py-1.5 text-sm" style={{ borderColor: 'rgba(28,27,25,0.15)' }} />
                  <textarea placeholder="Desc (EN)" value={row.descEn} onChange={(e) => update(i, { descEn: e.target.value })} disabled={row.status === 'done'} className="rounded-lg border px-3 py-1.5 text-sm h-14" style={{ borderColor: 'rgba(28,27,25,0.15)' }} />
                  <textarea placeholder="Desc (AR)" dir="rtl" value={row.descAr} onChange={(e) => update(i, { descAr: e.target.value })} disabled={row.status === 'done'} className="rounded-lg border px-3 py-1.5 text-sm h-14" style={{ borderColor: 'rgba(28,27,25,0.15)' }} />
                  {row.status === 'error' && <p className="col-span-2 text-xs" style={{ color: '#B14A32' }}>{row.errorMessage}</p>}
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button onClick={() => remove(i)} disabled={row.status === 'saving' || row.status === 'done'} className="text-xs" style={{ color: 'rgba(28,27,25,0.4)' }}>Remove</button>
                  {row.status === 'done' && <span className="text-xs font-medium" style={{ color: '#4B5D4A' }}>Saved ✓</span>}
                  {row.status === 'saving' && <span className="text-xs" style={{ color: 'rgba(28,27,25,0.4)' }}>Saving...</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 pt-4 pb-2 mt-6 flex items-center justify-between" style={{ backgroundColor: '#F6F3EC' }}>
            <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>{done} of {rows.length} saved</p>
            <button onClick={saveAll} disabled={saving || !allFilled || done === rows.length} className="rounded-lg font-semibold px-6 py-2.5 transition-colors disabled:opacity-50 text-sm" style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}>
              {saving ? 'Saving...' : `Save all ${rows.length}`}
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
