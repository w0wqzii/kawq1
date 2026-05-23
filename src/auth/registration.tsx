import { useState } from 'react';
import styles from './registration.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    console.log({ email, password, confirmPassword });
   
  };

  return (
    <div className={styles.container}>
  
      <div className={styles.character}>
        <img 
          src="/public/photo" 
          className={styles['character-image']}
          alt="Character"
        />
      </div>

        
      <div className={styles['form-container']}>
        <h1 className={styles.title}>Registration</h1>

        <div className={styles['input-group']}>
          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles['input-group']}>
          <input
            type="password"
            placeholder="create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles['input-group']}>
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles['next-button']} onClick={handleSubmit}>
          next
        </div>

        <div className={styles['auth-link']}>auth</div>
      </div>
    </div>
  );
};

export default LoginPage;