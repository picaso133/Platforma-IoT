<template>
    <div></div>
</template>

<script>
export default {
  middleware: 'private',
  mounted(){
    this.$cookiz.remove('token',{domain:'localhost'})
    this.$cookiz.remove('user',{domain:'localhost'})
    this.$router.push({ path: `/login` })
  }
}
</script>
