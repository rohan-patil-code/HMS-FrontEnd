import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Reports from "./pages/Reports";
import { Suspense, lazy } from "react";
import PatientServiceModal from "./pages/PatientServiceModal ";
import BookAppointment from "./pages/BookAppointment";
import PatientRegistration from "./pages/PatientRegistration";
import RegistrationResponse from "./pages/RegistraionResponse";
// Lazy loading for better performance
const LazyDashBoard= lazy(()=> import("./pages/DashBoard"));
const LazyAppointments = lazy(() => import("./pages/Appointments"));
const LazyPatients = lazy(() => import("./pages/Patients"));
const LazyReports = lazy(() => import("./pages/Reports"));
const LazyPatientServiceModel=lazy(()=>import("./pages/PatientServiceModal "));
const LazyBookApointment=lazy(()=>import("./pages/BookAppointment"));
const LazyPatientRegister=lazy(()=>import("./pages/PatientRegistration"));
const LazyRegistrationResponse=lazy(()=>import("./pages/RegistraionResponse"));


function App() {
  return (
    <Router>
      <DashboardLayout>
        <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LazyDashBoard/>}/>
            <Route path="/appointments" element={<LazyAppointments />} />
            <Route path="/patients" element={<LazyPatients />} />
            <Route path="/reports" element={<LazyReports />} />
            <Route path="/patient-service" element={<LazyPatientServiceModel />} />
            <Route path="/book-appointment/:patientid" element={<LazyBookApointment />} />
            <Route path="/register-patient" element={<LazyPatientRegister />} />
            <Route path="/registration-success" element={<LazyRegistrationResponse />} />
          </Routes>
        </Suspense>
      </DashboardLayout>
    </Router>
  );
}

export default App;
