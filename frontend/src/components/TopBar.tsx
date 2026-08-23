'use client';

import { Bell, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

type TopBarProps = {
  orgName?: string;
  userName?: string;
  userRole?: string;
};

export default function TopBar({
  orgName = 'Anvil Labs',
  userName = 'Lakshan',
  userRole = 'Admin',
}: TopBarProps) {
  const userInitials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const orgInitial = orgName.charAt(0).toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-logo" type="button">
          <span className="dot" />
          ForgeFlow
        </button>
      </div>

      <div className="topbar-right">
        <button className="org-switch" type="button">
          <span className="org-mark">{orgInitial}</span>
          <span className="org-name">{orgName}</span>
          <ChevronDown size={14} />
        </button>

        <button className="icon-btn" type="button" aria-label="Notifications">
          <Bell size={15} />
          <span className="dot-badge" />
        </button>

        <button className="user-menu" type="button">
          <div className="avatar">{userInitials}</div>
          <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
            <div className="user-name">{userName}</div>
            <div className="user-role">{userRole}</div>
          </div>
          <ChevronDown size={14} color="var(--text-tertiary)" />
        </button>

        <ThemeToggle />
        
      </div>
    </header>
  );
}
