import React, { useCallback, useState } from 'react';
import './Card.css';

const Card = React.memo(({
    deal,
    onVote,
    isVoting
}) => {
    const [imgError, setImgError] = useState(false);

    const handleImageError = useCallback(() => {
        setImgError(true);
    }, []);

    // Funkcija za otvaranje linka ponude
    const handleDealClick = () => {
        window.open(deal.link, '_blank', 'noopener,noreferrer');
    };

    const handleVote = useCallback((voteType) => {
        if (!isVoting && onVote) {
            onVote(deal._id, voteType);
        }
    }, [deal._id, onVote, isVoting]);

    // Fallback slike po kategorijama
    const getFallbackImage = (category, title) => {
        const base64Fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdGOEM4RCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+Tk8gSU1HPC90ZXh0Pgo8L3N2Zz4K';

        const fallbackImages = {
            'tehnika': base64Fallback,
            'bela-tehnika': base64Fallback,
            'sport': base64Fallback,
            'moda': base64Fallback,
            'default': base64Fallback
        };

        return fallbackImages[category] || fallbackImages.default;
    };

    const calculateTimeLeft = (validUntil) => {
        if (!validUntil) return 'Nepoznato';

        const now = new Date();
        const validDate = new Date(validUntil);
        const diffMs = validDate - now;

        if (diffMs <= 0) return 'Isteklo';

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays}d ${diffHours % 24}h`;
        } else {
            return `${diffHours}h`;
        }
    };

    return (
        <div className="slickdeals-card">

            {/* Image Section - SADA KLIKABILNA */}
            <div className="card-image-container" onClick={handleDealClick}>
                <img
                    src={imgError ? getFallbackImage(deal.category, deal.title) : deal.image}
                    alt={deal.title}
                    className="card-image"
                    onError={handleImageError}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {/* Content Section */}
            <div className="card-content">
                {/* Title - SADA KLIKABILAN */}
                <div
                    className="card-title"
                    onClick={handleDealClick}
                    style={{ cursor: 'pointer' }}
                >
                    {deal.title}
                </div>

                {/* Store and Time */}
                <div className="card-meta">
                    <span className="store-name">{deal.store}</span>
                    {deal.validUntil && (
                        <span className="time-left">
                            <i className="fas fa-clock"></i>
                            {calculateTimeLeft(deal.validUntil)}
                        </span>
                    )}
                </div>

                {/* Prices */}
                <div className="card-prices">
                    <div className="price-main-line">
                        <span className="current-price">
                            {deal.price ? deal.price.toLocaleString() + ' RSD' : 'Cena na sajtu'}
                        </span>
                        {deal.oldPrice && deal.oldPrice > deal.price && (
                            <span className="discount-badge">-{deal.discount}%</span>
                        )}
                    </div>
                    {deal.oldPrice && deal.oldPrice > deal.price && (
                        <div className="price-original-line">
                            <span className="original-price">
                                {deal.oldPrice.toLocaleString()} RSD
                                <i className="fa-solid fa-fire"></i>
                            </span>
                        </div>
                    )}
                </div>

                {/* Store Footer */}
                <div className="card-store-footer">
                    {deal.store}
                </div>

                {/* DIVIDER */}
                <div className="card-divider"></div>

                {/* Actions */}
                <div className="card-actions">
                    <div className="left-actions">
                        <button className="action-btn">
                            <i className="fa-solid fa-thumbs-up action-icon"></i>
                            <span className="action-count">{deal.votes?.positive || 0}</span>
                        </button>
                        <button className="action-btn">
                            <i className="fa-solid fa-comment action-icon"></i>
                            <span className="action-count">{deal.commentsCount || 0}</span>
                        </button>
                    </div>
                    <button className="action-btn">
                        <i className="fa-solid fa-share action-icon"></i>
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Card;