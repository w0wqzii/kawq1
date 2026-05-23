import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    if (email && password) {
      navigate('/market');
    } else {
      alert('Введите email и пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>ktsh.shop</h1>
          <p>Войдите в свой аккаунт</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="progamer@ktsh.shop"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" onClick={handleLogin}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;