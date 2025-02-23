<script setup lang="ts">
import AppFooter from './app-footer.vue'
import AppTopbar from './app-topbar.vue'
import AppSidebar from './app-sidebar.vue'
import {useLayout} from '../layout/composables/layout.ts'
import {computed, ref, watch} from 'vue'

const { layoutConfig, layoutState, isSidebarActive } = useLayout()

const outsideClickListener = ref(null)

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener()
    } else {
        unbindOutsideClickListener()
    }
})

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    }
})

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value)
        outsideClickListener.value = null
    }
}

const isOutsideClicked = (event: any) => {
    const sidebarEl = document.querySelector('.layout-sidebar')
    const topbarEl = document.querySelector('.layout-menu-button')

    return !(sidebarEl?.isSameNode(event.target) || sidebarEl?.contains(event.target) || topbarEl?.isSameNode(event.target) || topbarEl?.contains(event.target))
}
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar />
        <app-sidebar />
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <app-footer />
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
