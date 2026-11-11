import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => dispatch(addToCart(product))}>Thêm vào giỏ</button>
    </div>
  );
}