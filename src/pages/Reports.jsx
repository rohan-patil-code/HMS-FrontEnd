import { memo, useEffect, useState } from "react";

const Reports = memo(() => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call (Replace with actual API fetch)
    setTimeout(() => {
      setReports(["Monthly Report - March 2025", "Annual Report - 2024"]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-white p-6 shadow rounded" role="region" aria-labelledby="reports-title">
      <h2 id="reports-title" className="text-xl font-semibold mb-4">
        Reports
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading reports...</p>
      ) : reports.length > 0 ? (
        <ul className="list-disc pl-5">
          {reports.map((report, index) => (
            <li key={index} className="text-gray-800">
              {report}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reports available.</p>
      )}
    </div>
  );
});

export default Reports;
