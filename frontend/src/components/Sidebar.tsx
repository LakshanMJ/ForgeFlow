'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { label: 'Team', href: '/dashboard/team', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`nav-item${isActive ? ' active' : ''}`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-divider" />
        <Link
          href="/dashboard/settings"
          className={`nav-item${pathname === '/dashboard/settings' ? ' active' : ''}`}
        >
          <Settings size={15} />
          Settings
        </Link>
      </div>
    </aside>
  );
}
