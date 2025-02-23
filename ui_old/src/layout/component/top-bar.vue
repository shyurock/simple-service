<script setup lang="ts">
</script>
<template>
  <!-- ========== Topbar Start ========== -->
    <div class="navbar-custom">
        <div class="topbar container-fluid">
            <div class="d-flex align-items-center gap-lg-2 gap-1">

                <!-- Topbar Brand Logo -->
                <div class="logo-topbar">
                    <!-- Logo light -->
                    <a href="index.html" class="logo-light">
                                <span class="logo-lg">
                                    <img src="/image/logo.png" alt="logo">
                                </span>
                        <span class="logo-sm">
                                    <img src="/image/logo-sm.png" alt="small logo">
                                </span>
                    </a>

                    <!-- Logo Dark -->
                    <a href="index.html" class="logo-dark">
                                <span class="logo-lg">
                                    <img src="/image/logo-dark.png" alt="dark logo">
                                </span>
                        <span class="logo-sm">
                                    <img src="/image/logo-dark-sm.png" alt="small logo">
                                </span>
                    </a>
                </div>

                <!-- Sidebar Menu Toggle Button -->
                <button class="button-toggle-menu">
                    <i class="mdi mdi-menu"></i>
                </button>

                <!-- Horizontal Menu Toggle Button -->
                <!--                <button class="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">-->
                <!--                    <div class="lines">-->
                <!--                        <span></span>-->
                <!--                        <span></span>-->
                <!--                        <span></span>-->
                <!--                    </div>-->
                <!--                </button>-->

                <!-- Topbar Search Form -->
                <div class="app-search dropdown d-none d-lg-block">
                    <form>
                        <div class="input-group">
                            <input type="search" class="form-control dropdown-toggle" placeholder="Search..." id="top-search">
                            <span class="mdi mdi-magnify search-icon"></span>
                            <button class="input-group-text btn btn-primary" type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>

            <ul class="topbar-menu d-flex align-items-center gap-3">
                <!--                <li class="dropdown d-lg-none">-->
                <!--                    <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">-->
                <!--                        <i class="ri-search-line font-22"></i>-->
                <!--                    </a>-->
                <!--                    <div class="dropdown-menu dropdown-menu-animated dropdown-lg p-0">-->
                <!--                        <form class="p-3">-->
                <!--                            <input type="search" class="form-control" placeholder="Search ..." aria-label="Recipient's username">-->
                <!--                        </form>-->
                <!--                    </div>-->
                <!--                </li>-->

                <li class="d-none d-sm-inline-block">
                    <div class="nav-link" id="light-dark-mode" data-bs-toggle="tooltip" data-bs-placement="left" title="Theme Mode">
                        <i class="ri-moon-line font-22"></i>
                    </div>
                </li>


                <li class="d-none d-md-inline-block">
                    <a class="nav-link" href="" data-toggle="fullscreen">
                        <i class="ri-fullscreen-line font-22"></i>
                    </a>
                </li>

                <li class="dropdown">
                    <a class="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <span class="account-user-avatar">
                                    <img src="assets/images/users/avatar-1.jpg" alt="user-image" width="32" class="rounded-circle">
                                </span>
                        <span class="d-lg-flex flex-column gap-1 d-none">
                                    <h5 class="my-0">Dominic Keller</h5>
                                    <h6 class="my-0 fw-normal">Founder</h6>
                                </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item">
                            <i class="mdi mdi-account-circle me-1"></i>
                            <span>My Account</span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item">
                            <i class="mdi mdi-account-edit me-1"></i>
                            <span>Settings</span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item">
                            <i class="mdi mdi-logout me-1"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  <!-- ========== Topbar End ========== -->
</template>