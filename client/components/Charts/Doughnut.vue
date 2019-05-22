<script>
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    data(){
        return {
            options: {
                cutoutPercentage: 60,
                animation:{animateRotate: true},
                legend: {
                    display: false
                }
            },
        }
    },
    props: ['data'],
    mounted () {
        this.renderChart(this.data, this.options)
  }
}

</script>