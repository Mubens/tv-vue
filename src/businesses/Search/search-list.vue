<template>
  <div class="search-list">
    <div class="total-wrap">
      <span>共{{ total }}条数据</span>
    </div>
    <SearchItem :data="item" v-for="item in list" :key="item.id" />
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    total: { type: Number, default: 0 }
  },
  components: {
    SearchItem: () => import('./search-item')
  }
}
</script>

<style lang="less">
.search-list {
  margin: 20px 0;

  .total-wrap {
    margin-bottom: 10px;

    span {
      color: #6c6d6e;
    }
  }
}
</style>