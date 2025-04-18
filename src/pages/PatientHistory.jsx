import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PatientHistory = () => {
  const { id } = useParams();
  const [patientHistory, setPatientHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Dummy data simulation
    const dummyData = {
      patientId: id,
      name: "John Doe",
      lastVisit: "2024-12-10",
      hypersensitive: "Yes",
      allergy: "Penicillin",
      symptomsHistory: [
        { date: "2024-12-10", symptoms: ["Fever", "Cough"] },
        { date: "2024-10-22", symptoms: ["Headache"] },
      ],
      medicineHistory: [
        { date: "2024-12-10", medicines: ["Paracetamol", "Cough Syrup"] },
        { date: "2024-10-22", medicines: ["Ibuprofen"] },
      ],
    };

    // Simulate fetch delay
    setTimeout(() => {
      setPatientHistory(dummyData);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading patient history...</div>;

  return (
    <div className="p-6 bg-white rounded-md shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patient History - #{patientHistory.patientId}</h1>
        <button
          onClick={() => navigate("/appointments")}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Back to Appointments
        </button>
      </div>
      <h2 className="text-lg text-gray-700 mb-4">{patientHistory.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Last Visit</h3>
          <p>{patientHistory.lastVisit}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Hypersensitive</h3>
          <p>{patientHistory.hypersensitive}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Allergy</h3>
          <p>{patientHistory.allergy}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Previous Symptoms History</h3>
        {patientHistory.symptomsHistory.map((record, index) => (
          <div key={index} className="mb-3 p-3 bg-yellow-50 rounded shadow-sm">
            <p className="text-sm text-gray-600">Date: {record.date}</p>
            <ul className="list-disc list-inside text-gray-800">
              {record.symptoms.map((symptom, i) => (
                <li key={i}>{symptom}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Previous Medicine History</h3>
        {patientHistory.medicineHistory.map((record, index) => (
          <div key={index} className="mb-3 p-3 bg-green-50 rounded shadow-sm">
            <p className="text-sm text-gray-600">Date: {record.date}</p>
            <ul className="list-disc list-inside text-gray-800">
              {record.medicines.map((medicine, i) => (
                <li key={i}>{medicine}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
