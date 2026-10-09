import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebook, FaPaperPlane, FaCopy, FaCheck } from 'react-icons/fa';
import { FaXTwitter, FaLocationDot, FaPhoneVolume } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { IoRefreshOutline } from "react-icons/io5";
import '../style/contact.css';

const Contact = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        botCheck: ''
    });

    // CAPTCHA State
    const [captchaCode, setCaptchaCode] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const captchaCanvasRef = useRef(null);

    // State to manage UI feedback (loading, success, error)
    const [status, setStatus] = useState('');
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('koushikbhowmick04@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    // Draw CAPTCHA characters with distortion and noise onto canvas
    const drawCaptcha = useCallback((code) => {
        const canvas = captchaCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const isLight = document.documentElement.getAttribute('data-theme') === 'light';

        // Background fill
        ctx.fillStyle = isLight ? '#dfd8cb' : '#181b20';
        ctx.fillRect(0, 0, width, height);

        // Noise lines
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = isLight ? 'rgba(183, 75, 75, 0.28)' : 'rgba(255, 255, 255, 0.16)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.bezierCurveTo(
                Math.random() * width, Math.random() * height,
                Math.random() * width, Math.random() * height,
                Math.random() * width, Math.random() * height
            );
            ctx.stroke();
        }

        // Noise dots
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = isLight ? 'rgba(120, 105, 90, 0.3)' : 'rgba(255, 255, 255, 0.22)';
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw distorted characters
        const darkColors = ['#b74b4b', '#e28743', '#e5e4d1', '#7ec8e3', '#f39c12'];
        const lightColors = ['#b74b4b', '#1e2429', '#8b3232', '#4338ca', '#b45309'];
        const colors = isLight ? lightColors : darkColors;

        const charWidth = (width - 24) / code.length;
        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            const fontSize = 22 + Math.floor(Math.random() * 5);
            ctx.font = `bold ${fontSize}px "Space Grotesk", "Fira Code", monospace`;
            ctx.fillStyle = colors[i % colors.length];

            const x = 14 + i * charWidth;
            const y = height / 2 + 7;
            const angle = (Math.random() - 0.5) * 0.45;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillText(char, 0, 0);
            ctx.restore();
        }
    }, []);

    // Generate a fresh random 6-character code
    const generateCaptcha = useCallback(() => {
        const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(code);
        setCaptchaError('');
        setTimeout(() => drawCaptcha(code), 20);
    }, [drawCaptcha]);

    // Initialize CAPTCHA on mount and re-draw on theme change
    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    useEffect(() => {
        const handleThemeChange = () => {
            if (captchaCode) {
                drawCaptcha(captchaCode);
            }
        };
        window.addEventListener('themeChange', handleThemeChange);
        return () => window.removeEventListener('themeChange', handleThemeChange);
    }, [captchaCode, drawCaptcha]);

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission with CAPTCHA verification
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate CAPTCHA
        if (!captchaInput.trim()) {
            setCaptchaError('Please enter the CAPTCHA code.');
            return;
        }

        if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
            setCaptchaError('Incorrect CAPTCHA code. Please try again.');
            generateCaptcha();
            setCaptchaInput('');
            return;
        }

        setCaptchaError('');
        setStatus('submitting');

        try {
            const response = await fetch('https://portfolio-backend-mongo-g5n6.onrender.com/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Submission successful!');
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '', botCheck: '' });
                setCaptchaInput('');
                generateCaptcha();
            } else {
                console.error('Submission failed with status:', response.status);
                setStatus('error');
            }
        } catch (error) {
            console.error('An error occurred during submission:', error);
            setStatus('error');
        }
    };

    // Auto-hide success message after 2 seconds
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => {
                setStatus('');
            }, 2000);
            return () => clearTimeout(timer); // cleanup
        }
    }, [status]);

    return (
        <>
            <section className="contact" id="contact">
                <div className="content">
                    <h2>contact me</h2>
                    <p>
                        Feel free to reach out for collaborations, project discussions, or any
                        exciting opportunities.
                    </p>
                </div>
                <div className="container">
                    {/* Contact Info Section */}
                    <div className="contactInfo">
                        {/* --- Address --- */}
                        <>
                            <div className="box">
                                <div className="icon">
                                    <b></b>
                                    <i><FaLocationDot /></i>

                                </div>
                                <div className="text">
                                    <h3>Address</h3>
                                    <p>India , kolkata</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="icon">
                                    <b></b>
                                    <i><FaPhoneVolume /></i>
                                </div>
                                <div className="text">
                                    <h3>Phone</h3>
                                    <p>+917003372615</p>
                                </div>
                            </div>
                            <div className="box email-box">
                                <div className="icon">
                                    <b></b>
                                    <i><MdEmail /></i>
                                </div>
                                <div className="text">
                                    <h3>Email</h3>
                                    <div className="email-copy-row">
                                        <a href="mailto:koushikbhowmick04@gmail.com" className="email-link">
                                            koushikbhowmick04@gmail.com
                                        </a>
                                        <button
                                            type="button"
                                            className={`copy-email-btn ${copiedEmail ? 'copied' : ''}`}
                                            onClick={handleCopyEmail}
                                            title="Copy email to clipboard"
                                        >
                                            {copiedEmail ? (
                                                <>
                                                    <FaCheck size={12} /> <span>Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaCopy size={12} /> <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>

                        {/* Social Links */}
                        <h2 className="txt">connect with me</h2>
                        <ul className="sci">
                            <li><a href='https://www.facebook.com/profile.php?id=61586566007159'><FaFacebook size={24} color="#fff" /></a></li>
                            <li><a href='https://www.twitter.com/'><FaXTwitter size={24} color="#fff" /></a></li>
                            <li><a href='https://www.instagram.com/koush__iik/'><FaInstagram size={24} color="#fff" /></a></li>
                            <li><a href='https://www.linkedin.com/in/koushik-bhowmick-a832a5319/' ><FaLinkedinIn size={24} color="#fff" /></a></li>
                        </ul>


                    </div>

                    <div className="contactForm" id="contactForm">
                        <form onSubmit={handleSubmit}>
                            <h2>Get In Touch</h2>

                            <div className="inputBox">
                                <input id="name" name="name" required type="text"
                                    value={formData.name} onChange={handleChange} />
                                <span>Full Name</span>
                            </div>
                            
                            {/* Honeypot Field */}
                            <input type="text" name="botCheck" style={{ display: 'none' }} value={formData.botCheck} onChange={handleChange} tabIndex="-1" autoComplete="off" />

                            <div className="inputBox">
                                <input id="Email" name="email" required type="email"
                                    value={formData.email} onChange={handleChange} />
                                <span>Email</span>
                                <div className="form-text" id="emailHelp">
                                    We'll never share your email & phone with anyone else.
                                </div>
                            </div>
                            <div className="inputBox">
                                <input id="phone" name="phone" type="tel"
                                    value={formData.phone} onChange={handleChange} />
                                <span>Phone No. (Optional)</span>
                            </div>
                            <div className="inputBox" id="scroll">
                                <textarea name="message" required
                                    value={formData.message} onChange={handleChange} />
                                <span>Type Your Message...</span>
                            </div>

                            {/* Visual CAPTCHA Verification */}
                            <div className="captcha-wrapper">
                                <div className="captcha-preview-row">
                                    <canvas
                                        ref={captchaCanvasRef}
                                        width="160"
                                        height="42"
                                        className="captcha-canvas"
                                    />
                                    <button
                                        type="button"
                                        className="captcha-refresh-btn"
                                        onClick={generateCaptcha}
                                        title="Get new CAPTCHA code"
                                        aria-label="Refresh CAPTCHA"
                                    >
                                        <IoRefreshOutline size={20} />
                                    </button>
                                </div>
                                <div className="inputBox captcha-input-box">
                                    <input
                                        id="captchaInput"
                                        name="captchaInput"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        value={captchaInput}
                                        onChange={(e) => {
                                            setCaptchaInput(e.target.value);
                                            if (captchaError) setCaptchaError('');
                                        }}
                                    />
                                    <span>Enter CAPTCHA Code</span>
                                </div>
                                {captchaError && (
                                    <div className="captcha-error-text">{captchaError}</div>
                                )}
                            </div>

                            <div className="inputBox">
                                <button className="send-btn" type="submit"
                                    disabled={status === 'submitting'}>
                                    <span className="btn-text">
                                        <i><FaPaperPlane /></i>
                                        {status === 'submitting' ? 'Sending...' : ' Send'}
                                    </span>
                                </button>
                            </div>
                            {status === 'success' && (
                                <div className="status-message success">Message sent successfully!</div>
                            )}
                            {status === 'error' && (
                                <div className="status-message error">Failed to send message. Please try again.</div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;