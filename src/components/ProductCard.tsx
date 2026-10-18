import type { Product } from '../types/product';
import { currency } from '../services/products';
interface Props { product: Product; onSelect: (product: Product) => void }
export function ProductCard({ product, onSelect }: Props) {
  return <article className="product-card">
    <button className="product-card__details" onClick={() => onSelect(product)} aria-label={`Ver detalhes de ${product.productName}`}>
      <img src={product.photo} alt={product.productName} loading="lazy" width="247" height="228" />
      <h2>{product.productName}</h2>
    </button>
    <div className="product-card__pricing">
      <strong>{currency(product.price)}</strong>
      <p>ou 2x de {currency(product.price / 2)} sem juros</p>
      <p className="shipping">Frete grátis</p>
    </div>
    <button className="primary" onClick={() => onSelect(product)} aria-label={`Comprar ${product.productName}`}>COMPRAR</button>
  </article>;
}
