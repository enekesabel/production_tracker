import axios from 'axios';
import {PermissionType} from '@/enums/PermissionType';
import {Permission} from '@/types/Permission';

// tslint:disable-next-line
export const PermissionApi = {
  async getUserPermissions(userId: string): Promise<Permission[]> {
    const response = await axios.get(`permissions/${userId}`);
    return response.data;
  },
  async grantPermission(userId: string, permissionType: PermissionType): Promise<Permission> {
    const response = await axios.post('permissions', {
      userId,
      permissionType,
    });
    return response.data;
  },
  async deletePermission(permissionId: string) {
    await axios.delete(`permissions/${permissionId}`);
  },
};
