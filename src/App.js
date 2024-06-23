import React, { useState } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import Footer from './components/Footer';

const App = () => {
    const [images, setImages] = useState([]);
    const [validationKey, setValidationKey] = useState('');

    const handleImageUpload = (uploadedImages) => {
        setImages(uploadedImages);
    };

    const handleValidationKeyChange = (event) => {
        setValidationKey(event.target.value);
    };

    return (
        <div className="app">
            <Header />
            <div className="container">
                <input
                    type="password"
                    placeholder="Enter validation key"
                    value={validationKey}
                    onChange={handleValidationKeyChange}
                />
                <ImageUpload onUpload={handleImageUpload} validationKey={validationKey} />
            </div>
            <Footer />
        </div>
    );
};

export default App;
