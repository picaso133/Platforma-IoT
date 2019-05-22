<template>
    <div>
        <!-- Bread crumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h3 class="text-primary">Device</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item">Device</li>
                    <li class="breadcrumb-item active">{{this.device.name}}</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row justify-content-center" v-if="ifeditDevice">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Editeaza device</h4>
                            <form class="form p-t-20" @submit.prevent="editDevice()">
                                <div class="form-group">
                                    <label for="exampleInputuname2">Denumire</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Denumire"
                                            v-model="device.name"
                                            ref="deviceName"
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label >Descriere</label>
                                    <div class="input-group">
                                        <textarea 
                                            type="text" 
                                            class="textarea_editor form-control" 
                                            placeholder="Descriere"
                                            rows="5"
                                            style="height:150px"
                                            v-model="device.description"
                                            ref="deviceDescription"
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label >Culoare</label>
                                        <div class="input-group">
                                            <select :class="'form-control bg-'+this.device.color" id="" ref="deviceColor" v-model="device.color">
                                                <option value="primary" class="bg-primary">primary</option>
                                                <option value="secondary" class="bg-secondary">secondary</option>
                                                <option value="success" class="bg-success">success</option>
                                                <option value="danger" class="bg-danger">danger</option>
                                                <option value="warning" class="bg-warning">warning</option>
                                                <option value="info" class="bg-info">info</option>
                                                <option value="light" class="bg-light">light</option>
                                                <option value="dark" class="bg-dark">dark</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label >Pictograma</label>
                                        <div class="input-group">
                                            <input 
                                                type="text" 
                                                class="form-control" 
                                                placeholder="Denumire"
                                                ref="deviceIcon"
                                                v-model="device.icon"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left">
                                    <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
                                    <button  @click="hideEditDevice()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row bg-white m-l-0 m-r-0 box-shadow">
                <div class="col-lg-4">
                    <div class="card">
                        <h1 :class="'text-'+this.device.color"><i :class="'fa fa-'+ device.icon +' f-s-40 color-'+device.color"></i>&nbsp;{{this.device.name}}</h1>
                        <h3>{{this.device.description}}</h3>
                        <h3>MAC: {{this.device.mac}}</h3>
                        <div>
                            <span>Creat: {{this.device.createdAt}}</span><br />
                            <span>Actualizat: {{this.device.updatedAt}}</span>
                        </div>
                        <div class="text-success">
                            Hash: {{this.device.hash}}
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <br />
                    
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2825.442098743148!2d26.03444341583177!3d44.91434427798397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDU0JzUxLjYiTiAyNsKwMDInMTEuOSJF!5e0!3m2!1sro!2sro!4v1532032608533" 
                        width="500" 
                        height="250" 
                        frameborder="0" 
                        style="border:0" 
                        allowfullscreen
                    >
                    </iframe>
                </div>
                <div class="col-md-2">
                    <div class="card bg-primary p-20">
                        <div class="media widget-ten">
                            <div class="media-left meida media-middle">
                                <span><i class="fa fa-microchip f-s-40"></i></span>
                            </div>
                            <div class="media-body media-text-right">
                                <h2 class="color-white">{{fields.length}}</h2>
                                <p class="m-b-0">Numarul de câmpuri</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 justify-content-center">
                    <div>
                        <br />
                        <button type="button" @click="showEditDevice()" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5"><i class="ti-plus"></i> Editeaza</button>
                        <button type="button" @click="deleteDevice()" class="btn btn-danger btn-flat btn-addon m-b-10 m-l-5"><i class="ti-trash"></i> Sterge</button>
                    </div>
                    
                </div>
            </div>
            <div class="row">
                
            </div>
            <br />
            <Fields />
            <!-- End PAge Content -->
        </div> <!-- End Container fluid  -->
       
    </div>
</template>

<script>
import axios from 'axios';
import Fields from './Fields.vue';
export default { 
    data({ params }){
        return {
            ifeditDevice: false,
            user: this.$cookiz.get('user'),
            device:{},
            fields:[]
            
        }
    },
    components:{
        Fields
    },
    methods: {
        showEditDevice() {
            this.ifeditDevice = true
        },
        hideEditDevice(){
            this.ifeditDevice = false
        },
        getDevice() {
            this.device.hash = this.$route.params.hash
            axios.get(`http://localhost:4000/api/device/${this.device.hash}`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('GET:')
                console.log(res.data.data);
                this.device = res.data.data
                this.getField()
            })
            
        },
        getField() {
            // this.field.hash = this.$route.params.hash
            axios.get(`http://localhost:4000/api/field/?deviceHash=${this.device.hash}`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('GET:')
                console.log(res.data.data);
                this.fields = res.data.data
                // this.getDevice()
                // this.getData()
            })
            
        },
        editDevice(){
            const newData = {
                name: this.device.name,
                description: this.device.description,
                icon: this.device.icon,
                color: this.device.color,
            };
            axios.put(`http://localhost:4000/api/device/${this.device.hash}`, newData, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.device = response.data.data
            })
            this.hideEditDevice()
        },
        deleteDevice(){
            axios.delete(`http://localhost:4000/api/device/${this.device.hash}`, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                swal({title: "Stergere reusita !!", timer: 1500, type:'success', showConfirmButton: false});
                this.$router.push({ name: 'device'})
            })
            .catch(error => {
                console.log(error)
            });
        }
    },
    created() {
        this.getDevice()
    },  
}
</script>