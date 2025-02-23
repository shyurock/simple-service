<script setup>
import TopBar from './component/top-bar.vue'
import LeftSideBar from './component/left-side-bar.vue'
import PageFooter from './component/page-footer.vue'
</script>

<template>
    <top-bar />
    <left-side-bar />
    <div class="content-page">
        <div class="content">
            <!-- Start Content-->
            <div class="container-fluid">
                <router-view />
            </div>
            <!-- container -->

        </div>
        <!-- content -->
        <page-footer />

    </div>

    <!-- ============================================================== -->
    <!-- End Page content -->
    <!-- ============================================================== -->
</template>
<style scoped lang="scss">
</style>