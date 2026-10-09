// frontend/src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { IoMenu, IoClose, IoSunny, IoMoon } from 'react-icons/io5'; 
import { NavLink, useLocation } from 'react-router-dom';
import '../style/Navbar.css';

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Me' },
    { path: '/skills', label: 'Skills' },
    { path: '/blogs', label: 'Blogs' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') !== 'light';
    });
    const location = useLocation();

    // Synchronize theme with document attribute, storage, and custom events
    useEffect(() => {
        const currentTheme = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: currentTheme } }));
    }, [isDarkMode]);

    // Refs for the sliding capsule indicator
    const capsuleWrapperRef = useRef(null);
    const itemRefs = useRef({});
    const [sliderStyle, setSliderStyle] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        opacity: 0,
    });

    // Update capsule indicator position based on active item
    const updateSlider = () => {
        const currentPath = location.pathname;
        const activeItemEl = itemRefs.current[currentPath];
        const wrapperEl = capsuleWrapperRef.current;

        if (activeItemEl && wrapperEl) {
            const itemRect = activeItemEl.getBoundingClientRect();
            const wrapperRect = wrapperEl.getBoundingClientRect();

            setSliderStyle({
                left: itemRect.left - wrapperRect.left,
                top: itemRect.top - wrapperRect.top,
                width: itemRect.width,
                height: itemRect.height,
                opacity: 1,
            });
        } else {
            setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
        }
    };

    // Re-calculate slider position on location change or window resize
    useEffect(() => {
        updateSlider();
        const timeoutId = setTimeout(updateSlider, 60);
        window.addEventListener('resize', updateSlider);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateSlider);
        };
    }, [location.pathname]);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    const handleThemeToggle = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <header className={`nav-outer-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-pill-bar">
                {/* Brand / Logo */}
                <NavLink to="/" className="nav-brand" onClick={closeMenu}>
                    <span className="logo-sign">&lt;</span>
                    <span className="brand-name">Koushik Bhowmick</span>
                    <span className="logo-sign">/&gt;</span>
                </NavLink>

                {/* Desktop Center Pill Links Container */}
                <nav className="nav-center-capsule" ref={capsuleWrapperRef}>
                    {/* The Sliding Capsule Pill */}
                    <div
                        className="capsule-sliding-indicator"
                        style={{
                            transform: `translate3d(${sliderStyle.left}px, ${sliderStyle.top}px, 0)`,
                            width: `${sliderStyle.width}px`,
                            height: `${sliderStyle.height}px`,
                            opacity: sliderStyle.opacity,
                        }}
                    />

                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            ref={(el) => (itemRefs.current[item.path] = el)}
                            className={({ isActive }) => `nav-capsule-item ${isActive ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right Dark / Light Mode Switcher */}
                <div className="nav-right-cta">
                    <button
                        type="button"
                        className={`theme-switcher-pill ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={handleThemeToggle}
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        aria-label="Toggle theme mode"
                    >
                        <span className={`theme-pill-slider ${isDarkMode ? 'dark' : 'light'}`} />
                        <span className={`theme-pill-icon ${!isDarkMode ? 'active' : ''}`}>
                            <IoSunny size={15} />
                        </span>
                        <span className={`theme-pill-icon ${isDarkMode ? 'active' : ''}`}>
                            <IoMoon size={14} />
                        </span>
                    </button>
                </div>

                {/* Mobile Actions: Theme Switcher & Menu Toggle */}
                <div className="mobile-header-actions">
                    <button
                        type="button"
                        className={`theme-switcher-pill mobile-quick-toggle ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={handleThemeToggle}
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        aria-label="Toggle theme mode"
                    >
                        <span className={`theme-pill-slider ${isDarkMode ? 'dark' : 'light'}`} />
                        <span className={`theme-pill-icon ${!isDarkMode ? 'active' : ''}`}>
                            <IoSunny size={14} />
                        </span>
                        <span className={`theme-pill-icon ${isDarkMode ? 'active' : ''}`}>
                            <IoMoon size={13} />
                        </span>
                    </button>

                    <button
                        type="button"
                        className="mobile-nav-toggle"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
                    >
                        {isMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer / Dropdown */}
            <div className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-inner">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    <div className="mobile-drawer-theme">
                        <span className="mobile-drawer-theme-label">Theme Mode</span>
                        <button
                            type="button"
                            className={`theme-switcher-pill ${isDarkMode ? 'dark' : 'light'}`}
                            onClick={handleThemeToggle}
                            aria-label="Toggle theme mode"
                        >
                            <span className={`theme-pill-slider ${isDarkMode ? 'dark' : 'light'}`} />
                            <span className={`theme-pill-icon ${!isDarkMode ? 'active' : ''}`}>
                                <IoSunny size={15} />
                            </span>
                            <span className={`theme-pill-icon ${isDarkMode ? 'active' : ''}`}>
                                <IoMoon size={14} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;