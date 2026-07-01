import { notification } from '@/src/components/Notification/notification';
import { usePermissionStore } from '@/src/store/usePermissionsStore';
import { permissionService } from '@/src/services/permission.service';
import {
    CreatePermissionDTO,
    UpdatePermissionDTO,
    PermissionFilters
} from '../interfaces/permission';

export const usePermissions = () => {
    const {
        permissions,
        profilePermissions, 
        pagination,
        isLoading,
        setPermissions,
        setProfilePermissions,
        setLoading,
        addPermission,
        updatePermission,
        removePermission
    } = usePermissionStore();

    const fetchPermissions = async (params?: PermissionFilters) => {
        setLoading(true);
        try {
            const data = await permissionService.list(params);
            setPermissions(data);
            return data;
        } catch (error) {
            notification.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchByProfileId = async (profileId: string) => {
        setLoading(true);
        try {
            const data = await permissionService.getByProfileId(profileId);
            setProfilePermissions(profileId, data);
            return data;
        } catch (error) {
            notification.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createPermission = async (data: CreatePermissionDTO) => {
        setLoading(true);
        try {
            const newPermission = await permissionService.create(data);
            addPermission(newPermission);
            notification.success('Sucesso', 'Permissão criada com sucesso.');
            return newPermission;
        } catch (error) {
            notification.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updatePermissionAction = async (id: string, data: UpdatePermissionDTO) => {
        setLoading(true);
        try {
            const updated = await permissionService.update(id, data);
            updatePermission(id, updated);
            notification.success('Sucesso', 'Permissão atualizada com sucesso.');
            return updated;
        } catch (error) {
            notification.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removePermissionAction = async (id: string) => {
        setLoading(true);
        try {
            await permissionService.remove(id);
            removePermission(id);
            notification.success('Sucesso', 'Permissão removida com sucesso.');
        } catch (error) {
            notification.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        permissions,
        profilePermissions, 
        pagination,
        isLoading,
        fetchPermissions,
        fetchByProfileId, 
        createPermission,
        updatePermissionAction,
        removePermissionAction
    };
};