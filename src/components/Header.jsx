import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
   <nav className=' flex items-center justify-around w-screen py-5 gap-10'>
    <NavLink className="text-5xl font-semibold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent " to="/">PasteVault</NavLink>
    <div className=' flex gap-10 text-2xl font-normal'>
    <NavLink to="/"  className={({ isActive }) =>
          isActive ? "      bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent       underline font-medium" : "text-gray-300"
        }>Home</NavLink>
    <NavLink  className={({isActive})=>
    isActive ? "         bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text   text-transparent      underline font-medium" : "text-gray-300"}  to="/pastes"    >Pastes</NavLink>
    </div>
   
   </nav>
  )
}
