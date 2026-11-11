import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(username, password)) navigate(from, { replace: true });
    else setError('Sai tên đăng nhập hoặc mật khẩu (mật khẩu: 123456)');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tên đăng nhập" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
      {error && <p className="error">{error}</p>}
      <button type="submit">Đăng nhập</button>
    </form>
  );
}