import { useState } from "react";
import { Pencil, Trash2, Tags, Plus } from "lucide-react";
import { useExpenses } from "../context/ExpenseContext";

export default function CategoryManager() {
  const { categories, setCategories, transactions, setTransactions } = useExpenses();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8B5CF6");

  const add = (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean) return;
    if (categories.some((c) => c.name.toLowerCase() === clean.toLowerCase())) return alert("That category already exists.");
    setCategories((current) => [...current, { name: clean, color }]);
    setName("");
  };

  const edit = (category) => {
    const next = prompt("Rename category:", category.name);
    if (!next?.trim()) return;
    const clean = next.trim();
    if (categories.some((c) => c.name.toLowerCase() === clean.toLowerCase() && c.name !== category.name)) return alert("That category already exists.");
    setCategories((current) => current.map((c) => c.name === category.name ? { ...c, name: clean } : c));
    setTransactions((current) => current.map((t) => t.category === category.name ? { ...t, category: clean } : t));
  };

  const remove = (category) => {
    if (transactions.some((t) => t.category === category.name)) return alert("This category is in use. Reassign or delete its transactions first.");
    if (confirm(`Delete ${category.name}?`)) setCategories((current) => current.filter((c) => c.name !== category.name));
  };

  return <div className="page-stack">
    <section className="panel category-create"><div><span className="eyebrow">MAKE IT YOURS</span><h2>Create a category</h2><p className="muted-copy">Add a label and colour to organise your spending.</p></div>
      <form className="category-form" onSubmit={add}><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Education" maxLength="28" required /><input type="color" value={color} onChange={(e) => setColor(e.target.value)} aria-label="Category colour" /><button className="button button-primary"><Plus size={16} /> Add category</button></form>
    </section>
    <section className="panel"><div className="panel-heading"><div><span className="eyebrow">YOUR ORGANISATION</span><h2>All categories</h2></div><span className="result-count">{categories.length} categories</span></div>
      <div className="category-grid">{categories.map((c) => <article className="category-card" key={c.name}><div className="category-card-top"><div className="category-symbol" style={{ background: `${c.color}20`, color: c.color }}><Tags size={19} /></div><input type="color" value={c.color} onChange={(e) => setCategories((current) => current.map((item) => item.name === c.name ? { ...item, color: e.target.value } : item))} title="Change colour" /></div><h3>{c.name}</h3><p>{transactions.filter((t) => t.category === c.name).length} transactions</p><div className="category-card-actions"><button className="button button-ghost small-button" onClick={() => edit(c)}><Pencil size={14} /> Rename</button><button className="button button-ghost small-button danger-text" onClick={() => remove(c)}><Trash2 size={14} /> Delete</button></div></article>)}</div>
    </section>
  </div>;
}
