import React, { useState } from 'react';
import styles from './Login.module.css';

type Props = {
  onLogin: () => void;
};

interface Credential {
  email: string;
  password: string;
}

// You can move this to a separate file later (or fetch from API)
const VALID_CREDENTIALS: Credential[] = [
  { email: 'user@example.com',     password: 'Password123' },
  { email: 'admin@company.com',    password: 'Admin2025!' },
  { email: 'kartik@work.in',       password: 'MySecurePass456' },
  { email: 'test.user@gmail.com',  password: 'test1234' },
];

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isValid = VALID_CREDENTIALS.some(
      cred => cred.email === email && cred.password === password
    );

    if (isValid) {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <h2>Sign in</h2>
        
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            type="email"
            required
            autoFocus
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button}>
          Login
        </button>

      </form>
    </div>
  );
}