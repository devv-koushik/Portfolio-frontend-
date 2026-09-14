import React, { useState  } from 'react';
import '../style/blog.css';
// import ScrollDown from '../JS/ScrollDownT';

// import me1 from '../assets/me1.jpg';
// import blog2 from '../assets/blog2.jpg';
// import blog4 from '../assets/blog4.jpg';
// import blog1 from '../assets/blog1.png';


const Button = ({ initialLikes, blogId }) => {
    // Check if current user has liked this post from localStorage
    const [isLiked, setIsLiked] = useState(() => {
        try {
            return localStorage.getItem(`blog_liked_${blogId}`) === 'true';
        } catch {
            return false;
        }
    });

    const handleLikeToggle = () => {
        const nextLiked = !isLiked;
        setIsLiked(nextLiked);

        try {
            localStorage.setItem(`blog_liked_${blogId}`, String(nextLiked));
            localStorage.setItem(`blog_likes_count_${blogId}`, String(nextLiked ? initialLikes + 1 : initialLikes));
        } catch (e) {
            console.error('Failed to save like state to localStorage:', e);
        }
    };

    // Slot 'one' displays base count (initialLikes, shown when unliked)
    // Slot 'two' displays liked count (initialLikes + 1, shown when liked)
    // The CSS vertical slide animates seamlessly between them (+1 when liked, -1 when unliked)
    const displayedCountOne = initialLikes;
    const displayedCountTwo = initialLikes + 1;

    return (
        <div className="like-wrapper">
            <div className="like-button">
                {/* Checkbox that drives the CSS animations */}
                <input
                    className="on"
                    id={`heart-${blogId}`}
                    type="checkbox"
                    checked={isLiked}
                    onChange={handleLikeToggle}
                />
                <label className="like" htmlFor={`heart-${blogId}`}>
                    <svg className="like-icon" fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <span className="like-text">Likes</span>
                </label>
                <label className="like-count one" htmlFor={`heart-${blogId}`}>{displayedCountOne}</label>
                <label className="like-count two" htmlFor={`heart-${blogId}`}>{displayedCountTwo}</label>
            </div>
        </div>
    );
};

// --- End of Button Component & StyledWrapper ---

const blogPosts = [
    {
        id: '1',
        title: 'Building a Smart Glasses Prototype with Arduino & Ultrasonic Sensors',
        summary: 'Assistive IoT hardware can transform mobility for the visually impaired. Here is how I designed an ultrasonic sensor array with haptic and audio telemetry...',
        fullText: 'Assistive IoT hardware can transform mobility for the visually impaired. In this project, I engineered a prototype combining Arduino microcontrollers, HC-SR04 ultrasonic distance sensors, and haptic feedback actuators. The system continuously polls peripheral distance, detects obstacles within a 2-meter proximity cone, and triggers intuitive pulse frequencies to guide the user safely. Building this taught me low-level C++ timing, power-efficient sensor polling, and human-centric hardware design.',
        image: '/assets/blog1.png',
        initialLikes: 84
    },
    {
        id: '2',
        title: 'Automating Daily Digest Emails with Python & Pandas',
        summary: 'Tired of information overload, I engineered an automated cron pipeline that aggregates tech news, weather, and market signals into a clean daily brief...',
        fullText: 'In our hyperconnected world, information overload can derail productivity. To combat this, I built an automated Daily Digest engine using Python, BeautifulSoup, Pandas, and SMTP. The script schedules daily crons, scrapes curated headlines, structures the data into tabular analytics, and compiles a clean, responsive HTML email briefing. It was an exciting deep-dive into Python automation, data cleaning, and production scheduling.',
        image: '/assets/blog2.jpg',
        initialLikes: 62
    },
    {
        id: '3',
        title: 'Demystifying YOLO Object Detection & CNNs for Real-Time Vision',
        summary: 'How modern single-stage object detectors process video streams at 30+ FPS for real-world applications like our AI Forest Fire Detection system...',
        fullText: 'Computer vision has evolved from manual feature engineering to deep Convolutional Neural Networks. During our work on the AI Forest Fire Detection system, we implemented YOLO (You Only Look Once) to achieve real-time flame and smoke classification. By framing detection as a single regression problem, YOLO processes frames at high inference speeds, enabling rapid alert dispatch. This post breaks down transfer learning, anchor boxes, and bounding box regression for real-world deployments.',
        image: '/assets/me1.jpg',
        initialLikes: 95
    },
    {
        id: '4',
        title: 'How I Optimized Physics Animations with Matter.js and React',
        summary: 'Bringing canvas physics to life in React without dropping frames. A breakdown of rigid body simulation, gravity scaling, and responsive canvas sizing...',
        fullText: 'Interactive physics can make a developer portfolio unforgettable, but poorly optimized animation loops can throttle CPU and battery life. For my hero background, I implemented a 2D rigid-body simulation using Matter.js, integrated with React component lifecycles. By decoupling heavy DOM renders, capping simulation sub-steps, handling window resize debounces, and disabling the engine gracefully on mobile devices, we maintained a butter-smooth 60 FPS without UI jank.',
        image: '/assets/blog4.jpg',
        initialLikes: 73
    }
];

