import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='bg-white text-gray-800 shadow-md'>
      <div className='container mx-auto flex items-center justify-between h-16 px-4 md:px-8'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-bold md:text-3xl'>
            Job<span className='text-yellow-500'>Portal</span>
          </h1>
        </div>
        <div className='flex items-center gap-4 md:gap-8'>
          <ul className='hidden md:flex font-medium items-center gap-4 md:gap-6'>
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies" className='hover:text-yellow-500'>Companies</Link></li>
                <li><Link to="/admin/jobs" className='hover:text-yellow-500'>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className='hover:text-yellow-500'>Home</Link></li>
                <li><Link to="/jobs" className='hover:text-yellow-500'>Jobs</Link></li>
                <li><Link to="/browse" className='hover:text-yellow-500'>Browse</Link></li>
              </>
            )}
          </ul>
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login">
                <Button variant="outline" className='text-gray-800 hover:bg-yellow-500 hover:text-white border-gray-300'>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-lg rounded-lg p-4 text-gray-800">
                <div>
                  <div className='flex flex-col items-center gap-3'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                    </Avatar>
                    <div className='text-center'>
                      <h4 className='font-medium'>{user?.fullname}</h4>
                      <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className='flex flex-col mt-4 text-gray-700'>
                    {user && user.role === 'student' && (
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <User2 className='text-yellow-500' />
                        <Button variant="link" className='text-gray-700 hover:text-yellow-500'>
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className='flex items-center gap-2 cursor-pointer mt-2'>
                      <LogOut className='text-red-500' />
                      <Button onClick={logoutHandler} variant="link" className='text-gray-700 hover:text-red-500'>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className='md:hidden flex items-center'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className='text-gray-800 hover:bg-yellow-500 hover:text-white border-gray-300'>
                Menu
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full bg-white shadow-lg rounded-lg p-4 text-gray-800">
              <ul className='flex flex-col gap-4'>
                {user && user.role === 'recruiter' ? (
                  <>
                    <li><Link to="/admin/companies" className='hover:text-yellow-500'>Companies</Link></li>
                    <li><Link to="/admin/jobs" className='hover:text-yellow-500'>Jobs</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/" className='hover:text-yellow-500'>Home</Link></li>
                    <li><Link to="/jobs" className='hover:text-yellow-500'>Jobs</Link></li>
                    <li><Link to="/browse" className='hover:text-yellow-500'>Browse</Link></li>
                  </>
                )}
                {!user ? (
                  <>
                    <li><Link to="/login" className='hover:text-yellow-500'>Login</Link></li>
                    <li><Link to="/signup" className='bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400'>Signup</Link></li>
                  </>
                ) : (
                  <>
                    {user && user.role === 'student' && (
                      <li><Link to="/profile" className='hover:text-yellow-500'>View Profile</Link></li>
                    )}
                    <li>
                      <Button onClick={logoutHandler} variant="link" className='text-red-500 hover:text-red-600'>
                        Logout
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
