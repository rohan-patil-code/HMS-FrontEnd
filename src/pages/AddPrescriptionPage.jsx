// src/pages/AddPrescriptionPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddPrescriptionPage = () => {
  const [medicineList, setMedicineList] = useState([]);
  const [symptomList, setSymptomList] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({
    medicine: "",
    customMedicine: "",
    symptom: "",
    customSymptom: "",
    price: ""
  });
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const { patientId } = useParams();
  console.log("pateoinet",patientId)
  useEffect(() => {
    setMedicineList(["Paracetamol", "Ibuprofen", "Amoxicillin"]);
    setSymptomList(["Fever", "Cough", "Headache"]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addPrescription = () => {
    const selectedMedicine =
      formData.medicine === "other" ? formData.customMedicine : formData.medicine;
    const selectedSymptom =
      formData.symptom === "other" ? formData.customSymptom : formData.symptom;
    const price = formData.price;

    if (!selectedMedicine || !selectedSymptom || !price) {
      alert("Please fill in all required fields before adding.");
      return;
    }

    const newPrescription = {
      medicine: selectedMedicine,
      symptom: selectedSymptom,
      price: parseFloat(price)
    };

    setPrescriptions((prev) => [...prev, newPrescription]);

    // Reset form
    setFormData({
      medicine: "",
      customMedicine: "",
      symptom: "",
      customSymptom: "",
      price: ""
    });
  };

  const totalBill = prescriptions.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const discountedTotal = totalBill - (totalBill * discount) / 100;

  const submitBill = async () => {
    try {
      const response = await fetch("http://192.168.25.139:8081/myapp/statusUpdate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientid: patientId, status: "completed" }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
  
      Swal.fire({
        title: "Success!",
        text: "Prescription submitted and appointment marked as Completed.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/appointments");
      });
  
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while submitting the prescription.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Add Prescription</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Medicine</label>
            <select
              name="medicine"
              value={formData.medicine}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select</option>
              {medicineList.map((med, i) => (
                <option key={i} value={med}>{med}</option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          {formData.medicine === "other" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Enter Medicine</label>
              <input
                type="text"
                name="customMedicine"
                value={formData.customMedicine}
                onChange={handleChange}
                placeholder="Enter medicine name"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Symptom</label>
            <select
              name="symptom"
              value={formData.symptom}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select</option>
              {symptomList.map((sym, i) => (
                <option key={i} value={sym}>{sym}</option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          {formData.symptom === "other" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Enter Symptom</label>
              <input
                type="text"
                name="customSymptom"
                value={formData.customSymptom}
                onChange={handleChange}
                placeholder="Enter symptom"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={addPrescription}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add to List
          </button>
        </div>

        <div className="overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Prescription List</h3>
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="border px-4 py-2 text-left font-semibold">Medicine</th>
                <th className="border px-4 py-2 text-left font-semibold">Symptom</th>
                <th className="border px-4 py-2 text-left font-semibold">Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((p, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-gray-700">{p.medicine}</td>
                  <td className="border px-4 py-2 text-gray-700">{p.symptom}</td>
                  <td className="border px-4 py-2 text-gray-700">₹{p.price}</td>
                </tr>
              ))}
              {prescriptions.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-400 bg-white">
                    No medicines added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {prescriptions.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-end items-center gap-2">
                <label className="font-medium text-gray-700">Discount (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-24 border border-gray-300 rounded px-2 py-1 text-right"
                />
              </div>

              <div className="text-right text-gray-800 font-semibold text-lg">
                Total Bill: ₹{totalBill.toFixed(2)}
              </div>
              <div className="text-right text-blue-600 font-bold text-xl">
                After Discount: ₹{discountedTotal.toFixed(2)}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={submitBill}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPrescriptionPage;
