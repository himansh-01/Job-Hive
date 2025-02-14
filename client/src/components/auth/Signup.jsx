import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { signupInfoSchema } from "../utils/formValidation";
import OAuth from "./OAuth";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file:"",
  });

  const [error, setError] = useState(null);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState('Student');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input,[e.target.name] : e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const validateUserInfo = (userInfo) => {
    try {
      const { file, ...rest } = userInfo;
      const validatedData = signupInfoSchema.parse(rest);
     
      setError(null);
      return true;
    } catch (error) {
      const zodError = { ...error };
      // console.log("validation errors: ", zodError.issues);
      setError(zodError.issues.map((err) => err.message));
      return false;
    }
  };

  const firebaseToken = useSelector((state) => state.firebaseToken.token);

  const submitHandler = async (e) => {
    e.preventDefault();
    input.fullname = input.fullname.trim();
    if (!validateUserInfo(input)) return;

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("fcmToken", firebaseToken);
    if (input.file) {
      formData.append("file", input.file);
    }
  
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
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
        <form
          onSubmit={(e) => submitHandler(e)}
          className="sm:w-1/2 w-3/4 border-[0.1rem] border-gray-200 rounded-md p-4 sm:p-8 my-10 shadow-md"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Your name here"
              className= "bg-gray-300 placeholder:text-gray-600"
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Example@gmail.com"
              className= "bg-gray-300 placeholder:text-gray-600"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="1234567890"
              className= "bg-gray-300 placeholder:text-gray-600"
            />
          </div>
          <div className="my-2 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password here"
              className= "bg-gray-300 placeholder:text-gray-600"
            />
            <div
              className="absolute right-2 top-9 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lg:ml-0 ml-4">
              <Label className="hidden lg:block">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <div className="flex flex-col justify-self-center items-center">
            <Button type="submit" className=" sm:w-[10rem] w-[8rem] text-white my-2 bg-blue-600 hover:bg-blue-700">
              Signup
            </Button>
            <OAuth/>
            </div>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
};

export default Signup;
