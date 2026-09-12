"use client";

type Owner = {
  firstName?: string | null;
  lastName?: string | null;
};

type OwnerCellProps = {
  owner?: Owner | null;
};

export default function OwnerCell({ owner }: OwnerCellProps) {
  console.log(JSON.stringify(owner))
  const initials = owner
    ? `${owner.firstName?.[0] ?? ""}${owner.lastName?.[0] ?? ""}`.toUpperCase()
    : "";

  const name = owner
    ? `${owner.firstName ?? ""} ${owner.lastName ?? ""}`.trim()
    : "Unassigned";

  return (
    <>
      <div className="owner-cell">
        {owner && (
          <span className="owner-avatar">
            {initials}
          </span>
        )}

        {name}
      </div>

      <style jsx>{`
        .owner-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }

        .owner-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--surface-3);
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}