import { Link } from 'react-router-dom';
import Google from '../assets/google.png'
import { useState } from 'react';
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FaSpinner } from 'react-icons/fa';
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

const Login2 = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            username: username,
            password: password
        }

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if(!response.ok){
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.accessToken)
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            toast.error(`Error: ${error.message}`);
        } finally{
            setLoading(false)
        }
    }
    return (
      <section>
        <div className="min-h-screen bg-violet-300 py-5">
          <div className="bg-white mt-15 mb-10 mx-20">
            <p className="font-extrabold text-[#140074] text-2xl px-12 py-4">
              Invooce
            </p>
            <hr className="text-gray-100" />

            <div className="bg-red-5000 w-100 mx-auto px-6">
              <div className="space-y-2 font-medium block">
                <h1 className="text-4xl mt-10">Login</h1>
                <p>Hi, Welcome back👋</p>
              </div>

              <div className="space-y-5">
                <button className="mt-5">
                  <Link className="flex items-center gap-2.5 px-25 py-3 border border-gray-300 cursor-pointer rounded-md hover:bg-gray-200 duration-300">
                    <img src={Google} alt="Google icon" className="w-4 h-4" />
                    <p className="font-medium text-sm">Login With Google</p>
                  </Link>
                </button>

                <div className="flex justify-center items-center gap-6 text-gray-400 mb-10">
                  <hr className="flex-1" />
                  <Link className="text-xs font-medium">
                    or Login with Email
                  </Link>
                  <hr className="flex-1" />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label className="text-sm font-medium">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="block border border-gray-300 rounded-md w-90 px-3 py-2 outline-none placeholder:text-sm mt-2"
                    required
                  />

                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="block border border-gray-300 rounded-md w-90 px-3 py-2 outline-none placeholder:text-sm mt-2"
                      required
                    />
                    <div className="absolute top-3.5 right-2 text-[18px] cursor-pointer">
                      {isPasswordVisible ? (
                        <GoEye onClick={() => setIsPasswordVisible(false)} />
                      ) : (
                        <GoEyeClosed
                          onClick={() => setIsPasswordVisible(true)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center my-3">
                  <div className="flex items-cente gap-2 px-2">
                    <input type="checkbox" />
                    <p className="text-sm font-medium">Remember Me</p>
                  </div>

                  <Link className="text-indigo-700 text-sm font-medium">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="bg-indigo-700  py-2.5 text-white text-sm font-medium rounded-md mt-3 mb-5 cursor-pointer border-none w-full"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <ImSpinner2 className="animate-spin text-xl text-white" />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <p className="pb-10 text-center">
                Not registered yet? {""}
                <Link className="text-indigo-700 text-sm font-medium">
                  Create an account?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Login2;