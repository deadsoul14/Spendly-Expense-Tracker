import { Moon, Sun, Download, Database, ShieldCheck } from "lucide-react";
import { useExpenses } from "../context/ExpenseContext";
import { exportCSV } from "../utils/exportCSV";

export default function Settings() {
  const { theme, setTheme, transactions, categories, setTransactions } = useExpenses();
  return <div className="page-stack settings-page">
    <section className="panel setting-row"><div className="setting-icon"><Sun size={20} /></div><div className="setting-copy"><h3>Appearance</h3><p>Choose the look that feels right for you.</p></div><div className="segmented"><button className={theme === "light" ? "selected" : ""} onClick={() => setTheme("light")}><Sun size={15} /> Light</button><button className={theme === "dark" ? "selected" : ""} onClick={() => setTheme("dark")}><Moon size={15} /> Dark</button></div></section>
    <section className="panel setting-row"><div className="setting-icon"><Download size={20} /></div><div className="setting-copy"><h3>Export your data</h3><p>Download all your transactions as a spreadsheet-friendly CSV file.</p></div><button className="button button-ghost" onClick={() => exportCSV(transactions, categories)}><Download size={16} /> Export CSV</button></section>
    <section className="panel setting-row"><div className="setting-icon"><Database size={20} /></div><div className="setting-copy"><h3>Local data storage</h3><p>Your data is stored in this browser on this device. It is not uploaded to a server.</p><span className="storage-count">{transactions.length} transactions · {categories.length} categories</span></div><ShieldCheck className="secure-icon" size={22} /></section>
    <section className="panel danger-zone"><div><h3>Clear transaction history</h3><p>This permanently removes all expenses saved in this browser.</p></div><button className="button button-danger" onClick={() => { if (confirm("Permanently delete all transactions? This cannot be undone.")) setTransactions([]); }}>Clear all expenses</button></section>
  </div>;
}
