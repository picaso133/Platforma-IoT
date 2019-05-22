<template>
    <div>
        <div id="main-wrapper">
            <div class="unix-login">
            <div class="container-fluid">
                <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="login-content card">
                    <div class="login-form">
                        <h4>Înregistrare</h4>
                        <form @submit.prevent="register()">
                            <div class="form-group">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    placeholder="Email"
                                    id="email"
                                    v-model="user.email"
                                />
                            </div>
                            <div class="form-group">
                                <label>Nume</label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    placeholder="Nume"
                                    id="lastName"
                                    v-model="user.lastName"
                                />
                            </div>
                            <div class="form-group">
                                <label>Prenume</label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    placeholder="Prenume"
                                    id="firstName"
                                    v-model="user.firstName"
                                />
                            </div>
                            <div class="form-group">
                                <label>Parola</label>
                                <input 
                                    type="password" 
                                    class="form-control"
                                    placeholder="Parola"
                                    id="password"
                                    v-model="user.password"
                                />
                            </div>
                            <button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30">Înregistrare</button>
                            <div class="register-link m-t-15 text-center">
                                <p>Ai deja cont ? <a href="/login"> Autentificare </a></p>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            user:{}
        }
    },
    methods: {
        register() {
            axios.post("http://localhost:4000/api/auth/signup",{
                email: this.user.email,
                password: this.user.password,
                firstName: this.user.firstName,
                lastName: this.user.lastName
            }).then(res => {
                this.$nuxt.$router.replace({ path: '/' })
            })
            
            
        }
    },
    
}
</script>
