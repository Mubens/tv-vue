<template>
  <div id="app">
    <tv-header />
    <div class="page-box">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './businesses/Header/index.vue';

export default defineComponent({
  name: 'App',
  components: { 'tv-header': Header }
});
</script>

<style lang="less">
@import './App.less';
</style>
