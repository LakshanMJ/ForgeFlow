import {
    Crown,
    Shield,
    ClipboardList,
    Eye,
    Users as UsersIcon,
} from 'lucide-react';

type RoleIconProps = {
    roleName: string;
    size?: number;
};

const roleIcons = {
    OWNER: {
        icon: Crown,
        color: 'var(--ember)',
    },
    ADMIN: {
        icon: Shield,
        color: 'var(--ember)',
    },
    PROJECT_MANAGER: {
        icon: ClipboardList,
        color: 'var(--gold)',
    },
    VIEWER: {
        icon: Eye,
        color: 'var(--gold)',
    },
    MEMBER: {
        icon: UsersIcon,
        color: 'var(--steel)',
    },
} as const;

const roleNameMap: Record<string, keyof typeof roleIcons> = {
    Owner: 'OWNER',
    Admin: 'ADMIN',
    'Project Manager': 'PROJECT_MANAGER',
    Viewer: 'VIEWER',
    Member: 'MEMBER',
};

export function RoleIcon({ roleName, size = 16 }: RoleIconProps) {
    console.log(roleName, 'roleNameroleName')
    const roleKey = roleNameMap[roleName] ?? roleName;

    const config =
        roleIcons[roleKey as keyof typeof roleIcons] ?? {
            icon: Shield,
            color: 'var(--patina)',
        };

    const Icon = config.icon;

    return (
        <span
            className="role-icon"
            style={{
                background: 'var(--surface-3)',
                color: config.color,
            }}
        >
            <Icon size={size} />
        </span>
    );
}