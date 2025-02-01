"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Context } from '@/MyContext';
import { useContext } from 'react';
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import UiInput from "@/components/UIcomponents/UiInput";

const dummyPages = [
  { url: "https://tarunkushwahaportfolio.netlify.app/", status: "Scraped", chunks: ["section 1", "Section 2"] },
  { url: "https://tarunkushwahaportfolio.netlify.app/page2", status: "Pending", chunks: [] },
  { url: "https://tarunkushwahaportfolio.netlify.app/page3", status: "Scraped", chunks: ["Chunk A", "Chunk B", "Chunk C"] },
];

const CompanySetup = () => {
  const [companyName, setCompanyName] = useState("");
  const [LoadingMeta, setLoadingMeta] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [metaDescription, setMetaDescription] = useState("");
  const [url, setUrl] = useState("");

  const router = useRouter()

  const { user } = useContext(Context);

  const handleFetchMetaDescription = async () => {
    if (!url) {
      toast.error("url empty")
      return
    }
    try {
      setLoadingMeta(true)
      const response = await fetch(`api/fetchMeta?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setMetaDescription(data.description);
      setLoadingMeta(false)
      toast.success("data fetched")
    } catch (error) {
      setMetaDescription("Error fetching data.");
      toast.error( error);
    }
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user])

  if (!user) {
    return <div className="flex justify-center flex-col text-xl text-blue-800 h-screen items-center">
      <Loader />
      <p className="">loading...</p>
    </div>
  }

  return (
    <div className="p-4 m-2 rounded-lg max-w-3xl mx-auto bg-gray-100 min-h-screen"> 
      <div className="bg-white shadow rounded-lg p-6 mb-6"> 
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Company Setup</h2>
        <div className="space-y-4">
          <UiInput placeholder="Company Name" value={companyName} change={(e) => setCompanyName(e.target.value)} />
          <UiInput placeholder="Company Website URL" value={url} change={(e) => setUrl(e.target.value)} />
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg w-full transition duration-300"
            onClick={handleFetchMetaDescription}
            disabled={LoadingMeta}
          >
            {LoadingMeta ? <Loader/> : "Fetch Data"}
          </button>

          {LoadingMeta ? <div className="flex justify-center items-center mt-4"> <Loader /> <p className="ml-2 text-gray-600">Loading metadata, please wait...</p></div> : <textarea
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            placeholder="Company Description"
            rows="4"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6"> 
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Scraped Webpages</h2> 
        {LoadingMeta ? <div className="flex justify-center items-center mt-4"> <Loader /> </div> : <ul className="space-y-3"> 
          {dummyPages.map((page, index) => (
            <li
              key={index}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300" 
              onClick={() => handlePageClick(page)}
            >
              <div className="truncate w-3/4 mr-2">{page.url}</div> 
              <span
                className={`px-3 py-1 text-sm rounded-lg ${page.status === "Scraped" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {page.status}
              </span>
            </li>
          ))}
        </ul>}
      </div>

      {/* Modal */}
      {selectedPage && (
        <div className="fixed smooth-entry inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> 
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"> 
            <h3 className=" mb-4 text-indigo-600"> 
              Data Chunks for {selectedPage.url}
            </h3>
            <ul className="space-y-3"> 
              {selectedPage.chunks.map((chunk, index) => (
                <li key={index} className="p-3 border rounded-lg bg-gray-50 transition duration-300">
                  {chunk}
                </li>
              ))}
              {selectedPage.chunks.length === 0 && (
                <p className="text-gray-500">No chunks available.</p>
              )}
            </ul>
            <div className="mt-6 flex justify-end"> 
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg transition duration-300" /* Improved button style */
                onClick={() => setSelectedPage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4"> {/* Improved spacing */}
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg w-full sm:w-auto transition duration-300 hover:bg-gray-50"> {/* Improved button style */}
          Wait for Training
        </button>
        <button
          onClick={() => { router.push("/companysetup/chatbotintegration") }}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto transition duration-300" /* Improved button style */
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompanySetup;