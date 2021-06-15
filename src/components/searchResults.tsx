import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from './productItem'

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishList: (id: number) => Promise<void>;
  totalPrice: number;
}


export function SearchResults({
  results,
  onAddToWishList,
  totalPrice
}: SearchResultsProps) {

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    )
  };

  return (
    <div>
      <h2>Total: {totalPrice}</h2>
      <List
        height={300} // altura da lista, pode usar AutoSizer
        rowHeight={30} // altura da linha, pode user AutoSizer
        width={900} // largura da lista, pode user AutoSizer
        overscanColumnCount={5} // itens pré carregados
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  )
}