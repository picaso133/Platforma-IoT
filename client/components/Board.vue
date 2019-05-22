<template v-if="this.board">
    <div>
        <!-- Bread crumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h3 class="text-primary">Tablou de bord</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <!-- <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li> -->
                    <li class="breadcrumb-item">Tablou de bord</li>
                    <li class="breadcrumb-item active">{{this.board.name}}</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row justify-content-center" v-if="ifeditBoard">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Editeaza board</h4>
                            <form class="form p-t-20" @submit.prevent="editBoard()">
                                <div class="form-group">
                                    <label for="exampleInputuname2">Denumire</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Denumire"
                                            v-model="board.name"
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
                                            v-model="board.description"
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Pictograma</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="textarea_editor form-control" 
                                            placeholder="Descriere"
                                            v-model="board.icon"
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Culoare</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="textarea_editor form-control" 
                                            placeholder="Descriere"
                                            v-model="board.color"
                                        />
                                    </div>
                                </div>
                                <div class="text-left">
                                    <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
                                    <button  @click="hideEditBoard()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center" v-if="ifaddChart">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Adaugă grafic</h4>
                            <form class="form p-t-20" @submit.prevent="addChart()">
                                <div class="form-group">
                                    <label for="exampleInputuname2">Denumire</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Denumire"
                                            ref="chartName"
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
                                            ref="chartDescription"
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Câmpul</label>
                                    <div class="input-group">
                                        <select class="form-control" ref="chartField">
                                            <option v-for="field in this.fields" :key=field.hash :value=field.hash >{{field.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Tip</label>
                                    <div class="input-group">
                                        <select class="form-control" ref="chartType" >
                                            <option value="line">Linie</option>
                                            <option value="bar">Bare</option>
                                            <option value="radar">Radar</option>
                                            <option value="doughnut">Covrig</option>
                                            <option value="pie">Tort</option>
                                            <option value="boolean">On/Off</option>
                                            <option value="now">Ultima</option>
                                        </select>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label for="exampleInputEmail2">Parametru</label>
                                    <div class="input-group">
                                        <select class="form-control" ref="chartParams" >
                                            <option value="day">Zi</option>
                                            <option value="week">Săptămână</option>
                                            <option value="month">Lună</option>
                                            <option value="yar">An</option>
                                            <option value="all">Toate</option>
                                            <option value="now">Ultima</option>
                                        </select>
                                    </div>
                                </div>
                                 <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="exampleInputEmail2">Culoare</label>
                                        <div class="input-group">
                                            <select :class="'form-control bg-'+this.chart.color" id="" ref="chartColor">
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
                                                placeholder="Pictograma"
                                                ref="chartIcon"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left">
                                    <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
                                    <button  @click="hideChart()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row bg-white m-l-0 m-r-0 box-shadow">
                <div class="col-lg-7">
                    <div class="card">
                        <h1 :class="'text-'+this.board.color">{{this.board.name}}</h1>
                        <h3>{{this.board.description}}</h3>
                        <div>
                            <span>Creat: {{this.board.createdAt}}</span><br />
                            <span>Actualizat: {{this.board.updatedAt}}</span>
                        </div>
                        <div class="text-success">
                            Hash: {{this.board.hash}}
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card bg-primary p-20">
                        <div class="media widget-ten">
                            <div class="media-left meida media-middle">
                                <span><i class="fa fa-microchip f-s-40"></i></span>
                            </div>
                            <div class="media-body media-text-right">
                                <h2 class="color-white">{{charts.length}}</h2>
                                <p class="m-b-0">Numarul graficelor</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 ">
                    <div>
                        <br />
                        <button type="button" @click="showEditBoard()" class="btn btn-primary btn-flat btn-addon col-md-5 m-b-10 m-l-5"><i class="ti-plus"></i> Editeaza</button>
                        <button type="button" @click="deleteBoard()" class="btn btn-danger btn-flat btn-addon  col-md-5 m-b-10 m-l-5"><i class="ti-trash"></i> Sterge</button>
                        <button type="button" @click="addchart()" class="btn btn-info btn-flat btn-addon col-md-5 m-b-10 m-l-5">Adauga <i class="ti-bar-chart"></i></button>
                        <!-- <button type="button" class="btn btn-info btn-flat btn-addon col-md-5 m-b-10 m-l-5"><i class="ti-bar-chart"></i> Add Chart</button> -->
                    </div>
                    
                </div>
            </div>
            <div v-if="charts" class="row masonry-grid" >
                <Chart v-for="item in this.charts" :key=item.hash :chart="item"  />
            </div>
            <!-- End PAge Content -->
        </div> <!-- End Container fluid  -->
       
      
    </div>
</template>

<script>

import Chart from './Chart.vue'
import axios from 'axios';
export default { 
    components: {
       Chart
    },
    data({ params }){
        return {
            ifeditBoard: false,
            ifaddChart: false,
            user: this.$cookiz.get('user'),
            board:{},
            charts:[],
            chart:{},
            fields:[],  
        }
    },
    methods: {
        showEditBoard() {
            this.ifeditBoard = true
        },
        hideEditBoard(){
            this.ifeditBoard = false
        },
        hideChart(){
            this.ifaddChart = false
        },
        addchart(){
            this.ifaddChart = true
        },
        getFields(){
            axios.get(`http://localhost:4000/api/users/${this.user.hash}/fields`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.fields = response.data.data
            }) 
        },
        getBoard() {
            this.board.hash = this.$route.params.hash
            axios.get(`http://localhost:4000/api/boards/${this.board.hash}`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.board = response.data.data
                this.getChart()
                this.getFields()
            }) 
        },
        getChart() {
            this.board.hash = this.$route.params.hash
            axios.get('http://localhost:4000/api/chart?boardHash='+this.board.hash,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET CHARTS:')
                console.log(response.data.data);
                this.charts = response.data.data
            })
        },
        editBoard(){
            const newData = {
                name: this.board.name,
                description: this.board.description,
                icon: this.board.icon,
                color: this.board.color,
            };
            axios.put(`http://localhost:4000/api/boards/${this.board.hash}`, newData, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.board = response.data.data
            })
            this.hideEditBoard()
        },
        deleteBoard(){
            axios.delete(`http://localhost:4000/api/boards/${this.board.hash}`, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                swal({title: "Stergere reusita !!", timer: 1500, type:'success', showConfirmButton: false});
                this.$router.push({ name: 'board'})
            })
            .catch(error => {
                console.log(error)
            });
        },
        getField(){
            axios.get(`http://localhost:4000/api/users/${this.user.hash}/fields`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET CHARTS:')
                console.log(response.data.data);
                this.field = response.data.data
                this.getDevice();
            })
        },
        addChart(){
            const newData = {
                name: this.$refs.chartName.value,
                description: this.$refs.chartDescription.value,
                icon: this.$refs.chartIcon.value,
                color: this.$refs.chartColor.value,
                type: this.$refs.chartType.value,
                params: this.$refs.chartParams.value,
                fieldHash: this.$refs.chartField.value,
                boardHash: this.$route.params.hash,
            }
            axios.post(`http://localhost:4000/api/chart/`, newData,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('Device POST:')
                console.log(res.data.data);
                swal({title: "Adaugare reusita !!", timer: 2000, type:'success', showConfirmButton: false, icon: "success",})
                // this.$router.push({ path: `board/${res.data.data.hash}`})
            })
            .catch(err =>{
                console.log(err.response)
                sweetAlert("Oops...", err.response.data.message, "error");
            })
            this.ifaddChart = false
        }
    },
    mounted(){
        // this.$router.replace('board')
    },
    created() {
        this.getBoard()
        
    },  
}
</script>