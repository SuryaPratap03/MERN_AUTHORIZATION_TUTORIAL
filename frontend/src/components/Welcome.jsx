import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [user, setUser] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/refreshtoken", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      clearInterval(intervalId);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleInterval = () => {
    const id = setInterval(() => {
      refreshUser();
    }, 20000);
    setIntervalId(id);
  };

  useEffect(() => {
    fetchUser();
    handleInterval();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome {user ? user.name : ""}
        </h1>
        {user ? (
          <div className="text-center">
            <p className="text-lg text-gray-700">
              <strong>User ID:</strong> {user._id}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-red-600">
              Please login or signup first.
            </p>
          </div>
        )}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
