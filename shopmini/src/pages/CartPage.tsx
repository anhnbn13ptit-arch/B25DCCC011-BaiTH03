import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  updateQuantity,
  selectCartTotal,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div>
        <h2>Giỏ hàng</h2>
        <p>Giỏ hàng đang trống.</p>
        <Link to="/">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="cart-row">
          <img src={product.image} alt={product.title} width={60} height={60} />
          <div className="cart-info">
            <h4>{product.title}</h4>
            <p>${product.price.toFixed(2)}</p>
          </div>
          <div className="cart-qty">
            <button
              onClick={() =>
                dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
              }
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() =>
                dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))
              }
            >
              +
            </button>
          </div>
          <p>${(product.price * quantity).toFixed(2)}</p>
          <button onClick={() => dispatch(removeFromCart(product.id))}>Xoá</button>
        </div>
      ))}

      <h3>Tổng tiền: ${total.toFixed(2)}</h3>
      <Link to="/checkout">Thanh toán</Link>
    </div>
  );
}