import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ExpenseContext = createContext(null);

export const starterCategories = [
  { name: "Food", color: "#F59E0B" },
  { name: "Transport", color: "#38BDF8" },
  { name: "Bills", color: "#A78BFA" },
  { name: "Shopping", color: "#F472B6" },
  { name: "Entertainment", color: "#34D399" },
  { name: "Health", color: "#FB7185" },
  { name: "Other", color: "#94A3B8" },
];

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage("expenses", []);
  const [categories, setCategories] = useLocalStorage("categories", starterCategories);
  const [theme, setTheme] = useLocalStorage("spendly-theme", "dark");

  const value = useMemo(
    () => ({ transactions, setTransactions, categories, setCategories, theme, setTheme }),
    [transactions, categories, theme]
  );

  return (
    <ExpenseContext.Provider value={value}>
      <div className={`app-shell theme-${theme}`}>{children}</div>
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used inside ExpenseProvider");
  return context;
}
