import React, { useEffect, useState } from 'react';
import './select.css';

const Select = () => {
  const [tablesData, setTablesData] = useState({});
  const tables = [
    'matchingCars',
    'wishlistPrices',
    'wishlistSamsung',
    'champsBotWins',
    'highDamageKBBQ',
    'carsToyotaBMW',
    'jungleChampWins',
    'royalOakRestaurants',
    'hyundaiCars',
    'traveledVacations'
  ];

  useEffect(() => {
    // 1. First create the tables on the server
    fetch('http://localhost:8081/create-tables')
      .then(res => res.json())
      .then(() => {
        // 2. Then fetch all tables
        tables.forEach((table) => {
          fetch(`http://localhost:8081/table/${table}`)
            .then(res => res.json())
            .then(data => {
              // Convert strings to lowercase
              const lowercased = data.map(row => {
                const newRow = {};
                for (let key in row) {
                  newRow[key] = typeof row[key] === 'string' ? row[key].toLowerCase() : row[key];
                }
                return newRow;
              });

              setTablesData(prev => ({ ...prev, [table]: lowercased }));
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Query Results</h2>
      {tables.map((table) => (
        <div key={table}>
          <h3>{table}</h3>
          {tablesData[table] && tablesData[table].length > 0 ? (
            <table className="table-container">
              <thead>
                <tr>
                  {Object.keys(tablesData[table][0]).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tablesData[table].map((row, i) => (
                  <tr key={i}>
                    {Object.keys(row).map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Select;


