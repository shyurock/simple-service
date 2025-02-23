<script setup lang="ts">
const props = defineProps<{
    title: string,
    buttons: []
}>()
</script>
<template>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <form class="d-flex">
                        <slot />
<!--                        <div class="input-group">-->
<!--                            <input type="text" class="form-control form-control-light" id="dash-daterange">-->
<!--                            <span class="input-group-text bg-primary border-primary text-white">-->
<!--                                <i class="mdi mdi-calendar-range font-13"></i>-->
<!--                            </span>-->
<!--                        </div>-->
<!--                        <a href="javascript: void(0);" class="btn btn-primary ms-2">-->
<!--                            <i class="mdi mdi-autorenew"></i>-->
<!--                        </a>-->
<!--                        <a href="javascript: void(0);" class="btn btn-primary ms-1">-->
<!--                            <i class="mdi mdi-filter-variant"></i>-->
<!--                        </a>-->
                        <a
                            v-for="item in buttons"
                            class="btn btn-primary ms-1">
                            <i class="mdi mdi-record" @click="item.onClick"></i>
                        </a>
                    </form>
                </div>
                <h4 class="page-title">{{ title }}</h4>
            </div>
        </div>
    </div>
</template>