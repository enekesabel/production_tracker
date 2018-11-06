<template>
    <el-menu :router="true"
             :default-active="$route.path"
             class="el-menu-demo"
             mode="horizontal">
        <el-menu-item index="/home">Home</el-menu-item>
        <el-menu-item index="/menu_1">Menu 1</el-menu-item>
        <el-menu-item index="/menu_2">Menu 2</el-menu-item>
        <el-submenu index="2" style="float: right;">
            <template slot="title">Profile</template>
            <el-menu-item index="/settings">Settings</el-menu-item>
            <el-menu-item index="/login">Log out</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script lang="ts" src="./Navbar.ts">
</script>
