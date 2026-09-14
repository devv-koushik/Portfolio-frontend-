import React, { useState, useEffect, useRef } from 'react';
import { FaTerminal, FaTimes, FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import '../style/DeveloperTerminal.css';

const COMMAND_LIST = [
    { cmd: 'help', desc: 'Display all available terminal commands' },
    { cmd: 'projects', desc: 'List featured AI & Full-Stack engineering projects' },
    { cmd: 'skills', desc: 'Show technical skills breakdown across AI, Web & Tools' },
    { cmd: 'about', desc: 'Display background, education, and career bio' },
    { cmd: 'contact', desc: 'Get direct email, LinkedIn, and social links' },
    { cmd: 'cv', desc: 'Download or view Koushik Bhowmick\'s CV / Resume' },
    { cmd: 'whoami', desc: 'Print visitor identity and session info' },
    { cmd: 'matrix', desc: 'Toggle matrix digital stream mode' },
    { cmd: 'sudo', desc: 'Attempt superuser authorization' },
    { cmd: 'clear', desc: 'Clear the terminal screen buffer' },
    { cmd: 'exit', desc: 'Close this developer terminal' },
];

const QUICK_ACTIONS = ['help', 'projects', 'skills', 'about', 'contact', 'cv', 'matrix', 'clear'];

const DeveloperTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        {
            type: 'system',
            text: '⚡ Koushik Bhowmick Portfolio Terminal [v2.4.0-release]\nType "help" or click the quick pills below to explore commands.\nKeyboard shortcut: [Ctrl + K] / [Cmd + K] to toggle.',
        },
    ]);
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const [matrixActive, setMatrixActive] = useState(false);

    const inputRef = useRef(null);
    const bodyRef = useRef(null);

    // Global shortcut Ctrl+K / Cmd+K & Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            } else if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 80);
        }
    }, [isOpen]);

    // Auto-scroll to bottom on new lines
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history, matrixActive]);

    const executeCommand = (rawCmd) => {
        const trimmed = rawCmd.trim();
        if (!trimmed) return;

        // Record in command history
        setCmdHistory((prev) => [...prev, trimmed]);
        setHistoryIdx(-1);

        const [command, ...args] = trimmed.toLowerCase().split(' ');

        // Add user command line to screen
        const newEntry = { type: 'user', text: `koushik@terminal:~$ ${trimmed}` };
        let responseEntry = null;

        switch (command) {
            case 'help':
                responseEntry = {
                    type: 'output',
                    text: (
                        <div className="term-table">
                            <div className="term-help-title">Available Commands:</div>
                            {COMMAND_LIST.map((c) => (
                                <div key={c.cmd} className="term-help-row">
                                    <span className="term-help-cmd">{c.cmd.padEnd(10, ' ')}</span>
                                    <span className="term-help-desc">{c.desc}</span>
                                </div>
                            ))}
                        </div>
                    ),
                };
                break;

            case 'projects':
                responseEntry = {
                    type: 'output',
                    text: (
                        <div className="term-projects-list">
                            <div className="term-accent-title">🚀 Featured Projects:</div>
                            <div className="term-proj-item">
                                <span className="badge ai">AI / Vision</span> <strong>Forest Fire & Smoke Detection AI</strong>
                                <p>Real-time computer vision system using YOLO & MobileNet-SSD with Flask.</p>
                                <a href="https://github.com/devv-koushik/Fire-detecction-Flask-Group-Proj-" target="_blank" rel="noreferrer">↳ GitHub: Fire-detecction-Flask-Group-Proj-</a>
                            </div>
                            <div className="term-proj-item">
                                <span className="badge hack">Hackathon</span> <strong>SIH 2026: UniScheduler AI & Setu App</strong>
                                <p>AI constraint solver for university timetables & community service platform.</p>
                                <a href="https://github.com/devv-koushik/SIH-2026---Unischeduler-AI" target="_blank" rel="noreferrer">↳ GitHub: SIH-2026---Unischeduler-AI</a>
                            </div>
                            <div className="term-proj-item">
                                <span className="badge web">Full-Stack</span> <strong>PassOP - Encrypted Password Vault</strong>
                                <p>Full-stack credential manager built with React, Tailwind, Express & MongoDB.</p>
                                <a href="https://github.com/devv-koushik/passop" target="_blank" rel="noreferrer">↳ GitHub: passop</a>
                            </div>
                            <div className="term-proj-item">
                                <span className="badge auto">Automation</span> <strong>Daily Digest Intelligent Emailer</strong>
                                <p>Automated news, weather & analytics briefing engine using Python & Pandas.</p>
                                <a href="https://github.com/devv-koushik/Daily-Digest-Email-Python-Project-" target="_blank" rel="noreferrer">↳ GitHub: Daily-Digest-Email-Python-Project-</a>
                            </div>
                            <div className="term-proj-item">
                                <span className="badge iot">IoT</span> <strong>Smart Assistive Glasses Prototype</strong>
                                <p>Wearable device with ultrasonic obstacle detection for the visually impaired.</p>
                            </div>
                        </div>
                    ),
                };
                break;

            case 'skills':
                responseEntry = {
                    type: 'output',
                    text: (
                        <div className="term-skills-box">
                            <div className="term-accent-title">🛠️ Technical Stack:</div>
                            <div><strong>• AI / ML / CV:</strong> Python, YOLOv8, OpenCV, TensorFlow, PyTorch, CNNs</div>
                            <div><strong>• Full-Stack:</strong> JavaScript (ES6+), React 19, HTML5, CSS3, Tailwind, Next.js</div>
                            <div><strong>• Backend & DB:</strong> Node.js, Express, Flask, MongoDB, MySQL, REST APIs</div>
                            <div><strong>• Tools & Hardware:</strong> Git, GitHub, Postman, Arduino (C++), Linux, VS Code</div>
                        </div>
                    ),
                };
                break;

            case 'about':
                responseEntry = {
                    type: 'output',
                    text: (
                        <div className="term-bio-box">
                            <div className="term-accent-title">👤 About Koushik Bhowmick:</div>
                            <p>
                                Full-Stack Developer & AI Enthusiast focused on creating practical software at the intersection of
                                Machine Learning and modern Web Applications.
                            </p>
                            <div>🎓 <strong>Education:</strong> B.Sc. in Computer Science (Artificial Intelligence) @ UEM Newtown, Kolkata (2024–2028)</div>
                            <div>📍 <strong>Location:</strong> Kolkata, India (Available Worldwide for remote/hybrid roles)</div>
                            <div>💡 <strong>Focus:</strong> Real-time Computer Vision, End-to-End Deep Learning, High-performance Web Engineering</div>
                        </div>
                    ),
                };
                break;

            case 'whoami':
                responseEntry = {
                    type: 'output',
                    text: 'guest@recruiter-workstation ~ authorized guest exploring Koushik\'s developer portfolio.',
                };
                break;

            case 'contact':
                responseEntry = {
                    type: 'output',
                    text: (
                        <div className="term-contact-box">
                            <div className="term-accent-title">📬 Connect with Koushik:</div>
                            <div>✉️ Email: <a href="mailto:koushikbhowmick04@gmail.com">koushikbhowmick04@gmail.com</a></div>
                            <div>💼 LinkedIn: <a href="https://linkedin.com/in/koushik-bhowmick-a832a5319/" target="_blank" rel="noreferrer">linkedin.com/in/koushik-bhowmick</a></div>
                            <div>🐙 GitHub: <a href="https://github.com/devv-koushik" target="_blank" rel="noreferrer">github.com/devv-koushik</a></div>
                            <div>📱 Phone: +91 7003372615</div>
                        </div>
                    ),
                };
                break;

            case 'cv':
            case 'resume':
                window.open('/assets/My_CV.pdf', '_blank');
                responseEntry = {
                    type: 'output',
                    text: '📄 Opening Koushik\'s CV in a new tab... (Also downloadable at /assets/My_CV.pdf)',
                };
                break;

            case 'matrix':
                setMatrixActive((prev) => !prev);
                responseEntry = {
                    type: 'output',
                    text: !matrixActive
                        ? '🟢 Matrix Stream Initialized. Wake up, Neo... The Matrix has you.'
                        : '⚪ Matrix Stream Terminated. Returning to standard shell.',
                };
                break;

            case 'sudo':
                responseEntry = {
                    type: 'output',
                    text: 'Permission denied: Nice try! You are already a superuser in our hearts ❤️',
                };
                break;

            case 'clear':
                setHistory([]);
                setInput('');
                return;

            case 'exit':
                setIsOpen(false);
                return;

            default:
                responseEntry = {
                    type: 'error',
                    text: `bash: command not found: "${command}". Type "help" to view available commands.`,
                };
                break;
        }

        setHistory((prev) => [...prev, newEntry, responseEntry]);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length === 0) return;
            const nextIdx = historyIdx + 1 < cmdHistory.length ? historyIdx + 1 : historyIdx;
            setHistoryIdx(nextIdx);
            setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIdx > 0) {
                const nextIdx = historyIdx - 1;
                setHistoryIdx(nextIdx);
                setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
            } else {
                setHistoryIdx(-1);
                setInput('');
            }
        }
    };

    return (
        <>
            {/* Floating Terminal Trigger Button in Bottom-Right */}
            <button
                className="terminal-float-btn"
                onClick={() => setIsOpen(true)}
                title="Open Developer Terminal (Ctrl+K)"
                aria-label="Developer Terminal"
            >
                <span className="term-btn-icon"><FaTerminal /></span>
                <span className="term-btn-label">Terminal</span>
                <span className="term-btn-shortcut">Ctrl+K</span>
            </button>

            {/* Terminal Modal Window */}
            {isOpen && (
                <div className="terminal-overlay" onClick={() => setIsOpen(false)}>
                    <div
                        className={`terminal-window ${isMaximized ? 'maximized' : ''} ${matrixActive ? 'matrix-mode' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* macOS Style Window Title Bar */}
                        <div className="term-titlebar">
                            <div className="term-controls">
                                <button
                                    className="term-dot close"
                                    onClick={() => setIsOpen(false)}
                                    title="Close (Esc)"
                                />
                                <button
                                    className="term-dot minimize"
                                    onClick={() => setIsOpen(false)}
                                    title="Minimize"
                                />
                                <button
                                    className="term-dot maximize"
                                    onClick={() => setIsMaximized((prev) => !prev)}
                                    title="Maximize/Restore"
                                />
                            </div>
                            <div className="term-title">
                                <FaTerminal className="term-title-icon" /> koushik@bhowmick-portfolio: ~ (bash)
                            </div>
                            <div className="term-header-actions">
                                <button
                                    className="term-hdr-btn"
                                    onClick={() => setIsMaximized((prev) => !prev)}
                                    title="Toggle Size"
                                >
                                    {isMaximized ? <FaCompressAlt /> : <FaExpandAlt />}
                                </button>
                                <button
                                    className="term-hdr-btn close"
                                    onClick={() => setIsOpen(false)}
                                    title="Close"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        {/* Quick Command Pills for Recruiters */}
                        <div className="term-quick-bar">
                            <span className="term-quick-label">Quick Run:</span>
                            {QUICK_ACTIONS.map((cmd) => (
                                <button
                                    key={cmd}
                                    className="term-quick-pill"
                                    onClick={() => executeCommand(cmd)}
                                >
                                    {cmd}
                                </button>
                            ))}
                        </div>

                        {/* Terminal Body Screen */}
                        <div className="term-body" ref={bodyRef}>
                            {history.map((item, idx) => (
                                <div key={idx} className={`term-line ${item.type}`}>
                                    {typeof item.text === 'string' ? (
                                        <pre className="term-pre">{item.text}</pre>
                                    ) : (
                                        item.text
                                    )}
                                </div>
                            ))}

                            {/* Active Prompt Line */}
                            <div className="term-input-line">
                                <span className="term-prompt">koushik@terminal:~$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="term-input"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeveloperTerminal;
