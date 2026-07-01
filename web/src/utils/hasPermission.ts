import { useAuthStore } from '@/src/store/useAuthStore';

export function hasPermission(data: { module: string; action: string }): boolean {
  const permissions = useAuthStore.getState().permissions;
  console.log('permissions', permissions);
  if (!permissions?.length) {
    return false;
  }

  return permissions.includes(`${data.module}:${data.action}`.toLowerCase());
}