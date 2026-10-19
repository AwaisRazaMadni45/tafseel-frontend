import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getContactMessages } from '../api';

interface ContactMessage { _id: string; name: string; phone: string; message: string; createdAt: string; }

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try { setMessages(await getContactMessages()); }
      catch (err) { setError(err instanceof Error ? err.message : 'Failed'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#1C1B19' }}>Messages</h1>
      <p className="mb-8 text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Inquiries from the Contact form.</p>
      {error && <p className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ color: '#B14A32', backgroundColor: 'rgba(177,74,50,0.1)' }}>{error}</p>}
      {loading ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>Loading...</p> : messages.length === 0 ? <p className="text-sm" style={{ color: 'rgba(28,27,25,0.5)' }}>No messages yet.</p> : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(28,27,25,0.1)' }}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm" style={{ color: '#1C1B19' }}>{msg.name}</p>
                <p className="text-xs" style={{ color: 'rgba(28,27,25,0.4)' }}>{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(28,27,25,0.5)' }}>{msg.phone}</p>
              <p className="text-sm mt-3" style={{ color: 'rgba(28,27,25,0.7)' }}>{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
