import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegistrationResponse() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the message and patient details from navigation state
  const message = location.state?.message || "Patient Registered Successfully!";
  const patientinfo = location.state?.patientData  || null;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleClose = () => {
    navigate("/"); // Redirect to home or any other page
  };

  const handleBookAppointment = () => {
    navigate("/book-appointment", { state: {patientData: patientinfo, patient: patientinfo } });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } z-50`}
      onClick={handleClose}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-2xl w-[400px] transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Success Message */}
        <h2 className="text-lg font-bold text-center text-green-600 mb-2">
          {message}
        </h2>

        {/* ✅ Display Patient Details */}
        {patientinfo && (
          <div className="bg-gray-100 p-4 rounded-lg text-sm">
            <p><strong>Patient ID:</strong> {patientinfo.patientid}</p>
            <p><strong>Name:</strong> {patientinfo.name}</p>
            <p><strong>Gender:</strong> {patientinfo.gender}</p>
            <p><strong>DOB:</strong> {patientinfo.dob}</p>
            <p><strong>Marital Status:</strong> {patientinfo.maritalstatus}</p>
            <p><strong>Address:</strong> {patientinfo.address}</p>
            <p><strong>Email:</strong> {patientinfo.email}</p>
            <p><strong>Mobile Number:</strong> {patientinfo.MobileNumber}</p>
            <p><strong>WhatsApp Number:</strong> {patientinfo.WPNumber}</p>
            <p><strong>Family Code:</strong> {patientinfo.familycode}</p>
            <p><strong>VIP Status:</strong> {patientinfo.vipstatus ? "Yes" : "No"}</p>
            <p><strong>Referred By:</strong> {patientinfo.referredby}</p>
          </div>
        )}

        {/* ✅ Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="w-[48%] p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
          <button
            className="w-[48%] p-3 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
