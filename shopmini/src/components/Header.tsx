import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCartCount } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const count = useAppSelector(selectCartCount);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <Link to="/">ShopMini</Link>
      <nav>
        <Link to="/cart">Giỏ hàng ({count})</Link>
        {user ? (
          <>
            <span>Xin chào, {user.username}</span>
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
        <button onClick={toggleTheme}>{theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}</button>
      </nav>
    </header>
  );
}