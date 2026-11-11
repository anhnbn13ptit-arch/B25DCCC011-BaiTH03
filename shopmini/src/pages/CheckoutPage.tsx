import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart, selectCartTotal } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const items = useAppSelector((s) => s.cart.items);
  const total = useAppSelector(selectCartTotal);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div>
        <h2>Đặt hàng thành công!</h2>
        <p>Cảm ơn {user?.username} đã mua hàng.</p>
        <Link to="/">Về trang chủ</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <p>Giỏ hàng trống, không có gì để thanh toán.</p>
        <Link to="/">Về trang chủ</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Thanh toán</h2>
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            {product.title} × {quantity} = ${(product.price * quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Tổng cộng: ${total.toFixed(2)}</h3>
      <button onClick={handleOrder}>Đặt hàng</button>
    </div>
  );
}