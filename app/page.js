"use client"
import Image from "next/image";
import ImageSlider from "@/components/ImageSlider";
import FAQ from "@/components/Faq";
import Link from "next/link";
import { Context } from '@/MyContext';
import { useContext } from 'react';

export default function Home() {
    const {  user } = useContext(Context);

  return (
    <>
      <ImageSlider />
      <div className="flex flex-col justify-center items-center gap-6 py-10 px-6 transform transition-all duration-300 animate-modalEnter">
        <p className="p-6 text-center text-xl font-semibold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg max-w-3xl mx-auto">
          Make your site awesome with
          <span className="text-blue-600 font-extrabold"> Chat Bot Tarun</span>
        </p>
        {user ? <Link
          href="/companysetup"
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-white font-bold"> Go to Setup</span>
        </Link>:
        <Link
        href="/login"
        className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <span className="text-white font-bold"> Login</span>
      </Link>
        }

        <FAQ />
      </div>

    </>
  );
}
