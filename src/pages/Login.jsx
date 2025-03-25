import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUserNurse } from "react-icons/fa";
import loginimg from "../assets/loginimg.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Handle role selection
  const selectRole = useCallback((role) => {
    setFormData((prev) => ({ ...prev, role }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { username, password, role } = formData;
      if (!username || !password || !role) {
        alert("Please fill all fields and select a role!");
        return;
      }
      console.log("Login Data:", formData);
      
      // Future API Integration:
      // fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // })
      // .then(response => response.json())
      // .then(data => console.log("API Response:", data));

      navigate("/dashboard");
    },
    [formData, navigate]
  );

  // Dynamic styles for role selection
  const roleStyles = useMemo(
    () => ({
      doctor: formData.role === "doctor" ? "border-indigo-600 bg-indigo-100" : "border-gray-300",
      receptionist: formData.role === "receptionist" ? "border-green-600 bg-green-100" : "border-gray-300",
    }),
    [formData.role]
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-100 to-purple-100 p-4">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Image Section */}
        <div className="hidden md:flex w-1/2 p-5 justify-center items-center bg-blue-500">
          <img src={loginimg} alt="Login Illustration" className="w-full h-auto object-cover" />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 p-9">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign In</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Role Selection (Icons) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role</label>
              <div className="flex space-x-6 mt-3 justify-center">
                <div
                  onClick={() => selectRole("doctor")}
                  className={`cursor-pointer p-4 rounded-lg border-2 ${roleStyles.doctor} hover:bg-indigo-200 transition-all`}
                >
                  <FaUserMd className="text-3xl text-indigo-600" />
                  <p className="text-sm text-center mt-1">Doctor</p>
                </div>
                <div
                  onClick={() => selectRole("receptionist")}
                  className={`cursor-pointer p-4 rounded-lg border-2 ${roleStyles.receptionist} hover:bg-green-200 transition-all`}
                >
                  <FaUserNurse className="text-3xl text-green-600" />
                  <p className="text-sm text-center mt-1">Receptionist</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-500">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
