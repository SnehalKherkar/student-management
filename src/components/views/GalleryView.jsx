import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";

const GalleryView = ({ students = [], customFields = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const yesNo = (value) => (value ? "Yes" : "No");

  const statusPill = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {students.map((student) => {
        const cf = student.customFields || {};

        return (
          <Card
            key={student.id}
            className="rounded-2xl shadow-xl border border-gray-200 px-2 py-1"
          >

            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">
                {student.name}
              </CardTitle>
              <p className="text-gray-500 text-sm">{student.email}</p>
            </CardHeader>

            <hr className="my-3 border-gray-300/60" />

            <CardContent className="space-y-3 text-[15px] leading-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusPill(
                    student.status
                  )}`}
                >
                  {student.status}
                </span>
              </div>

              {cf.gender && (
                <p>
                  <strong>Gender:</strong> {cf.gender}
                </p>
              )}

              {cf.dob && (
                <p>
                  <strong>Date of Birth:</strong> {formatDate(cf.dob)}
                </p>
              )}

              {cf.isScholarshipHolder !== undefined && (
                <p>
                  <strong>Is Scholarship Holder:</strong>{" "}
                  {yesNo(cf.isScholarshipHolder)}
                </p>
              )}

              {cf.bio && (
                <p>
                  <strong>Profile Bio:</strong> {cf.bio}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default GalleryView;
