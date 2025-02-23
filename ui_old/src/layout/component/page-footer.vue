<script lang="ts" setup>
import {computed} from "vue";
import * as moment from "moment-mini-ts";

const year = computed(() => moment().year())
</script>
<template>
  <!-- Footer Start -->
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    {{ year }} © Simpe Service
                </div>
                <div class="col-md-6">
                    <div class="text-md-end footer-links d-none d-md-block">
                        <a href="javascript: void(0);">About</a>
                        <a href="javascript: void(0);">Support</a>
                        <a href="javascript: void(0);">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  <!-- end Footer -->
</template>