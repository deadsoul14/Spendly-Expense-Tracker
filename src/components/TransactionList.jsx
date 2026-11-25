import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Pencil, Trash2, ArrowUpDown, Receipt } from "lucide-react";

const money = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function TransactionList({ transactions, categories, onEdit, onDelete, compact = false }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [month, setMonth] = useState("all");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => transactions.filter((t) => {
    const matchesSearch = `${t.category} ${t.note || ""}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || t.category === category;
    const matchesMonth = month === "all" || t.date?.slice(0, 7) === month;
    return matchesSearch && matchesCategory && matchesMonth;
  }).sort((a, b) => sort === "newest" ? b.date.localeCompare(a.date) : sort === "oldest" ? a.date.localeCompare(b.date) : sort === "highest" ? b.amount - a.amount : a.amount - b.amount), [transactions, search, category, month, sort]);

  return (
    <section className="panel transactions-panel">
      <div className="panel-heading"><div><span className="eyebrow">YOUR MONEY, ACCOUNTED FOR</span><h2>{compact ? "Recent transactions" : "All transactions"}</h2></div><span className="result-count">{filtered.length} records</span></div>
      <div className="filter-bar">
        <div className="search-box"><Search size={16} /><input placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div className="select-wrap"><SlidersHorizontal size={15} /><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All categories</option>{categories.map((c) => <option key={c.name}>{c.name}</option>)}</select></div>
        {!compact && <input className="month-filter" type="month" value={month === "all" ? "" : month} onChange={(e) => setMonth(e.target.value || "all")} />}
        <div className="select-wrap sort-wrap"><ArrowUpDown size={15} /><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="highest">Highest amount</option><option value="lowest">Lowest amount</option></select></div>
      </div>
      <div className="transaction-table-wrap">
        <table className="transaction-table">
          <thead><tr><th>DESCRIPTION</th><th>CATEGORY</th><th>DATE</th><th className="amount-cell">AMOUNT</th><th className="actions-cell">ACTIONS</th></tr></thead>
          <tbody>
            {filtered.slice(0, compact ? 6 : undefined).map((t) => {
              const c = categories.find((item) => item.name === t.category);
              return <tr key={t.id}>
                <td><div className="transaction-description"><span className="category-dot" style={{ background: c?.color || "#94A3B8" }} /><div><strong>{t.note || t.category}</strong><small>{t.note ? t.category : "Expense"}</small></div></div></td>
                <td><span className="category-pill" style={{ "--category-color": c?.color || "#94A3B8" }}>{t.category}</span></td>
                <td className="date-cell">{new Date(`${t.date}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className="amount-cell">{money(t.amount)}</td>
                <td className="actions-cell"><button className="table-icon" title="Edit" onClick={() => onEdit(t)}><Pencil size={15} /></button><button className="table-icon danger-hover" title="Delete" onClick={() => onDelete(t.id)}><Trash2 size={15} /></button></td>
              </tr>;
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty-state"><div className="empty-icon"><Receipt size={22} /></div><strong>No transactions found</strong><p>Try changing your filters or add a new expense.</p></div>}
      </div>
    </section>
  );
}
