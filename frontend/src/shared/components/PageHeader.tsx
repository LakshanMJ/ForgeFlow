import Link from 'next/link';

interface PageHeaderProps {
    parentLabel: string;
    parentHref: string;
    title: string;
    subtitle?: string;
}

export default function PageHeader({
    parentLabel,
    parentHref,
    title,
    subtitle,
}: PageHeaderProps) {
    return (
        <div>
            <div className="breadcrumb-trail">
                <Link href={parentHref}>{parentLabel}</Link>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{title}</span>
            </div>

            <h1 className="page-title">{title}</h1>

            {subtitle && (
                <p
                    className="page-subtitle"
                    style={{ marginBottom: 0 }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}