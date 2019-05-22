<script>
import { PolarArea } from 'vue-chartjs'

export default {
    extends: PolarArea,
    data(){
        return {
            options: {
                animation:{animateRotate: true},
                legend: {
                    // display: false
                },
                maintainAspectRatio: true
            },
            
        }
    },
    props: ['data'],
    mounted () {
        this.renderChart(this.data, this.options)
  }
}

</script>