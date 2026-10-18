import type { Product } from '../types/product';
export const PRODUCTS_URL = '/api/products';
export function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false;
  const p = value as Record<string, unknown>;
  return typeof p.productName === 'string' && typeof p.descriptionShort === 'string'
    && typeof p.photo === 'string' && /^https?:\/\//.test(p.photo)
    && typeof p.price === 'number' && Number.isFinite(p.price) && p.price >= 0;
}
export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal });
  if (!response.ok) throw new Error('Não foi possível carregar os produtos.');
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('products' in data) || !('success' in data)
    || data.success !== true || !Array.isArray(data.products) || !data.products.every(isProduct)) {
    throw new Error('A resposta de produtos está em um formato inválido.');
  }
  return data.products;
}
export const currency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
