import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaUserMd, FaChartBar, FaCube, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { path: "/", label: "Dashboard", icon: <FaCube /> },
  { path: "/appointments", label: "Appointments", icon: <FaCalendarAlt /> },
  { path: "/patients", label: "Patients", icon: <FaUserMd /> },
  { path: "/reports", label: "Reports", icon: <FaChartBar /> },
];

const Sidebar = ({ setShowPatientService, handleLogout }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle mouse enter and leave events for expansion
  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  return (
    <div
      className="bg-gradient-to-b from-gray-800 to-gray-900 "
      onMouseEnter={handleMouseEnter}  // Expand sidebar on hover
      onMouseLeave={handleMouseLeave}  // Collapse sidebar when mouse leaves
    >
      <div className="relative h-screen">
        {/* Sidebar */}
        <div
          className={`bg-gradient-to-b from-gray-800 to-gray-900 pt-10 text-white h-full p-5 transition-all duration-500 ease-in-out ${
            isExpanded ? "w-60" : "w-20"
          }`}
        >
          {/* HMS Name and Username */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-white">HMS</h1>
            <p className="text-sm text-gray-400">Dr. Johnny</p>  {/* Display logged-in username */}
          </div>

          {/* Menu Items */}
          <ul className="space-y-6">
            {menuItems.map(({ path, label, icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className="group flex items-center space-x-4 p-2 rounded transition duration-200 w-full cursor-pointer"
                  activeClassName="bg-transparent"
                >
                  {/* Icon with Glow Effect on Hover */}
                  <span className="text-lg group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_white] transition-all duration-300">
                    {icon}
                  </span>

                  {/* Text with Glow Effect on Hover */}
                  <span
                    className={`transition-all duration-300 ${
                      isExpanded ? "opacity-100" : "opacity-0 hidden"
                    } group-hover:text-white group-hover:text-shadow-[0_0_5px_white]`}
                  >
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}

            {/* Patient Service Button (Opens Modal Instead of Navigating) */}
            <li>
              <button
                onClick={() => setShowPatientService(true)}
                className="group flex items-center space-x-3 p-2 rounded w-full text-left transition duration-200 hover:bg-transparent cursor-pointer"
              >
                <span className="text-lg group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_white] transition-all duration-300">
                  <FaUserPlus />
                </span>
                <span
                  className={`transition-all duration-300 ${
                    isExpanded ? "opacity-100" : "opacity-0 hidden"
                  } group-hover:text-white group-hover:text-shadow-[0_0_5px_white]`}
                >
                  Patient Service
                </span>
              </button>
            </li>
          </ul>
         
          {/* Logout Button */}
          <div className="absolute bottom-5 w-full px-3">
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-3 p-2 rounded w-full text-left transition duration-200 hover:bg-transparent cursor-pointer"
            >
              <span className="text-lg group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_white] transition-all duration-300">
                <FaSignOutAlt />
              </span>
              <span
                className={`transition-all duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 hidden"
                } group-hover:text-white group-hover:text-shadow-[0_0_5px_white]`}
              >
                Logout
              </span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
