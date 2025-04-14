import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectItem } from "../components/ui/select";
import { motion } from "framer-motion";

export default function PatientRegistration() {
  const navigate=useNavigate()
  const [patient, setPatient] = useState({
    patientid: "",
    name: "",
    gender: "",
    dob: "",
    maritalstatus: "",
    address: "",
    email: "",
    vipstatus: false,
    referredby: "",
    familycode: "",
    WPNumber: "",
    MobileNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    streetAddress: "",
    pincode: "",
    useExistingFamilyCode: false,
    generateFamilyCode: false,
  });

  const generateFamilyCode = useCallback(() => Math.random().toString(36).substring(2, 8).toUpperCase(), []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setPatient((prev) => {
      const updatedValue = type === "checkbox" ? checked : value;
      if (name === "generateFamilyCode") {
        return { ...prev, [name]: checked, familycode: checked ? generateFamilyCode() : "" };
      }
      return { ...prev, [name]: updatedValue };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const generatedPatientId = Math.floor(100000 + Math.random() * 900000);
    
    const fullName = `${patient.firstName} ${patient.middleName} ${patient.lastName}`.trim();
    const fullAddress = `${patient.streetAddress}, ${patient.pincode}`.trim();

    const patientData = {
      patientid: patient.patientid,
      name: fullName,
      gender: patient.gender || "Male",
      dob: patient.dob,
      maritalstatus: patient.maritalstatus,
      address: fullAddress,
      email: patient.email,
      vipstatus: patient.vipstatus,
      referredby: patient.referredby,
      familycode: patient.familycode,
      WPNumber: patient.WPNumber,
      MobileNumber: patient.MobileNumber,
      
    };
    console.log("Submitting patient data:", patientData);
    try {
      const response = await axios.post("http://localhost:8081/myapp/createPatients", patientData);
      console.log("Patient Registered Successfully:", response.data);
      navigate("/registration-success", { state: { patientData: patientData, message: response.data } });
    } catch (error) {
      console.error("Error registering patient:", error.response?.data || error.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-4xl mx-auto p-8 mt-10 shadow-xl rounded-2xl bg-white border border-gray-200">
        <CardContent>
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Patient Registration</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {[
              { label: "Patient ID", name: "patientid", type: "text" },
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Middle Name", name: "middleName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Street Address", name: "streetAddress", type: "text" },
              { label: "Pincode", name: "pincode", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile Number", name: "MobileNumber", type: "text" },
              { label: "WhatsApp Number", name: "WPNumber", type: "text" },
              { label: "Family Code", name: "familycode", type: "text", disabled: !patient.useExistingFamilyCode && patient.generateFamilyCode },
            ].map(({ label, name, type, disabled }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="text-sm font-semibold text-gray-600">{label}</label>
                <Input id={name} name={name} type={type} value={patient[name]} onChange={handleChange} disabled={disabled} className="rounded-lg shadow-sm border-gray-300 p-1.5" />
              </div>
            ))}

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Gender</label>
              <Select name="gender" onChange={handleChange} className="rounded-lg shadow-sm border-gray-300">
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Marital Status</label>
              <Select name="maritalstatus" onChange={handleChange} className="rounded-lg shadow-sm border-gray-300">
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
              </Select>
            </div>

            <div className="col-span-2 flex gap-6 mt-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="useExistingFamilyCode" checked={patient.useExistingFamilyCode} onChange={handleChange} className="rounded border-gray-300" />
                <span>Use Existing Family Code</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="generateFamilyCode" checked={patient.generateFamilyCode} onChange={handleChange} className="rounded border-gray-300" />
                <span>Generate Family Code</span>
              </label>
            </div>

            <label className="flex items-center space-x-2 mt-4">
              <input type="checkbox" name="vipstatus" checked={patient.vipstatus} onChange={handleChange} className="rounded border-gray-300" />
              <span>VIP Patient</span>
            </label>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Referred By</label>
              <Select name="referredby" onChange={handleChange} className="rounded-lg shadow-sm border-gray-300">
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Patient">Patient</SelectItem>
                <SelectItem value="Advertisement">Advertisement</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </Select>
            </div>

            <Button type="submit" className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-6">
              Register Patient
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
