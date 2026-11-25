import { useMemo } from "react";
import { ArrowUpRight, Sparkles, CalendarDays } from "lucide-react";
import SummaryCards from "./SummaryCards";
import TransactionList from "./TransactionList";
import { useExpenses } from "../context/ExpenseContext";

export default function Dashboard({ onEdit, onDelete, onAdd }) {
  const { transactions, categories } = useExpenses();
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const stats = useMemo(() => {
    const total = transactions.reduce((s, t) => s + Number(t.amount), 0);
    const month = transactions.filter((t) => t.date?.startsWith(monthKey)).reduce((s, t) => s + Number(t.amount), 0);
    return { total, month, count: transactions.length, average: transactions.length ? total / transactions.length : 0 };
  }, [transactions, monthKey]);

  const monthLabel = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return <div className="page-stack">
    <section className="welcome-banner"><div className="welcome-copy"><div className="welcome-kicker"><Sparkles size={14} /> YOUR MONEY, IN FOCUS</div><h2>Make your money <em>work smarter.</em></h2><p>A clearer view of your spending starts with the little things.</p><button className="welcome-button" onClick={onAdd}>Add a transaction <ArrowUpRight size={16} /></button></div><div className="welcome-art"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-orbit">₹</div><div className="art-spark spark-one">✦</div><div className="art-spark spark-two">✧</div></div></section>
    <div className="section-title-row"><div><span className="eyebrow">AT A GLANCE</span><h2>Your overview</h2></div><div className="date-chip"><CalendarDays size={15} /> {monthLabel}</div></div>
    <SummaryCards stats={stats} />
    <TransactionList transactions={transactions} categories={categories} onEdit={onEdit} onDelete={onDelete} compact />
  </div>;
}
