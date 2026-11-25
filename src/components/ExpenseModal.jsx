import { useEffect, useState } from "react";
import { X } from "lucide-react";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function ExpenseModal({ open, onClose, onSave, categories, editing }) {
  const [form, setForm] = useState({ amount: "", category: "", date: today(), note: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(editing ? {
        amount: String(editing.amount),
        category: editing.category,
        date: editing.date,
        note: editing.note || "",
      } : { amount: "", category: categories[0]?.name || "", date: today(), note: "" });
      setError("");
    }
  }, [open, editing, categories]);

  if (!open) return null;

  const update = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0) return setError("Enter an amount greater than zero.");
    if (!form.category) return setError("Choose a category.");
    if (!form.date) return setError("Choose a date.");
    if (form.note.length > 120) return setError("Note must be 120 characters or fewer.");
    onSave({ ...form, amount: Number(form.amount), note: form.note.trim() });
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="expense-modal-title">
        <div className="modal-heading"><div><span className="eyebrow">TRANSACTION DETAILS</span><h2 id="expense-modal-title">{editing ? "Edit expense" : "Add an expense"}</h2><p>Keep track of where your money goes.</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div>
        <form onSubmit={submit} className="expense-form">
          <label>Amount <span className="input-prefix">₹</span><input autoFocus name="amount" type="number" min="0.01" step="0.01" placeholder="0.00" value={form.amount} onChange={update} required /></label>
          <div className="form-two">
            <label>Category<select name="category" value={form.category} onChange={update} required>{categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}</select></label>
            <label>Date<input name="date" type="date" value={form.date} onChange={update} required /></label>
          </div>
          <label>Note <span className="optional">OPTIONAL</span><textarea name="note" rows="3" maxLength="120" placeholder="What was this expense for?" value={form.note} onChange={update} /></label>
          <div className="note-count">{form.note.length}/120 characters</div>
          {error && <div className="form-error">{error}</div>}
          <div className="modal-actions"><button type="button" className="button button-ghost" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{editing ? "Save changes" : "Save expense"}</button></div>
        </form>
      </section>
    </div>
  );
}
