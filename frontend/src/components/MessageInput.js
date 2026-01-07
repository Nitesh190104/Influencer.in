import React, { useState, useRef } from 'react';
import './MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                return;
            }

            setSelectedFile(file);

            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFilePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setFilePreview(null);
            }
        }
    };

    const handleSend = () => {
        if (!message.trim() && !selectedFile) return;

        onSendMessage(message, selectedFile);
        setMessage('');
        setSelectedFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="message-input-container">
            {(selectedFile || filePreview) && (
                <div className="file-preview">
                    {filePreview ? (
                        <img src={filePreview} alt="Preview" />
                    ) : (
                        <div className="file-info">
                            <span className="file-icon">📎</span>
                            <span className="file-name">{selectedFile.name}</span>
                        </div>
                    )}
                    <button className="remove-file" onClick={removeFile}>✕</button>
                </div>
            )}

            <div className="message-input">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    style={{ display: 'none' }}
                />

                <button
                    className="attach-btn"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach file"
                >
                    📎
                </button>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows="1"
                />

                <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!message.trim() && !selectedFile}
                >
                    ➤
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
