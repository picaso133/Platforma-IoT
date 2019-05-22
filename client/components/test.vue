<template>
    <div>
        <h1>{{user}}</h1>
        <!-- <h2>{{$store.user.firstName}} {{user.lastName}}</h2> -->
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
    created() {
        return axios.get(`http://localhost:4000/api/auth/user`,{headers: {Authorization: this.$cookiz.get('token')}})
        .then(response => {
            // Cookie.set('user',response.data.data);
            // this.user = Cookie.getJSON('user');
        })
    },  
}
</script>