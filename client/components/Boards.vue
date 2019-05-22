<template>
    <div>
        <!-- Bread crumb -->
        <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h3 class="text-primary">Tablouri de bord</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <!-- <li class="breadcrumb-item"><a href="javascript:void(0)">Acasă</a></li> -->
                    <li class="breadcrumb-item active">Tablouri de bord</li>
                </ol>
            </div>
        </div>
        <!-- End Bread crumb -->
        <!-- Container fluid  -->
        <div class="container-fluid">
            <!-- Start Page Content -->
            <div class="row">
                <button type="button" @click="showAddBoard()" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5"><i class="ti-plus"></i> Adauga</button>
            </div>
            <div class="row justify-content-center" v-if="ifaddBoard">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Adauga board</h4>
                            <form class="form p-t-20" @submit.prevent="addBoard()">
                                <div class="form-group">
                                    <label for="exampleInputuname2">Denumire</label>
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Denumire"
                                            ref="boardName"
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
                                            ref="boardDescription"
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="exampleInputEmail2">Culoare</label>
                                        <div class="input-group">
                                            <select :class="'form-control bg-'+this.board.color" id="" ref="boardColor" v-model="board.color">
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
                                                ref="boardIcon"
                                                v-model="board.icon"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left">
                                    <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
                                    <button  @click="showAddBoard()" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4" v-for="item in this.boards" :key=item.hash>
                    <div class="card p-30">
                        <div class="media">
                            <div class="media-left meida media-middle">
                                <span><i :class="'fa fa-'+ item.icon + ' f-s-40 color-' + item.color"></i></span>
                            </div>
                            <div class="media-body media-text-right">
                                <h2><a :href="'/board/' + item.hash" :class="'text-' + item.color">{{item.name}}</a></h2>
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

    data(){
        return {
            ifaddBoard: false,
            user: this.$cookiz.get('user'),
            boards:{},
            board:{
                color: 'primary',
                icon: 'tachometer'
            }
        }
    },
    methods: {
        showAddBoard() {
            this.ifaddBoard = true
        },
        getBoards() {
            this.user = this.$cookiz.get('user')
            console.log(this.user)
            axios.get(`http://localhost:4000/api/users/${this.user.hash}/boards`,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(response => {
                console.log('GET:')
                console.log(response.data.data);
                this.boards = response.data.data
            })
            
        },
        addBoard(){
            const newData = {
                name: this.$refs.boardName.value,
                description: this.$refs.boardDescription.value,
                icon: this.$refs.boardIcon.value,
                color: this.$refs.boardColor.value,
            }
            axios.post(`http://localhost:4000/api/boards`, newData,{headers:{Authorization: this.$cookiz.get('token')}})
            .then(res => {
                console.log('Board POST:')
                console.log(res.data.data);
                swal({title: "Adaugare reusita !!", timer: 2000, type:'success', showConfirmButton: false})
                this.$router.push({ path: `board/${res.data.data.hash}`})
            })
            .catch(err =>{
                console.log(err.response)
                sweetAlert("Oops...", err.response.data.message, "error");
            })
            this.ifaddBoard = false

        }
    },
    mounted() {
        this.user = this.$cookiz.get('user')
        this.getBoards()
    }  
}
</script>