<template>
    <div>
        <!-- Bread crumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h3 class="text-primary">Câmp</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <!-- <li class="breadcrumb-item">Home</li> -->
                    <li class="breadcrumb-item">Câmpul</li>
                    <li class="breadcrumb-item active">{{this.field.name}}</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row justify-content-center" v-if="ifeditField">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Editeaza Field</h4>
                            <form class="form p-t-20" @submit.prevent="editField()">
                                <div class="form-group">
                                    <label for="exampleInputuname2">Nume</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Denumire"
                                            ref="fieldName"
                                            v-model="field.name"
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Descriere</label>
                                    <div class="input-group">
                                        <textarea 
                                            type="text" 
                                            class="textarea_editor form-control" 
                                            placeholder="Descriere"
                                            rows="5"
                                            style="height:150px"
                                            ref="fieldDescription"
                                            v-model="field.description"
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Tip</label>
                                    <div class="input-group">
                                        <select class="form-control" ref="fieldType" v-model="field.type">
                                            <option value="string">String</option>
                                            <option value="number">Number</option>
                                            <option value="object">Object</option>
                                            <option value="array">Array</option>
                                            <option value="boolean">Boolean</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Device</label>
                                    <div class="input-group">
                                        <select class="form-control" ref="deviceHash" v-model="field.deviceHash" >
                                            <option 
                                                v-for="item in this.devices" 
                                                :key=item.hash 
                                                :value=item.hash 
                                            >{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="exampleInputEmail2">Culoare</label>
                                        <div class="input-group">
                                            <select class="'form-control bg-primary" ref="fieldColor" v-model="field.color">
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
                                        <label for="exampleInputEmail2">Pictograma</label>
                                        <div class="input-group">
                                            <input 
                                                type="text" 
                                                class="form-control" 
                                                placeholder="Denumire"
                                                ref="fieldIcon"
                                                v-model="field.icon"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left">
                                    <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
                                    <button  @click="hideEditField()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row bg-white m-l-0 m-r-0 box-shadow">
                <div class="col-lg-7">
                    <div class="card">
                        <h1 :class="'text-'+ this.field.color">{{this.field.name}}</h1>
                        <h3>{{this.field.description}}</h3>
                        <h4>Tip: {{this.field.type}}</h4>
                        <div>
                            <span>Creat: {{this.field.createdAt}}</span><br />
                            <span>Actualizat: {{this.field.updatedAt}}</span>
                        </div>
                        <div class="text-success">Hash: {{this.field.hash}}
</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-primary p-20">
                        <div class="media widget-ten">
                            <div class="media-left meida media-middle">
                                <span><i class="fa fa-microchip f-s-40"></i></span>
                            </div>
                            <div class="media-body media-text-right">
                                <h2 class="color-white">{{this.device.name}}</h2>
                                <p class="m-b-0">{{this.device.hash}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 justify-content-center">
                    <div>
                        <br />
                        <button type="button" @click="showEditField()" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5"><i class="ti-plus"></i> Editeaza</button>
                        <button type="button" @click="deleteField()" class="btn btn-danger btn-flat btn-addon m-b-10 m-l-5"><i class="ti-trash"></i> Sterge</button>
                    </div>
                    
                </div>
            </div>
            <!-- End PAge Content -->
        <div class="row">
            
            <DataTable v-if="loadData" id="#example23" :data=this.data />

        </div>
        </div> <!-- End Container fluid  -->
    </div>
</template>

<script>
import axios from 'axios';
import DataTable from './DataTable.vue'
export default {
    components: { DataTable }, 
    data({ params }){
        return {
            ifeditField: false,
            user: this.$cookiz.get('user'),
            field:{},
            device:{},
            devices:{},
            data:{},
            loadData: false
        }
    },
    methods: {
        showEditField() {
            this.ifeditField = true
        },
        hideEditField(){
            this.ifeditField = false
        },
        getField() {
            this.field.hash = this.$route.params.hash
            axios.get(`http://localhost:4000/api/field/${this.field.hash}`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('GET:')
                console.log(res.data.data);
                this.field = res.data.data
                this.getDevice()
                this.getData()
            })
            
        },
         
        editField(){
            const newData = {
                name: this.field.name,
                description: this.field.description,
                type: this.field.type,
                icon: this.field.icon,
                color: this.field.color,
                deviceHash: this.field.deviceHash,
            };
            axios.put(`http://localhost:4000/api/field/${this.field.hash}`, newData, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.field = response.data.data
            })
            this.hideEditField()
        },
        deleteField(){
            axios.delete(`http://localhost:4000/api/field/${this.field.hash}`, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                swal({title: "Stergere reusita !!", timer: 1500, type:'success', showConfirmButton: false});
                // this.$router.push({ name: 'field'})
                this.$router.push({ path: `/device/${this.field.deviceHash}` })
            })
            .catch(error => {
                console.log(error)
            });
        },
        getDevice(){
            axios.get(`http://localhost:4000/api/device/${this.field.deviceHash}`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('GET Device:')
                console.log(res.data.data);
                this.device = res.data.data
            })
        },
        getDevices() {
            axios.get(`http://localhost:4000/api/users/${this.user.hash}/devices`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                this.devices = response.data.data
            })
        },
        getData() {
            axios.get(`http://localhost:4000/api/data/?fieldHash=${this.field.hash}`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                this.data = response.data.data
                console.log('GET DATA:')
                console.log(this.data)
                this.loadData = true
            })
        },
    },
    created() {
        this.getField()
        this.getDevices()
    },  
}
</script>