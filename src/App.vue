<template>
    <div id="app">
        <el-container class="container h-100">
            <el-header>
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
            </el-header>
            <el-main class="h-100">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<style lang="css">
    @import "~element-ui/lib/theme-chalk/index.css";
</style>
<style lang="scss">
    @import "./assets/styles/index";
</style>
