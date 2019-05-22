<template v-if="user">
    <div>
        <!-- Bread crumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h3 class="text-primary">Utilizator</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <!-- <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li> -->
                    <li class="breadcrumb-item active">Profil</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-title">
                            <h4>Editează profilul</h4>
                        </div>
                        <div class="card-body">
                        <div class="basic-form">
                            <form @submit.prevent="update(user)">
                                <div class="form-group">
                                    <label>Hash</label>
                                    <input type="text" name="hash" class="form-control" disabled v-model="user.hash" />
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" class="form-control"  disabled v-model="user.email" />
                                </div>
                                <div class="form-group">
                                    <label>Nume</label>
                                    <input 
                                        type="text" 
                                        class="form-control"
                                        placeholder="Nume"
                                        id="lastName"
                                        v-model="user.lastName"
                                        ref="nume"
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
                                        ref="prenume"
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
                                        ref="password"
                                    />
                                </div>
                                <button type="submit" class="btn btn-primary m-b-10 m-l-5">Salvează</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>   
                <div class="col-lg-2"></div>
            </div>
            <!-- End PAge Content -->
        </div>
        <!-- End Container fluid  -->
    </div>
</template>

<script>
import axios from 'axios';

export default {

    data: function(){
        return {
            user:{},
        }
    },
    methods: {
        getUser() {
            axios.get(`http://localhost:4000/api/auth/user`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                this.user = res.data.data;
                this.$cookiz.set('user', res.data.data)
            })
        },
        update(user) {
            const newData = {
                password: this.$refs.password.value,
                firstName: this.$refs.prenume.value,
                lastName: this.$refs.nume.value
            };
            console.log('UPDATE DATA:') 
            console.log(newData)

            axios.put(`http://localhost:4000/api/users/` + this.user.hash ,newData, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('UPDATE:')
                console.log(res.data.errors)
                swal({title: "Actualizare reusita",timer: 2000,type:'success',showConfirmButton: false});
            }).catch(err =>{
                console.log(err.response)
                sweetAlert("Oops...", JSON.stringify(err.response.data.errors), "error");
            })
            
        }
    },
    created: function() {
        this.getUser()
    },  
}
</script>