export function exportCSV(transactions, categories) {
  const rows = [
    ["Date", "Category", "Amount (INR)", "Note"],
    ...transactions.map((item) => [
      item.date,
      item.category,
      item.amount,
      item.note || "",
    ]),
  ];

  const csv = rows
    .map((row) =>
      row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `spendly-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
