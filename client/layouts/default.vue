<template>
  <div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
        <!-- header header  -->
        <div class="header">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- Logo -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">
                        <!-- Logo icon -->
                        <b>
                            <!-- <img src="../assets/images/logo.png" alt="homepage" class="dark-logo" /> -->
                            IoT
                        </b>
                        <!--End Logo icon -->
                        <!-- Logo text -->
                        <!-- <span><img src="../assets/images/logo-text.png" alt="homepage" class="dark-logo" /></span> -->
                    </a>
                </div>
                <!-- End Logo -->
                <div class="navbar-collapse">
                    <!-- toggle and nav items -->
                    <ul class="navbar-nav mr-auto mt-md-0">
                        <!-- This is  -->
                        <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted  " href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                        <li class="nav-item m-l-10"> <a class="nav-link sidebartoggler hidden-sm-down text-muted  " href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
                    </ul>
                    <!-- User profile and search -->
                    <ul class="navbar-nav my-lg-0">
                        <!-- Search -->
                        <li class="nav-item hidden-sm-down search-box"> <a class="nav-link hidden-sm-down text-muted  " href="javascript:void(0)"><i class="ti-search"></i></a>
                            <form class="app-search">
                                <input type="text" class="form-control" placeholder="Search here"> <a class="srh-btn"><i class="ti-close"></i></a> 
                            </form>
                        </li>
                        <!-- Profile -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted  " href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../assets/images/users/5.jpg" alt="user" class="profile-pic" /></a>
                            <div class="dropdown-menu dropdown-menu-right animated zoomIn">
                                <ul class="dropdown-user">
                                    <li><a href="/user"><i class="ti-user"></i> Profil</a></li>
                                    <li><a href="/logout"><i class="fa fa-power-off"></i> Ieșire</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <!-- End header header -->
        <!-- Left Sidebar  -->
        <div class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="nav-devider"></li>
                        <!-- <li><a href="/"><i class="fa fa-tachometer"></i><span class="hide-menu">Dashboard</span></a></li> -->
                        <li><a href="/board"><i class="fa fa-clipboard"></i><span class="hide-menu">Tablouri de bord</span></a></li>
                        <li><a href="/device"><i class="fa fa-microchip"></i><span class="hide-menu">Dispozitive</span></a></li>
                        <li><a href="/field"><i class="fa fa-database"></i><span class="hide-menu">Câmpuri</span></a></li>
                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </div>
        <!-- End Left Sidebar  -->
        <!-- Page wrapper  -->
        <div class="page-wrapper">
            <nuxt />
            <!-- footer -->
            <footer class="footer"> © 2018 All rights reserved.</footer>
            <!-- End footer -->
        </div>
        <!-- End Page wrapper  -->
    </div>
    
    <!-- End Wrapper -->
    <script src="../js/lib/jquery/jquery-3.3.1.min.js"></script>
    <script src="../js/lib/bootstrap/js/popper.min.js"></script>
    <script src="../js/lib/bootstrap/js/bootstrap.min.js"></script>
   
   <!-- Probleme cu fisierul dat -->
    <!-- <script src="../js/jquery.slimscroll.js"></script> -->
    <script src="../js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="../js/lib/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <script src="../js/custom.min.js"></script>

    <script src="../js/lib/sweetalert/sweetalert.min.js"></script>
    <!-- <script src="../js/lib/sweetalert/sweetalert.init.js"></script> -->
  </div>
</template>