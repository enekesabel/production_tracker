<template>
    <el-form id="login" :model="loginForm" label-position="top" :rules="rules" ref="loginForm" label-width="120px">
        <h4 class="text-center">Login</h4>
        <el-form-item label="Email" prop="email">
            <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input v-model="loginForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <div class="d-flex justify-content-between">
            <router-link :to="{name: Routes.SIGNUP}">Sign up</router-link>
            <el-form-item>
                <el-button type="primary" @click="login()">Login</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script lang="ts" src="./LoginForm.ts">
</script>
