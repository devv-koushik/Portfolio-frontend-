import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaNodeJs, FaBrain, FaCheckCircle } from "react-icons/fa";
import {
  SiC, SiCplusplus, SiJavascript, SiMysql, SiMongodb,
  SiTensorflow, SiPytorch, SiOpencv, SiDjango, SiFlask,
  SiArduino, SiPostman, SiTailwindcss
} from "react-icons/si";
import "../style/skill.css";

const SKILLS = [
  { name: "Python", icon: <FaPython color="#3b82f6" /> },
  { name: "C", icon: <SiC color="#94a3b8" /> },
  { name: "C++", icon: <SiCplusplus color="#0284c7" /> },
  { name: "Java", icon: <FaJava color="#ea580c" /> },
  { name: "JavaScript", icon: <SiJavascript color="#eab308" /> },
  { name: "React", icon: <FaReact color="#38bdf8" /> },
  { name: "HTML5", icon: <FaHtml5 color="#f97316" /> },
  { name: "CSS3", icon: <FaCss3Alt color="#2563eb" /> },
  { name: "Tailwind", icon: <SiTailwindcss color="#06b6d4" /> },
  { name: "Node.js", icon: <FaNodeJs color="#22c55e" /> },
  { name: "MongoDB", icon: <SiMongodb color="#16a34a" /> },
  { name: "MySQL", icon: <SiMysql color="#0284c7" /> },
  { name: "Git", icon: <FaGitAlt color="#f43f5e" /> },
  { name: "YOLO / CNN", icon: <FaBrain color="#ec4899" /> },
  { name: "OpenCV", icon: <SiOpencv color="#8b5cf6" /> },
  { name: "TensorFlow", icon: <SiTensorflow color="#f97316" /> },
  { name: "PyTorch", icon: <SiPytorch color="#ef4444" /> },
  { name: "Flask", icon: <SiFlask color="#cbd5e1" /> },
  { name: "Arduino", icon: <SiArduino color="#06b6d4" /> },
  { name: "Postman", icon: <SiPostman color="#f97316" /> },
];

const SKILL_CATEGORIES = [
  {
    category: "Core Stack (Daily Use)",
    description: "Languages and core frontend technologies used daily for architecture and development.",
    items: [
      { name: "Python", proof: "Daily Digest & Forest Fire AI" },
      { name: "JavaScript (ES6+) & React 19", proof: "Portfolio & PassOP App" },
      { name: "C & C++", proof: "DSA & Smart Glasses Embedded" },
      { name: "Git & Version Control", proof: "Active shipping at @devv-koushik" },
      { name: "HTML5 & Modern CSS / Tailwind", proof: "Responsive Web Apps" },
    ],
  },
  {
    category: "AI, ML & Computer Vision",
    description: "Neural network architectures, computer vision pipelines, and optimization algorithms.",
    items: [
      { name: "YOLOv8 & MobileNet-SSD", proof: "Forest Fire Real-time Alert AI" },
      { name: "OpenCV Computer Vision", proof: "Image & video stream processing" },
      { name: "Deep Learning (CNNs)", proof: "Object classification & detection" },
      { name: "TensorFlow & PyTorch", proof: "Model training and inference" },
      { name: "Constraint Solvers / Heuristics", proof: "SIH 2026 UniScheduler AI" },
    ],
  },
  {
    category: "Backend & Cloud Databases",
    description: "API servers, asynchronous queues, and persistent data layers.",
    items: [
      { name: "Node.js & Express", proof: "PassOP backend server" },
      { name: "Flask & Python REST APIs", proof: "Forest Fire real-time inference API" },
      { name: "MongoDB & Mongoose", proof: "Encrypted password storage & blogs" },
      { name: "MySQL & Relational DBs", proof: "Structured schemas & queries" },
      { name: "Postman & API Design", proof: "Endpoint testing & verification" },
    ],
  },
  {
    category: "Hardware, IoT & DevOps",
    description: "Embedded microcontrollers, hardware sensors, deployment pipelines, and developer tooling.",
    items: [
      { name: "Arduino & Ultrasonic Sensors", proof: "Smart Assistive Glasses Prototype" },
      { name: "Linux / Bash Shell", proof: "Environment scripts & automation" },
      { name: "Vercel & Render Cloud", proof: "Production CI/CD deployments" },
      { name: "VS Code & Debugging Tooling", proof: "Daily development environment" },
    ],
  },
];

export default function Skills() {
  const stageRef = useRef();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const circles = Array.from(stage.querySelectorAll(".skill-circle"));
    const rect = stage.getBoundingClientRect();
    const placed = [];

    const isOverlapping = (x, y, size) =>
      placed.some((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) < p.size / 2 + size / 2 + 15;
      });

    circles.forEach((circle) => {
      const size = circle.offsetWidth;
      let x, y, tries = 0;
      do {
        x = Math.random() * (rect.width - size - 20);
        y = Math.random() * (rect.height - size - 20);
        tries++;
      } while (isOverlapping(x, y, size) && tries < 150);

      placed.push({ x, y, size });
      circle.style.left = `${Math.max(10, x)}px`;
      circle.style.top = `${Math.max(10, y)}px`;

      const dx = (Math.random() - 0.5) * 80;
      const dy = (Math.random() - 0.5) * 80;
      circle.animate(
        [{ transform: "translate(0, 0)" }, { transform: `translate(${dx}px, ${dy}px)` }],
        {
          duration: 4500 + Math.random() * 2000,
          direction: "alternate",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  }, []);

  return (
    <section className="skills-container" id="skills">
      {/* Header */}
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Technical Stack & Expertise</h2>
        <div className="skills-title-line"></div>
        <p>
          Harmonized competencies across Artificial Intelligence, Computer Vision, Full-Stack Web Development, and Embedded IoT.
        </p>
      </motion.div>

      {/* Floating Physics Orbs Stage */}
      <motion.div
        className="skills-stage"
        ref={stageRef}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
            whileHover={{
              scale: 1.25,
              zIndex: 10,
            }}
          >
            <div className="orb-icon-wrapper">
              {s.icon}
            </div>
            <span className="orb-name">{s.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Structured Skills Categories with Practical Proof Badges */}
      <div className="skills-categories-grid">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.category}
            className="skill-category-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="cat-card-header">
              <h3>{cat.category}</h3>
              <p>{cat.description}</p>
            </div>
            <ul className="cat-items-list">
              {cat.items.map((item) => (
                <li key={item.name} className="cat-item-row">
                  <div className="item-name-wrap">
                    <FaCheckCircle className="item-check-icon" />
                    <span className="item-title">{item.name}</span>
                  </div>
                  {item.proof && (
                    <span className="item-proof-badge" title="Applied in production / project">
                      {item.proof}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}