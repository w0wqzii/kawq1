import React from 'react';

interface UserDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
  username: string;
  email: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ 
  isOpen, 
  onToggle, 
  onNavigate, 
  username, 
  email 
}) => {
  return (
    <div className="profile-wrapper">
      <div className="profile-icon" onClick={onToggle}>
        <div className="avatar">
          <span className="avatar-text">{username[0]}</span>
        </div>
        <span className="username">{username}</span>
        <div className={`dropdown-icon ${isOpen ? 'open' : ''}`}>▼</div>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="dropdown-avatar">
              <span className="dropdown-avatar-text">{username[0]}</span>
            </div>
            <div className="dropdown-user-info">
              <div className="dropdown-username">{username}</div>
              <div className="dropdown-email">{email}</div>
            </div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          {/* Пополнить баланс */}
          <div className="dropdown-item" onClick={() => onNavigate('/topup')}>
            <span className="dropdown-icon-left">💰</span>
            <span>Пополнить баланс</span>
            <span className="dropdown-arrow">→</span>
          </div>
          
          {/* Настройки */}
          <div className="dropdown-item" onClick={() => onNavigate('/settings')}>
            <span className="dropdown-icon-left">⚙️</span>
            <span>Настройки</span>
            <span className="dropdown-arrow">→</span>
          </div>
          
          {/* Админ панель */}
          <div className="dropdown-item" onClick={() => onNavigate('/admin')}>
            <span className="dropdown-icon-left">🛡️</span>
            <span>Админ панель</span>
            <span className="dropdown-arrow">→</span>
          </div>
          
          {/* Поддержка */}
          <div className="dropdown-item" onClick={() => onNavigate('/support')}>
            <span className="dropdown-icon-left">🎧</span>
            <span>Поддержка</span>
            <span className="dropdown-arrow">→</span>
          </div>
          
          <div className="dropdown-divider"></div>
          
          {/* Выход */}
          <div className="dropdown-item logout-item" onClick={() => onNavigate('/login')}>
            <span className="dropdown-icon-left">🚪</span>
            <span>Выйти</span>
            <span className="dropdown-arrow">→</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;