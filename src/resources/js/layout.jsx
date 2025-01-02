import { Button } from './components/ui/button';
import { Users } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { PHProvider } from './provider.jsx';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function Layout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user");
        setUser(response.data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-900">Ascendia</span>
          </div>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/how-it-works" className="text-blue-900 hover:text-blue-700">How it Works</Link>
          <Link to="/mentor-search" className="text-blue-900 hover:text-blue-700">Find a Mentor</Link>
          {user && <Link to="/account-settings" className="text-blue-900 hover:text-blue-700">Account Settings</Link>}
        </nav>

        <div>
          {user ? (
            <>
              <Button className="bg-green-500 hover:bg-green-600 text-white mx-2">
                <Link to="/user/account">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Link>
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="bg-green-500 hover:bg-green-600 text-white mx-2">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </header>

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <footer className="bg-blue-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/" >

              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Users className="h-8 w-8" />
                <span className="text-2xl font-bold">Ascendia</span>
              </div>
            </Link>
            <nav className="flex flex-wrap justify-center space-x-6">
              <Link to="/about-us" className="hover:text-blue-300">About Us</Link>
              <Link to="/terms-of-service" className="hover:text-blue-300">Terms of Service</Link>
              <Link to="/privacy-policy" className="hover:text-blue-300">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-blue-300">Contact</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-blue-300">
            © 2024 Ascendia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
