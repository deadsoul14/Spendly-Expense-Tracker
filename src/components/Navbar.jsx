import { Menu, Moon, Sun, Download, Plus } from "lucide-react";
import { exportCSV } from "../utils/exportCSV";
import { useExpenses } from "../context/ExpenseContext";

const titles = {
  dashboard: ["Good to see you", "Here’s what’s happening with your money today."],
  transactions: ["Transactions", "All your expenses, organised in one place."],
  analytics: ["Analytics", "Understand your habits and spending patterns."],
  categories: ["Categories", "Organise expenses your way."],
  settings: ["Settings", "Make Spendly work the way you like."],
};

export default function Navbar({ active, onAdd, onMenu }) {
  const { theme, setTheme, transactions, categories } = useExpenses();
  const [title, subtitle] = titles[active] || titles.dashboard;

  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button>
      <div className="page-heading">
        <div className="eyebrow">YOUR FINANCIAL SPACE</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="top-actions">
        <button className="icon-button theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="button button-ghost export-top" onClick={() => exportCSV(transactions, categories)}><Download size={16} /> <span>Export</span></button>
        <button className="button button-primary" onClick={onAdd}><Plus size={17} /> <span>Add expense</span></button>
      </div>
    </header>
  );
}
