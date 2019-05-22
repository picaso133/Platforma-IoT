<template>
    <div class="col-lg-6 col-lg-4 masonry-column" v-if="afterDelete">
        <!-- {{this.chart}} -->
        <div class="card" v-if="ifeditChart">
            <div class="card-body">
                <h4 class="card-title">Editeaza grafic</h4>
                <form class="form p-t-20" @submit.prevent="editChart()">
                    <div class="form-group">
                        <label for="exampleInputuname2">Denumire</label>
                        <div class="input-group">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Denumire"
                                v-model="chart.name"
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
                                v-model="chart.description"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail2">Câmpul</label>
                        <div class="input-group">
                            <select class="form-control" v-model="chart.fieldHash">
                                <option v-for="field in this.fields" :key=field.hash :value=field.hash >{{field.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail2">Tip</label>
                        <div class="input-group">
                            <select class="form-control" v-model="chart.type">
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
                            <select class="form-control" v-model="chart.params" >
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
                                <select :class="'form-control bg-'+this.chart.color" id="" v-model="chart.color">
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
                                    v-model="chart.icon"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="text-left">
                        <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
                        <button  @click="hideeditChart()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="card" v-if="ifChart">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-9">
                        <!-- {{this.chartData.labels}} -->
                        <h1 :class="'card-title text-'+this.chart.color"><i :class="'fa fa-'+this.chart.icon"></i>&nbsp;{{this.chart.name}}</h1>
                        <hr />
                        <h4><i class="fa fa-microchip"></i>&nbsp;<a href="" class="text-primary">{{this.device.name}}</a> | {{this.device.hash}} </h4>
                        <h4><i class="fa fa-database"></i>&nbsp;<a :href="'/field/'+this.field.hash" class="text-primary">{{this.field.name}}</a> | {{this.field.hash}} </h4>
                    </div>
                    <div class="col-lg-3 text-right">
                        <button type="button" @click="showeditChart()" class="btn btn-primary m-b-10 m-l-5"><i class="ti-settings"></i></button>
                        <button type="button" @click="deleteChart()" class="btn btn-danger m-b-10 m-l-5"><i class="ti-trash"></i></button>
                        <button type="button" @click="downHide()" class="btn btn-pink m-b-10 m-l-5"><i class="ti-angle-double-down"></i></button>
                    </div>
                </div>
                <div style="position: relative; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" v-if="this.chartHide">     
                    <div v-if="this.chartData.datasets[0].data">
                        <ChartBar :data=this.chartData :options=this.chartOptions :height="250"  v-if="this.chart.type == 'bar'" />
                        <ChartLine :data=this.chartData :options=this.chartOptions :height="250"  v-if="this.chart.type == 'line'" />
                        <ChartPie :data=this.chartData :options=this.chartOptions :height="250"  v-if="this.chart.type == 'pie'" />
                        <ChartDoughnut :data=this.chartData :options=this.chartOptions :height="250"  v-if="this.chart.type == 'doughnut'" />
                        <ChartRadar :data=this.chartData :options=this.chartOptions :height="250"  v-if="this.chart.type == 'radar'" />
                        <ChartBool :chart=this.chart :data=this.chartData :options=this.chartOptions :height="250"  v-if="this.chart.type == 'boolean'" />
                        <ChartNow :chart=this.chart :data=this.chartData :options=this.chartOptions :height="250"  v-if="this.chart.type == 'now'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import ChartLine from './Charts/Line.vue'
import ChartBar from './Charts/Bar.vue'
import ChartPie from './Charts/Pie.vue'
import ChartDoughnut from './Charts/Doughnut.vue'
import ChartRadar from './Charts/Radar.vue'
import ChartBool from './Charts/Boolean.vue'
import ChartNow from './Charts/Now.vue'

import axios from 'axios'
export default {
    components: {
        ChartLine,
        ChartBar,
        ChartPie,
        ChartDoughnut,
        ChartRadar,
        ChartBool,
        ChartNow
    },
    props: ['chart', 'options'],
    data(){
        return {
            chartHide: true,
            ifChart: true,
            ifeditChart: false,
            afterDelete: true,
            field:{},
            device:{},
            data:[],
            fields:[],
            user: this.$cookiz.get('user'),
            chartData: {datasets: [{backgroundColor: this.color2hex()}]},
            chartOptions: {
                 scales: {
                    yAxes: [{
                        stacked: true
                    }],
                },
                legend: {
                    display: false,
                    fullWidth: true
                },
            },
        }
    },
    methods:{
        color2hex(){
            if (this.chart.color == 'primary')
                return '#007BFF'
            if (this.chart.color == 'secondary')
                return '#6C757D'
            if (this.chart.color == 'success')
                return '#28A745'
            if (this.chart.color == 'danger')
                return '#DC3545'
            if (this.chart.color == 'warning')
                return '#FFC107'
            if (this.chart.color == 'info')
                return '#17A2B8'
            if (this.chart.color == 'light')
                return '#F8F9FA'
            if (this.chart.color == 'dark')
                return '#343A40'
            if (this.chart.color == 'white')
                return '#fff'
        },
        getData(){
            axios.get(`http://localhost:4000/api/field/${this.chart.fieldHash}/${this.chart.params}`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log(response.data.data);
                this.data = response.data.data
                this.chartData.labels = response.data.labels
                this.chartData.datasets[0].data = response.data.dataSet
                // this.parseData();
            })
        },
        getField(){
            axios.get('http://localhost:4000/api/field/'+this.chart.fieldHash,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET CHARTS:')
                console.log(response.data.data);
                this.field = response.data.data
                this.getDevice();
                this.getData();
            })
        },
        getFields() {
            axios.get(`http://localhost:4000/api/users/${this.user.hash}/fields`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.fields = response.data.data
            })
        },
        getDevice(){
            axios.get('http://localhost:4000/api/device/'+this.field.deviceHash,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET CHARTS:')
                console.log(response.data.data);
                this.device = response.data.data
            })
        },
        deleteChart(){
            const boardHash = this.chart.boardHash;
            console.log(boardHash);
            axios.delete('http://localhost:4000/api/chart/'+this.chart.hash, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                swal({title: "Stergere reusita !!", timer: 1500, type:'success', showConfirmButton: false});
                // this.$router.push('/boar');
            })
            .catch(error => {
                console.log(error)
            });
        },
        editChart(){
            this.ifeditChart = true
            const newData = {
                name: this.chart.name,
                description: this.chart.description,
                icon: this.chart.icon,
                color: this.chart.color,
                type: this.chart.type,
                params: this.chart.params,
                fieldHash: this.chart.fieldHash,
                boardHash: this.$route.params.hash,
            };
            axios.put(`http://localhost:4000/api/chart/${this.chart.hash}`, newData, {headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.chart = response.data.data
                swal({title: "Modificare reusita !!", timer: 1000, type:'success', icon: "success"})
            })
            this.hideeditChart()
            
        },
        hideeditChart(){
            this.ifeditChart = false
            this.ifChart = true
        },
        showeditChart(){
            this.ifeditChart = true
            this.ifChart = false
        },
        downHide(){
            if (this.chartHide === false) {
                this.chartHide = true
            } else {
                 this.chartHide = false
            }    
        }
    },
    mounted(){
        this.color2hex();
        this.getField();
        this.getFields();
    }
}
</script>
