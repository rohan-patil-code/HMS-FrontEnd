import React, { useState, useEffect } from "react";
import { FaCheck, FaClock, FaTimes, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const appointmentsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://192.168.25.139:8081/myapp/TodaysAPT");
        const data = await response.json();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateStatus = async (patientId, newStatus) => {
    try {
      setUpdatingId(patientId);
      const response = await fetch("http://192.168.25.139:8081/myapp/statusUpdate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientid: patientId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setAppointments((prev) =>
        prev.map((app) =>
          app.patientid === patientId
            ? { ...app, status: newStatus, highlight: newStatus.toLowerCase() }
            : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getRowHighlightClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50";
      case "cancelled":
        return "bg-red-50";
      case "pending":
        return "bg-gray-50";
      default:
        return "";
    }
  };

  const handleRowClick = (id) => {
    setSelectedPatientId(id);
    setShowButtons(true);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading appointments...</div>;
  }
  let dobt=appointments.dob;
  console.log(dobt)
  return (
    <div className="p-4 bg-white rounded-lg shadow relative">
      <h1 className="text-2xl font-bold mb-2">All Appointments</h1>
      <h2 className="text-lg font-semibold text-gray-600 mb-4">
        {appointments.length} Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAppointments.map((appointment) => (
              <tr key={appointment.patientid} className={`transition-colors duration-200 ${getRowHighlightClass(appointment.status)}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{appointment.patientid}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600" onClick={() => handleRowClick(appointment.patientid)}>
                  {appointment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.dob}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                  <button onClick={() => updateStatus(appointment.patientid, "Completed")} disabled={updatingId === appointment.patientid} className="p-1 text-green-600 hover:text-green-800 hover:bg-green-100 rounded disabled:opacity-50">
                    {updatingId === appointment.patientid && appointment.status !== "Completed" ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                  </button>
                  <button onClick={() => updateStatus(appointment.patientid, "Pending")} disabled={updatingId === appointment.patientid} className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded disabled:opacity-50">
                    {updatingId === appointment.patientid && appointment.status !== "Pending" ? <FaSpinner className="animate-spin" /> : <FaClock />}
                  </button>
                  <button onClick={() => updateStatus(appointment.patientid, "Cancelled")} disabled={updatingId === appointment.patientid} className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded disabled:opacity-50">
                    {updatingId === appointment.patientid && appointment.status !== "Cancelled" ? <FaSpinner className="animate-spin" /> : <FaTimes />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstAppointment + 1} to {Math.min(indexOfLastAppointment, appointments.length)} of {appointments.length}
        </div>
        <div className="flex space-x-2">
          <button onClick={goToPrevPage} disabled={currentPage === 1} className={`px-4 py-2 text-sm rounded ${currentPage === 1 ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-gray-100 hover:bg-gray-200"}`}>
            Previous
          </button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`px-4 py-2 text-sm rounded ${currentPage === totalPages ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-gray-100 hover:bg-gray-200"}`}>
            Next
          </button>
        </div>
      </div>

      {selectedPatientId && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-500 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 transform scale-105">
            <h3 className="text-lg font-semibold mb-4">
              Actions for Patient ID: {selectedPatientId}
            </h3>
            <div className="flex flex-col space-y-3">
              <button onClick={() => navigate(`/add-prescription/${selectedPatientId}`)} className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">
                Add Prescription
              </button>
              <button
                onClick={() => {
                  const patient = appointments.find((p) => p.patientid === selectedPatientId);
                  alert(`Fetching previous records for ${patient?.name}`);
                }}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
              >
                View Previous Records
              </button>
            </div>
            <button onClick={() => setSelectedPatientId(null)} className="mt-4 text-gray-500 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
