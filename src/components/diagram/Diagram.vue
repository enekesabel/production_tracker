<template>
    <div class="w-100 text-center">
        <h5>{{inputData.inputName}}</h5>
        <component :is="type"
                   v-bind="$props"
                   :width="width"
                   :min="minValue"
                   :max="maxValue"
                   :cssClasses="cssClasses"
                   :styles="styles"></component>
    </div>
</template>

<script lang="ts" src="./Diagram.ts">

</script>

<style scoped>

</style>