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
            <el-table-column
                    align="center"
                    label="Operations"
                    width="180">
                <template slot-scope="scope">
                    <el-button type="primary"
                               icon="el-icon-setting"
                               title="Settings"
                               size="mini"
                               @click="openSettings(scope.row)"
                               circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <user-settings-dialog v-if="selectedUser"
                              :visible.sync="settingsDialogVisible"
                              :user="selectedUser"></user-settings-dialog>
    </div>
</template>

<script lang="ts" src="./Users.ts">
</script>
