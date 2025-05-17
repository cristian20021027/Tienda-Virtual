import React from "react";
import { GiBilledCap } from "react-icons/gi";
import "../Navbar/navbar.css"

const Footer =()=>{
    return(
        <>
        

<footer className="bg-white shadow-sm dark:bg-zinc-900 border-t-2 border-red-500">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
             <div className="logo text-2xl flex items-center gap-2 ">
                        <GiBilledCap className="text-white "/>
                            <p className="text-white">Street</p>
                            <p className="text-red-600">Cap</p>
                        </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" className="hover:underline">Street-Cap™</a>. All Rights Reserved.</span>
    </div>
</footer>


        </>
    )
}
export default Footer;