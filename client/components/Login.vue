<template>
    <div>
        <div id="main-wrapper">
            <div class="unix-login">
            <div class="container-fluid">
                <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="login-content card">
                    <div class="login-form">
                        <h4>Autentificare</h4>
                        <form @submit.prevent="login(user)">
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
                            <label>Parola</label>
                            <input 
                                type="password" 
                                class="form-control"
                                placeholder="Parola"
                                id="password"
                                v-model="user.password"
                            />
                        </div>
                        <button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30" >Autentificare</button>
                        <div class="register-link m-t-15 text-center">
                            <p>Nu aveți cont? <a href="/register"> Înregistrare</a></p>
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
        login(user) {
            console.log(user);
            axios.post("http://localhost:4000/api/auth/signin",{
                email: user.email,
                password: user.password
            }).then(res => {
                console.log(res.data.data)
                this.$cookiz.set('token', res.data.data)
                swal({title: "Autentificare reusita !!", timer: 2500, type:'success', showConfirmButton: false});
                this.getUser();
                // this.$router.push({ path: `/` })
                this.$router.replace('board')

            }).catch(err =>{
                console.log(err.response)
                sweetAlert("Oops...", err.response.data.message, "error");
            })
        },
        getUser() {
            axios.get(`http://localhost:4000/api/auth/user`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                this.user = res.data.data;
                this.$cookiz.set('user', res.data.data)
                // console.log('GET:')
                console.log(this.$cookiz.get('user'));
            })
            
        }
    },
    
}
</script>
