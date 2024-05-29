import { IProductSale } from '@/types/products.types';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

// Hook para el control de los productos seleccionados en los formularios
// como el de Sales y Products.

export const useControllerProducts = (countRecipes?: boolean) => {
  const [selectedProducts, setSelectedProducts] = useState<IProductSale[]>([
    { id: '', quantity: 0, recipe_quantity: countRecipes ? 0 : undefined },
  ]);
  const [showSelectedProductsError, setShowSelectedProductsError] =
    useState(false);

  const addSelectedProducts = () => {
    setSelectedProducts((prev) => [
      ...prev,
      { id: '', quantity: 0, recipe_quantity: countRecipes ? 0 : undefined },
    ]);
  };

  const deleteSelectedProduct = (index: number) => {
    setSelectedProducts((prev) => prev.filter((_, x) => x !== index));
  };

  const handleChangeSelectValue = (value: string, index: number) => {
    const updatedItems = selectedProducts.map((item, i) => {
      return {
        id: index === i ? value : item.id,
        quantity: item.quantity,
        recipe_quantity: item.recipe_quantity,
      };
    });

    setSelectedProducts(updatedItems);
  };

  const handleChangeSelectedProductQuantity = useDebouncedCallback(
    (value: number, id: string) => {
      setSelectedProducts((prev) =>
        prev.map((item) => {
          return {
            id: item.id,
            quantity: item.id === id ? value : item.quantity,
            recipe_quantity: item.recipe_quantity,
          };
        }),
      );
    },
    300,
  );

  const handleChangeSelectedRecipesQuantity = useDebouncedCallback(
    (value: number, id: string) => {
      setSelectedProducts((prev) =>
        prev.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
            recipe_quantity: item.id === id ? value : item.recipe_quantity,
          };
        }),
      );
    },
    300,
  );

  const areEmptySelectedProducts = selectedProducts.some((p) => {
    return p.id === '' ||
      p.quantity <= 0 ||
      ((p.recipe_quantity as number) <= 0 ?? false)
      ? true
      : false;
  });

  return {
    selectedProducts,
    addSelectedProducts,
    deleteSelectedProduct,
    handleChangeSelectValue,
    handleChangeSelectedProductQuantity,
    handleChangeSelectedRecipesQuantity,
    areEmptySelectedProducts,
    showSelectedProductsError,
    setShowSelectedProductsError,
  };
};
