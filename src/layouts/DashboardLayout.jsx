import { useState } from "react";
import Sidebar from "../components/Sidebar";
import PatientServiceModal from "../pages/PatientServiceModal ";

const DashboardLayout = ({ children }) => {
  const [showPatientService, setShowPatientService] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar setShowPatientService={setShowPatientService} />

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>

      {/* Patient Service Modal */}
      {showPatientService && (
        <PatientServiceModal closeModal={() => setShowPatientService(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
