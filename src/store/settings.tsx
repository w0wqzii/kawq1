import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/settings.css';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<boolean>(true);
  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('ru');
  const [theme, setTheme] = useState<string>('dark');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneEditing, setIsPhoneEditing] = useState<boolean>(false);
  const [tempPhone, setTempPhone] = useState<string>('');

  // Загрузка сохранённых настроек из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('theme');
    const savedPhone = localStorage.getItem('phoneNumber');
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
    if (savedPhone) setPhoneNumber(savedPhone);
  }, []);

  // Применение темы
  const applyTheme = (selectedTheme: string) => {
    if (selectedTheme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Здесь можно добавить логику для смены языка интерфейса
    // Например, через i18n или просто показать уведомление
    alert(`Язык изменён на: ${newLanguage === 'ru' ? 'Русский' : 'English'}`);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    alert(`Тема изменена на: ${newTheme === 'light' ? 'Светлую' : 'Тёмную'}`);
  };

  // Начало редактирования телефона
  const startPhoneEditing = () => {
    setTempPhone(phoneNumber);
    setIsPhoneEditing(true);
  };

  // Сохранение телефона
  const savePhoneNumber = () => {
    // Простая валидация для российских номеров
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    
    if (tempPhone && !phoneRegex.test(tempPhone) && tempPhone !== '') {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }
    
    setPhoneNumber(tempPhone);
    localStorage.setItem('phoneNumber', tempPhone);
    setIsPhoneEditing(false);
    alert('Номер телефона сохранён!');
  };

  // Удаление телефона
  const deletePhoneNumber = () => {
    if (window.confirm('Вы уверены, что хотите удалить номер телефона?')) {
      setPhoneNumber('');
      setTempPhone('');
      localStorage.removeItem('phoneNumber');
      setIsPhoneEditing(false);
      alert('Номер телефона удалён');
    }
  };

  // Отмена редактирования
  const cancelPhoneEditing = () => {
    setIsPhoneEditing(false);
    setTempPhone('');
  };

  // Сохранение всех настроек
  const saveAllSettings = () => {
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('notifications', String(notifications));
    localStorage.setItem('twoFactor', String(twoFactor));
    
    alert('✅ Все настройки сохранены!');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate('/market')}>
          ← Назад в магазин
        </button>
        <h1>⚙️ Настройки профиля</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>🔔 Уведомления</h3>
          <div className="setting-item">
            <label>Email уведомления о покупках</label>
            <button 
              className={`toggle-switch ${notifications ? 'active' : ''}`}
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? 'Вкл' : 'Выкл'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔒 Безопасность</h3>
          <div className="setting-item">
            <label>Двухфакторная аутентификация</label>
            <button 
              className={`toggle-switch ${twoFactor ? 'active' : ''}`}
              onClick={() => setTwoFactor(!twoFactor)}
            >
              {twoFactor ? 'Вкл' : 'Выкл'}
            </button>
          </div>
          
          {/* Управление номером телефона */}
          <div className="setting-item phone-item">
            <label>📱 Номер телефона</label>
            <div className="phone-controls">
              {isPhoneEditing ? (
                <div className="phone-edit">
                  <input
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className="phone-input"
                    autoFocus
                  />
                  <button className="settings-button small success" onClick={savePhoneNumber}>
                    💾
                  </button>
                  <button className="settings-button small" onClick={cancelPhoneEditing}>
                    ❌
                  </button>
                </div>
              ) : (
                <div className="phone-display">
                  <span className={phoneNumber ? 'phone-text' : 'phone-placeholder'}>
                    {phoneNumber || 'Не указан'}
                  </span>
                  <button className="settings-button small" onClick={startPhoneEditing}>
                    ✏️ Редактировать
                  </button>
                  {phoneNumber && (
                    <button className="settings-button small danger" onClick={deletePhoneNumber}>
                      🗑️ Удалить
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🌐 Язык и интерфейс</h3>
          <div className="setting-item">
            <label>🌍 Язык интерфейса</label>
            <select value={language} onChange={handleLanguageChange} className="settings-select">
              <option value="ru">🇷🇺 Русский</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label>🎨 Тема оформления</label>
            <select value={theme} onChange={handleThemeChange} className="settings-select">
              <option value="dark">🌙 Тёмная</option>
              <option value="light">☀️ Светлая</option>
            </select>
          </div>
        </div>

        <button className="save-button" onClick={saveAllSettings}>
          💾 Сохранить все настройки
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;