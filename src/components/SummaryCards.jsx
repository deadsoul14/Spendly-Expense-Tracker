import { Wallet, TrendingDown, ReceiptText, Calculator } from "lucide-react";

const cards = [
  { key: "month", label: "This month", icon: Wallet, tone: "violet" },
  { key: "total", label: "All-time spending", icon: TrendingDown, tone: "blue" },
  { key: "count", label: "Transactions", icon: ReceiptText, tone: "green" },
  { key: "average", label: "Average expense", icon: Calculator, tone: "orange" },
];

export default function SummaryCards({ stats }) {
  return (
    <div className="summary-grid">
      {cards.map(({ key, label, icon: Icon, tone }) => (
        <article className="summary-card" key={key}>
          <div className="summary-top"><span>{label}</span><div className={`summary-icon ${tone}`}><Icon size={18} /></div></div>
          <div className="summary-value">{key === "count" ? stats.count : `₹${stats[key].toLocaleString("en-IN", { maximumFractionDigits: 2 })}`}</div>
          <div className="summary-foot">{key === "month" ? "Spent in the current month" : key === "total" ? "Across all recorded expenses" : key === "count" ? "Recorded transactions" : "Per recorded transaction"}</div>
        </article>
      ))}
    </div>
  );
}
