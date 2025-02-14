import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { loginInfoSchema} from '../utils/formValidation';
import OAuth from './OAuth';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [error,setError]=useState(null)
    const [selected, setSelected] = useState('Student');
    
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateLoginInfo=(loginInfo)=>{
        
        try {
            const validatedInfo=loginInfoSchema.parse(loginInfo)
            setError(null)
            return true;
        } catch (error) {
           const zodError={...error} 
        //    console.log("validation errors: ",zodError.issues)
           setError(zodError.issues.map(err=>err.message))
           return false;
        }
    }
 
    const submitHandler = async (e) => {
        e.preventDefault();

    if(!validateLoginInfo(input))return;
        dispatch(setLoading(true));
        
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center justify-center max-w-7xl mx-auto'>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <label className={`px-4 py-2 cursor-pointer ${selected === 'Student' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
                    <input
                      type="radio"
                      name="toggle"
                      value={input.role === 'Student'}
                      checked={selected === 'Student'}
                      onChange={() => setSelected('Student')}
                      className="hidden"
                    />
                    Student
                  </label>
                  <label className={`px-4 py-2 cursor-pointer ${selected === 'Recruiter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
                    <input
                      type="radio"
                      name="toggle"
                      value={input.role === 'Recruiter'}
                      checked={selected === 'Recruiter'}
                      onChange={() => setSelected('Recruiter')}
                      className="hidden"
                    />
                    Recruiter
                  </label>
                </div>
                <form onSubmit={submitHandler} className='sm:w-1/2 w-3/4 border-[0.1rem] border-gray-200 rounded-md p-5 my-10 shadow-md'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Example@gmail.com"
                            className = "bg-gray-300 placeholder:text-gray-600"
                        />
                    </div>

                    <div className='my-2 relative'>
                        <Label>Password</Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className = "bg-gray-300 placeholder:text-gray-600"
                        />
                        <div
                            className='absolute right-2 top-9 cursor-pointer'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <div className="flex flex-col justify-self-center items-center">
                            <Button type="submit" className="w-[8rem] sm:w-[10rem] text-white bg-blue-600 sm:my-4 my-2 hover:bg-blue-700">Login</Button>
                            <OAuth/>
                            </div> 
                        )
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
            {
                error && error.map((err)=>toast.error(err))
            }
        </div>
    );
};

export default Login;
