import React from 'react';
import '../styles/Skeleton.css';

const SkeletonCard = ({ isLarge }) => {
    return (
        <div className={`skeleton-wrapper ${isLarge ? 'skeleton-poster-large' : 'skeleton-poster'}`}>
            <div className="skeleton-card"></div>
        </div>
    );
};

export default SkeletonCard;
