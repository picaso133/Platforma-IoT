<template>
  <Board />
</template>

<script>

import Board from '../../components/Board.vue';

export default {
    components: { Board },
    middleware: 'private'
}
</script>
