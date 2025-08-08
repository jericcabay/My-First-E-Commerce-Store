import { useEffect, useState } from "react";
import { staffApi } from "../api/staffApi.js";

function StaffListView() {
  const { SearchName, RegisterStaff } = staffApi();
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (search.trim() === "") {
        setCustomers([]);
        return;
      }

      const result = await SearchName(search);
      setCustomers(result);
    };

    fetchSearchResult();
  }, [search]);

  const handleRegister = async () => {
    if (!selectedUser || !selectedRole || !selectedBranch) {
      alert("Please complete all fields");
      return;
    }

    try {
      const payload = {
        userId: selectedUser._id,
        name: selectedUser.name,
        role: selectedRole.toLowerCase(),
        branch: selectedBranch,
      };

      await RegisterStaff(payload);

      setSearch("");
      setSelectedUser(null);
      setSelectedRole("");
      setSelectedBranch("");

      alert("User successfully registered!");
    } catch (error) {
      console.error("Register error", error);
      alert(error.message || "Registration failed");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Register Staff or Admin
        </h1>

        {/* Search & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select Role</option>
            <option>Staff</option>
            <option>Admin</option>
          </select>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select Branch</option>
            <option>Branch 1</option>
            <option>Branch 2</option>
            <option>Branch 3</option>
          </select>

          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </div>

        {/* Search Suggestions */}
        {search.trim() !== "" && (
          <div className="bg-white border rounded-md shadow-sm mt-2 max-w-md mx-auto">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <button
                  key={customer._id}
                  onClick={() => {
                    setSearch(customer.name);
                    setSelectedUser(customer);
                    setCustomers([]);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50"
                >
                  {customer.name}
                </button>
              ))
            ) : (
              <div className="text-center text-gray-500 p-2">No results found</div>
            )}
          </div>
        )}
      </div>

      {/* Tables */}
      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        {/* Admin Table */}
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-center text-blue-800">Admin / Owner</h2>
          <table className="min-w-full text-sm text-gray-800">
            <thead>
              <tr className="bg-blue-50 border-b text-gray-700">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Branch</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">Alice</td>
                <td className="px-4 py-2">Admin</td>
                <td className="px-4 py-2">2025-07-19</td>
                <td className="px-4 py-2">Manila</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Staff Table */}
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-center text-blue-800">Staff</h2>
          <table className="min-w-full text-sm text-gray-800">
            <thead>
              <tr className="bg-blue-50 border-b text-gray-700">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Branch</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">Bob</td>
                <td className="px-4 py-2">Staff</td>
                <td className="px-4 py-2">2025-07-18</td>
                <td className="px-4 py-2">Cebu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffListView;
