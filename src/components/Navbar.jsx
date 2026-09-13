// frontend/src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
// Import the Menu and Close icons for the toggle button
import { IoMenu, IoClose } from 'react-icons/io5'; 
import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
    // State to handle the scroll effect (already present)
    const [scrolled, setScrolled] = useState(false);
    
    // NEW STATE: To toggle the mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    // Scroll effect logic (kept as is)
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    
    // NEW FUNCTION: Toggles the mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Helper function to close the menu on link click
    const closeMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        // The main container. The 'active-menu' class will be added for the overlay effect.
        <div className={`sidebar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'active-menu' : ''}`}> 
            
            {/* The existing desktop header part. You might want to restructure this to be just the logo. */}
            <div className="hamburger">
                {/* Removed the extra ham spans as the main nav is below */}
                <span className="ham logo-text">
                    <span className='logo-sign'>&lt;</span>
                    Koushik Bhowmick
                    <span className='logo-sign'>/&gt;</span>
                    </span>
                    
            </div>
            
            {/* Main Navigation Links. Add 'active' class when menu is open */}
            <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}> 
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>About Me</NavLink>
                <NavLink to="/skills" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Skills</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Contact</NavLink>
                <NavLink to="/blogs" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Blogs</NavLink>
            </nav>
            
            {/* The Hamburger/Close Icon (NewHam) */}
            <span className='NewHam' onClick={toggleMenu}>
                {/* Use the toggle state to switch icons */}
                {isMenuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
            </span>
            
        </div>
    );
};

export default Navbar;