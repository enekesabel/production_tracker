<template>
    <div>
        <h1>
            Users
        </h1>
        <el-table
                :data="users"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="Name">
            </el-table-column>
            <el-table-column
                    prop="emailAddress"
                    label="Email">
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" src="./Users.ts">
</script>
