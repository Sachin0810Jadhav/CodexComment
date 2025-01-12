import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { FaClipboard } from "react-icons/fa"; 
import toast from "react-hot-toast";

export default function History() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [history, setHistory] = useState([]);
  const getHistory = async () => {
    const response = await axios.get(
      "http://localhost:3000/user/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setHistory(response.data.history);

    
  };

  useEffect(() => {
    getHistory();
  }, [token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {});
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <header className="flex justify-between items-center px-5 py-6 bg-gray-800 shadow-md">
        <div className="flex justify-between items-center px-5 py-6">
            <Link className="text-3xl font-bold text-cyan-500 mx-2" to="/mainPage">
                Home
            </Link>
            
        </div>
        
        <div className="space-x-4">
            <button
                className=" p-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition cursor-pointer"
                onClick={() => {
                navigate("/signin");
                }}
            >
                Logout
            </button>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  bg-gray-900">
        {history.map((hist)=>{
            return(
                <div key={hist._id}
                className="w-full my-3 p-6 min-h-400 overflow-auto bg-gray-800  text-white border-gray-300 rounded-lg shadow-md  text-xl">
                    <div className='flex justify-end'>
                        <FaClipboard
                        onClick={() => copyToClipboard(hist.codeComment)}
                        className=" text-gray-400 cursor-pointer hover:text-cyan-500"
                        size={20}
                        />
                    </div>
                    <div>
                        {hist.codeComment}
                    </div>
                
                </div>
            )
        })}



      </div>
    </>
  )
}
