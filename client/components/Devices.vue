<template>
    <div>
        <!-- Bread crumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h3 class="text-primary">Dispozitive</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <!-- <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li> -->
                    <li class="breadcrumb-item active">Dispozitive</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row">
                    <button type="button" @click="showAddDevice()" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5"><i class="ti-plus"></i> Adauga</button>
            </div>
            <div class="row justify-content-center" v-if="ifaddDevice">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Adauga device</h4>
                            <form class="form p-t-20" @submit.prevent="addDevice()">
                                <div class="form-group">
                                    <label for="exampleInputuname2">Nume</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Denumire"
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
                                            ref="deviceDescription"
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputuname2">Locatie</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Locatia"
                                            ref="deviceLocation"
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputuname2">MAC</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Locatia"
                                            ref="deviceMac"
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputuname2">Vendor</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Locatia"
                                            ref="deviceVendor"
                                        >
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
                                    <button  @click="hideAddDevice()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3" v-for="item in this.devices" :key=item.hash>
                    <div class="card p-30">
                        <div class="media">
                            <div class="media-left meida media-middle">
                                <span><i :class="'fa fa-'+ item.icon +' f-s-40 color-'+item.color"></i></span>
                            </div>
                            <div class="media-body media-text-right">
                                <h2><a :href="'/device/' + item.hash" :class="'text-' + item.color">{{item.name}}</a></h2>
                                <p class="m-b-0">{{item.description}}</p>
                            </div>
                        </div>
                    </div>
                </div>
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
            ifaddDevice: false,
            user: this.$cookiz.get('user'),
            devices:{},
            device:{
                color: 'primary',
                icon: 'microchip'
            }
        }
    },
    methods: {
        showAddDevice() {
            this.ifaddDevice = true
        },
        hideAddDevice() {
            this.ifaddDevice = false
        },
        getDevices() {
            axios.get(`http://localhost:4000/api/users/${this.user.hash}/devices`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                this.devices = response.data.data
            })
        },
        addDevice(){
           const newData = {
                name: this.$refs.deviceName.value,
                description: this.$refs.deviceDescription.value,
                icon: this.$refs.deviceIcon.value,
                color: this.$refs.deviceColor.value,
                mac: this.$refs.deviceMac.value,
                location: this.$refs.deviceLocation.value,
                vendor: this.$refs.deviceVendor.value,
            }
            axios.post(`http://localhost:4000/api/device/`, newData,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('Device POST:')
                console.log(res.data.data);
                swal({title: "Adaugare reusita !!", timer: 2000, type:'success', showConfirmButton: false})
                this.$router.push({ path: `device/${res.data.data.hash}`})
            })
            .catch(err =>{
                console.log(err.response)
                sweetAlert("Oops...", err.response.data.message, "error");
            })
            this.ifaddDevice = false

        }
    },
    async created() {
        this.getDevices()
       
    },  
}
</script>