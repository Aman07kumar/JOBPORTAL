import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-6 md:p-8 shadow-lg'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='text-2xl font-semibold text-gray-800'>{user?.fullname}</h1>
                            <p className='text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="text-gray-800 border-gray-300 hover:bg-gray-200">
                        <Pen className='text-gray-600' />
                    </Button>
                </div>
                <div className='my-6'>
                    <div className='flex items-center gap-3 mb-3'>
                        <Mail className='text-gray-600' />
                        <span className='text-gray-700'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact className='text-gray-600' />
                        <span className='text-gray-700'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-6'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                        {user?.profile?.skills.length ? (
                            user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className='bg-yellow-500 text-white'>
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className='text-gray-600'>NA</span>
                        )}
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-2'>
                    <Label className="text-md font-semibold text-gray-800">Resume</Label>
                    {isResume ? (
                        <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href={user?.profile?.resume}
                            className='text-[#6A38C2] hover:underline'
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span className='text-gray-600'>NA</span>
                    )}
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Applied Jobs</h2>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
