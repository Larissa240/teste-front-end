import { useEffect, useId, useRef, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../services/products';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
const categories = ['CELULAR', 'ACESSÓRIOS', 'TABLETS', 'NOTEBOOKS', 'TVS', 'VER TODOS'];
export function ProductShelf({ simple = false, query = '' }: { simple?: boolean; query?: string }) {
  const titleId = useId();
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [category, setCategory] = useState('CELULAR');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError('');
    getProducts(controller.signal).then(setProducts).catch((reason: unknown) => {
      if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Erro ao carregar produtos.');
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);
  // O JSON fornecido contém somente celulares e não possui campo de categoria.
  const visible = category === 'CELULAR' || category === 'VER TODOS' ? products.filter(product => product.productName.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))) : [];
  function scroll(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth, behavior: 'smooth' });
  }
  return <section className="shelf" aria-labelledby={titleId}>
    <h2 className="section-title" id={titleId}><span>Produtos relacionados</span></h2>
    {simple ? <a className="see-all" href="#produtos">Ver todos</a> : <nav className="categories" aria-label="Categorias de produtos">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); track.current?.scrollTo({ left: 0 }); }}>{item}</button>)}</nav>}
    {loading ? <p className="status" role="status">Carregando produtos…</p> : error ? <div className="status" role="alert"><p>{error}</p><button className="primary" onClick={() => setAttempt(value => value + 1)}>Tentar novamente</button></div> : visible.length === 0 ? <p className="status" role="status">Nenhum produto disponível nesta categoria.</p> : <div className="carousel">
      <button className="carousel__arrow carousel__arrow--previous" aria-label="Produtos anteriores" onClick={() => scroll(-1)}>‹</button>
      <div ref={track} className="product-track" tabIndex={0} role="region" aria-label="Lista de produtos; use as setas do teclado para rolar">{visible.map((product, index) => <ProductCard key={`${product.productName}-${index}`} product={product} onSelect={setSelected} />)}</div>
      <button className="carousel__arrow carousel__arrow--next" aria-label="Próximos produtos" onClick={() => scroll(1)}>›</button>
    </div>}
    {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
  </section>;
}
