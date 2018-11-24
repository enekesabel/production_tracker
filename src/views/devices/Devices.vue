<template>
    <div>
        <div class="d-flex flex-row justify-content-between">
            <h1>
                Devices
            </h1>
            <el-button type="primary"
                       class="mt-3"
                       @click="openAddDialog">Add device
            </el-button>
        </div>
        <el-table
                :data="machines"
                style="width: 100%">
            <el-table-column
                    prop="machineName"
                    label="Machine">
            </el-table-column>
            <el-table-column
                    prop="machineId"
                    label="Id">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="Operations"
                    width="180">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary"
                                   icon="el-icon-setting"
                                   title="Configure"
                                   size="mini"
                                   @click="configureMachine(scope.row)"
                                   circle></el-button>
                        <el-button type="danger"
                                   icon="el-icon-delete"
                                   title="Detach"
                                   size="mini"
                                   @click="detachMachine(scope.row.id)"
                                   circle></el-button>
                    </div>
                </template>
            </el-table-column>
            <div slot="empty" class="py-3">
                <div>You have no connected devices yet.</div>
            </div>
        </el-table>
        <machine-settings-dialog :visible.sync="machineSettingsDialogVisible"
                                 :machine="selectedMachine"></machine-settings-dialog>
        <el-dialog
                title="Add device"
                :visible.sync="machineAddDialogVisible"
                width="30%">
            <machine-settings-form v-model="machineToAdd"
                                   ref="addMachineForm"></machine-settings-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddDialog">Cancel</el-button>
                <el-button type="primary" @click="addMachine">Add</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script lang="ts" src="./Devices.ts">
</script>
