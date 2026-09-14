import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebook, FaPaperPlane, FaCopy, FaCheck } from 'react-icons/fa';
import { FaXTwitter, FaLocationDot, FaPhoneVolume } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import '../style/contact.css';

const Contact = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // State to manage UI feedback (loading, success, error)
    const [status, setStatus] = useState('');
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('koushikbhowmick04@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    // Lock all scroll on the contact page — no scrollbar wanted here
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        return () => {
            html.style.overflow = '';
            body.style.overflow = '';
        };
    }, []);

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // ❌ Django backend (old)
            // const response = await fetch('http://localhost:8000/api/contacts/', {

            // ✅ Express + MongoDB backend (new)
            const response = await fetch('https://portfolio-backend-mongo-nd6u.onrender.com/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Submission successful!');
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
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
            <section className="contact">
                <div className="content">
                    <h2>contact us</h2>
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
                                    <p>
                                        Matkal , Kalitala <br /> po: Rabindrangar <br />
                                        kol - 700065
                                    </p>
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
                        <h2 className="txt">connect with us</h2>
                        <ul className="sci">
                            <li><a href='https://www.facebook.com/'><FaFacebook size={24} color="#fff" /></a></li>
                            <li><a href='https://www.twitter.com/'><FaXTwitter size={24} color="#fff" /></a></li>
                            <li><a href='https://www.instagram.com/koushik.me_/'><FaInstagram size={24} color="#fff" /></a></li>
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
                            <div className="inputBox">
                                <input id="Email" name="email" required type="text"
                                    value={formData.email} onChange={handleChange} />
                                <span>Email</span>
                                <div className="form-text" id="emailHelp">
                                    We'll never share your email & phone with anyone else.
                                </div>
                            </div>
                            <div className="inputBox">
                                <input id="phone" name="phone" required type="text"
                                    value={formData.phone} onChange={handleChange} />
                                <span>Phone No.</span>
                            </div>
                            <div className="inputBox" id="scroll">
                                <textarea name="message" required
                                    value={formData.message} onChange={handleChange} />
                                <span>Type Your Message...</span>
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