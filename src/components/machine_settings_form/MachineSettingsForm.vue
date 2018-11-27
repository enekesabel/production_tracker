<template>
    <el-form v-if="machine"
             :model="localMachine"
             ref="form"
             :rules="rules"
             label-width="60px">
        <el-form-item label="Name" prop="machineName">
            <el-input v-model="localMachine.machineName"></el-input>
        </el-form-item>
        <el-form-item label="Id" prop="machineId">
            <el-input v-model="localMachine.machineId"></el-input>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" src="./MachineSettingsForm.ts">
</script>
