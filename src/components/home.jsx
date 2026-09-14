import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaInstagram, FaEye } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import TypingEffect from '../JS/TypingEffect';
import '../style/home.css';
import MatterCanvas from '../JS/Matter';
import ResumeModal from './ResumeModal';

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotY = (x / (rect.width / 2)) * 12;
        const rotX = -(y / (rect.height / 2)) * 12;
        setTilt({ rotX, rotY });
    };

    const handleMouseLeave = () => {
        setTilt({ rotX: 0, rotY: 0 });
    };

    return (
        <div className="home-wrapper">
            {!isMobile && <MatterCanvas />}

            <div className="main">
                <div className="infocontiner">
                    <div className="devinfo">
                        {/* Live Status Indicator */}
                        <div className="status-badge">
                            <span className="status-dot">
                                <span className="status-ping"></span>
                                <span className="status-core"></span>
                            </span>
                            <span className="status-text">Open to Internships & Freelance Opportunities</span>
                        </div>

                        <div className="hello">Hi, I'm</div>
                        <div className="name">Koushik Bhowmick</div>
                        <div className="about">
                            <TypingEffect />
                        </div>
                        <div className="moreabout">
                            Full-Stack Developer & AI Enthusiast crafting responsive web experiences and intelligent computer vision applications. B.Sc. in Computer Science (AI) at UEM.
                        </div>

                        <div className="social-icons">
                            <a href="https://www.linkedin.com/in/koushik-bhowmick-a832a5319/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://github.com/devv-koushik" target="_blank" rel="noopener noreferrer" title="GitHub Profile">
                                <FaGithub />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter Profile">
                                <FaXTwitter />
                            </a>
                            <a href="https://www.instagram.com/koushik.me_/" target="_blank" rel="noopener noreferrer" title="Instagram Profile">
                                <FaInstagram />
                            </a>
                        </div>

                        <div className="buttons">
                            <a href="/assets/My_CV.pdf" download="Koushik_Bhowmick_CV.pdf" target="_blank" className="btn" data-text="Download CV" rel="noopener noreferrer">
                                Download CV
                            </a>
                            <button
                                type="button"
                                className="btn btn-preview"
                                data-text="Preview CV"
                                onClick={() => setIsResumeOpen(true)}
                            >
                                <FaEye style={{ marginRight: '6px' }} /> Preview CV
                            </button>
                        </div>
                    </div>

                    {/* 3D Parallax Tilt Profile Photo */}
                    <div
                        className="devpic"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
                        }}
                    >
                        <img alt="Koushik Bhowmick" src="/assets/mee.jpeg" decoding="async" />
                    </div>
                </div>
            </div>

            <footer>
                <div className="bottom-text">
                    <p>Copyright © {new Date().getFullYear()} Koushik Bhowmick. All rights reserved.</p>
                </div>
            </footer>

            {/* In-page Resume Modal Viewer */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>
    );
};

export default Home;