import { memo } from 'react'

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string
  };
  onAddToWishList: (id: number) => Promise<void>;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishList(product.id)} >Add To Wish List</button>
    </div>
  )
}

// Shallow compara -> comparação rasa
// {} === {} // false, realiza comparação de igualdade referencial
// verifica se estão na mesma posição na memória
// quando não for indicado realizar comparação com === utilizar 
// segundo parâmetro do Memo

export const ProductItem = memo(ProductItemComponent,
  (previousProps, nextProps) => {
    // retorno para identificar se houveram alterações
    return Object.is(previousProps.product, nextProps.product);
  }
);