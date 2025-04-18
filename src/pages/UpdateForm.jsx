import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = ({ patientData, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        familyCode: '',
        mobileNumber: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (patientData) {
            setFormData({
                name: patientData.name || '',
                gender: patientData.gender || '',
                familyCode: patientData.familyCode || '',
                mobileNumber: patientData.MobileNumber || '',
            });
        }
    }, [patientData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update patient details via API
            await axios.put(`http://localhost:8081/myapp/updatePatient/${patientData.id}`, formData);
            alert('Patient updated successfully!');
            onClose();
        } catch (error) {
            console.error('Error updating patient:', error);
            setError('Failed to update patient details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-500">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Edit Patient Details</h3>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="familyCode" className="block text-sm font-medium text-gray-600">Family Code</label>
                        <input
                            type="text"
                            id="familyCode"
                            name="familyCode"
                            value={formData.familyCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-600">Mobile Number</label>
                        <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`${
                                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                            } text-white px-6 py-2 rounded-lg`}
                        >
                            {loading ? 'Updating...' : 'Update Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
