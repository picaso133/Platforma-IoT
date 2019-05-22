<template>
    <div>
        <!-- Bread crumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h3 class="text-primary">Câmpuri</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <!-- <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li> -->
                    <li class="breadcrumb-item active">Câmpuri</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row">
                <button type="button" @click="showAddField()" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5"><i class="ti-plus"></i> Adauga</button>
            </div>
            <div class="row justify-content-center" v-if="ifaddField">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Adauga Field</h4>
                            <form class="form p-t-20" @submit.prevent="addField()">
                                <div class="form-group">
                                    <label for="exampleInputuname2">Nume</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Denumire"
                                            ref="fieldName"
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
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Tip</label>
                                    <div class="input-group">
                                        <select class="form-control" ref="fieldType" >
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
                                        <select class="form-control" ref="deviceHash" >
                                            <option 
                                                v-for="device in this.devices" 
                                                :key=device.hash 
                                                :value=device.hash 
                                            >{{device.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="exampleInputEmail2">Culoare</label>
                                        <div class="input-group">
                                            <select class="'form-control bg-primary" ref="fieldColor">
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
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left">
                                    <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
                                    <button  @click="hideAddField()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3" v-for="item in this.fields" :key=item.hash>
                    <div class="card p-30">
                        <div class="media">
                            <div class="media-left meida media-middle">
                                <span><i :class="'fa fa-'+ item.icon +' f-s-40 color-'+item.color"></i></span>
                            </div>
                            <div class="media-body media-text-right">
                                <h2><a :href="'/field/' + item.hash" :class="'text-' + item.color">{{item.name}}</a></h2>
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
            ifaddField: false,
            user: this.$cookiz.get('user'),
            fields:{},
            devices:{}
        }
    },
    props: ['device'],
    methods: {
        showAddField() {
            this.ifaddField = true
        },
        hideAddField() {
            this.ifaddField = false
        },
        getDevices() {
            axios.get(`http://localhost:4000/api/users/${this.user.hash}/devices`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                this.devices = response.data.data
            })
        },
        getFields() {
            if(!this.$route.params.hash){
                axios.get(`http://localhost:4000/api/users/${this.user.hash}/fields`,{headers:{Authorization: this.$cookiz.get('token')}})
                .then(response => {
                    console.log('GET:')
                    console.log(response.data.data);
                    this.fields = response.data.data
                })
            } else {
                axios.get('http://localhost:4000/api/field/?deviceHash='+this.$route.params.hash,{headers:{Authorization: this.$cookiz.get('token')}})
                .then(response => {
                    console.log('GET:')
                    console.log(response.data.data);
                    this.fields = response.data.data
                })
            }
        },
        addField(){
           const newData = {
                name: this.$refs.fieldName.value,
                description: this.$refs.fieldDescription.value,
                deviceHash: this.$refs.deviceHash.value,
                type: this.$refs.fieldType.value,
                icon: this.$refs.fieldIcon.value,
                color: this.$refs.fieldColor.value,
            }
            axios.post(`http://localhost:4000/api/field/`, newData,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('Field POST:')
                console.log(res.data.data);
                swal({title: "Adaugare reusita !!", timer: 2000, type:'success', showConfirmButton: false, icon: "success"})
                // this.$router.push({ path: `/field/${res.data.data.hash}` })
                this.$router.push({ path: `/device/${res.data.data.deviceHash}` })
            })
            .catch(err =>{
                console.log(err.response)
                sweetAlert("Oops...", err.response.data.message, "error");
            })
            this.ifaddField = false

        }
    },
    created() {
        this.getFields()
        this.getDevices()
    },  
}
</script>