const Blog = () => {
    const [expandedBlogs, setExpandedBlogs] = useState({});
    const [review, setReview] = useState('');
    const [reviewStatus, setReviewStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleExpand = (id) => {
        setExpandedBlogs(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        if (review.trim() === '') {
            setReviewStatus('Please enter a review before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://portfolio-backend-mongo-nd6u.onrender.com/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: review })
            });

            if (response.ok) {
                setReviewStatus('Thanks for your review! It has been submitted successfully. 👍');
                setIsSubmitted(true);
                setReview('');
            } else {
                setReviewStatus('Failed to submit review. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setReviewStatus('Server error. Please try again later.');
        } finally {
            setIsSubmitting(false);
            // Hide status message after 3 seconds
            setTimeout(() => setReviewStatus(''), 3000);
        }

    };

    return (
        <div className="blog-page-wrapper">
            <div className="blogcontainer">
                <section className="blog-hero">
                    <h1>Dreams, Code & Coffee – By Koushik</h1>
                    <p>
                        Technical deep-dives, hardware experiments, and architectural insights across Artificial Intelligence, Computer Vision, and Full-Stack Engineering.
                    </p>
                </section>

                {blogPosts.map(blog => (
                    <div key={blog.id} className="blogitem">
                        <img alt={blog.title} className="blog-thumb" src={blog.image} loading="lazy" decoding="async" />
                        <div className="blog-header">
                            <h2>{blog.title}</h2>
                            {/* --- Integrated Button Component --- */}
                            <Button initialLikes={blog.initialLikes} blogId={blog.id} />
                        </div>
                        <p className="blog-text">
                            {expandedBlogs[blog.id] ? blog.fullText : blog.summary}
                        </p>


                        <button onClick={() => toggleExpand(blog.id)} className="btn-sm read-more">
                            {expandedBlogs[blog.id] ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                ))}
            </div>

            <footer className="blog-footer">
                <div className="review-section">
                    <h3>Leave a Review!</h3>
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        <textarea
                            value={review}
                            onChange={handleReviewChange}
                            placeholder="Tell me what you think of the blog..."
                            rows="4"
                            className="review-textarea"
                            disabled={isSubmitting}
                        />
                        {!isSubmitted && (
                            <button type="submit" className="btn-sm submit-review" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </button>
                        )}
                    </form>
                    {reviewStatus && <p className="review-status">{reviewStatus}</p>}
                </div>

                <p className='footer-content'>
                    &copy; {new Date().getFullYear()} Koushik Bhowmick. All rights reserved.
                    <span className='lord-icon'>
                        <a href="https://www.linkedin.com/in/koushik-bhowmick-a832a5319/" target='_blank' rel="noopener noreferrer">
                            <lord-icon
                                src="https://cdn.lordicon.com/fgctxlnd.json"
                                trigger="morph"
                                state="morph-circle"
                                colors="primary:#4bb3fd,secondary:#242424"
                                style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>

                        </a>
                        <a href="https://github.com/devv-koushik" target='_blank' rel="noopener noreferrer">
                            <lord-icon
                                src="https://cdn.lordicon.com/ioihllwu.json"
                                trigger="hover"
                                colors="primary:#242424,secondary:#ffffff"
                                style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                        </a>
                        <lord-icon
                            src="https://cdn.lordicon.com/bjdrneur.json"
                            trigger="hover"
                            state="hover-draw"
                            colors="primary:#ffffff,secondary:#242424"
                            style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>

                        <a href="https://www.instagram.com/koushik.me_/" target='_blank' rel="noopener noreferrer">
                            <lord-icon
                                src="https://cdn.lordicon.com/wgtaryar.json"
                                trigger="hover"
                                state="hover-rotate"
                                colors="primary:#4bb3fd,secondary:#f28ba8,tertiary:#ffc738,quaternary:#242424"
                                href="https://www.instagram.com/koushik.me_/"
                                style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                        </a>
                    </span>
                </p>
                <div className="footer-links">
                    <a href="#privacy" className="footer-link">Privacy Policy</a>
                    <a href="#terms" className="footer-link">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
};

export default Blog;