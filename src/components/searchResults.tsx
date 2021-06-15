import { ProductItem } from './productItem'

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}


export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = results.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  return (
    <div>
      <h2>Total: {totalPrice}</h2>
      {results.map(product => {
        return (
          <ProductItem product={product} />
        )
      })}
    </div>
  )
}