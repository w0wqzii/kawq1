import React from 'react';

interface AccountCardProps {
  id: number;
  rating?: string;
  price: string;
  originalPrice?: string;
  hours?: string;
  faceitElo?: string;
  matches?: string;
  vacStatus: string;
  level?: string;
  backgroundImage: string;
  variant: 'standard' | 'premium' | 'compact';
}

const AccountCard: React.FC<AccountCardProps> = ({
  rating,
  price,
  originalPrice,
  hours,
  faceitElo,
  matches,
  vacStatus,
  level,
  backgroundImage,
  variant
}) => {
  return (
    <div className="page-card">
      <div className="card-bg-blur">
        <img className="blur-image" src={backgroundImage} alt="blurred background" />
        <div className="bg-overlay"></div>
      </div>
      <div className="card-content">
        <div className="store-badge">
          <div className="domain">ktsh.shop</div>
          <div className="tagline">better account</div>
        </div>

        {variant === 'standard' && (
          <div className="stats-block">
            <div className="rating-large">
              <span className="rating-label">★ RATING</span>
              <span className="rating-value">{rating || '20.000'}</span>
            </div>
            <div className="details-row">
              <div className="detail-item">
                <span className="detail-label">ЦЕНА</span>
                <div className="price-wrapper">
                  {originalPrice && <span className="original-price">{originalPrice}</span>}
                  <span className="price">{price}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">ЧАСЫ</span>
                <span className="detail-value">{hours || '2.000'}</span>
              </div>
            </div>
            <div className="details-row">
              <div className="detail-item">
                <span className="detail-label">FACEIT ELO</span>
                <span className="detail-value">{faceitElo || '1890elo'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">МАТЧЕЙ</span>
                <span className="detail-value">{matches || '238'}</span>
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <span className="vac-status">✅ {vacStatus}</span>
            </div>
          </div>
        )}

        {variant === 'compact' && (
          <div className="stats-block">
            <div className="rating-large">
              <span className="rating-label">★ RATING</span>
              <span className="rating-value">{rating || '20.000'}</span>
            </div>
            <div className="details-row">
              <div className="detail-item">
                <span className="detail-label">ЦЕНА</span>
                <div className="price-wrapper">
                  {originalPrice && <span className="original-price">{originalPrice}</span>}
                  <span className="price">{price}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">FACEIT</span>
                <span className="detail-value">{faceitElo || '1890elo'}</span>
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <span className="vac-status">✅ {vacStatus}</span>
            </div>
          </div>
        )}

        {variant === 'premium' && (
          <>
            <div className="premium-block">
              <div className="level-badge">
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>LEVEL</span>
                <span className="level-number">{level || '10'}</span>
              </div>
              <div className="faceit-high">
                <span>⚡ Faceit</span> 
                <span style={{ fontWeight: 800 }}>{faceitElo || '2470elo'}</span>
              </div>
            </div>
            <div className="stats-block" style={{ marginTop: '12px', background: 'rgba(0,0,0,0.4)' }}>
              <div className="details-row" style={{ borderTop: 'none', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span className="vac-status" style={{ background: '#2c4a3a' }}>🔒 {vacStatus}</span>
                <div className="price-wrapper">
                  {originalPrice && <span className="original-price original-price-small">{originalPrice}</span>}
                  <span className="price premium-price">{price}</span>
                </div>
              </div>
              <div className="rating-large" style={{ marginTop: '8px' }}>
                <span className="rating-label">HIGH ELO</span>
                <span className="rating-value">{faceitElo || '#2470'}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountCard;