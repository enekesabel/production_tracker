<template>
    <div id="app">
        <el-container class="container h-100">
            <el-header>
                <router-view name="navbar"></router-view>
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
