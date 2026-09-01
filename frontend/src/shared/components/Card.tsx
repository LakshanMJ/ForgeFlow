import type { LucideIcon } from "lucide-react";

interface CardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    sub?: string;
    iconStyle?: {
        background?: string;
        color?: string;
    };
}

const Card = ({ icon: Icon, value, label, sub, iconStyle }: CardProps) => {
    return (
        <div className="users-stat-card">
            <span
                className="users-stat-icon-circle"
                style={iconStyle}
            >
                <Icon size={20} />
            </span>

            <div>
                <div className="users-stat-value">{value}</div>
                <div className="users-stat-label">{label}</div>

                {sub && (
                    <div
                        className="users-stat-sub"
                        style={{ color: iconStyle?.color }}
                    >
                        {sub}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;