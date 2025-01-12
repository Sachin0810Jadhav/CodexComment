import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa"; 
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function TryPage() {
  const [code, setCode] = useState(""); 
  const [comment, setComment] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleGenerateComment = async () => {
    setIsLoading(true);

    

    const response = await axios.post(
      "http://localhost:3000/user/generateComment",
      { code },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );
    
    setIsLoading(false);
    if(response.data.msg=="Comment generated successfully"){
      toast.success("Comment generated successfully")
      setComment(response.data.comment);
    }
    else{
      toast.error(response.data.msg)
      setComment(response.data.comment);
    }
    

    
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {});
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <header className="flex justify-between items-center px-5 py-6 bg-gray-800 shadow-md">
        <div className="flex justify-between items-center px-5 py-6">
            <Link className="text-3xl font-bold text-cyan-500 mx-2" to="/">
                CodexComment
            </Link>
            <Link className="text-3xl font-bold text-cyan-500 mx-2" to="/history">
                History
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
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-center text-cyan-500 mb-6">
            CodexComment - Code Comment Generator
          </h1>

          <div className="space-y-4">
            {/* Code Input Section */}
            <div className="relative">
              <label htmlFor="code" className="block text-gray-300 text-xl">
                Enter Code
              </label>
              <textarea
                id="code"
                name="code"
                value={code}
                onChange={handleCodeChange}
                className="w-full h-40 px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Paste your code here..."
                required
              />
              {/* Copy icon for the code */}
              <FaClipboard
                onClick={() => copyToClipboard(code)}
                className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-cyan-500"
                size={20}
              />
            </div>

            {/* Generate Comment Button */}
            <button
              onClick={handleGenerateComment}
              className={`w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Comment"}
            </button>

            {/* Generated Comment Display */}
            {comment && (
              <div className="relative mt-6 p-4 bg-gray-700 rounded-lg overflow-auto">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-2">
                  Generated Comment
                </h2>
                <pre className="text-sm text-gray-300">{comment}</pre>
                {/* Copy icon for the comment */}
                <FaClipboard
                  onClick={() => copyToClipboard(comment)}
                  className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-cyan-500 "
                  size={20}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
