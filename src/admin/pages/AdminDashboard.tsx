import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getProducts, getOrders, getContactMessages, getGalleryPhotos } from '../api';

interface Stats {
  products: number;
  totalRevenue: number;
  totalOrders: number;
  messages: number;
  galleryPhotos: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [products, ordersData, messages, gallery] = await Promise.all([
          getProducts(), getOrders(), getContactMessages(), getGalleryPhotos(),
        ]);
        setStats({
          products: products.length,
          totalRevenue: ordersData.totalRevenue,
          totalOrders: ordersData.totalOrders,
          messages: messages.length,
          galleryPhotos: gallery.length,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      }
    };
    load();
  }, []);

  const cards = stats ? [
    { label: 'Products', value: stats.products },
    { label: 'Gallery photos', value: stats.galleryPhotos },
    { label: 'Total sales', value: stats.totalOrders },
    { label: 'Revenue', value: `Rs ${stats.totalRevenue.toLocaleString()}` },
    { label: 'Messages', value: stats.messages },
  ] : [];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Dashboard</h1>
      <p className="mb-8 text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>A quick look at your catalog and sales.</p>

      {error && <p className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ color: '#B14A32', backgroundColor: 'rgba(177,74,50,0.1)' }}>{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
            <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>{card.label}</p>
            <p className="text-3xl font-bold mt-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>{card.value}</p>
          </div>
        ))}
        {!stats && !error && <p className="col-span-full text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Loading...</p>}
      </div>
    </AdminLayout>
  );
}
