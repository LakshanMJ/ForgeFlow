export default function BrandMark() {
  return (
    <>
      <div className="brand-mark">
        <span className="dot" />
        ForgeFlow
      </div>

      <style>{`
        .brand-mark {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 700;
          font-size: 17px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1a1a1a;
        }

        .brand-mark .dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: #e35a30;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}