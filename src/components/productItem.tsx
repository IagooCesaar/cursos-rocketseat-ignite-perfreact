import { memo } from 'react'

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
}

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
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