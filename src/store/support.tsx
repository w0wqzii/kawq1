import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../store/support';

interface FAQ {
  q: string;
  a: string;
}

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [subject, setSubject] = useState<string>('');

  const faqs: FAQ[] = [
    { q: 'Как долго обрабатывается заказ?', a: 'Заказы обрабатываются мгновенно после оплаты, данные аккаунта приходят на email в течение 1-5 минут.' },
    { q: 'Что делать, если аккаунт заблокировали?', a: 'Свяжитесь с поддержкой в течение 24 часов, мы предоставим замену или вернем средства.' },
    { q: 'Можно ли вернуть деньги?', a: 'Возврат возможен в течение 3 дней, если аккаунт не был использован.' },
    { q: 'Безопасно ли покупать аккаунты?', a: 'Да, мы предоставляем гарантию на все аккаунты 30 дней.' },
  ];

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  const handleSubmit = (): void => {
    if (!subject || !message) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    alert(`✅ Ваше обращение отправлено!\nТема: ${subject}\nМы ответим в ближайшее время.`);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <button className="back-button" onClick={() => navigate('/market')}>
          ← Назад в магазин
        </button>
        <h1>🎧 Поддержка ktsh.shop</h1>
      </div>

      <div className="support-content">
        <div className="faq-section">
          <h2>❓ Часто задаваемые вопросы</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">📌 {faq.q}</div>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h2>📧 Связаться с нами</h2>
          <div className="contact-form">
            <div className="form-group">
              <label>Тема обращения</label>
              <select value={subject} onChange={handleSubjectChange}>
                <option value="">Выберите тему</option>
                <option value="payment">Проблема с оплатой</option>
                <option value="account">Проблема с аккаунтом</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div className="form-group">
              <label>Сообщение</label>
              <textarea
                rows={5}
                placeholder="Опишите вашу проблему подробно..."
                value={message}
                onChange={handleMessageChange}
              />
            </div>

            <button className="submit-button" onClick={handleSubmit}>
              📤 Отправить сообщение
            </button>
          </div>

          <div className="contact-info">
            <div className="info-item">
              <span>📧 Email:</span>
              <span>support@ktsh.shop</span>
            </div>
            <div className="info-item">
              <span>💬 Discord:</span>
              <span>ktsh.support</span>
            </div>
            <div className="info-item">
              <span>⏰ Время работы:</span>
              <span>24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;