<template>
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <!-- <h4 class="card-title">Data Export</h4> -->
                <!-- <h6 class="card-subtitle">Export data to Excel, PDF &amp; Print</h6> -->
                <!-- <div class="table-responsive m-t-40"> -->
                    <div id="example_wrapper" class="dataTables_wrapper">
                        <div class="dt-buttons">
                            <!-- <a class="dt-button buttons-copy buttons-html5" tabindex="0" aria-controls="example" href="#"><span>Copy</span></a>
                            <a class="dt-button buttons-csv buttons-html5" tabindex="0" aria-controls="example" href="#"><span>CSV</span></a>
                            <a class="dt-button buttons-excel buttons-html5" tabindex="0" aria-controls="example" href="#"><span>Excel</span></a>
                            <a class="dt-button buttons-pdf buttons-html5" tabindex="0" aria-controls="example" href="#"><span>PDF</span></a>
                            <a class="dt-button buttons-print" tabindex="0" aria-controls="example" href="#"><span>Print</span></a>  -->
                        </div>
                        <div id="example_filter" class="dataTables_filter"></div>
                        <table id="example" class="display nowrap table table-hover table-striped table-bordered dataTable" >
                            <thead>
                                <tr role="row">
                                    <th class="sorting" tabindex="0" aria-controls="myTable" rowspan="1" colspan="1" aria-label="Valoare: activate to sort column ascending" style="width: 282.4px;">Valoare</th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable" rowspan="1" colspan="1" aria-label="CreatedAt: activate to sort column ascending" style="width: 444.4px;">Creat </th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable" rowspan="1" colspan="1" aria-label="UpdatedAt: activate to sort column ascending" style="width: 219.4px;">Acualizat</th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable" rowspan="1" colspan="1" aria-label="Hash: activate to sort column ascending" style="width: 112.4px;">Hash</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                <!-- </div> -->
            </div>
        </div>

        <script src="../js/lib/datatables/datatables.min.js"></script>
        <script src="../js/lib/datatables/datatables.init.js"></script>
        <script src="../js/lib/datatables/pdfmake.min.js"></script>
        <script src="../js/lib/datatables/vfs_fonts.js"></script>

        <!-- <script src="../js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
        <script src="../js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
        <script src="../js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
        <script src="../js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
        <script src="../js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
        <script src="../js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script> -->

    </div>
</template>

<script>
import * as $ from 'jquery';
import 'datatables';
import 'datatables-buttons'


export default {
    props: ['id','data'],

    data(){
        return {
           
        }
    },
    mounted(){
        $('#example').DataTable({
            dom: 'Bfrtip',
            data:this.data,
            "order": [[ 1, "desc" ]], 
            columns: [
                { data: "value" },
                { data: 'createdAt' },
                { data: 'updatedAt' },
                { data: 'hash' }
            ],
            buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
        });
       
    }
 }
</script>