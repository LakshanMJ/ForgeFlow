'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import "./topbar-dropdown.css";

type TopBarProps = {
  orgName?: string;
  userName?: string;
  userRole?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
};

export default function TopBar({
  orgName = 'Anvil Labs',
  userName = 'Lakshan',
  userRole = 'Admin',
  onProfile,
  onSettings,
  onLogout,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userInitials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const orgInitial = orgName.charAt(0).toUpperCase();

  // Close on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const handleItemClick = (action?: () => void) => {
    setMenuOpen(false);
    action?.();
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-logo" type="button">
          <span className="dot" />
          ForgeFlow
        </button>
      </div>

      <div className="topbar-right">

        <div className="user-menu-wrap" ref={menuRef}>
          <button
            className="user-menu"
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="avatar">{userInitials}</div>
            <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
              <div className="user-name">{userName}</div>
              <div className="user-role">{userRole}</div>
            </div>
            <ChevronDown
              size={14}
              color="var(--text-tertiary)"
              className={`user-menu-chevron ${menuOpen ? 'is-open' : ''}`}
            />
          </button>

          {menuOpen && (
            <div className="user-dropdown" role="menu">
              <div className="user-dropdown-header">
                <div className="avatar">{userInitials}</div>
                <div style={{ lineHeight: 1.25, minWidth: 0 }}>
                  <div className="user-name">{userName}</div>
                  <div className="user-role">{userRole}</div>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button
                className="dropdown-item"
                role="menuitem"
                type="button"
                onClick={() => handleItemClick(onProfile)}
              >
                <User size={15} />
                Profile
              </button>

              <button
                className="dropdown-item"
                role="menuitem"
                type="button"
                onClick={() => handleItemClick(onSettings)}
              >
                <Settings size={15} />
                Settings
              </button>

              <div className="dropdown-item dropdown-theme-row">
                <span className="dropdown-item-label">Theme</span>
                <ThemeToggle />
              </div>

              <div className="dropdown-divider" />

              <button
                className="dropdown-item dropdown-item-danger"
                role="menuitem"
                type="button"
                onClick={() => handleItemClick(onLogout)}
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
