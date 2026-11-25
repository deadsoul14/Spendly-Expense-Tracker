import {
  LayoutDashboard, ArrowLeftRight, BarChart3, Tags,
  Settings, Wallet, X
} from "lucide-react";

const items = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ active, onNavigate, open, onClose }) {
  return (
    <>
      {open && <button className="mobile-scrim" aria-label="Close menu" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Wallet size={21} /></div>
          <div><strong>spendly</strong><span>PERSONAL FINANCE</span></div>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
        </div>
        <div className="nav-caption">WORKSPACE</div>
        <nav className="side-nav">
          {items.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${active === id ? "active" : ""}`} onClick={() => { onNavigate(id); onClose(); }}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>
              {id === "transactions" && <span className="nav-count"> </span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-orb">✦</div>
            <strong>Small steps add up.</strong>
            <p>Keep an eye on your spending and make every rupee count.</p>
          </div>
          <div className="profile-row">
            <div className="avatar">S</div>
            <div><strong>My Wallet</strong><span>Personal account</span></div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>
    </>
  );
}
