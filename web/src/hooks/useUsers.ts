import { userService } from '@/src/services/users.service';
import { useUserStore } from '@/src/store/useUsersStore';
import { UserFilters, CreateUserDTO, UpdateUserDTO } from '@/src/interfaces/user';

export const useUsers = () => {
  const {
    users,
    pagination,
    isLoading,
    setLoading,
    setUsers,
    addUser,
    updateUser: updateUserStore,
    removeUser
  } = useUserStore();

  const fetchUsers = async (params?: UserFilters) => {
    setLoading(true);
    try {
      const data = await userService.list(params);
      setUsers(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data: CreateUserDTO) => {
    setLoading(true);
    try {
      const newUser = await userService.create(data);
      addUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    id: string,
    data: UpdateUserDTO,
    filters?: UserFilters
  ) => {
    setLoading(true);

    try {
      const updatedUser = await userService.update(id, data);

      const users = await userService.list(filters);
      setUsers(users);

      return updatedUser;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      await userService.remove(id);
      removeUser(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    pagination,
    isLoading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
};