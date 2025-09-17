import React, { useState, useEffect } from "react";
import "./tables.css";

export default function DynamicTables() {
  const [tableName, setTableName] = useState("");    // selected table
  const [data, setData] = useState([]);             // fetched rows
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // List of available tables (must match server allowedTables keys)
  const tables = [
    "2025mostplayedchamps",
    "advancedanalyticscourseoptions",
    "coolcars",
    "leaguechampions",
    "myrestaurants",
    "stickshifts",
    "storeprices",
    "students",
    "traveled",
    "wifesrestaurants",
    "wishlist"
  ];

  // Fetch data whenever tableName changes
  useEffect(() => {
    if (!tableName) return; // skip initial render
    setLoading(true);
    setError("");

    fetch(`http://localhost:8081/table/${tableName}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${tableName}`);
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [tableName]);

  // Get columns dynamically
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <h2>Dynamic Table Viewer</h2>

      {/* Dropdown to select table */}
      <select
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      >
        <option value="">-- Select a Table --</option>
        {tables.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Render table */}
      {data.length > 0 && !loading && !error && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.id || i}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]?.toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
