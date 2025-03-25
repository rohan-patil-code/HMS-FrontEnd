import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookAppointment = ({ patientId }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        dateTime: "",
        doctorId: "",
        reason: "",
        consultationFee: "",
        paymentMode: "",
    });

    const doctors = [
        { id: "1", name: "Dr. John Doe" },
        { id: "2", name: "Dr. Jane Smith" },
        { id: "3", name: "Dr. Emily Johnson" },
    ];

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Appointment Data:", appointmentData);
        alert("Appointment booked successfully!");
        handleClose();
    };

    const navigate = useNavigate();

const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
        if (window.history.length > 1) {
            navigate(-1);  // Go back if history exists
        } else {
            navigate("/patients");  // Redirect to a safe page
        }
    }, 300);
};

    return (
        <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 transform ${isVisible ? "scale-105" : "scale-95"}`}>
                <h3 className="text-lg font-semibold mb-4">Book Appointment for Patient ID: {patientId}</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setAppointmentData({ ...appointmentData, dateTime: e.target.value })}
                        required
                    />

                    <select
                        className="w-full p-2 border rounded"
                        onChange={(e) => setAppointmentData({ ...appointmentData, doctorId: e.target.value })}
                        required
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>{doc.name}</option>
                        ))}
                    </select>

                    <textarea
                        placeholder="Reason"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setAppointmentData({ ...appointmentData, reason: e.target.value })}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Consultation Fee"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setAppointmentData({ ...appointmentData, consultationFee: e.target.value })}
                        required
                    />

                    <select
                        className="w-full p-2 border rounded"
                        onChange={(e) => setAppointmentData({ ...appointmentData, paymentMode: e.target.value })}
                        required
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="Online">Online</option>
                    </select>

                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700">
                        Book Appointment
                    </button>
                </form>

                <button onClick={handleClose} className="mt-4 text-gray-500 hover:underline">
                    Close
                </button>
            </div>
        </div>
    );
};

export default BookAppointment;
