<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="card m-3">
                <h4 class="card-header">User Registration</h4>
                <div class="card-body">
                    <Form class="register-form" @submit="register()" :validation-schema="schema">
                        <div class="mb-3 text-start">
                            <label for="text" class="mb-2 text-muted">Full Name</label>
                            <Field name="name" type="text" class="form-control" id="text" placeholder="Full Name"
                                v-model="formData.name" rules="required|min:3|max:100" />
                            <ErrorMessage class="text-danger" name="name" />
                        </div>
                        <div class="mb-3 text-start">
                            <label for="text" class="mb-2 text-muted">Email</label>
                            <Field name="email" type="text" class="form-control" id="text" placeholder="Email"
                                v-model="formData.email" rules="required|email|max:100" />
                            <ErrorMessage class="text-danger" name="email" />
                        </div>
                        <div class="mb-3 text-start">
                            <label for="pass" class="mb-2 text-muted">Password</label>
                            <Field name="password" type="password" class="form-control" id="pass" placeholder="Password"
                                v-model="formData.password" rules="required|min:6" ref="password"/>
                            <ErrorMessage class="text-danger" name="password" />
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary" :disabled="registerStatus">
                                <span v-show="loginStatus" class="spinner-border spinner-border-sm mr-1"></span>
                                Register
                            </button>
                            <router-link to="/" class="btn btn-link">Login</router-link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Form, ErrorMessage, extend } from 'vee-validate';
import store from "./store/index";
import {API_URL} from "./config/appConfig";
import axios from "axios";

export default {
    name: 'Register',
    components: {
        Field, Form, ErrorMessage
    },
    data() {
        return {
            registerStatus: false,
            formData: {
                name: '',
                email: '',
                password: '',
            }
        }
    },
    methods: {
        async register() {
            this.registerStatus = true
            await axios.post(`${API_URL}/api/register`, this.formData).then(res => {
                if (res.data.status == 'success') {
                    this.$toast.success(`${res.data.message}`, {
                        position: "top-right"
                    })
                    this.$router.push('/')
                } else {
                    this.$toast.error(`Server not respond`, {
                        position: "top-right"
                    })
                }
                this.registerStatus = false
            }).catch((error) => {
                this.$toast.error(error, {
                    position: "top-right"
                })
            })
        },
    }
}
</script>