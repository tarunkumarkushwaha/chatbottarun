"use client"
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { Context } from '@/MyContext';
import { useContext } from 'react';
import Loader from "@/components/Loader";
import UiInput from "@/components/UIcomponents/UiInput";
import { toast } from "react-toastify";

export default function ChatbotIntegration() {
  const [email, setemail] = useState("")
  const [integrationSuccessful, setIntegrationSuccessful] = useState(null);
  const [showTopbar, setShowTopbar] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const resultRef = useRef(null);
  const router = useRouter()

  const { user } = useContext(Context);

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user])

  const handleTestIntegration = () => {
    const success = Math.random() > 0.5; // it stimilates whether it is sucess or not success/failed
    setIntegrationSuccessful(success);

    if (success) {
      toast.success("Integration Successful!")
    } else {
      toast.warn("Integration Failed")
    }

    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  if (!user) {
    return <>
      <div className="flex justify-center text-xl text-blue-800 h-screen items-center"><Loader /></div>
    </>
  }

  const renderIntegrationResult = () => {
    if (integrationSuccessful === null) return null;

    if (integrationSuccessful) {
      return (
        <div ref={resultRef} className="text-center space-y-4 p-4">
          <h2 className="text-2xl font-bold">Integration Successful!</h2>
          <p>Your chatbot is ready to go!</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="px-4 py-2 bg-gradient-to-br from-cyan-400 to-blue-800 hover:bg-gradient-to-bl text-white rounded-lg w-full sm:w-auto">Explore Admin Panel</button>
            <button className="px-4 py-2 bg-gradient-to-br from-green-400 to-blue-800 hover:bg-gradient-to-bl text-white rounded-lg w-full sm:w-auto">Start Talking to Your Chatbot</button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
              </svg>
              <span>Share on Facebook</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-700 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
              </svg>
              <span>Share on Twitter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-700 hover:text-blue-900">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
              </svg>
              <span>Share on LinkedIn</span>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div ref={resultRef} className="text-center space-y-4 p-4">
          <h2 className="text-2xl font-bold">Integration Not Detected</h2>
          <p>Please ensure the chatbot code is correctly added to your website.</p>
        </div>
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-lg max-w-4xl mx-auto space-y-4 sm:space-y-6 w-full bg-gray-50 shadow-md">
      {showTopbar && (
        <div className="fixed top-20 right-10 p-10 flex gap-2 justify-center items-center flex-col bg-cyan-100 border border-gray-300 rounded-lg z-50">
        <button onClick={()=>setShowTopbar(false)} className="text-black font-bold absolute top-2 right-5">X</button>
        Chatbot not working as intended? <a className=" underline text-blue-600" href="#">Share feedback</a>
      </div>
      )}

      {showChatbot && (
        <div className="fixed top-20 right-10 p-10 flex gap-2 flex-col bg-cyan-400 border border-gray-300 rounded-lg z-50">
          <button onClick={()=>setShowChatbot(false)} className="text-white absolute top-2 right-5">X</button>
          <UiInput />
          <button className="w-full inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800 text-white rounded-lg font-medium transition duration-300">
            ask something
          </button>
        </div>
      )}

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => {
              const success = Math.random() > 0.5; // it stimilates whether it is sucess or not success/failed
              setShowTopbar(!success);
              setShowChatbot(success);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg font-medium transition duration-300"
          >
            Test Chatbot
          </button>
          <button
            onClick={() => window.open('https://tarunkushwahaportfolio.netlify.app/', '_blank')}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-lg font-medium transition duration-300"
          >
            Integrate on Your Website
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Integration Options:</h3>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-medium text-gray-700">1. Copy-Paste the Code:</p>
            <code className="block bg-gray-200 p-3 rounded-md text-sm break-all font-mono">
              &lt;script src="https://chatbot.tarun.js"&gt;&lt;/script&gt;
            </code>
          </div>

          <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
            <p className="font-medium text-gray-700">2. Mail Instructions:</p>
            <UiInput value={email} placeholder={"Developer Email"} change={(e) => setemail(e.target.value)} />
            <button className="w-full inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800 text-white rounded-lg font-medium transition duration-300">
              Send Instructions
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleTestIntegration}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white rounded-lg font-medium transition duration-300"
          >
            Test Integration
          </button>
          <button
            onClick={() => { router.push("/companysetup") }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white rounded-lg font-medium transition duration-300"
          >
            Back
          </button>
        </div>
      </div>

      {renderIntegrationResult()}
    </div>
  );
}