<template>
    <div class="device-details">
        <div v-if="machine"
             class="d-flex flex-row">
            <h1>{{machine.machineName}} — {{machine.machineId}}</h1>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="input in inputs" class="col-12 col-lg-6 mt-5">
                    <diagram :inputData="input"></diagram>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./DeviceDetails.ts">
</script>
