import { useState } from "react";

const Table = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c}
              className="border p-2 cursor-pointer"
              onClick={() => handleSort(c)}
            >
              {c} {sortConfig.key === c ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c} className="border p-2">{row[c]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;