<template>
  <section class="container">
    <div>
      <Register />
    </div>
  </section>
</template>

<script>

import Register from '../components/Register.vue';

export default {
    layout: "auth",
    components: {Register},
    middleware: 'public'
}
</script>
