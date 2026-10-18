import { describe, it, expect, vi } from 'vitest';
import { getProducts } from '../src/services/products';
const product = { productName: 'Celular A', descriptionShort: 'Descrição A', photo: 'https://example.com/a.png', price: 1500 };
describe('serviço de produtos', () => {
  it('retorna os dados recebidos do endpoint', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, products: [product] }) }));
    expect(await getProducts()).toEqual([product]);
  });
  it('informa erro HTTP', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(getProducts()).rejects.toThrow('Não foi possível');
  });
  it('rejeita produtos com preço inválido', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, products: [{ ...product, price: '1500' }] }) }));
    await expect(getProducts()).rejects.toThrow('formato inválido');
  });
});
