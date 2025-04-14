import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaCalendarAlt, FaUserMd, FaChartBar, FaCube, FaUserPlus } from "react-icons/fa";

const menuItems = [
  { path: "/", label: "Dashboard", icon: <FaCube /> },
  { path: "/appointments", label: "Appointments", icon: <FaCalendarAlt /> },
  { path: "/patients", label: "Patients", icon: <FaUserMd /> },
  { path: "/reports", label: "Reports", icon: <FaChartBar /> },
];

const Sidebar = ({ setShowPatientService }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  useEffect(() => {
    let timer;
    if (isExpanded) {
      timer = setTimeout(() => setIsExpanded(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [isExpanded]);

  return (
    <div className="bg-blue-900">
 <div className="relative">
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute left-${isExpanded ? "56" : "14"} top-5 left-5  bg-blue-700 text-white p-2 rounded-full transition duration-300 hover:bg-blue-800`}
      >
        {isExpanded ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-900 pt-10 text-white h-screen p-5 transition-all duration-500 ease-in-out ${
          isExpanded ? "w-65" : "w-19" 
        }`}
      >
        <ul className="mt-10 space-y-5">
          {menuItems.map(({ path, label, icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className="group flex items-center space-x-4 p-2 rounded transition duration-200 hover:bg-blue-700"
                activeClassName="bg-blue-700"
              >
                <span className="text-lg">{icon}</span>
                <span className={`transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}>
                  {label}
                </span>
              </NavLink>
            </li>
          ))}

          {/* Patient Service Button (Opens Modal Instead of Navigating) */}
          <li>
            <button
              onClick={() => setShowPatientService(true)}
              className="flex items-center space-x-3 p-2 rounded w-full text-left transition duration-200 hover:bg-blue-700"
            >
              <span className="text-lg"><FaUserPlus /></span>
              <span className={`transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}>
                Patient Service
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>


    </div>
   
  );
};

export default Sidebar;
