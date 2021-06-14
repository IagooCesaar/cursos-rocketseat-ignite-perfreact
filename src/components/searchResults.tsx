import { ProductItem } from './productItem'

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}


export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      {results.map(product => {
        return (
          <ProductItem product={product} />
        )
      })}
    </div>
  )
}