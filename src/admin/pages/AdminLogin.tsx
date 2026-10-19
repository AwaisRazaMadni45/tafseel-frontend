import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLogin() {
  const { admin, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#1C1B19' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Fraunces, serif' }}>Tafseel</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(246,243,236,0.5)' }}>Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-7 space-y-4" style={{ backgroundColor: '#2A2826' }}>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: 'rgba(246,243,236,0.7)' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
              className="w-full rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 border border-white/10"
              style={{ backgroundColor: '#1C1B19', focusRingColor: '#A9782F' }}
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5" style={{ color: 'rgba(246,243,236,0.7)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 border border-white/10"
              style={{ backgroundColor: '#1C1B19' }}
            />
          </div>

          {error && (
            <p className="text-sm rounded-lg px-3 py-2" style={{ color: '#B14A32', backgroundColor: 'rgba(177,74,50,0.1)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg font-semibold py-2.5 transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#A9782F', color: '#1C1B19' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
