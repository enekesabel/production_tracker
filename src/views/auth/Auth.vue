<template>
    <el-row type="flex" class="h-100 align-items-center justify-content-center">
        <el-col :xs="24" :sm="16" :md="12" :lg="8">
            <el-card>
                <router-view></router-view>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" src="./Auth.ts">
</script>
