"use client";
import Foot from "@/components/Foot";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Link from "next/link";
import { Context } from '@/MyContext';
import { useContext } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const { pwd, setPwd, email, setemail, setUser, loading, setLoading, user } = useContext(Context);

  const router = useRouter();

  const handleSignin = async () => {
    setUser(true)
    router.push("/companysetup")
    localStorage.setItem("user", true)
    toast.success("user logged in successfully") 
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-slate-500/60 relative smooth-entry py-10 flex justify-center items-center flex-col min-h-screen">
        <section className="w-full flex flex-col items-center justify-center px-6  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 bg-green-300/30">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-slate-900">
                SignIn in to chatbot
              </h1>
              <div className="space-y-4">

                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-slate-900"
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-400 placeholder-gray-400 text-slate-900"
                      placeholder="enter email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-slate-900"
                    >
                      Password
                    </label>
                    <input
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className=" border border-gray-300 sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-400 placeholder-gray-400 text-slate-900"
                      required
                    />
                  </div>
                </>
                {<button
                  onClick={handleSignin}
                  className={`w-full text-white bg-gradient-to-br from-orange-400 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>}
                <p className="text-sm font-light text-gray-900 dark:text-gray-900">
                  Do not have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-blue-800 text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Foot /> */}
    </>
  );
};

export default Login;
