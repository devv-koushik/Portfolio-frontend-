import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaGitAlt } from "react-icons/fa";
import { SiC, SiCplusplus, SiJavascript, SiMysql, SiMongodb, SiTensorflow, SiPytorch, SiOpencv ,SiDjango,
  SiFlask } from "react-icons/si";
import "../style/skill.css";

const SKILLS = [
  { name: "Python", icon: <FaPython color="#3776AB" /> },
  { name: "C", icon: <SiC color="#A8B9CC" /> },
  { name: "C++", icon: <SiCplusplus color="#00599C" /> },
  { name: "Java", icon: <FaJava color="#007396" /> },
  { name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
  { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "React", icon: <FaReact color="#61DAFB" /> },
  { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "Git", icon: <FaGitAlt color="#F05032" /> },
  { name: "TensorFlow", icon: <SiTensorflow color="#FF6F00" /> },
  { name: "PyTorch", icon: <SiPytorch color="#EE4C2C" /> },
  { name: "OpenCV", icon: <SiOpencv color="#5C3EE8" /> },
  { name: "Django", icon: <SiDjango color="#217555ff" /> },
  { name: "Flask", icon: <SiFlask color="#A8B9CC" /> },
];


const ROWS = [
  [
    { title: "Programming Languages", items: ["Python", "C", "C++"] },
    { title: "Web Technologies", items: ["HTML", "CSS", "JavaScript", "React"] },
    { title: "Databases & Tools", items: ["MySQL", "MongoDB", "Git"] },
    { title: "Frameworks & Libraries", items: ["TensorFlow", "PyTorch", "OpenCV"] },
  ],
  [
    {
      title: "Core Concepts",
      items: [
        "Data Structures & Algorithms",
        "Machine Learning",
        "Deep Learning (CNN)",
        "YOLO Object Detection",
      ],
    },
    {
      title: "Soft Skills",
      items: ["Teamwork", "Problem Solving", "Creativity", "Adaptability", "Communication"],
    },
  ],
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
        return Math.sqrt(dx * dx + dy * dy) < p.size / 2 + size / 2 + 20;
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
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      circle.animate(
        [{ transform: "translate(0, 0)" }, { transform: `translate(${dx}px, ${dy}px)` }],
        {
          duration: 5000 + Math.random() * 2000,
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
        transition={{ duration: 1 }}
      >
        <h2 style={{ fontSize: '3rem', color: '#ef4444', fontWeight: 600, marginBottom: '0.75rem' }}>My Skills</h2>
        <div style={{ width: '7rem', height: '2px', background: '#ef4444', margin: '0 auto 1.5rem' }}></div>
        <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '36rem', margin: '0 auto' }}>
          ✨ Technical expertise blended with creativity — explore my core competencies below.
        </p>
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        className="skills-stage relative mx-auto mb-20"
        ref={stageRef}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "550px",
          borderRadius: "25px",
          background: "radial-gradient(circle at 50% 50%, #0a0a0a, #101010)",
          overflow: "hidden",
          boxShadow: "inset 0 0 60px rgba(0,255,255,0.07)",
          position: "relative",
        }}
      >
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
            whileHover={{
              scale: 1.3,
              boxShadow: "0 0 35px 10px rgba(0,255,255,0.6)",
              background: "rgba(0,255,255,0.12)",
            }}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,255,255,0.06)",
              border: "1px solid rgba(147, 218, 49, 0.25)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              transition: "box-shadow 0.4s ease, background 0.4s ease",
            }}
          >
            {/* 💡 CORRECTION: Render s.icon directly instead of using motion.img with s.logo */}
            <motion.div
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px", // Size the icon using font-size
                filter: "drop-shadow(0 0 8px rgba(0,255,255,0.4))",
                marginBottom: "5px",
              }}
              whileHover={{
                filter: "drop-shadow(0 0 12px rgba(0,255,255,0.9)) brightness(1.6)",
                rotate: [0, 6, -6, 0],
                transition: { duration: 0.5 },
              }}
            >
              {s.icon} {/* This renders the React Icon component */}
            </motion.div>
            
            <span
              style={{
                color: "rgba(255,200,200,0.9)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.3px",
              }}
            >
              {s.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Table */}
      <div className="skills-table">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="skills-row">
            {row.map((col, colIndex) => (
              <motion.div
                key={col.title}
                className="skill-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.6,
                  delay: (rowIndex + colIndex) * 0.1,
                }}
              >
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item, i) => (
                    <motion.li key={i} whileHover={{ x: 6, color: "#ff0048" }}>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}