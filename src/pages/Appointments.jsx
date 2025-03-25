import { memo, useEffect, useState } from "react";

const Appointments = memo(() => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call (Replace with actual API fetch)
    setTimeout(() => {
      setAppointments(["Patient A - 10:00 AM", "Patient B - 11:30 AM"]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-white p-6 shadow rounded" role="region" aria-labelledby="appointments-title">
      <h2 id="appointments-title" className="text-xl font-semibold mb-4">
        Appointments List
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : appointments.length > 0 ? (
        <ul className="list-disc pl-5">
          {appointments.map((appointment, index) => (
            <li key={index} className="text-gray-800">
              {appointment}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No appointments available.</p>
      )}
    </div>
  );
});

export default Appointments;
