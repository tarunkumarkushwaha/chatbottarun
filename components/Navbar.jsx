"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Context } from '@/MyContext';
import { useContext } from 'react';
import { toast } from "react-toastify";

const Navbar = () => {
    const [menu, setmenu] = useState(false);
    const [width, setwidth] = useState(false);
    const router = useRouter()
    const { user, setUser } = useContext(Context);

    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            setwidth(window.innerWidth);
            setmenu(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <header className="sticky top-0 z-20">
                <nav className="navColor sticky top-0 z-20 px-4 md:px-auto min-h-20">
                    <button
                        className="absolute top-5 left-4 md:hidden flex duration-200"
                        onClick={() => setmenu(!menu)}
                    >
                        <Image
                            className={`duration-200 h-8 w-8 ${menu ? "rotate-180" : "rotate-0"}`}
                            src="/Assets/icons/menu.png"
                            alt="Menu"
                            width={180}
                            height={38}
                            priority
                        />
                    </button>
                    <div className="flex md:flex-row flex-col md:justify-between justify-center items-center">
                        <div
                            className="m-4 cursor-pointer p-1 md:ml-0 ml-4 md:pl-0 pl-10 text-2xl flex justify-center items-center font-extrabold"
                            onClick={() => {
                                router.push("/");
                            }}
                        >
                            <h1>Chat bot Tarun</h1>
                        </div>
                        {menu && <div className="smooth-entry flex md:flex-row flex-col md:justify-between items-center justify-center">
                            <div className={`flex md:flex-row flex-col items-center`}>
                                <Link className={`text-lg p-4 ${pathname=="/"?"text-cyan-700":""}`} href={`/`}>
                                    home
                                </Link>
                                {user ? <>
                                    <Link className={`text-lg p-4 ${pathname=="/companysetup"?"text-cyan-700":""}`} href={`/companysetup`}>
                                        setup
                                    </Link>
                                    <button
                                        className={`text-lg p-4 `}
                                        onClick={() => { setUser(null); width < 768 && setmenu(false); toast.success("user logged out successfully") }}>
                                        logout</button>
                                </>
                                    :
                                    <>
                                        <button
                                            className={`text-lg p-4 ${pathname=="/login"?"text-cyan-700":""}`}
                                            onClick={() => router.push('/login')}
                                        >
                                            login
                                        </button>
                                    </>
                                }
                                <div className="flex items-center m-2">
                                    <input type="search"
                                        className="block md:mb-0 mb-4 outline-none w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search" />
                                </div>
                            </div>

                        </div>}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;

