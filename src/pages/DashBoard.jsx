import { useState, useMemo, memo } from "react";
import { FaUserInjured, FaUserCheck, FaUserClock, FaCalendarCheck, FaBirthdayCake, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const stats = [
    { title: "Total Appointments", count: 120, icon: FaCalendarCheck, bgColor: "bg-blue-100", hoverColor: "hover:bg-blue-200" },
    { title: "Total Patients", count: 85, icon: FaUserInjured, bgColor: "bg-green-100", hoverColor: "hover:bg-green-200" },
    { title: "Remaining Patients", count: 25, icon: FaUserClock, bgColor: "bg-yellow-100", hoverColor: "hover:bg-yellow-200" },
    { title: "Checked Patients", count: 60, icon: FaUserCheck, bgColor: "bg-red-100", hoverColor: "hover:bg-red-200" },
    // New stats for morning and evening sessions
    { title: "Morning Sessions", count: 45, icon: FaCalendarCheck, bgColor: "bg-purple-100", hoverColor: "hover:bg-purple-200" },
    { title: "Evening Sessions", count: 30, icon: FaCalendarCheck, bgColor: "bg-teal-100", hoverColor: "hover:bg-teal-200" }
];

const patients = [
    { id: 1, name: "John Doe", birthdate: "03-13" },
    { id: 2, name: "Jane Smith", birthdate: "05-20" },
    { id: 3, name: "Mike Johnson", birthdate: "03-13" },
    { id: 4, name: "Emily Davis", birthdate: "07-15" },
    { id: 5, name: "Anna Williams", birthdate: "03-13" },
    { id: 6, name: "Chris Evans", birthdate: "03-13" },
    { id: 7, name: "Robert Downey", birthdate: "03-13" },
    { id: 8, name: "Tom Holland", birthdate: "03-13" },
    { id: 9, name: "Scarlett Johansson", birthdate: "03-13" }
];

const Dashboard = () => {
    const today = new Date().toISOString().slice(5, 10);

    const birthdayPatients = useMemo(() => patients.filter(patient => patient.birthdate === today), [today]);

    const patientsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(birthdayPatients.length / patientsPerPage);

    const visiblePatients = useMemo(() => {
        const startIndex = (currentPage - 1) * patientsPerPage;
        return birthdayPatients.slice(startIndex, startIndex + patientsPerPage);
    }, [currentPage, birthdayPatients]);

    const nextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    const prevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`p-8 rounded-lg shadow-md transition-all transform ${stat.bgColor} ${stat.hoverColor} hover:shadow-lg hover:scale-105`}>
                        <div className="text-2xl text-gray-700 mb-1 flex justify-center">
                            <stat.icon />
                        </div>
                        <p className="text-3xl font-bold text-center">{stat.count}</p>
                        <p className="text-sm font-semibold text-gray-700 text-center">{stat.title}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <div className="w-full sm:w-2/3 md:w-1/3 lg:w-1/3 bg-purple-100 p-5 rounded-lg shadow-md transition-all transform hover:shadow-xl">
                    <h2 className="text-lg font-bold text-center flex items-center justify-center gap-2 text-purple-700">
                        <FaBirthdayCake className="text-xl" /> Today's Birthdays
                    </h2>

                    {visiblePatients.length > 0 ? (
                        <ul className="mt-3 space-y-2">
                            {visiblePatients.map(patient => (
                                <li key={patient.id} className="bg-white p-3 rounded shadow text-sm text-center hover:bg-gray-200 transition-all transform hover:scale-105">
                                    🎉 {patient.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600 mt-3 text-sm">No birthdays today.</p>
                    )}

                    {birthdayPatients.length > patientsPerPage && (
                        <div className="flex justify-between mt-3">
                            <button onClick={prevPage} disabled={currentPage === 1} className={`px-3 py-1 rounded transition-all transform hover:scale-105 ${currentPage > 1 ? 'bg-purple-500 text-white' : 'bg-gray-300 cursor-not-allowed'}`}>
                                <FaArrowLeft />
                            </button>
                            <span className="px-2 py-1 text-sm font-semibold">Page {currentPage} of {totalPages}</span>
                            <button onClick={nextPage} disabled={currentPage === totalPages} className={`px-3 py-1 rounded transition-all transform hover:scale-105 ${currentPage < totalPages ? 'bg-purple-500 text-white' : 'bg-gray-300 cursor-not-allowed'}`}>
                                <FaArrowRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(Dashboard);
