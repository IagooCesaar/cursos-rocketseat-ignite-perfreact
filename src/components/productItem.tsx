import React, { memo, useState } from 'react'
import dynamic from 'next/dynamic'; // ou lazy do react
import { AddProductToWishListProps } from './addProductToWishList';
// import { AddProductToWishList } from './addProductToWishList';

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./addProductToWishList')
    //Se o component fosse `export default` não precisaria do .then a seguir
    .then(mod => mod.AddProductToWishList)
})

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
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)} >Adicionar aos favoritos</button>

      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}

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