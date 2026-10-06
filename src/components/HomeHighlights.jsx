import React from 'react';
import { Link } from 'react-router-dom';
import { FaPython, FaReact, FaNodeJs, FaJava, FaGitAlt, FaFire, FaBrain, FaArrowRight, FaGithub } from 'react-icons/fa';
import { SiMongodb, SiTensorflow, SiOpencv, SiFlask, SiArduino, SiJavascript, SiCplusplus, SiPytorch } from 'react-icons/si';
import '../style/homeHighlights.css';

const STATS = [
    { value: '6+', label: 'Projects Built' },
    { value: '20+', label: 'Technologies' },
    { value: '3', label: 'Domains: AI, Web & IoT' },
    { value: 'SIH 2026', label: 'Hackathon Project' },
];

const TECH = [
    { name: 'Python', icon: <FaPython /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'TensorFlow', icon: <SiTensorflow /> },
    { name: 'PyTorch', icon: <SiPytorch /> },
    { name: 'OpenCV', icon: <SiOpencv /> },
    { name: 'Flask', icon: <SiFlask /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'Arduino', icon: <SiArduino /> },
    { name: 'Git', icon: <FaGitAlt /> },
];

const FEATURED = [
    {
        title: 'AI Forest Fire & Smoke Detection',
        label: 'AI / Computer Vision',
        color: '#10b981',
        icon: <FaFire />,
        desc: 'Real-time wildfire and smoke detection using YOLO & MobileNet-SSD served through a Flask API.',
        tech: ['Python', 'YOLOv8', 'OpenCV', 'Flask'],
        github: 'https://github.com/devv-koushik/Fire-detecction-Flask-Group-Proj-',
    },
    {
        title: 'SIH 2026: UniScheduler AI',
        label: 'Hackathon / AI',
        color: '#f59e0b',
        icon: <FaBrain />,
        desc: 'University timetable scheduling with heuristic constraint optimization for multi-department setups.',
        tech: ['Python', 'React', 'Node.js', 'Express'],
        github: 'https://github.com/devv-koushik/SIH-2026---Unischeduler-AI',
    },
    {
        title: 'PassOP – Encrypted Password Vault',
        label: 'Full-Stack Web',
        color: '#38bdf8',
        icon: <FaReact />,
        desc: 'Credential vault with client-side hashing, reactive filtering and a persistent MongoDB backend.',
        tech: ['React', 'Express', 'MongoDB', 'Tailwind'],
        github: 'https://github.com/devv-koushik/passop',
    },
];

const HomeHighlights = () => (
    <>
        <section className="hh-section hh-stats" aria-label="Highlights">
            {STATS.map((s) => (
                <div className="hh-stat" key={s.label}>
                    <span className="hh-stat-value">{s.value}</span>
                    <span className="hh-stat-label">{s.label}</span>
                </div>
            ))}
        </section>

        <section className="hh-marquee" aria-label="Technologies">
            <div className="hh-marquee-track">
                {[...TECH, ...TECH].map((t, i) => (
                    <span className="hh-chip" key={`${t.name}-${i}`}>
                        {t.icon} {t.name}
                    </span>
                ))}
            </div>
        </section>

        <section className="hh-section hh-featured" aria-labelledby="hh-featured-title">
            <div className="hh-heading">
                <h2 id="hh-featured-title">Featured Work</h2>
                <p>A few things I've built across AI, full-stack and embedded systems.</p>
            </div>
            <div className="hh-grid">
                {FEATURED.map((p) => (
                    <article className="hh-card" key={p.title} style={{ '--accent': p.color }}>
                        <div className="hh-card-top">
                            <span className="hh-card-icon">{p.icon}</span>
                            <span className="hh-card-label">{p.label}</span>
                        </div>
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        <div className="hh-tags">
                            {p.tech.map((t) => <span key={t}>{t}</span>)}
                        </div>
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="hh-card-link">
                            <FaGithub /> View on GitHub
                        </a>
                    </article>
                ))}
            </div>
            <Link to="/about" className="hh-more">
                See all projects <FaArrowRight />
            </Link>
        </section>
    </>
);

export default HomeHighlights;
