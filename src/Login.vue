<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">

            <div class="card m-3">
                <h4 class="card-header">User Login</h4>
                <div class="card-body">
                    <Form class="register-form" @submit="login()">
                        <div class="mb-3 text-start">
                            <label for="text" class="mb-2 text-muted">Email</label>
                            <Field name="Email" type="text" class="form-control" id="text" placeholder="Email"
                                v-model="formData.email" rules="required" />
                            <ErrorMessage class="text-danger" name="Email" />
                        </div>
                        <div class="mb-3 text-start">
                            <label for="pass" class="mb-2 text-muted">Password</label>
                            <Field name="Password" type="password" class="form-control" id="pass" placeholder="Password"
                                v-model="formData.password" rules="required" />
                            <ErrorMessage class="text-danger" name="Password" />
                        </div>
                        <!-- <button type="submit" class="btn text-white w-100 mt-2"
                            style="background: #F5001B;line-height: 30px;" :disabled="loginStatus">
                            Login <span v-if="loginStatus" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                        </button> -->

                        <div class="form-group">
                            <button class="btn btn-primary" :disabled="loginStatus">
                                <span v-show="loginStatus" class="spinner-border spinner-border-sm mr-1"></span>
                                Login
                            </button>
                            <router-link to="register" class="btn btn-link">Register</router-link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import store from "./store/index";
import {API_URL} from "./config/appConfig";
import axios from "axios";
export default {
    name: 'Login',
    components: {
        Field, Form, ErrorMessage
    },
    data() {
        return {
            loginStatus: false,
            formData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            this.loginStatus = true
            await axios.post(`${API_URL}/api/login`, this.formData).then(res => {

                console.log('res.success', res.success)
                if (res.data.success == true) {
                    this.$store.dispatch('setUser', {
                        token: res.data.access_token
                    });
                    store.state.user.token ? axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.user.token : ''
                    this.$router.push('/dashboard')
                } else {
                    this.$toast.error(`Server not respond`, {
                        position: "top-right"
                    })
                }
                this.loginStatus = false
            }).catch((error) => {
                this.$toast.error(error, {
                    position: "top-right"
                })
            })
        },
    }
}
</script>