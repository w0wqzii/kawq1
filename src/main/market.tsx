import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

const bgImages = [
    '/background.png',  
    '/photos/plo.png',
    '/photos/samurai.png',
    '/photos/ten.png'
];

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
  onBuyClick: (id: number, price: string) => void;
  isInCart?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  rating,
  price,
  originalPrice,
  hours,
  faceitElo,
  matches,
  vacStatus,
  level,
  backgroundImage,
  variant,
  onBuyClick,
  isInCart
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

        {/* Кнопка покупки */}
        <button 
          className={`buy-button ${isInCart ? 'in-cart' : ''}`} 
          onClick={() => onBuyClick(id, price)}
        >
          {isInCart ? '✓ В корзине' : '🛒 Купить'}
        </button>
      </div>
    </div>
  );
};

interface CartItem {
  id: number;
  price: string;
  rating?: string;
  faceitElo?: string;
  variant: string;
}

const Market: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(1247.50);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const accounts = [
    { id: 1, variant: 'standard' as const, rating: '20.000', price: '$ 180.99', originalPrice: '$ 212.21', hours: '2.000', faceitElo: '1890elo', matches: '238', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[0] },
    { id: 2, variant: 'standard' as const, rating: '20.000', price: '$ 195.50', originalPrice: '$ 212.21', hours: '2.000', faceitElo: '1890elo', matches: '238', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[1] },
    { id: 3, variant: 'compact' as const, rating: '20.000', price: '$ 169.99', originalPrice: '$ 212.21', faceitElo: '1890elo', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[2] },
    { id: 4, variant: 'premium' as const, level: '10', price: '$ 499.99', faceitElo: '2470elo', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[3] },
    { id: 5, variant: 'standard' as const, rating: '20.000', price: '$ 188.88', originalPrice: '$ 212.21', hours: '2.000', faceitElo: '1890elo', matches: '238', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[0] },
    { id: 6, variant: 'premium' as const, level: '10', price: '$ 549.99', originalPrice: '$ 699.99', faceitElo: '2470elo', rating: '24.500', hours: '3.200', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[1] },
    { id: 7, variant: 'compact' as const, rating: '18.500', price: '$ 149.99', originalPrice: '$ 189.99', faceitElo: '1750elo', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[2] },
    { id: 8, variant: 'standard' as const, rating: '22.000', price: '$ 249.99', hours: '3.500', faceitElo: '2100elo', matches: '450', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[3] },
    { id: 9, variant: 'premium' as const, level: '10', price: '$ 389.99', faceitElo: '2350elo', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[0] },
    { id: 10, variant: 'standard' as const, rating: '21.500', price: '$ 210.00', hours: '2.800', faceitElo: '1950elo', matches: '310', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[1] },
    { id: 11, variant: 'premium' as const, level: '9', price: '$ 299.99', faceitElo: '2200elo', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[2] },
    { id: 12, variant: 'standard' as const, rating: '19.200', price: '$ 159.99', originalPrice: '$ 199.99', hours: '1.500', faceitElo: '1650elo', matches: '180', vacStatus: 'VAC отсутствует', backgroundImage: bgImages[3] }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && !(event.target as HTMLElement).closest('.cart-icon')) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  // Добавление в корзину
  const addToCart = (id: number, price: string) => {
    const account = accounts.find(acc => acc.id === id);
    if (!account) return;

    const isAlreadyInCart = cartItems.some(item => item.id === id);
    if (isAlreadyInCart) {
      removeFromCart(id);
      return;
    }

    setCartItems(prev => [...prev, {
      id: account.id,
      price: account.price,
      rating: account.rating,
      faceitElo: account.faceitElo,
      variant: account.variant
    }]);
  };

  // Удаление из корзины
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Оформление покупки
  const checkout = () => {
    if (cartItems.length === 0) {
      alert('Корзина пуста!');
      return;
    }

    const totalPrice = cartItems.reduce((sum, item) => {
      const priceNum = parseFloat(item.price.replace('$', ''));
      return sum + priceNum;
    }, 0);

    if (totalPrice > userBalance) {
      alert(`Недостаточно средств! Необходимо: $${totalPrice.toFixed(2)}, Ваш баланс: $${userBalance.toFixed(2)}`);
      return;
    }

    if (window.confirm(`Подтвердите покупку ${cartItems.length} аккаунта(ов) на сумму $${totalPrice.toFixed(2)}`)) {
      setUserBalance(prev => prev - totalPrice);
      setCartItems([]);
      setIsCartOpen(false);
      alert(`✅ Покупка успешно оформлена! Новый баланс: $${(userBalance - totalPrice).toFixed(2)}`);
    }
  };

  // Очистка корзины
  const clearCart = () => {
    if (window.confirm('Очистить корзину?')) {
      setCartItems([]);
    }
  };

  // Подсчёт общей суммы
  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => {
      const priceNum = parseFloat(item.price.replace('$', ''));
      return sum + priceNum;
    }, 0);
  };

  return (
    <div className="app-container">
      <div className="market-header">
        <button className="back-button" onClick={() => navigate('/login')}>← Назад</button>
        
        <div className="user-info" ref={dropdownRef}>
          <div className="balance">
            <span className="balance-icon">💰</span>
            <span className="balance-value">${userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          
          {/* Иконка корзины */}
          <div className="cart-icon-wrapper">
            <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
              🛒
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </div>
          </div>

          <div className="profile-wrapper">
            <div className="profile-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className="avatar"><span className="avatar-text">P</span></div>
              <span className="username">ProGamer</span>
              <div className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}>▼</div>
            </div>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="dropdown-avatar"><span>P</span></div>
                  <div className="dropdown-user-info">
                    <div className="dropdown-username">ProGamer</div>
                    <div className="dropdown-email">progamer@ktsh.shop</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={() => handleNavigation('/topup')}>
                  <span className="dropdown-icon-left">💰</span><span>Пополнить баланс</span><span className="dropdown-arrow">→</span>
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('/settings')}>
                  <span className="dropdown-icon-left">⚙️</span><span>Настройки</span><span className="dropdown-arrow">→</span>
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('/admin')}>
                  <span className="dropdown-icon-left">🛡️</span><span>Админ панель</span><span className="dropdown-arrow">→</span>
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('/support')}>
                  <span className="dropdown-icon-left">🎧</span><span>Поддержка</span><span className="dropdown-arrow">→</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout-item" onClick={() => handleNavigation('/login')}>
                  <span className="dropdown-icon-left">🚪</span><span>Выйти</span><span className="dropdown-arrow">→</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно корзины */}
      {isCartOpen && (
        <div className="cart-modal" ref={cartRef}>
          <div className="cart-header">
            <h3>🛒 Корзина</h3>
            <button className="cart-close" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="cart-empty">Корзина пуста</div>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-title">
                        Аккаунт #{item.id} 
                        {item.rating && <span className="cart-item-rating"> ★{item.rating}</span>}
                        {item.faceitElo && <span className="cart-item-elo"> | {item.faceitElo}</span>}
                      </div>
                      <div className="cart-item-variant">{item.variant}</div>
                    </div>
                    <div className="cart-item-price">{item.price}</div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>🗑️</button>
                  </div>
                ))}
                <div className="cart-total">
                  <span>Итого:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
          <div className="cart-footer">
            {cartItems.length > 0 && (
              <button className="cart-clear" onClick={clearCart}>Очистить</button>
            )}
            <button className="cart-checkout" onClick={checkout}>
              💳 Оформить заказ
            </button>
          </div>
        </div>
      )}
      
      <div className="cards-grid">
        {accounts.map(account => (
          <AccountCard 
            key={account.id} 
            {...account} 
            onBuyClick={addToCart}
            isInCart={cartItems.some(item => item.id === account.id)}
          />
        ))}
      </div>
      
      <footer className="app-footer">
        🎯 Все аккаунты верифицированы | Гарантия безопасности | Задний фон каждой карточки — уникальное размытое изображение <br />
        ktsh.shop — лучшее место для покупки аккаунтов CS2 / Faceit / Matchmaking
      </footer>
    </div>
  );
};

export default Market;