import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const product = items.find((p) => p.id === Number(id));

  if (status === 'idle' || status === 'loading') return <p>Đang tải...</p>;
  if (status === 'failed') return <p className="error">{error}</p>;
  if (!product) {
    return (
      <div>
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/">Về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="detail">
      <img src={product.image} alt={product.title} className="detail-img" />
      <div>
        <h2>{product.title}</h2>
        <p><strong>Danh mục:</strong> {product.category}</p>
        <p><strong>Giá:</strong> ${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button onClick={() => dispatch(addToCart(product))}>Thêm vào giỏ</button>
        <p><Link to="/">← Quay lại</Link></p>
      </div>
    </div>
  );
}