"use client"
import { Context } from "../MyContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [Profiledata, setProfiledata] = useState()
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState([])
  const [dark, setdark] = useState(false)
  const [signIn, setsignIn] = useState(false)
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pwd, setPwd] = useState("");

  const themeChange = () => {
    dark ? localStorage.setItem('Theme', JSON.stringify(false)) : localStorage.setItem('Theme', JSON.stringify(true));
    setdark(prevtheme => !prevtheme)
  }

  const loadingSimulate = ()=>{
    setTimeout(() => {
      setloading(false)
    }, 3000);
  }

  useEffect(() => {
    loadingSimulate()
  }, []);

  useEffect(() => {
    const THEME = localStorage.getItem('Theme');
    const USER = localStorage.getItem('user');
    if (THEME) {
      setdark(JSON.parse(THEME));
    }
    if (USER) {
      setUser(JSON.parse(USER));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user",user)
  }, [user]);

  return (
      <Context.Provider value={{
        email, setemail, Profiledata, setProfiledata, loading, setloading,
        data, setdata, setUser,loadingSimulate,
        name, setName, pwd, user,
        setPwd, signIn, setsignIn, dark, themeChange,
      }}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </Context.Provider>
  )
}

export default ContextProvider
