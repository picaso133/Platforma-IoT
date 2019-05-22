<template>
    <div class="row justify-content-center">
        <button type="button" class="btn btn-lg btn-danger btn-rounded m-b-10 m-l-10" v-if="this.data.datasets[0].data == 'false'">Inchis</button>
        <button type="button" class="btn btn-lg btn-success btn-rounded m-b-10 m-l-10" v-if="this.data.datasets[0].data == 'true'">Deschis</button>
    </div>
</template>

<script>
export default {
    props: ['data', 'chart'],
}

</script>