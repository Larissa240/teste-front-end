import { useState } from 'react';
import { ProductShelf } from './components/ProductShelf';
import { Header, Hero, Departments, Partners, Brands, Footer } from './components/StoreLayout';
export default function App() {
 const [query,setQuery]=useState('');
 return <><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><Header onSearch={setQuery}/><main id="conteudo"><Hero/><Departments/><div id="produtos"><ProductShelf query={query}/></div><Partners/><ProductShelf simple/><Partners/><Brands/><ProductShelf simple/></main><Footer/></>;
}
