import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUpload, validationKey }) => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (!validationKey) {
            setStatusMessage('Enter a valid validation key');
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        try {
            setStatusMessage('Processing is in progress...');
            const response = await axios.post('/.netlify/functions/processImages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': validationKey,
                },
                onUploadProgress: (progressEvent) => {
                    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                },
            });
            setStatusMessage('Process completed successfully!');
            onUpload(response.data.images);
        } catch (error) {
            setStatusMessage(`Failed to upload images: ${error.message}`);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <progress value={progress} max="100" />
            <p>{statusMessage}</p>
        </div>
    );
};

export default ImageUpload;
