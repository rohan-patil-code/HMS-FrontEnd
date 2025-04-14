import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = ({ patientId, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        address: "",
        MobileNumber: "",
        email: ""
    });

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/myapp/updatePatient/${patientId}`);
                setFormData(response.data); // Auto-fill with fetched data
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        if (patientId) {
            fetchPatientDetails();
        }
    }, [patientId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/myapp/updatePatient/${patientId}`, formData);
            alert("Patient updated successfully!");
            onClose(); // Close the form after update
        } catch (error) {
            console.error("Error updating patient:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Update Patient Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Name" />
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Date of Birth" />
                    <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Gender" />
                    <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Marital Status" />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Address" />
                    <input type="text" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Mobile Number" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Email" />
                    
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
