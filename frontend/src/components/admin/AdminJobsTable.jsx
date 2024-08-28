import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className='p-4'>
            <Table className='border border-gray-300'>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='bg-gray-100'>Company Name</TableHead>
                        <TableHead className='bg-gray-100'>Role</TableHead>
                        <TableHead className='bg-gray-100'>Date</TableHead>
                        <TableHead className='text-right bg-gray-100'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id} className='hover:bg-gray-50'>
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{new Date(job?.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className='text-right'>
                                <div className='flex justify-end items-center gap-2'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <button className='p-2 rounded-md hover:bg-gray-200'>
                                                <Edit2 className='w-5 h-5' />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32 p-2'>
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded-md'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded-md mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
