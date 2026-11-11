import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <p>Không tìm thấy trang bạn yêu cầu.</p>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}