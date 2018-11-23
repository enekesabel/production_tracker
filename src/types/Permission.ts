import {PermissionType} from '@/enums/PermissionType';

export type Permission = {
  id: string,
  userId: string,
  permissionGranted: PermissionType,
};
