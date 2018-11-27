<template>
    <el-dialog
            title="Machine settings"
            :visible.sync="localVisible"
            width="60%"
            :close-on-click-modal="false">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-5">
                    <h3 class="mb-4">General settings</h3>
                    <machine-settings-form v-model="localMachine"></machine-settings-form>
                </div>
                <div class="col-12 col-lg-7">
                    <h3 class="mb-3">Input configuration</h3>
                    <machine-input-table v-if="localMachine"
                                         ref="inputTable"
                                         :machineId="localMachine.machineId"></machine-input-table>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">Cancel</el-button>
            <el-button type="primary" @click="save">Save</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" src="./MachineSettingsDialog.ts">
</script>
