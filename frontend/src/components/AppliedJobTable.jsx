import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className='p-4 sm:p-6'>
            <Table className="border border-gray-200 rounded-lg shadow-sm">
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="border-b border-gray-300">
                        <TableHead className="p-3 text-left text-gray-600">Date</TableHead>
                        <TableHead className="p-3 text-left text-gray-600">Job Role</TableHead>
                        <TableHead className="p-3 text-left text-gray-600">Company</TableHead>
                        <TableHead className="p-3 text-right text-gray-600">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-gray-500">You haven't applied to any jobs yet.</TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <TableCell className="p-3">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="p-3">{appliedJob.job?.title}</TableCell>
                                    <TableCell className="p-3">{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="p-3 text-right">
                                        <Badge className={`text-white ${appliedJob?.status === "rejected" ? 'bg-red-500' : appliedJob.status === 'pending' ? 'bg-gray-500' : 'bg-green-500'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
