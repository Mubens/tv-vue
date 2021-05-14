<template>
  <div @mouseover="onMouseOver" @mouseover.once="getDataList" @mouseout="onMosueOut">
    <a class="history" href="/history">历史</a>
    <div class="history-tool" :class="{ visible }" :style="{ transform: `translateX(${translateX})` }" ref="tool">
      <div class="selection">
        <span>视频历史</span>
      </div>
      <div class="content">
        <div>
          <HistoryItem v-for="(item, i) in arrList" :date="dateToString(i)" :list="item" :key="i" />
        </div>
        <a class="more" href="/history">查看全部</a>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryItem from './HistoryItem';
import { getHistoryPlay } from '@/api';

export default {
  data() {
    return {
      dataList: [],
      visible: false,
      timeout: null,
      translateX: -(document.body.scrollWidth - document.body.clientWidth + 300 / 2 + 10) + 'px'
    };
  },
  computed: {
    arrList() {
      const list = [[]];
      // this.dataList.sort((prev, next) => next.time - prev.time)
      let index = 0;
      let date = +new Date(new Date().setHours(0, 0, 0, 0));
      this.dataList.map((item) => {
        if (item.time < date) {
          index++;
          list[index] = [];
          date = +new Date(date - 24 * 60 * 60 * 1000);
        }
        list[index].push(item);
      });
      return list;
    }
  },
  filters: {
    dateToString(index) {
      if (index === 0) {
        return '今天';
      } else if (index === 1) {
        return '昨天';
      } else if (index === 2) {
        return '前天';
      } else {
        return '更早';
      }
    }
  },
  methods: {
    onMouseOver() {
      this.timeout && clearTimeout(this.timeout);
      this.visible = true;
      this.translateX = -(document.body.scrollWidth - document.body.clientWidth + 300 / 2 + 10) + 'px';
    },
    onMosueOut() {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = false;
      }, 200);
    },
    async getDataList() {
      try {
        const data = (await getHistoryPlay({ page: 1, limit: 10 })).data;
        this.dataList = data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    // console.log(this.arrList)
  },
  components: { HistoryItem }
};
</script>

<style lang="less" scoped>
.history-tool {
  position: absolute;
  top: 130%;
  left: 50%;
  width: 300px;
  padding-top: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.274);
  background-color: #ffffff;
  overflow: hidden;
  z-index: 1;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.1s, opacity 0.1s;
}

.visible {
  visibility: visible;
  opacity: 1;
}

.selection {
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f4f4;

  span {
    margin: 0 10px;
    padding: 3px 6px;
    border-radius: 15px;
    font-size: 12px;
    color: #ffffff;
    background-color: #ff6b6b;
    // cursor: pointer;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 430px;
  overflow-y: auto;
  overflow-x: hidden;
}

.more {
  display: inline-block;
  width: 300 - 20px;
  height: 35px;
  margin: 10px;
  border-radius: 4px;
  background-color: #f4f4f4;
  text-align: center;
  line-height: 35px;
  transition: all 0.1s;

  &:hover {
    background-color: #e7e7e7;
  }
}
</style>
