import React, { useState, useRef } from 'react';
import './ExpertiseSection.css';

const ExpertiseSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };
    return (
        <section className="expertise-section">
            <div className="container expertise-container">
                <div className="expertise-content">
                    <h2 className="expertise-heading">
                        Expertise in <br />
                        <span className="expertise-sub">branding and</span> <br />
                        Conversion Campaign
                    </h2>
                    <button className="talk-btn" onClick={() => window.location.href = '/contact'}>Talk To Us</button>
                </div>
                <div className="expertise-image-wrapper">
                    <div className="expertise-img-container">
                        <video
                            ref={videoRef}
                            width="100%"
                            height="100%"
                            id="conversion-play-vid"
                            className="img-fluid expertise-img"
                            controls
                            playsInline
                            webkit-playsinline="true"
                            disablePictureInPicture
                            controlsList="nodownload nofullscreen noremoteplayback"
                            src="https://www.influencer.in/wp-content/themes/influencer-2022/vids/influencer-showreel.mp4"
                            style={{ display: 'block' }}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            <source src="https://www.influencer.in/wp-content/themes/influencer-2022/vids/influencer-showreel.mp4" type="video/mp4" />
                        </video>
                        {!isPlaying && (
                            <div className="expertise-play-btn" onClick={handlePlayPause}>
                                <div className="play-triangle"></div>
                            </div>
                        )}
                        {isPlaying && (
                            <div
                                className="video-overlay"
                                onClick={handlePlayPause}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer',
                                    zIndex: 1
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;
