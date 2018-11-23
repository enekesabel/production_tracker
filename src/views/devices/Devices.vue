<template>
    <div>
        <h1>
            Devices
        </h1>
        <el-table
                :data="machines"
                style="width: 100%">
            <el-table-column
                    prop="MachineName"
                    label="Machine">
            </el-table-column>
            <el-table-column
                    prop="MachineId"
                    label="Id">
            </el-table-column>
            <div slot="empty" class="py-3">
                <div>You have no connected devices yet.</div>
                <el-button type="primary"
                           class="mt-3"
                           @click="openDialog">Add device
                </el-button>
            </div>
        </el-table>
        <el-dialog
                title="Add device"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form :model="machineToAdd"
                     ref="addMachineForm"
                     :rules="rules"
                     label-width="60px">
                <el-form-item label="Name" prop="MachineName">
                    <el-input v-model="machineToAdd.MachineName"></el-input>
                </el-form-item>
                <el-form-item label="Id" prop="MachineId">
                    <el-input v-model="machineToAdd.MachineId"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">Cancel</el-button>
                <el-button type="primary" @click="addMachine">Add</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script lang="ts" src="./Devices.ts">
</script>
