<template>
  <Device />
</template>

<script>

import Device from '../../components/Device.vue';

export default {
    components: { Device },
    middleware: 'private'
}
</script>
