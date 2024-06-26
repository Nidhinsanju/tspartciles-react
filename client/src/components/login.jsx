import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const navigate = useNavigate();
  const serverURL = process.env.REACT_APP_API_URL;

  const hanldeRegister = async () => {
    if (!userName || !passWord) {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await axios.post(`${serverURL}/register`, {
          username: userName,
          password: passWord,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          alert("User Created Successfully You Can login Now");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 304) {
            alert("User Already Exist");
          }
        } else {
          alert("something went wrong");
          console.error("Registration error:", err);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!userName || !passWord) {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await axios.post(`${serverURL}/login`, {
          username: userName,
          password: passWord,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          navigate("/dashboard");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 304) {
            alert("No user found");
          }
          if (err.response.status === 303) {
            alert("Invalid Password");
          }
        } else {
          alert("something went wrong");
          console.error("Registration error:", err);
        }
      }
    }
  };

  return (
    <main className="flex justify-center items-center h-screen opacity-70">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-8 w-96 flex-wrap bg-opacity-50">
        <header className="p-12">
          <div className="mb-5 ">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border opacity-90 text-opacity-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              id="password"
              className="shadow-sm bg-gray-50 border opacity-90 text-opacity-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex p-2 justify-evenly">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="text-white p-2 bg-blue-700 hover:opacity-100 hover:text-opacity-100 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:hover:opacity-100 dark:hover:text-opacity-100"
            >
              Login
            </button>
            <button
              onClick={() => {
                hanldeRegister();
              }}
              className="text-white p-2 bg-blue-700 hover:opacity-100 hover:text-opacity-100 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
          </div>
        </header>
      </div>
    </main>
  );
}
