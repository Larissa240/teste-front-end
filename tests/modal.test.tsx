import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductModal } from '../src/components/ProductModal';
it('controla quantidade mínima e sinaliza compra demonstrativa', async () => {
 const user=userEvent.setup();
 render(<ProductModal product={{ productName:'Celular',descriptionShort:'Descrição',photo:'https://example.com/a.png',price:1000 }} onClose={()=>{}}/>);
 expect(screen.getByRole('button',{name:'Diminuir quantidade'})).toBeDisabled();
 await user.click(screen.getByRole('button',{name:'Aumentar quantidade'}));
 expect(screen.getByLabelText('Quantidade')).toHaveTextContent('02');
 await user.click(screen.getByRole('button',{name:'COMPRAR'}));
 expect(screen.getByRole('status',{name:''})).toHaveTextContent(/2 unidade/);
});
