<template>
  <Boards />
</template>

<script>

import Boards from '../../components/Boards.vue';

export default {
    components: { Boards },
    middleware: 'private',
    scrollToTop: true,
    transition: true
}
</script>
