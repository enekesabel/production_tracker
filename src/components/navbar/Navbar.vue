<template>
    <el-menu :router="true"
             :default-active="$route.path"
             class="el-menu-demo"
             mode="horizontal">
        <el-menu-item :route="{name: Routes.HOME}"
                      :index="Routes.HOME">Home
        </el-menu-item>
        <el-menu-item :route="{name: Routes.DEVICES}"
                      :index="Routes.DEVICES">Devices
        </el-menu-item>
        <el-menu-item :route="{name: Routes.USERS}"
                      :index="Routes.USERS">Users
        </el-menu-item>
        <el-submenu index="2" style="float: right;">
            <template slot="title">Profile</template>
            <el-menu-item @click="requestAdminRights"
                          :route="{name: $router.currentRoute.name}"
                          index="admin">Request admin rights
            </el-menu-item>
            <el-menu-item @click="logout"
                          :route="{name: Routes.LOGIN}"
                          :index="Routes.LOGIN">Log out
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script lang="ts" src="./Navbar.ts">
</script>
