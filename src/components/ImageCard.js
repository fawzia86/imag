import React from 'react';

const ImageCard = ({ image }) => {
    return (
        <div className="image-card">
            <img src={image.url} alt={`Image ${image.index + 1}`} />
            <div className="image-info">
                <h3>Caption: {image.caption}</h3>
                <p>Tags: {image.tags}</p>
            </div>
        </div>
    );
};

export default ImageCard;
