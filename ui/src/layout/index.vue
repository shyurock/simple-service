<script setup>
import PageNavBar from "./component/page-nav-bar.vue";
import PageHeader from "./component/page-header.vue";
</script>

<template>
    <div class="g-navigation">
        <page-header />
        <page-nav-bar />
    </div>
    <div class="g-container">
        <div class="g-main">
            <div class="g-main__header">
                <div class="g-main__title">Title</div>
                <div class="g-main__subtitle">erere</div>
            </div>
            <router-view />
        </div>
    </div>
    <footer class="g-footer">
        <div>footer</div>
    </footer>
</template>
<style scoped lang="scss">
    .g-container {
        min-height: calc(100vh - 92px);
    }
</style>