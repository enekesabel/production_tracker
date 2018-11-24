<template>
    <el-dialog
            title="User settings"
            :visible.sync="localVisible"
            width="30%">
        <permission-editor v-model="userPermissionsTypes"></permission-editor>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">Cancel</el-button>
            <el-button type="primary" @click="save">Save</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" src="./UserSettingsDialog.ts">
</script>
