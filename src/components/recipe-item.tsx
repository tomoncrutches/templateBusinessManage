import { CheckIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { Button } from './ui/button';
import { Material } from '@/types/material.types';
import { Recipe } from '@/types/products.types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Props = {
  index: number;
  selectedRecipes: Recipe[];
  recipe: Recipe;
  material: Material[];
  handleChangeSelectValue: (id: string, index: number) => void;
};

export const RecipeItem = ({
  index,
  recipe,
  selectedRecipes,
  material,
  handleChangeSelectValue,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {recipe.material_id
            ? material.find((item) => item.id === recipe.material_id)?.name
            : 'Seleccione un material'}
          <ChevronUpIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Busca un material...' />
          <CommandList>
            <CommandEmpty>Material no encontrado.</CommandEmpty>
            <CommandGroup heading='Materiales'>
              {material?.map((item) => {
                return (
                  <CommandItem
                    key={item.id}
                    value={item.name as string}
                    onSelect={(value) => {
                      const id = material.find((item) =>
                        item.name.toLowerCase().includes(value.toLowerCase()),
                      )?.id;

                      handleChangeSelectValue(id as string, index);
                      setOpen(false);
                    }}
                    disabled={
                      selectedRecipes.find((r) => r.material_id === item.id)
                        ? true
                        : false
                    }
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedRecipes.find((p) => p.material_id === item.id)
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {item.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
