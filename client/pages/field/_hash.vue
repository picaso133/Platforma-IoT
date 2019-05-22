<template>
  <Field />
</template>

<script>

import Field from '../../components/Field.vue';

export default {
    components: { Field },
    middleware: 'private'
}
</script>
