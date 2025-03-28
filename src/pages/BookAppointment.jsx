import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookAppointment = ({ patientid: propPatientid }) => {
    const { patientid: urlPatientid } = useParams(); // Get patientid from URL if available
    const navigate = useNavigate();
    const { patientid } = useParams();  // Get patient ID from URL

    const [isVisible, setIsVisible] = useState(false);
    const generateRandomId = () => Math.floor(Math.random() * 85) + 15;
    const [appointmentData, setAppointmentData] = useState({
        appointmentid: generateRandomId(),
        patientid: propPatientid || urlPatientid || "", // Use prop, then URL, fallback to empty
        doctorid: "",
        date: "",
        time: "",
        status: "Pending",
    });

    const doctors = [
        { id: "1", name: "Dr. John Doe" },
        { id: "2", name: "Dr. Jane Smith" },
        { id: "3", name: "Dr. Emily Johnson" },
    ];

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    // Ensure patientid is correctly set if received asynchronously
    useEffect(() => {
        setAppointmentData((prev) => ({
            ...prev,
            patientid: propPatientid || urlPatientid || prev.patientid,
        }));
    }, [propPatientid, urlPatientid]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            navigate(window.history.length > 1 ? -1 : "/patients");
        }, 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const [datePart, timePart] = appointmentData.date.split("T"); // Splitting date and time
        const appointmentTime = parseInt(timePart.split(":")[0], 10); // Extract hour
    
        let session = "";
        if (appointmentTime >= 10 && appointmentTime < 16) {
            session = "Morning Session";
        } else if (appointmentTime >= 16 && appointmentTime <= 21) {
            session = "Evening Session";
        } else {
            alert("⚠️ Appointments are only available between 10 AM - 9 PM!");
            return;
        }
    
        const finalData = {
            ...appointmentData,
            date: datePart, // Keep date in YYYY-MM-DD format
            time: timePart + ":00", // Ensure time format HH:mm:ss
            session: session, // Add session field
        };
    
        console.log("Final Appointment Data:", finalData);
    
        try {
            const response = await fetch("http://localhost:8081/myapp/bookAppointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });
    
            const message = await response.text(); // Get response message
    
            if (response.status === 409) {
                alert("⚠️ " + message); // Show error if appointment already exists
            } else if (response.status === 201) {
                alert("✅ " + message); // Show success message
                handleClose();
            } else {
                alert("❌ Failed to book appointment!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Something went wrong!");
        }
    };
    
    return (
        <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 transform ${isVisible ? "scale-105" : "scale-95"}`}>
                <h3 className="text-lg font-semibold mb-4">Book Appointment for Patient ID: {appointmentData.patientid}</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded"
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                        required
                    />

                    <select
                        className="w-full p-2 border rounded"
                        value={appointmentData.doctorid}
                        onChange={(e) => setAppointmentData({ ...appointmentData, doctorid: e.target.value })}
                        required
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>{doc.name}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-100"
                        value={appointmentData.status}
                        readOnly
                    />

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
