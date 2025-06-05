import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { Context } from "@/context/authContext";
import * as XLSX from "xlsx";

const EnrolledStudentsPage = () => {
  const { userDetail, background } = useContext(Context);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://backend-edupi-2.onrender.com/api/v1/user/getEnrolled",
          { params: { userId: userDetail._id } }
        );
        setStudents(response.data.students || []);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userDetail?._id) {
      fetchStudents();
    }
  }, [userDetail]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      students.map((student) => ({
        Name: student.name,
        Email: student.email,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enrolled Students");

    XLSX.writeFile(workbook, "Enrolled_Students.xlsx");
  };

  return (
    <div
      className={`min-h-screen ${
        background ? "bg-white text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      <Navbar />
      <div
        className={`container min-h-[90vh] mx-auto p-6 ${
          background ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">Enrolled Students</h1>
        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students enrolled yet.</p>
        ) : (
          <>
            <button
              onClick={exportToExcel}
              className="mb-4 px-4 py-2 bg-slate-500 text-white rounded shadow hover:bg-slate-600"
            >
              Export to Excel
            </button>
            <ul className="space-y-4">
              {students.map((student) => (
                <li
                  key={student._id}
                  className={`p-4 border rounded shadow ${
                    background ? "bg-white" : "bg-gray-900"
                  }`}
                >
                  <h2 className="text-lg font-semibold">{student.name}</h2>
                  <p>Email: {student.email}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrolledStudentsPage;
