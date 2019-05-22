<template>
  <Devices />
</template>

<script>

import Devices from '../../components/Devices.vue';

export default {
    components: { Devices },
    middleware: 'private'
}
</script>
