import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Loader2, AlertCircle, Search } from "lucide-react";

const Home = () => {
  const [resultsBySubject, setResultsBySubject] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hodresult"));
        const fetchedResults = querySnapshot.docs.map((doc) => ({
          subject: doc.id,
          results: doc.data().results || [],
        }));

        const groupedResults = fetchedResults.reduce((acc, result) => {
          acc[result.subject] = result.results;
          return acc;
        }, {});

        setResultsBySubject(groupedResults);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results. Please try again.");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const filteredResults = React.useMemo(() => {
    let results = { ...resultsBySubject };

    if (selectedSubject !== "all") {
      results = {
        [selectedSubject]: resultsBySubject[selectedSubject],
      };
    }

    if (searchQuery) {
      Object.keys(results).forEach((subject) => {
        results[subject] = results[subject].filter(
          (result) =>
            result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.rollNo.toString().includes(searchQuery)
        );
      });
    }

    return results;
  }, [resultsBySubject, searchQuery, selectedSubject]);

  const getGradeBadgeColor = (result) => {
    if (result.marksOutOf70 < 28 || result.marksOutOf30 < 12) {
      return "bg-red-100 text-red-800";
    }
    return "bg-green-100 text-green-800";
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-800">
          <AlertCircle className="h-4 w-4 mr-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Results Portal
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {Object.keys(resultsBySubject).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {Object.entries(filteredResults).map(([subject, results]) => (
          <div
            key={subject}
            className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {subject} Results
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Roll No
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Marks (30)
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Marks (70)
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Grade
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {result.rollNo}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {result.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {result.marksOutOf30}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {result.marksOutOf70}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {result.totalMarks}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeBadgeColor(
                            result
                          )}`}
                        >
                          {result.grade}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {result.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
