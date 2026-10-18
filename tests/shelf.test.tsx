import { describe, it, expect, vi } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductShelf } from '../src/components/ProductShelf';
const products = ['Celular A', 'Celular B'].map((name, i) => ({ productName: name, descriptionShort: `Descrição ${name}`, photo: 'https://example.com/a.png', price: (i + 1) * 1000 }));
function mockProducts() { vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, products }) })); }
describe('vitrine e detalhes', () => {
  it('abre as informações do produto escolhido e fecha pelo botão', async () => {
    mockProducts(); const user = userEvent.setup(); render(<ProductShelf />);
    await user.click(await screen.findByRole('button', { name: 'Comprar Celular B' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Celular B' })).toBeInTheDocument();
    expect(within(dialog).getByText('Descrição Celular B')).toBeInTheDocument();
    expect(within(dialog).getByText(/2\.000,00/)).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Fechar detalhes do produto' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('fecha ao receber o cancelamento nativo do dialog (Esc)', async () => {
    mockProducts(); render(<ProductShelf />);
    fireEvent.click(await screen.findByRole('button', { name: 'Ver detalhes de Celular A' }));
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('permite tentar novamente após falha da API', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('Falha de rede')).mockResolvedValue({ ok: true, json: async () => ({ success: true, products }) });
    vi.stubGlobal('fetch', fetchMock); render(<ProductShelf />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Falha de rede');
    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(await screen.findByRole('button', { name: 'Comprar Celular A' })).toBeInTheDocument();
  });
});
