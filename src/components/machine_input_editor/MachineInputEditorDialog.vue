<template>
    <el-dialog :visible.sync="localVisible"
               :title="title"
               append-to-body>
        <el-form v-if="localInput"
                 :model="localInput"
                 :rules="rules"
                 ref="form"
                 label-width="120px">
            <el-form-item label="Name" prop="name">
                <el-input v-model="localInput.name"></el-input>
            </el-form-item>
            <el-form-item label="Pin" prop="gpioPin">
                <el-select v-model="localInput.gpioPin" placeholder="Select">
                    <el-option
                            v-for="pin in availablePins"
                            :key="pin"
                            :label="pin"
                            :value="pin">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">Cancel</el-button>
            <el-button type="primary" @click="save">Save</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts" src="./MachineInputEditorDialog.ts">
</script>