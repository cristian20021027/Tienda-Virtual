import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const ResponsiveMenu = ({open}) =>{
    return (
    <AnimatePresence mode="wait">
{
    open && (
        <motion.div 
        initial={{opacity:0, y:-100}}
        animate={{opacity:1, y: 0}}
        exit={{opacity:0, y:-100}}
        className="fixed  top-20 let-0 w-full h-screen z-40"
        >
        <div className="text-xl font-semibold uppercase bg-zinc-900 text-white py-10  ">
            <ul className="flex flex-col justify-center items-center gap-10">
                <li><a href="/">home</a></li>
                <li><a href="/gorras">Gorras</a></li>
                <li>Service</li>
                <li>Contact</li>
                <li><a href="/login">Login</a></li>
            </ul>
        </div>
        </motion.div>

    )
}
        </AnimatePresence>
    )
}
export default ResponsiveMenu;