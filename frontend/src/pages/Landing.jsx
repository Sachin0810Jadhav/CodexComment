import React from "react";
import { useNavigate,Link } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6 bg-gray-800 shadow-md">
      <Link className="text-3xl font-bold text-cyan-500" to="/">CodexComment</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#features" className="hover:text-cyan-300">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-cyan-300">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Automatically Generate Context-Aware{" "}
          <span className="text-cyan-500">Code Comments</span>
        </h2>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          CodexComment uses cutting-edge AI to analyze your code and produce
          high-quality comments that enhance readability and documentation.
        </p>
        <div className="flex justify-center space-x-3">
          <button
            className="mt-8 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition"
            onClick={() => navigate("/tryCodexComment")}
          >
            Try Now
          </button>
          <button
            className="mt-8 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            className="mt-8 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition"
            onClick={() => navigate("/signin")}
          >
            Signin
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-10 bg-gray-800">
        <h3 className="text-3xl font-bold text-center text-cyan-500">
          Features
        </h3>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold text-cyan-400">
              Tranformer Model-Powered
            </h4>
            <p className="mt-4 text-gray-300">
              Built on Transformer Model to provide accurate and
              relevant comments based on code context.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold text-cyan-400">
              Code Structure Analysis
            </h4>
            <p className="mt-4 text-gray-300">
              Understands code structure and logic, giving you insightful
              comments that boost readability.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold text-cyan-400">
              Seamless Integration
            </h4>
            <p className="mt-4 text-gray-300">
              Easily integrates with your existing workflow for a smooth coding
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-900 text-center">
        <h3 className="text-3xl font-bold text-cyan-500">About CodexComment</h3>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          CodexComment is an AI/ML-powered project inspired by neural machine
          translation, designed to generate high-quality, context-aware code
          comments. Utilizing Byte Pair Encoding (BPE) and Sim SBT methods,
          CodexComment optimizes Abstract Syntax Tree traversal for better code
          understanding.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-800 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} CodexComment. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
