import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/topup.css';

const Balance: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [userBalance, setUserBalance] = useState<number>(1247.50);

  const presetAmounts = [
    { value: 10, bonus: 0 },
    { value: 25, bonus: 1.5 },
    { value: 50, bonus: 5 },
    { value: 100, bonus: 12 },
    { value: 250, bonus: 40 },
    { value: 500, bonus: 100 }
  ];

  const getBonusForAmount = (amount: number): number => {
    if (amount >= 500) return 100;
    if (amount >= 250) return 40;
    if (amount >= 100) return 12;
    if (amount >= 50) return 5;
    if (amount >= 25) return 1.5;
    return 0;
  };

  const getCurrentAmount = (): number => {
    if (selectedAmount !== null) return selectedAmount;
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const getTotalAmount = (): number => {
    const amount = getCurrentAmount();
    if (!amount || amount < 5) return 0;
    return amount + getBonusForAmount(amount);
  };

  const handlePresetSelect = (amount: number): void => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleMethodSelect = (method: string): void => {
    setSelectedMethod(method);
  };

  const handleSubmit = (): void => {
    const amount = getCurrentAmount();
    
    if (!amount || amount < 5) {
      alert('❌ Минимальная сумма пополнения $5');
      return;
    }

    const bonus = getBonusForAmount(amount);
    const totalAdded = amount + bonus;
    
    const methodNames: Record<string, string> = {
      card: 'Банковская карта',
      crypto: 'Криптовалюта',
      qiwi: 'QIWI / P2P'
    };
    
    alert(`💳 Обработка платежа...\nСпособ: ${methodNames[selectedMethod]}\nСумма: $${amount.toFixed(2)}\nБонус: +$${bonus.toFixed(2)}\nИтого: $${totalAdded.toFixed(2)}`);
    
    setUserBalance((prev: number) => prev + totalAdded);
    alert(`✅ Баланс пополнен! Новый баланс: $${(userBalance + totalAdded).toFixed(2)}`);
    
    setSelectedAmount(null);
    setCustomAmount('');
  };

  return (
    <div className="topup-container">
      <div className="topup-header">
        <button className="back-button" onClick={() => navigate('/market')}>
          ← Назад в магазин
        </button>
        <div className="balance-display">
          💰 Текущий баланс: <strong>${userBalance.toFixed(2)}</strong>
        </div>
      </div>

      <h1 className="topup-title">💎 Пополнение баланса</h1>

      <div className="amount-section">
        <h3>Выберите сумму</h3>
        <div className="amount-grid">
          {presetAmounts.map((item) => (
            <div
              key={item.value}
              className={`amount-card ${selectedAmount === item.value ? 'selected' : ''}`}
              onClick={() => handlePresetSelect(item.value)}
            >
              <div className="amount-value">${item.value}</div>
              {item.bonus > 0 && <div className="amount-bonus">+${item.bonus} бонус</div>}
            </div>
          ))}
        </div>

        <div className="custom-amount">
          <label>Своя сумма (мин $5)</label>
          <div className="custom-input-wrapper">
            <span>$</span>
            <input
              type="number"
              placeholder="Введите сумму"
              min={5}
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
          </div>
        </div>
      </div>

      <div className="payment-section">
        <h3>Способ оплаты</h3>
        <div className="methods-grid">
          {[
            { id: 'card', name: 'Банковская карта', icon: '💳' },
            { id: 'crypto', name: 'Криптовалюта', icon: '₿' },
            { id: 'qiwi', name: 'QIWI / P2P', icon: '📱' }
          ].map((method) => (
            <div
              key={method.id}
              className={`method-option ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <span className="method-icon">{method.icon}</span>
              <span>{method.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="total-section">
        <div className="total-info">
          <span>Сумма пополнения:</span>
          <span>${getCurrentAmount().toFixed(2)}</span>
        </div>
        <div className="total-info bonus">
          <span>Бонус:</span>
          <span>+${getBonusForAmount(getCurrentAmount()).toFixed(2)}</span>
        </div>
        <div className="total-info final">
          <span>Итого к зачислению:</span>
          <span>${getTotalAmount().toFixed(2)}</span>
        </div>
      </div>

      <button className="pay-button" onClick={handleSubmit}>
        💸 Пополнить
      </button>

      <div className="topup-notice">
        ⚡ Мгновенное зачисление | Безопасная транзакция | Бонус начисляется автоматически
      </div>
    </div>
  );
};

export default Balance;