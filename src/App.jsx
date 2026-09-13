import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/home';
import About from './components/About';
import Skills from './components/skill';
import Contact from './components/contact';
import Blogs from './components/blog';
import Lenis from '@studio-freight/lenis';

// Navigation order for directional slide animation
const routeOrder = {
    '/': 0,
    '/about': 1,
    '/skills': 2,
    '/contact': 3,
    '/blogs': 4,
};

// Tracks whether navigation is going forward (+1) or backward (-1)
let currentNavDirection = 1;

const animations = {
    initial: () => ({
        opacity: 0,
        x: currentNavDirection > 0 ? 100 : -100,
    }),
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: () => ({
        opacity: 0,
        x: currentNavDirection > 0 ? -100 : 100,
    }),
};

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

const RouteContainer = () => {
    const location = useLocation();
    const prevPathRef = useRef(location.pathname);

    // Dynamically calculate navigation direction before animation runs:
    // Moving next: slides right-to-left (+1)
    // Moving previous: slides left-to-right (-1)
    if (location.pathname !== prevPathRef.current) {
        const prevIndex = routeOrder[prevPathRef.current] ?? 0;
        const currIndex = routeOrder[location.pathname] ?? 0;
        currentNavDirection = currIndex >= prevIndex ? 1 : -1;
        prevPathRef.current = location.pathname;
    }

    // Re-initialize Lenis on every route change so scroll height
    // is recalculated for the new page and scroll position resets to top.
    // Skip Lenis on /contact — that page has no scroll by design.
    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.pathname === '/contact') return; // no smooth scroll on contact

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
                <Route path="/skills" element={<AnimatedPage><Skills /></AnimatedPage>} />
                <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
                <Route path="/blogs" element={<AnimatedPage><Blogs /></AnimatedPage>} />
            </Routes>
        </AnimatePresence>
    );
};


const App = () => {
    return (
        <Router>
            <Navbar />
            <RouteContainer />
        </Router>
    );
};

export default App;
