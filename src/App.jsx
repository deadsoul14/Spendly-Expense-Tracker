import { useState } from "react";
import { ExpenseProvider, useExpenses } from "./context/ExpenseContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import Analytics from "./components/Analytics";
import CategoryManager from "./components/CategoryManager";
import Settings from "./components/Settings";
import ExpenseModal from "./components/ExpenseModal";
import { exportCSV } from "./utils/exportCSV";

function AppContent() {
  const [active, setActive] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { transactions, setTransactions, categories } = useExpenses();

  const add = () => { setEditing(null); setModalOpen(true); };
  const edit = (item) => { setEditing(item); setModalOpen(true); };
  const save = (data) => {
    if (editing) {
      setTransactions((current) => current.map((t) => t.id === editing.id ? { ...t, ...data } : t));
    } else {
      setTransactions((current) => [{ ...data, id: crypto.randomUUID() }, ...current]);
    }
    setModalOpen(false);
    setEditing(null);
  };
  const remove = (id) => {
    if (confirm("Delete this transaction?")) setTransactions((current) => current.filter((t) => t.id !== id));
  };

  const renderPage = () => {
    if (active === "transactions") return <TransactionList transactions={transactions} categories={categories} onEdit={edit} onDelete={remove} />;
    if (active === "analytics") return <Analytics />;
    if (active === "categories") return <CategoryManager />;
    if (active === "settings") return <Settings />;
    return <Dashboard onEdit={edit} onDelete={remove} onAdd={add} />;
  };

  return <>
    <Sidebar active={active} onNavigate={setActive} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <main className="main-content">
      <Navbar active={active} onAdd={add} onMenu={() => setSidebarOpen(true)} />
      <div className="content-area">{renderPage()}</div>
      <footer className="app-footer"><span>© {new Date().getFullYear()} Spendly</span><span>Made for mindful money habits <b>✦</b></span></footer>
    </main>
    <ExpenseModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={save} categories={categories} editing={editing} />
  </>;
}

export default function App() {
  return <ExpenseProvider><AppContent /></ExpenseProvider>;
}
