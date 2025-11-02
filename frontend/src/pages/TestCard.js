import React from 'react';
import Header from '../components/Header/Header';
import './TestCard.css';

const TestCard = () => {
    return (
        <div className="test-page">
            <Header />
            <div className="test-container">


                <div className="test-card-wrapper">
                    <div className="slickdeals-card-original">
                        {/* Image sa sivom pozadinom i gap-om */}
                        <div className="card-image-original">
                            <img
                                src="https://via.placeholder.com/180x135/4A90E2/FFFFFF?text=TV"
                                alt="Test product"
                                className="card-img-original"
                            />
                        </div>

                        <div className="card-content-original">
                            {/* NASLOV */}
                            <a className="card-title-original">
                                Samsung 55" 4K UHD Smart TV - Open Box Excellent Condition
                            </a>

                            {/* STORE I VREME */}
                            <div className="card-meta-original">
                                <span className="store-original">Best Buy</span>
                                <span className="time-original">1d 4h</span>
                            </div>

                            {/* CENE */}
                            <div className="card-prices-original">
                                <div className="price-main-line">
                                    <span className="price-current-original"> 26.568 RSD</span>
                                    <span className="discount-original">-40%</span>
                                </div>
                                <div className="price-original-line">
                                    <span className="price-original-original">

                                        54.999 RSD
                                        <i className="fa-solid fa-fire"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="card-store-footer">
                                Tehnomanija
                            </div>
                            {/* DIVIDER */}
                            <div className="card-divider-original"></div>

                            {/* AKCIJE - sive ikone bez bordera */}
                            <div className="card-actions-original">
                                <div className="left-actions">
                                    <button className="action-btn-original" title="Like">
                                        <i className="fa-solid fa-thumbs-up action-icon-original"></i>
                                        <span className="action-count">42</span>
                                    </button>
                                    <button className="action-btn-original" title="Comment">
                                        <i className="fa-solid fa-comment action-icon-original"></i>
                                        <span className="action-count">12</span>
                                    </button>
                                </div>
                                <button className="action-btn-original" title="Share">
                                    <i className="fa-solid fa-share action-icon-original"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Objašnjenje izmena */}

            </div>
        </div>
    );
};

export default TestCard;