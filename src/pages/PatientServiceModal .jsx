import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientServiceModal = ({ closeModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleBookAppointment = () => {
    closeModal();
    navigate("/book-appointment");
  };

  const handleRegisterPatient = () => {
    closeModal();
    navigate("/register-patient");
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } z-50`}
      onClick={closeModal}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-2xl w-96 transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-center">Patient Service</h2>

        {/* <button
          className="flex items-center justify-center w-full p-3 mb-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button> */}

        <button
          className="flex items-center justify-center w-full p-3 mb-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
          onClick={handleRegisterPatient}
        >
          Register Patient
        </button>

        <button
          className="mt-4 w-full p-3 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientServiceModal;
