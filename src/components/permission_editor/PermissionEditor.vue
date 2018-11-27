<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h4>Permissions</h4>
                    <div v-for="p in permissionValues"
                         class="d-flex flex-row align-items-center justify-content-between my-2">
                        <span>{{getParsedPermission(p)}}</span>
                        <el-switch v-model="permissionMap[p]">
                        </el-switch>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" src="./PermissionEditor.ts">
</script>