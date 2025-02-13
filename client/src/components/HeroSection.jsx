import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/');
  };

  return (
    <section className="text-center py-16">
      <p className="text-blue-600 font-semibold text-sm">#1 JOB PORTAL</p>
      <h1 className="text-4xl font-bold mt-2">Build your very own job portal with Jobtale</h1>
      <p className="text-gray-600 mt-3">Discover your next career move with confidence and ease</p>
      
      <div className="mt-6 flex justify-center space-x-2 max-w-lg mx-auto bg-white shadow-md p-2 rounded-lg">
        <input type="text" placeholder="Search job" className="p-2 flex-1 border rounded-md outline-none min-w-8" />
        <input type="text" placeholder="Location" className="p-2 flex-1 border rounded-md outline-none min-w-8" />
        <Button className="bg-blue-600 text-white px-4 flex items-center min-w-6"><Search size={16} className="mr-1"/> Search</Button>
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-3">
        <div className="flex -space-x-2">
          <img src="https://th.bing.com/th/id/OIP.bLnnDC8ZDmyikEiSD9HhYwHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="User" className="w-8 h-8 rounded-full border" />
          <img src="https://th.bing.com/th/id/OIP.8HgJeteQBk4ZdCrWB3OHygHaHa?rs=1&pid=ImgDetMain" alt="User" className="w-8 h-8 rounded-full border" />
          <img src="https://th.bing.com/th/id/OIP.1QJyrTaB09VcWCu1NuefkAAAAA?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="User" className="w-8 h-8 rounded-full border" />
        </div>
        <div className="flex flex-col items-center space-x-1">
          <div>
            <span className="text-yellow-500 text-xl">★★★★★</span>
            <span className="font-bold">4.9</span>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Over 100+ reviews</p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
