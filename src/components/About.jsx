import React, { useState, useEffect } from 'react';
import { 
    FaDownload, FaEnvelope, FaLightbulb, FaGraduationCap, 
    FaTrophy, FaBookOpen, FaGithub,
    FaMapMarkerAlt, FaClock, FaGlobeAmericas,
    FaEye, FaFire, FaRobot, FaBrain
} from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { SiPython, SiReact, SiArduino } from 'react-icons/si';
import { Link } from 'react-router-dom';
import SpotlightCard from './SpotlightCard';
import ResumeModal from './ResumeModal';
import '../style/About.css';

const PROJECTS_DATA = [
    {
        id: 'forest-fire',
        title: 'AI Forest Fire & Smoke Detection',
        category: 'ai',
        categoryLabel: 'AI / Computer Vision',
        badgeColor: '#10b981',
        description: 'Real-time computer vision emergency warning system leveraging YOLO & MobileNet-SSD with Flask API to detect wildfire flames and smoke from aerial feeds.',
        tech: ['Python', 'YOLOv8', 'OpenCV', 'Flask', 'Deep Learning'],
        github: 'https://github.com/devv-koushik/Fire-detecction-Flask-Group-Proj-',
        icon: <FaFire color="#ef4444" />,
    },
    {
        id: 'sih-unischeduler',
        title: 'SIH 2026: UniScheduler AI & Setu',
        category: 'ai',
        categoryLabel: 'Hackathon / AI',
        badgeColor: '#f59e0b',
        description: 'Smart India Hackathon project solving multi-department university timetable scheduling with heuristic constraint optimization, paired with Setu community platform.',
        tech: ['Python', 'AI Heuristics', 'React', 'Node.js', 'Express'],
        github: 'https://github.com/devv-koushik/SIH-2026---Unischeduler-AI',
        icon: <FaBrain color="#f59e0b" />,
    },
    {
        id: 'passop',
        title: 'PassOP – Encrypted Password Vault',
        category: 'web',
        categoryLabel: 'Full-Stack Web',
        badgeColor: '#38bdf8',
        description: 'Modern credential vault featuring end-to-end client-side hashing, clipboard safety, reactive filtering, and persistent cloud MongoDB database.',
        tech: ['React', 'Tailwind CSS', 'Express', 'MongoDB', 'REST API'],
        github: 'https://github.com/devv-koushik/passop',
        icon: <SiReact color="#38bdf8" />,
    },
    {
        id: 'daily-digest',
        title: 'Daily Digest Email Automation',
        category: 'ai',
        categoryLabel: 'Python & Automation',
        badgeColor: '#a855f7',
        description: 'Automated news, weather intelligence, and personalized data scraping pipeline that compiles and dispatches scheduled newsletters with SMTP.',
        tech: ['Python', 'Pandas', 'Scikit-learn', 'SMTP', 'Cron'],
        github: 'https://github.com/devv-koushik/Daily-Digest-Email-Python-Project-',
        icon: <SiPython color="#3b82f6" />,
    },
    {
        id: 'portfolio-hub',
        title: 'Creative 3D Interactive Portfolio',
        category: 'web',
        categoryLabel: 'Creative Dev / Frontend',
        badgeColor: '#ec4899',
        description: 'High-performance portfolio hub engineered with a 2D physics gravity canvas (Matter.js), Lenis inertia scroll, Framer Motion, and a developer CLI terminal.',
        tech: ['React 19', 'Matter.js', 'Framer Motion', 'Lenis', 'REST API'],
        github: 'https://github.com/devv-koushik/Portfolio-frontend-',
        icon: <FaRobot color="#ec4899" />,
    },
    {
        id: 'smart-glasses',
        title: 'Smart Assistive Glasses Prototype',
        category: 'iot',
        categoryLabel: 'IoT & Embedded',
        badgeColor: '#06b6d4',
        description: 'Wearable navigation aid engineered with Arduino microcontroller and ultrasonic distance sensors providing real-time audio/haptic obstacle cues for the visually impaired.',
        tech: ['Arduino', 'C++', 'Ultrasonic Sensors', 'Embedded IoT'],
        github: 'https://github.com/devv-koushik',
        icon: <SiArduino color="#06b6d4" />,
    },
];

