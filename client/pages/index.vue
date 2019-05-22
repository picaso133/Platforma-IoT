<template>
  <section class="container">
    <div class="">
      <br />
      <div class="alert alert-success" v-if="this.user">Bun venit <strong>{{this.user.email}}</strong> !</div>
    </div>
  </section>
</template>

<script>


export default {
  data(){
    return {
      user: {}
    }
  },
  created(){
    this.user = this.$cookiz.get('user')
  },

  middleware: 'private'
}
</script>
