<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    data(){
        return {
            options: {
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