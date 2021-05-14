<template>
  <div class="history-items" v-if="list.length">
    <span>{{ date }}</span>
    <div class="history-item" v-for="item in list" :key="item.id">
      <a :href="`/play/${item.id}?${item.ep}`">
        <img v-lazy="item.img" />
        <div class="info">
          <div class="line-1">{{ item.title }}</div>
          <div class="line-2">第{{ item.ep }}话 {{ item.ep_title }}</div>
          <div class="date">{{ date }} {{ filterTime(item.time) }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    date: { type: String, default: '时间' }
  },
  filters: {
    filterTime(time) {
      const date = new Date(time);
      const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

      return h + ':' + m;
    }
  }
};
</script>

<style lang="less">
.history-items {
  & > span {
    padding: 0 10px;
    color: #5f5f5f;
    font-size: 12px;
  }
}

.history-item {
  padding: 5px 10px;
  transition: all 0.1s;

  &:hover {
    background-color: #f4f4f4;
  }

  a {
    display: flex;
    height: 56px;
  }

  img {
    width: 100px;
    border-radius: 2px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding-left: 10px;
    line-height: 16px;
    font-size: 13px;

    .line-2 {
      font-size: 12px;
      color: #505050;
      width: 170px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .date {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
