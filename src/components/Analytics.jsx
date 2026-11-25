import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { useExpenses } from "../context/ExpenseContext";

const money = (v) => `₹${Number(v).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export default function Analytics() {
  const { transactions, categories } = useExpenses();

  const categoryData = useMemo(() => {
    const totals = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
    return Object.entries(totals).map(([name, value]) => ({
      name, value, color: categories.find((c) => c.name === name)?.color || "#94A3B8",
    })).sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  const monthlyData = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const value = transactions.filter((t) => t.date?.startsWith(key)).reduce((s, t) => s + Number(t.amount), 0);
      months.push({ month: d.toLocaleDateString("en-IN", { month: "short" }), amount: value });
    }
    return months;
  }, [transactions]);

  const total = categoryData.reduce((s, c) => s + c.value, 0);

  return (
    <div className="analytics-page">
      <div className="analytics-grid">
        <section className="panel chart-panel">
          <div className="panel-heading"><div><span className="eyebrow">WHERE IT GOES</span><h2>Spending by category</h2></div></div>
          {total > 0 ? <div className="donut-layout">
            <div className="donut-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius="67%" outerRadius="92%" paddingAngle={3} stroke="none">{categoryData.map((c) => <Cell key={c.name} fill={c.color} />)}</Pie><Tooltip formatter={(v) => money(v)} contentStyle={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text)" }} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>{money(total)}</strong><span>Total spent</span></div></div>
            <div className="legend-list">{categoryData.map((c) => <div className="legend-item" key={c.name}><span className="legend-dot" style={{ background: c.color }} /><span>{c.name}</span><strong>{Math.round((c.value / total) * 100)}%</strong></div>)}</div>
          </div> : <div className="chart-empty">Add expenses to see your category breakdown.</div>}
        </section>
        <section className="panel chart-panel">
          <div className="panel-heading"><div><span className="eyebrow">SIX-MONTH OVERVIEW</span><h2>Monthly spending</h2></div></div>
          {transactions.length ? <div className="area-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthlyData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.32} /><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v} /><Tooltip formatter={(v) => money(v)} contentStyle={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text)" }} /><Area type="monotone" dataKey="amount" stroke="#9B7BFF" strokeWidth={3} fill="url(#spendFill)" /></AreaChart></ResponsiveContainer></div> : <div className="chart-empty">Your monthly trend will appear here once you add expenses.</div>}
        </section>
      </div>
      <section className="panel category-breakdown"><div className="panel-heading"><div><span className="eyebrow">CATEGORY DETAILS</span><h2>Spending breakdown</h2></div></div>
        {categoryData.length ? categoryData.map((c) => <div className="breakdown-row" key={c.name}><div className="breakdown-name"><span className="legend-dot" style={{ background: c.color }} />{c.name}</div><div className="breakdown-track"><span style={{ width: `${total ? (c.value / total) * 100 : 0}%`, background: c.color }} /></div><strong>{money(c.value)}</strong></div>) : <p className="muted-copy">No category data yet.</p>}
      </section>
    </div>
  );
}
