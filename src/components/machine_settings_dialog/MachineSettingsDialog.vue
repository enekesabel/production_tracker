<template>
    <el-dialog
            title="Machine settings"
            :visible.sync="localVisible"
            width="60%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">Cancel</el-button>
            <el-button type="primary" @click="save">Save</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" src="./MachineSettingsDialog.ts">
</script>
