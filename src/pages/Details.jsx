import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Reuse the same dummy data
const dummyPatients = [
    {
        patientid: "101",
        name: "Rohan Mehta",
        gender: "Male",
        familycode: "FAM001",
        mobilenumber: "9876543210"
    },
    {
        patientid: "102",
        name: "Sneha Kulkarni",
        gender: "Female",
        familycode: "FAM002",
        mobilenumber: "9123456789"
    },
    {
        patientid: "103",
        name: "Aarav Sharma",
        gender: "Male",
        familycode: "FAM003",
        mobilenumber: "9988776655"
    },
    {
        patientid: "104",
        name: "Anaya Patil",
        gender: "Female",
        familycode: "FAM004",
        mobilenumber: "9834567890"
    },
    {
        patientid: "105",
        name: "Yash Verma",
        gender: "Male",
        familycode: "FAM005",
        mobilenumber: "9001234567"
    }
  // Add more patients if needed
];

const Details = () => {
  const { id } = useParams(); // Patient ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const foundPatient = dummyPatients.find(p => p.patientid === id);
    setPatient(foundPatient);
  }, [id]);

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
        <p><strong>DOB:</strong> {patient.dob}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Mobile Number:</strong> {patient.mobilenumber}</p>
        <p><strong>Family Code:</strong> {patient.familycode}</p>
        <p><strong>VIP Status:</strong> {patient.vipstatus ? "Yes" : "No"}</p>
        <p><strong>Referred By:</strong> {patient.referredby}</p>
        <p><strong>Address:</strong> {patient.address}</p>
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
