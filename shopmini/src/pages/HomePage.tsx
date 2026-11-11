import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const filtered = items.filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm theo tên..." />
      {status === 'loading' && <p>Đang tải...</p>}
      {status === 'failed' && <p className="error">{error}</p>}
      <div className="grid">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}