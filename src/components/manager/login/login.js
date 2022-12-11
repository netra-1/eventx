import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const loginAdmin=(e)=>{
    e.preventDefault();


    // const data = new FormData();
    // data.append("email", email);
    // data.append("password", password);

    const data = {
        email: email,
        password: password,
      };

    axios
        .post("http://localhost:8000/api/user/login", data)
        .then((response) => {
            console.log(response.data.data.token)
        if (response.data.data.token) {
            // it will save the token locally, so that it is available
            // all over the component
            localStorage.setItem("adminTicket", response.data.data.token);

            window.location.replace("/"); // this will redirect to admin dashboard

            toast.success("Login success!");
        } else {
            toast.error("Login failed!");
        }
        console.log(response.data);
        })
        .catch();
    }

    return(
        <>
        <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <div class="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
            <img class="mx-auto h-12 w-auto" src="https://img.favpng.com/1/22/25/logo-graphic-design-brand-event-planning-text-png-favpng-t2ef0XXB42d4VnnuX5eSBi1Pi.jpg" alt="Your Company" />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <form class="mt-8 space-y-6" onSubmit={loginAdmin} method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input onChange={(e) => {
                        setEmail(e.target.value);
                      }} id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                <label for="password" class="sr-only">Password</label>
                <input onChange={(e) => {
                        setPassword(e.target.value);
                      }} id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>

                <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                </div>
            </div>

            <div>  
                <button id="loginBtn" type="submit" value="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                    </svg>
                </span>
                Sign in
                </button>
            </div>
            </form>
        </div>
        </div>
                </div>
            </div>
        </div>  
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> 
        </>
    )
}

export default AdminLogin;