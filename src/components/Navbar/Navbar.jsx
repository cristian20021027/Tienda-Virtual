import React from "react";
import { NavbarMenu } from "../../mockData/data";
import { CiSearch } from "react-icons/ci";
import { GiBilledCap } from "react-icons/gi";
import {MdMenu} from "react-icons/md";
import {PiShoppingCartThin} from "react-icons/pi";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link } from 'react-router-dom';
import { useCart } from "../../context/context"; // Importa el hook del carrito

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const { totalItems } = useCart(); // Obtiene el total de items del carrito

    return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50">
        <div className="bg-zinc-900 p-6 flex justify-between items-center py-5">
            {/* LOGO*/}
            <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                <GiBilledCap className="text-white"/>
                <p className="text-white">Coders</p>
                <p className="text-red-600">Gym</p>
            </div>
            {/* MENU*/}
            <div className="hidden md:block">
                <ul className="flex item-center gap-6 text-white">
                    {NavbarMenu.map((item)=>{
                        return <li key={item.id}>
                            <a href={item.link} className="incline-block py-1 px- hover:text-red-600 font-bold uppercase duration-600">
                                {item.tittle}
                            </a>
                        </li>;
                    })}
                </ul>
            </div>
            {/* ICONS */}
            <div className="flex items-center gap-4 text-white">
                <Link 
                    to="/cart" 
                    className="text-2xl hover:bg-red-600 hover:text-white rounded-full p-2 duration-600 relative "
                >
                    <PiShoppingCartThin/>
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>
                <Link 
                    to="/login" 
                    className="hover:bg-red-600 text-white font-semibold hover:text-white rounded-md border-2 border-red-600 duration-300 py-2 px-6 hidden md:block"
                >
                    Login
                </Link>
            </div>
            {/* MOBILE */}
            <div className="md:hidden" onClick={()=> setOpen(!open)}>
                <MdMenu className="text-white text-4xl"/>
            </div>
        </div>
    </nav>
    {/* MOBILE NAV*/}
    <ResponsiveMenu open={open}/>
    </> 
    )
}

export default Navbar;