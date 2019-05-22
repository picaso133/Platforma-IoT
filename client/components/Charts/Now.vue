<template>
   <div >
       <!-- {{this.chart}} -->
       <!-- {{this.data.labels[0]}} -->
        <div :class="'card bg-'+this.chart.color+' p-20'">
            <div class="media widget-ten">
                <div class="media-left meida media-middle">
                    <span><i :class="'fa fa-'+this.chart.icon +' f-s-40'"></i></span>
                </div>
                <div class="media-body media-text-right">
                    <h2 class="color-white">{{this.data.datasets[0].data[0]}}</h2>
                    <p class="m-b-0">{{this.data.labels[0]}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data','chart'],
}

</script>