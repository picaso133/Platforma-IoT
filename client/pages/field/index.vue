<template>
  <Fields />
</template>

<script>

import Fields from '../../components/Fields.vue';

export default {
    components: { Fields },
    middleware: 'private'
}
</script>
