"use client"
import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Context } from '@/MyContext';
import { useContext } from 'react';
import { useState } from "react";
import Foot from '@/components/Foot'
import { toast } from 'react-toastify';

const Signup = () => {
  const [showpass, setshowpass] = useState(false)
  const [checkpassword, setcheckpassword] = useState("")
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const router = useRouter();

  const { pwd, setPwd, email, setemail, loadingSimulate } = useContext(Context);

  const passwordValidator = (pass) => {
    let passobject = { password: pass, error: false, errormessege: "" }
    if (pass.length > 8) {
      let capital = []
      let small = []
      let specialordigit = []
      pass.split('').map((char) => {
        if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
          capital.push(char)
        }
        else if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
          small.push(char)
        } else { specialordigit.push(char) }
      })
      if (capital.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a capital letter"
        return passobject
      }
      if (specialordigit.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a special letter"
        return passobject
      }
      else { return passobject }
    }
    else if (pass.length < 8 || pass.length == 0) {
      passobject.error = true
      passobject.errormessege = "password must be of 8 characters"
      return passobject
    }
  }

  const handle = () => {
    loadingSimulate()
    router.push("/login")

  };

  const handleSignup = () => {
    if (!email.includes("@")) {
      toast.warn("invalid email")
      return
    }

    if (passwordValidator(pwd).error) {
      let messege = passwordValidator(pwd).errormessege
      toast.warn(messege)
      return
    }
    if (checkpassword == pwd) {
      handle()
      // 
      toast.success("account created")
    }
    else { toast.warn("confirm password do not match") }
  }

  const handleVerifyCode = () => {
    toast.success("Email verified successfully!");
    setIsVerifying(false)
  };

  useEffect(() => {
    if (email.includes("@")) {
      setIsVerifying(true)
    }
  }, [email])
  

  return (
    <>
      <section className="bg-slate-500/60 relative smooth-entry py-10 flex justify-center items-center flex-col min-h-screen">
      <div className="w-full flex flex-col items-center justify-center px-6 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 bg-green-300/30">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-slate-900">
              Create an account
            </h1>

            <button
            onClick={()=>setIsVerifying(true)}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M24 21.82v4.8h11.45c-.52 2.95-2.42 5.42-5.15 6.85v5.7h8.3c4.9-4.5 7.7-11.13 7.7-18.65 0-1.6-.15-3.15-.45-4.65H24z" />
                <path fill="#34A853" d="M6.15 14.35A24.02 24.02 0 0 0 0 24c0 3.35.65 6.6 1.85 9.65l6.3-5.25a14.62 14.62 0 0 1 0-9.1l-6.3-5.2z" />
                <path fill="#FBBC05" d="M24 10a13.88 13.88 0 0 1 9.75 3.85l7.2-7.2A24.08 24.08 0 0 0 24 0c-8.15 0-15.35 4.15-19.85 10.35l6.3 5.2A14.4 14.4 0 0 1 24 10z" />
                <path fill="#EA4335" d="M24 47.9c5.7 0 10.75-1.9 14.7-5.15l-7.05-5.65a14.67 14.67 0 0 1-7.65 2c-5.6 0-10.45-3.6-12.3-8.6l-6.3 5.2A24.1 24.1 0 0 0 24 47.9z" />
              </svg>
              Continue with Google
            </button>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900">
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-400 placeholder-gray-400 text-slate-900"
                  placeholder="Enter email"
                  required
                />
              </div>

              {isVerifying && (
                <div className="space-y-3">
                  <label htmlFor="verification-code" className="block mb-2 text-sm font-medium text-slate-900">
                    Enter Verification Code
                  </label>
                  <input
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    type="text"
                    name="verification-code"
                    id="verification-code"
                    className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-400 placeholder-gray-400 text-slate-900"
                    placeholder="Enter code"
                    required
                  />
                  <button onClick={handleVerifyCode} className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Verify Email
                  </button>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-900">
                  Password
                </label>
                <input
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  type={showpass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-400 placeholder-gray-400 text-slate-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-slate-900">
                  Confirm password
                </label>
                <input
                  value={checkpassword}
                  onChange={(e) => setcheckpassword(e.target.value)}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-400 placeholder-gray-400 text-slate-900"
                  required
                />
              </div>

              <div className="flex text-slate-900 gap-2 text-sm">
                <input type="checkbox" id="check" value={showpass} onChange={(e) => setshowpass(e.target.checked)} />
                <p>View password</p>
              </div>

        
              <button onClick={handleSignup} className="w-full text-white bg-gradient-to-br from-orange-400 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Create an account
              </button>

   
              

              <p className="text-sm font-light text-gray-900 dark:text-gray-900">
                Already have an account? <Link href="/login" className="font-medium text-blue-800 hover:underline">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Signup