const About = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    // Live Kolkata Time (IST / UTC+5:30)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setCurrentTime(timeString);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Intersection observer for fade-in cards
    useEffect(() => {
        const cards = document.querySelectorAll('.milestone-card');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    const filteredProjects = selectedCategory === 'all'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

    return (
        <div className="about-page-wrapper">
            {/* Header Actions */}
            <div className="about-top-bar">
                <div className="about-header-actions">
                    <button className="about-action-btn view-cv-btn" onClick={() => setIsResumeOpen(true)}>
                        <FaEye /> Preview CV
                    </button>
                    <a href="/assets/My_CV.pdf" download="Koushik_Bhowmick_CV.pdf" className="about-action-btn download-btn">
                        <FaDownload /> Download CV
                    </a>
                    <Link to="/contact" className="about-action-btn contact-btn">
                        <FaEnvelope /> Contact Me
                    </Link>
                </div>
            </div>

            {/* 1. Interactive Bento Grid for About Me */}
            <section className="bento-section">
                <div className="section-title-wrap">
                    <h2><span className="accent-bar"></span> About & Engineering Profile</h2>
                    <p>Building at the convergence of Artificial Intelligence, Computer Vision, and scalable Web Systems.</p>
                </div>

                <div className="bento-grid">
                    {/* Box 1: Quick Bio & Passions (Span 7 cols) */}
                    <SpotlightCard className="bento-box bento-bio" spotlightColor="rgba(230, 57, 70, 0.15)">
                        <div className="bento-badge bio-badge">Full-Stack & AI</div>
                        <h3>Passionate Technologist Crafting Next-Gen Solutions</h3>
                        <p>
                            I am a Computer Science engineering student specializing in Artificial Intelligence.
                            My workflow bridges deep neural architectures (like YOLO & CNNs) with reactive, high-performance web frontends.
                            I take ideas from mathematical concepts to production-grade deployments.
                        </p>
                        <div className="bento-bio-tags">
                            <span className="bio-tag">🤖 Computer Vision</span>
                            <span className="bio-tag">🌐 Full-Stack Architecture</span>
                            <span className="bio-tag">⚡ Edge Inference</span>
                            <span className="bio-tag">📊 RESTful APIs</span>
                        </div>
                    </SpotlightCard>

                    {/* Box 2: Location & Live Timezone (Span 5 cols) */}
                    <SpotlightCard className="bento-box bento-location" spotlightColor="rgba(56, 189, 248, 0.15)">
                        <div className="bento-badge loc-badge">Global Availability</div>
                        <div className="location-header">
                            <FaMapMarkerAlt className="loc-icon" />
                            <div>
                                <h4>Kolkata, India</h4>
                                <span className="timezone-sub">Timezone: IST (UTC+05:30)</span>
                            </div>
                        </div>
                        <div className="live-clock-card">
                            <FaClock className="clock-icon" />
                            <span className="live-clock-time">{currentTime || '10:30:00 AM'}</span>
                            <span className="live-clock-tag">Live Local Time</span>
                        </div>
                        <div className="world-avail-pill">
                            <FaGlobeAmericas /> Available for Worldwide Remote & Hybrid Roles
                        </div>
                    </SpotlightCard>

                    {/* Box 3: University & Specialization (Span 4 cols) */}
                    <SpotlightCard className="bento-box bento-edu" spotlightColor="rgba(245, 158, 11, 0.15)">
                        <div className="bento-badge edu-badge">Education</div>
                        <FaGraduationCap className="edu-big-icon" />
                        <h4>B.Sc. in Computer Science (AI)</h4>
                        <p className="edu-univ">University of Engineering & Management (UEM Kolkata)</p>
                        <span className="edu-grad">Expected Graduation: 2028</span>
                        <div className="edu-focus">
                            <strong>Key Areas:</strong> Deep Learning, Computer Vision, DSA, Cloud & Database Systems.
                        </div>
                    </SpotlightCard>

                    {/* Box 4: Currently Exploring / Learning (Span 4 cols) */}
                    <SpotlightCard className="bento-box bento-exploring" spotlightColor="rgba(168, 85, 247, 0.15)">
                        <div className="bento-badge exp-badge">Active Radar</div>
                        <h4>Currently Exploring & Honing</h4>
                        <p className="exp-sub">Pushing boundaries with cutting-edge tooling:</p>
                        <div className="exploring-chips">
                            <span className="chip highlight">🔥 YOLOv8 & OpenCV</span>
                            <span className="chip highlight">⚡ Next.js 15 & React 19</span>
                            <span className="chip">🤖 Agentic AI & LLMs</span>
                            <span className="chip">🚀 TensorRT & Quantization</span>
                            <span className="chip">☁️ Microservices & Docker</span>
                        </div>
                    </SpotlightCard>

                    {/* Box 5: GitHub & Dev Activity (Span 4 cols) */}
                    <SpotlightCard className="bento-box bento-github" spotlightColor="rgba(16, 185, 129, 0.15)">
                        <div className="bento-badge git-badge">Coding Activity</div>
                        <div className="github-handle">
                            <FaGithub size={28} />
                            <div>
                                <h4>@devv-koushik</h4>
                                <a href="https://github.com/devv-koushik" target="_blank" rel="noreferrer">View GitHub Profile ↗</a>
                            </div>
                        </div>
                        <div className="git-metrics-grid">
                            <div className="metric-cell">
                                <span className="metric-val">15+</span>
                                <span className="metric-lbl">Repositories</span>
                            </div>
                            <div className="metric-cell">
                                <span className="metric-val">Active</span>
                                <span className="metric-lbl">Daily Streak</span>
                            </div>
                            <div className="metric-cell">
                                <span className="metric-val">DSA</span>
                                <span className="metric-lbl">LeetCode Solver</span>
                            </div>
                        </div>
                        <div className="git-motto">
                            "Building. Learning. Breaking. Fixing. Repeating."
                        </div>
                    </SpotlightCard>
                </div>
            </section>

            {/* 2. Revamped Projects Section with Filter Tabs */}
            <section className="projects-showcase-section" id="projects-showcase">
                <div className="section-title-wrap">
                    <h2><FaLightbulb style={{ color: '#e63946' }} /> Featured Engineering Projects</h2>
                    <p>Production applications, hackathon innovations, and AI research projects analyzed from GitHub repositories.</p>
                </div>

                {/* Filter Tabs */}
                <div className="project-filter-tabs">
                    <button
                        className={`filter-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All Projects ({PROJECTS_DATA.length})
                    </button>
                    <button
                        className={`filter-tab ${selectedCategory === 'ai' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('ai')}
                    >
                        AI & Computer Vision
                    </button>
                    <button
                        className={`filter-tab ${selectedCategory === 'web' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('web')}
                    >
                        Full-Stack Web
                    </button>
                    <button
                        className={`filter-tab ${selectedCategory === 'iot' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('iot')}
                    >
                        IoT & Embedded
                    </button>
                </div>

                {/* Project Cards Grid */}
                <div className="projects-grid">
                    {filteredProjects.map((proj) => (
                        <SpotlightCard
                            key={proj.id}
                            className="project-card"
                            spotlightColor="rgba(230, 57, 70, 0.16)"
                            borderColor="rgba(230, 57, 70, 0.35)"
                        >
                            <div className="project-card-header">
                                <span className="project-category-badge" style={{ borderColor: proj.badgeColor, color: proj.badgeColor }}>
                                    {proj.categoryLabel}
                                </span>
                                {proj.github && (
                                    <a
                                        href={proj.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-github-link"
                                        title="View Source on GitHub"
                                    >
                                        <FaGithub size={18} />
                                        <FaArrowUpRightFromSquare size={12} />
                                    </a>
                                )}
                            </div>

                            <div className="project-title-row">
                                <span className="proj-icon-wrap">{proj.icon}</span>
                                <h3>{proj.title}</h3>
                            </div>

                            <p className="project-desc">{proj.description}</p>

                            <div className="project-tech-tags">
                                {proj.tech.map((t) => (
                                    <span key={t} className="tech-badge">{t}</span>
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </section>

            {/* 3. Tech Milestones, Awards & Certifications (Replacing High School Marks) */}
            <section className="milestones-section">
                <div className="section-title-wrap">
                    <h2><FaTrophy style={{ color: '#f59e0b' }} /> Tech Milestones & Achievements</h2>
                    <p>Recognitions, competitive problem solving, and research presentations.</p>
                </div>

                <div className="milestones-grid">
                    {/* Tech Milestones */}
                    <div className="milestone-card">
                        <h3><FaTrophy style={{ color: '#f59e0b', marginRight: '8px' }} /> Milestones & Competitions</h3>
                        <ul className="milestone-list">
                            <li>
                                <strong>SIH 2026 Internal Round Finalist:</strong> Qualified with UniScheduler AI constraint timetable solver.
                            </li>
                            <li>
                                <strong>Active Open Source & GitHub Contributor:</strong> Consistently shipping repositories at @devv-koushik.
                            </li>
                            <li>
                                <strong>LeetCode Problem Solver:</strong> Active practice across Data Structures, Dynamic Programming & Algorithms.
                            </li>
                            <li>
                                <strong>Paper Presentation:</strong> Presented research paper on <em>"NANOTECH FOR GREEN FUTURE"</em> at UEM.
                            </li>
                            <li>
                                <strong>International Karate Participant:</strong> Represented at international martial arts tournament.
                            </li>
                        </ul>
                    </div>

                    {/* Certifications with Verified Links */}
                    <div className="milestone-card">
                        <h3><FaBookOpen style={{ color: '#38bdf8', marginRight: '8px' }} /> Certified Coursework (NPTEL)</h3>
                        <ul className="milestone-list">
                            <li>
                                <div>
                                    <strong>Developing Soft Skills and Personality (IIT Kanpur)</strong>
                                    <span className="cert-sub">NPTEL Verified</span>
                                </div>
                                <a
                                    href="/assets/Documents/Developing Soft Skills and Personality.pdf"
                                    download="Koushik_NPTEL_SoftSkills.pdf"
                                    className="cert-download-link"
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Download Certificate"
                                >
                                    <FaDownload /> PDF
                                </a>
                            </li>
                            <li>
                                <div>
                                    <strong>Introduction to Programming in C (IIT Kharagpur)</strong>
                                    <span className="cert-sub">NPTEL Verified</span>
                                </div>
                                <a
                                    href="/assets/Documents/Introduction to Programming in C.pdf"
                                    download="Koushik_NPTEL_C_Programming.pdf"
                                    className="cert-download-link"
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Download Certificate"
                                >
                                    <FaDownload /> PDF
                                </a>
                            </li>
                            <li>
                                <div>
                                    <strong>Introduction to Java Programming (NPTEL)</strong>
                                    <span className="cert-sub">Coursework Completed</span>
                                </div>
                                <span className="cert-completed-tag">Verified</span>
                            </li>
                            <li>
                                <div>
                                    <strong>The Joy of Computing Using Python (NPTEL)</strong>
                                    <span className="cert-sub">Coursework Completed</span>
                                </div>
                                <span className="cert-completed-tag">Verified</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* In-page Resume Modal */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>
    );
};

export default About;