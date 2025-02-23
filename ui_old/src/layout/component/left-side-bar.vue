<script setup lang="ts">
</script>
<template>
  <!-- ========== Left Sidebar Start ========== -->
    <div class="leftside-menu">

        <!-- Brand Logo Light -->
        <a href="index.html" class="logo logo-light">
                    <span class="logo-lg">
                        <img src="image/logo.png" alt="logo">
                    </span>
            <span class="logo-sm">
                        <img src="image/logo-sm.png" alt="small logo">
                    </span>
        </a>

        <!-- Brand Logo Dark -->
        <a href="index.html" class="logo logo-dark">
                    <span class="logo-lg">
                        <img src="image/logo-dark.png" alt="dark logo">
                    </span>
            <span class="logo-sm">
                        <img src="image/logo-dark-sm.png" alt="small logo">
                    </span>
        </a>

        <!-- Sidebar Hover Menu Toggle Button -->
        <div class="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
            <i class="ri-checkbox-blank-circle-line align-middle"></i>
        </div>

        <!-- Full Sidebar Menu Close Button -->
        <div class="button-close-fullsidebar">
            <i class="ri-close-fill align-middle"></i>
        </div>

        <!-- Sidebar -left -->
        <div class="h-100" id="leftside-menu-container" data-simplebar>
            <!-- Leftbar User -->
            <div class="leftbar-user">
                <a href="pages-profile.html">
                    <img src="assets/images/users/avatar-1.jpg" alt="user-image" height="42" class="rounded-circle shadow-sm">
                    <span class="leftbar-user-name mt-2">Dominic Keller</span>
                </a>
            </div>

            <!--- Sidemenu -->
            <ul class="side-nav">

                <li class="side-nav-title">Navigation</li>

                <li class="side-nav-item">
                    <a data-bs-toggle="collapse" href="#sidebarDashboards" aria-expanded="false" aria-controls="sidebarDashboards" class="side-nav-link">
                        <i class="uil-home-alt"></i>
                        <span class="badge bg-success float-end">5</span>
                        <span> Dashboards </span>
                    </a>
                    <div class="collapse" id="sidebarDashboards">
                        <ul class="side-nav-second-level">
                            <li>
                                <a href="dashboard-analytics.html">Analytics</a>
                            </li>
                            <li>
                                <a href="index.html">Ecommerce</a>
                            </li>
                            <li>
                                <a href="dashboard-projects.html">Projects</a>
                            </li>
                            <li>
                                <a href="dashboard-crm.html">CRM</a>
                            </li>
                            <li>
                                <a href="dashboard-wallet.html">E-Wallet</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="side-nav-title">Apps</li>

                <li class="side-nav-item">
                    <a href="apps-calendar.html" class="side-nav-link">
                        <i class="uil-calender"></i>
                        <span> Calendar </span>
                    </a>
                </li>

                <li class="side-nav-item">
                    <a href="apps-chat.html" class="side-nav-link">
                        <i class="uil-comments-alt"></i>
                        <span> Chat </span>
                    </a>
                </li>

                <li class="side-nav-item">
                    <a data-bs-toggle="collapse" href="#sidebarCrm" aria-expanded="false" aria-controls="sidebarCrm" class="side-nav-link">
                        <i class="uil uil-tachometer-fast"></i>
                        <span class="badge bg-danger text-white float-end">New</span>
                        <span> CRM </span>
                    </a>
                    <div class="collapse" id="sidebarCrm">
                        <ul class="side-nav-second-level">
                            <li>
                                <a href="crm-projects.html">Projects</a>
                            </li>
                            <li>
                                <a href="crm-orders-list.html">Orders List</a>
                            </li>
                            <li>
                                <a href="crm-clients.html">Clients</a>
                            </li>
                            <li>
                                <a href="crm-management.html">Management</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="side-nav-item">
                    <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" class="side-nav-link">
                        <i class="uil-store"></i>
                        <span> Ecommerce </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarEcommerce">
                        <ul class="side-nav-second-level">
                            <li>
                                <a href="apps-ecommerce-products.html">Products</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-products-details.html">Products Details</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-orders.html">Orders</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-orders-details.html">Order Details</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-customers.html">Customers</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-shopping-cart.html">Shopping Cart</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-checkout.html">Checkout</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-sellers.html">Sellers</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <!--- End Sidemenu -->

            <div class="clearfix"></div>
        </div>
    </div>
  <!-- ========== Left Sidebar End ========== -->
</template>