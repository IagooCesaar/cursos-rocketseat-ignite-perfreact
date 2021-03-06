import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from '../components/searchResults'

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home(): JSX.Element {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });
  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();
    const totalPrice = data.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })
    setResults({
      data: products,
      totalPrice
    });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>

        <SearchResults
          results={results.data}
          totalPrice={results.totalPrice}
          onAddToWishList={addToWishList}
        />
      </form>
    </div>
  )
}
