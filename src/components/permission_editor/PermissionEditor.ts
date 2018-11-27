import {Component, Model, Prop, Vue, Watch} from 'vue-property-decorator';
import {PermissionType} from '@/enums/PermissionType';

@Component
export default class PermissionEditor extends Vue {

  @Model('update:permissions')
  @Prop({
    type: Array,
    required: true,
  })
  private permissions: PermissionType[];

  private localPermissions: PermissionType[] = [];
  private permissionMap: { [k: number]: boolean } = {};

  get permissionValues(): number[] {
    const keys = Object.keys(PermissionType).filter(k => typeof PermissionType[k as any] === 'number');
    return keys.map(k => PermissionType[k as any] as any as number);
  }

  getParsedPermission(permissionType: PermissionType): string {
    const lowercaseReplaced = PermissionType[permissionType].replace(/_/g, ' ').toLowerCase();
    return lowercaseReplaced.charAt(0).toUpperCase() + lowercaseReplaced.slice(1);
  }

  @Watch('permissions', {immediate: true})
  onPermissionsChanged(permissions: PermissionType[]) {
    if (permissions === this.localPermissions) {
      return;
    }
    this.localPermissions = permissions;
    this.permissionMap = this.permissionValues.reduce((p, c) => {
      return {...p, ...{[c]: permissions.indexOf(c) !== -1}};
    }, {});
  }

  @Watch('permissionMap', {deep: true})
  onPermissionMapChange(permissionMap: { [k: number]: boolean }) {
    this.localPermissions = Object.keys(permissionMap).reduce((p, c) => {
      if (!permissionMap[c  as any as number]) {
        return p;
      }
      return [...p, parseInt(c)];
    }, []);
    this.$emit('update:permissions', this.localPermissions);
  }
}
