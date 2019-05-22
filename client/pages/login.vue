<template>
  <section class="container">
    <div>
      <Login />
    </div>
  </section>
</template>

<script>

import Login from '../components/Login.vue';

export default {
    layout: "auth",
    components: {Login},
    middleware: 'public'
}
</script>
