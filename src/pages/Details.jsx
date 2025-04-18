import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // We'll use axios for API call (you can use fetch too)

const Details = () => {
  const { id } = useParams(); // Patient ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null);     // For error handling
 const { patientId } = useParams();
  console.log("pateoinet",patientId)
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/getPatientByID/${patientId}`);
        setPatient(response.data);
      } catch (err) {
        setError("Failed to fetch patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading patient details...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!patient) {
    return (
      <div className="p-6 text-center text-gray-500">Patient not found.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Patient Details</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
        <p><strong>Patient ID:</strong> {patient.patientid}</p>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>DOB:</strong> {patient.dob || "N/A"}</p>
        <p><strong>Email:</strong> {patient.email || "N/A"}</p>
        <p><strong>Mobile Number:</strong> {patient.mobilenumber}</p>
        <p><strong>Family Code:</strong> {patient.familycode}</p>
        <p><strong>VIP Status:</strong> {patient.vipstatus ? "Yes" : "No"}</p>
        <p><strong>Referred By:</strong> {patient.referredby || "N/A"}</p>
        <p><strong>Address:</strong> {patient.address || "N/A"}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to List
      </button>
    </div>
  );
};

export default Details;
