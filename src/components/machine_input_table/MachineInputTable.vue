<template>
    <div>
        <el-table
                :data="inputs"
                :default-sort="{prop: 'gpioPin'}"
                style="width: 100%">
            <el-table-column
                    prop="gpioPin"
                    label="Pin">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="Name">
            </el-table-column>
            <el-table-column
                    prop="machineId"
                    label="Machine ID">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="Operations"
                    width="180">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary"
                                   icon="el-icon-edit"
                                   title="Configure"
                                   size="mini"
                                   @click="editInput(scope.row)"
                                   circle></el-button>
                        <el-button type="danger"
                                   icon="el-icon-delete"
                                   title="Remove"
                                   size="mini"
                                   @click="removeInput(scope.row)"
                                   circle></el-button>
                    </div>
                </template>
            </el-table-column>
            <div slot="empty" class="py-3">
                <div>This machine has no configured inputs yet.</div>
            </div>
            <div slot="append"
                 class="w-100 text-center py-3">
                <el-button type="primary"
                           v-if="showAddButton"
                           icon="el-icon-plus"
                           title="Add input"
                           @click="addInput"
                           circle></el-button>
            </div>
        </el-table>
        <machine-input-editor-dialog ref="machineInputEditorDialog"
                                     :title="inputDialogTitle"
                                     :availablePins="availablePins"
                                     @update:input="onInputUpdated"
                                     v-model="selectedInput"></machine-input-editor-dialog>
    </div>
</template>
<script lang="ts" src="./MachineInputTable.ts">
</script>
