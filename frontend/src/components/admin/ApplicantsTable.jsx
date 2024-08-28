import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(false);

  const statusHandler = async (status, id) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of recent applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Resume of ${item?.applicant?.fullname}`}
                    >
                      {item?.applicant?.profile?.resumeOriginalName || "Download Resume"}
                    </a>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => statusHandler("Accepted", item._id)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-300"
                      aria-label={`Accept ${item?.applicant?.fullname}`}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Accept"}
                    </button>
                    <button
                      onClick={() => statusHandler("Rejected", item._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-gray-300"
                      aria-label={`Reject ${item?.applicant?.fullname}`}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Reject"}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="text-center">
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
