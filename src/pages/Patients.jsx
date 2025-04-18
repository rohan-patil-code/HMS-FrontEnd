import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import axios from "axios";
import { debounce } from 'lodash';  // Using lodash for debounce

const Patients = memo(() => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [selectedPatientData, setSelectedPatientData] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const navigate = useNavigate();
    const patientsPerPage = 10;
    const API_BASE_URL = "http://localhost:8081/myapp";

    // Debounced search input handler
    const handleSearchQueryChange = useCallback(
        debounce((query) => setSearchQuery(query), 300), []
    );

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                const url = searchQuery
                    ? `${API_BASE_URL}/searchpatientsByName/${searchQuery}`
                    : `${API_BASE_URL}/getAllPatients`;

                const response = await axios.get(url);
                const mappedPatients = response.data.map(patient => ({
                    id: patient.patientid || "N/A",
                    name: patient.name || patient.fullName || "Unknown",
                    gender: patient.gender || "N/A",
                    familyCode: patient.familycode || "N/A",
                    MobileNumber: patient.mobilenumber || "N/A"
                }));

                setPatients(mappedPatients);
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [searchQuery]);

    const currentPatients = useMemo(() => {
        const startIndex = (currentPage - 1) * patientsPerPage;
        return patients.slice(startIndex, startIndex + patientsPerPage);
    }, [patients, currentPage]);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(patients.length / patientsPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                await axios.delete(`${API_BASE_URL}/deletePatient/${id}`);
                setPatients(prev => prev.filter(patient => patient.id !== id));
                if (selectedPatientId === id) {
                    setSelectedPatientId(null);
                    setShowButtons(false);
                }
            } catch (error) {
                console.error("Error deleting patient:", error);
            }
        }
    };

    const handleRowClick = (id) => {
        setSelectedPatientId(prevId => (prevId === id ? null : id));
        setShowButtons(false);

        if (selectedPatientId !== id) {
            setTimeout(() => {
                setShowButtons(true);
            }, 300);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/updatePatient/${id}`);
            setSelectedPatientData(response.data);
            setShowUpdateForm(true);
        } catch (error) {
            console.error("Error fetching patient details:", error);
        }
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg mx-auto w-full transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Patients List</h2>

            <input
                type="text"
                placeholder="Search patients..."
                onChange={(e) => handleSearchQueryChange(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />

            {loading ? (
                <p className="text-gray-500">Loading patients...</p>
            ) : currentPatients.length > 0 ? (
                <>
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm">
                                {["Patient ID", "Name", "Gender", "Family Code", "Mobile Number"].map(header => (
                                    <th key={header} className="px-4 py-3">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.map(({ id, name, gender, familyCode, MobileNumber }) => (
                                <React.Fragment key={id}>
                                    <tr 
                                        className={`cursor-pointer transition-all duration-500 relative ${selectedPatientId === id ? "translate-x-[-50px] opacity-50" : "hover:bg-gray-50"}`}
                                        onClick={() => handleRowClick(id)}
                                    >
                                        {[id, name, gender, familyCode, MobileNumber].map((value, index) => (
                                            <td key={index} className="px-4 py-3 border-b">{value}</td>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-6">
                        <button 
                            onClick={prevPage} 
                            disabled={currentPage === 1} 
                            className={`px-4 py-2 rounded-lg transition-all ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-600">Page {currentPage} of {Math.ceil(patients.length / patientsPerPage)}</span>
                        <button 
                            onClick={nextPage} 
                            disabled={currentPage >= Math.ceil(patients.length / patientsPerPage)} 
                            className={`px-4 py-2 rounded-lg transition-all ${currentPage >= Math.ceil(patients.length / patientsPerPage) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-500">No patients found.</p>
            )}

            {selectedPatientId && showButtons && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-500">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 transform scale-105">
                        <h3 className="text-lg font-semibold mb-4">Actions for Patient ID: {selectedPatientId}</h3>
                        <div className="flex flex-col space-y-3">
                            {/* Action Buttons */}
                            <button 
                                onClick={() => navigate(`/book-appointment/${selectedPatientId}`)} 
                                className="bg-green-500 text-white px-6 py-2 rounded-lg transition-all hover:bg-green-600"
                            >
                                Book Appointment
                            </button>
                            <button 
                                onClick={() => navigate(`/patients/${selectedPatientId}/Details`)} 
                                className="bg-purple-500 text-white px-6 py-2 rounded-lg transition-all hover:bg-purple-600"
                            >
                                Patient Details
                            </button>
                            <button 
                                onClick={() => handleUpdate(selectedPatientId)} 
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg transition-all hover:bg-blue-600"
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => handleDelete(selectedPatientId)} 
                                className="bg-red-500 text-white px-6 py-2 rounded-lg transition-all hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedPatientId(null);
                                setShowButtons(false);
                            }}
                            className="mt-4 text-gray-500 hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showUpdateForm && (
                <UpdateForm patientId={selectedPatientId} patientData={selectedPatientData} />
            )}
        </div>
    );
});

export default Patients;
