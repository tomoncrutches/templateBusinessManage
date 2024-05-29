import { Recipe } from '@/types/products.types';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

export const useControllerRecipes = (defaultRecipes?: Recipe[]) => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>(
    (defaultRecipes as Recipe[]) ?? [{ material_id: '', quantity: 0 }],
  );

  const [showSelectedRecipesError, setShowSelectedRecipesError] =
    useState(false);

  const addSelectedRecipes = () => {
    setSelectedRecipes((prev) => [...prev, { material_id: '', quantity: 0 }]);
  };

  const deleteSelectedRecipe = (index: number) => {
    setSelectedRecipes((prev) => prev.filter((_, x) => x !== index));
  };

  const handleChangeSelectValue = (value: string, index: number) => {
    const updatedItems = selectedRecipes.map((item, i) => {
      return {
        material_id: index === i ? value : item.material_id,
        quantity: item.quantity,
      };
    });

    setSelectedRecipes(updatedItems);
  };

  const handleChangeSelectedRecipeQuantity = useDebouncedCallback(
    (value: number, material_id: string) => {
      setSelectedRecipes((prev) =>
        prev.map((item) => {
          return {
            material_id: item.material_id,
            quantity: item.material_id === material_id ? value : item.quantity,
          };
        }),
      );
    },
    300,
  );

  const areEmptySelectedRecipes = selectedRecipes.some((p) => {
    return p.material_id === '' || (p.quantity as number) <= 0 ? true : false;
  });

  return {
    selectedRecipes,
    handleChangeSelectValue,
    areEmptySelectedRecipes,
    handleChangeSelectedRecipeQuantity,
    deleteSelectedRecipe,
    addSelectedRecipes,
    showSelectedRecipesError,
    setShowSelectedRecipesError,
  };
};
