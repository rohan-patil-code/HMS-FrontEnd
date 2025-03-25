import { useCallback } from "react";

const Header = () => {
  const handleLogout = useCallback(() => {
    console.log("User logged out"); // Replace with actual logout logic
  }, []);

  return (
    <div className="bg-white p-4 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={handleLogout}
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
