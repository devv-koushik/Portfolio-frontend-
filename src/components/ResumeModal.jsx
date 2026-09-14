import React, { useEffect } from 'react';
import { FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import '../style/ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="resume-modal-overlay" onClick={onClose}>
            <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="resume-modal-header">
                    <div className="resume-header-title">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <h3>Koushik_Bhowmick_CV.pdf</h3>
                    </div>
                    <div className="resume-modal-actions">
                        <a
                            href="/assets/My_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-action-btn secondary"
                            title="Open in new tab"
                        >
                            <FaExternalLinkAlt /> <span>New Tab</span>
                        </a>
                        <a
                            href="/assets/My_CV.pdf"
                            download="Koushik_Bhowmick_CV.pdf"
                            className="resume-action-btn primary"
                            title="Download CV"
                        >
                            <FaDownload /> <span>Download</span>
                        </a>
                        <button className="resume-close-btn" onClick={onClose} title="Close Preview">
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="resume-modal-body">
                    <iframe
                        src="/assets/My_CV.pdf#toolbar=1&navpanes=0"
                        title="Koushik Bhowmick Resume Preview"
                        className="resume-iframe"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
