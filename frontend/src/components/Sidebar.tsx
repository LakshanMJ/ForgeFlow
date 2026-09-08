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
import { IoMdAnalytics } from "react-icons/io";
import { HiUsers } from "react-icons/hi";
import { FaUnlock } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import React from 'react';

const NAV_ITEMS = [
	{ label: 'Dashboard', href: '/dashboard', icon: '/dashboard.png', },
	{ label: 'Projects', href: '/projects', icon: '/projects.svg' },
	{ label: 'Tasks', href: '/tasks', icon: '/tasknew2.svg', },
	{ label: 'Notifications', href: '/notifications', icon: '/bell2.svg', },
	{
		label: 'Analytics',
		href: '/analytics',
		icon: IoMdAnalytics,
		iconColor: '#3b82f6',
	},
	// { label: 'User Management', href: '/users', },
	{
		label: 'User Managemsnt',
		href: '/users',
		icon: '/users.svg',
	},
	{ label: 'Roles & Permissions', href: '/roles', icon: '/new.png' },
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
				{NAV_ITEMS.map(({ label, href, icon: Icon, iconColor }) => {
					const isActive =
						href === '/dashboard' ? pathname === href : pathname.startsWith(href);
					return (
						// <Link
						// 	key={href}
						// 	href={href}
						// 	className={`nav-item${isActive ? ' active' : ''}`}
						// >
						// 	<Icon
						// 		size={30}
						// 		color={iconColor ?? 'currentColor'}
						// 	/>
						// 	{label}
						// </Link>
						<Link
							key={href}
							href={href}
							className={`nav-item${isActive ? ' active' : ''}`}
						>
							{typeof Icon === 'string' ? (
								<img
									src={Icon}
									alt=""
									width={20}
									height={20}
								/>
							) : React.isValidElement(Icon) ? (
								Icon
							) : (
								<Icon size={20} color={iconColor} />
							)}

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
					{/* <Cog size={15} /> */}
					<MdAdminPanelSettings size={26} />	
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
