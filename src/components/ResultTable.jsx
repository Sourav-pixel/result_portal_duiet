import React from "react";

const ResultTable = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">No results found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
            <th className="px-6 py-3 text-left">Roll No</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Marks (30)</th>
            <th className="px-6 py-3 text-left">Marks (70)</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-left">Grade</th>
            <th className="px-6 py-3 text-left">Credits</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-6 py-4 text-gray-700">{result.rollNo}</td>
              <td className="px-6 py-4 text-gray-700">{result.name}</td>
              <td className="px-6 py-4 text-gray-700">{result.marksOutOf30}</td>
              <td className="px-6 py-4 text-gray-700">{result.marksOutOf70}</td>
              <td className="px-6 py-4 text-gray-700">{result.totalMarks}</td>
              <td className="px-6 py-4 text-gray-700">{result.grade}</td>
              <td className="px-6 py-4 text-gray-700">{result.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
