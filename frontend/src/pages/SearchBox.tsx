// General Imports
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
// Style
import '../styles/searchBox.sass'
// React Icons
import { CiSearch } from "react-icons/ci";

export default function SearchBox() {
    // Save Query
    const [query, setQuery] = useState("")
    // Navigate to another path
    const navigate = useNavigate()
    // Search product
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`items?search=${query}`)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <img src={Logo} data-testid='logo' className='logo' alt='logo-ml' onClick={() => navigate("/")}/>
            <div className='search-bar-container'>
                <input data-testid="input-form" type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Nunca dejes de buscar' />
                <button aria-label="search" data-testid="button-form" type='submit'><CiSearch className='searchIcon'/></button>
            </div>
        </form>
    )
}
