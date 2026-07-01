import { itemService } from '@/src/services/item.service';
import { useItemStore } from '@/src/store/useItemStore';
import { ItemFilters, CreateItemDTO, UpdateItemDTO } from '@/src/interfaces/item';

export const useItems = () => {
  const {
    items,
    pagination,
    isLoading,
    setLoading,
    setItems,
    addItem,
    updateItem: updateItemStore,
    removeItem
  } = useItemStore();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await itemService.list();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (data: CreateItemDTO) => {
    setLoading(true);
    try {
      const newItem = await itemService.create(data);
      addItem(newItem);
      return newItem;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (
    id: string,
    data: UpdateItemDTO,
    filters?: ItemFilters
  ) => {
    setLoading(true);
    try {
      const updatedItem = await itemService.update(id, data);
      const items = await itemService.list(filters);
      setItems(items);
      return updatedItem;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      await itemService.remove(id);
      removeItem(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    pagination,
    isLoading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
};