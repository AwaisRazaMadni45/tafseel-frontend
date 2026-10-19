import { NavLink, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/products/bulk-add', label: 'Bulk Add' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/orders', label: 'Sales' },
  { to: '/admin/messages', label: 'Messages' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F6F3EC', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col" style={{ backgroundColor: '#1C1B19', color: '#F6F3EC' }}>
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Tafseel</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(246,243,236,0.5)' }}>Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#1C1B19]'
                    : 'hover:bg-white/5'
                }`
              }
              style={({ isActive }) => isActive ? { backgroundColor: '#A9782F', color: '#1C1B19' } : { color: 'rgba(246,243,236,0.7)' }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <p className="px-3 text-xs mb-2" style={{ color: 'rgba(246,243,236,0.5)' }}>
            Signed in as {admin?.username}
          </p>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-3 py-2.5 text-sm font-medium text-left transition-colors hover:bg-white/5"
            style={{ color: 'rgba(246,243,236,0.7)' }}
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
