'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
  Cog,
  ChartNoAxesCombined,
  BellRing,
  ChevronDown,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare },
  { label: 'Notifications', href: '/notifications', icon: BellRing },
  { label: 'Analytics', href: '/analytics', icon: ChartNoAxesCombined },
  { label: 'User Management', href: '/users', icon: Users },
  { label: 'Roles & Permissions', href: '/roles', icon: ChartNoAxesCombined },
];

const ADMIN_SUBMENU = [
  { label: 'General Settings', href: '/admin/general' },
  // { label: 'User Management', href: '/admin/users' },
  // { label: 'Roles & Permissions', href: '/admin/roles' },
  { label: 'Departments', href: '/admin/departments' },
  { label: 'Project Categories', href: '/admin/project-categories' },
  { label: 'Audit Logs', href: '/admin/audit-logs' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isAdminSection = pathname.startsWith('/dashboard/admin');
  const [isAdminOpen, setIsAdminOpen] = useState(isAdminSection);

  return (
    <aside className="sidebar">
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/dashboard' ? pathname === href : pathname.startsWith(href);
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

        <button
          type="button"
          className={`nav-item nav-item-toggle${isAdminSection ? ' active' : ''}`}
          onClick={() => setIsAdminOpen((open) => !open)}
          aria-expanded={isAdminOpen}
          aria-controls="admin-submenu"
        >
          <Cog size={15} />
          <span style={{ flex: 1 }}>Admin</span>
          <ChevronDown
            size={14}
            className="toggle-chevron"
            style={{ transform: isAdminOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          />
        </button>

        {isAdminOpen && (
          <div className="nav-submenu" id="admin-submenu">
            {ADMIN_SUBMENU.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-subitem${isActive ? ' active' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
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
