<template>
  <div class="search-input-box" :class="{ 'index-page': role === 'index' }">
    <div class="search-wrap">
      <input
        type="text"
        v-model.trim="keyword"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @compositionstart="chineseEnd = false"
        @compositionend="chineseEnd = true"
        @input="handleInput"
        @keydown.enter="clickSearchBtn(keyword)"
      />
      <div class="suggest-box" v-show="active" tabindex="1" @mousedown="isShow = true" @blur="isShow = false">
        <!-- 后端数据 -->
        <ul v-show="keyword" key="data">
          <li v-for="item in searchList" @click="clickSearchBtn(item.title)" :key="item.id">
            <div class="title" v-html="highlight(item.title)"></div>
          </li>
        </ul>
        <!-- localStoargeStorage -->
        <ul v-show="!keyword" key="localStoarge">
          <li v-for="(item, i) in historyList" @click="clickSearchBtn(item.keyword)" :key="i">
            <span>{{ item.keyword }}</span>
            <i class="icon icon-delete" @click.stop="deleteHistorySearchByIndex(i)"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-btn" @click="clickSearchBtn(keyword)">
      <i class="icon icon-search"></i>
      <span v-if="role !== 'index'">搜索</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowReactive, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { localStorage } from '@/utils/storage';
import { PlayService } from '@/api';

export default defineComponent({
  props: {
    role: { type: String, default: '' }
  },
  emits: ['search'],
  setup(_, ctx) {
    const route = useRoute();
    let keyword = shallowRef((route.query.keyword as string) || '');

    let historyList = shallowReactive(getHistorySearch<any>());

    let searchList: any[] = shallowReactive([]);

    const isFocus = shallowRef(false);
    const isShow = shallowRef(false);
    const chineseEnd = shallowRef(false);

    let timeout: number | null = null;

    watch(
      () => route.query.keyword,
      () => {
        keyword.value = (route.query.keyword as string) || '';
      }
    );

    const active = computed(() => {
      return (isFocus.value || isShow.value) && (keyword.value ? searchList.length : historyList.length);
    });

    return {
      keyword,
      historyList,
      searchList,
      isFocus,
      isShow,
      chineseEnd,
      active,
      clickSearchBtn,
      handleInput,
      highlight,
      deleteHistorySearchByIndex
    };

    /* 点击搜索按钮 */
    function clickSearchBtn(keyword: string) {
      keyword = keyword.trim();
      ctx.emit('search', keyword);
      if (keyword) {
        isFocus.value = isShow.value = false;
        setHistorySearch(keyword);
        historyList = getHistorySearch();
      }
    }
    /* 输入框 input 事件 */
    function handleInput() {
      searchList = [];
      if (chineseEnd.value) {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
          isFocus.value = true;
          getSuggest(keyword.value);
        }, 200);
      }
    }
    /* 模糊查询 */
    async function getSuggest(keyword: string) {
      if (keyword) {
        try {
          const res = await PlayService.searchTitle<any>(keyword);
          if (!res.errno) {
            searchList = res.data;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    /* 匹配项 highlight */
    function highlight(title = '') {
      return title.replace(
        new RegExp(keyword.value, 'g'),
        `<em style="font-style: normal;color: #ff6b6b;">${keyword.value}</em>`
      );
    }
    /* 获取历史记录 */
    function getHistorySearch<T>(): T[] {
      return localStorage.getItem('sftv-search') || [];
    }
    /* 添加搜索记录 */
    function setHistorySearch(keyword: string) {
      const index = historyList.findIndex((item) => item.keyword === keyword);

      if (index > -1) {
        historyList.splice(index, 1);
      }

      historyList.unshift({ keyword, href: `http://localhost:8080/search?keyword=${keyword}` });

      if (historyList.length > 10) {
        historyList.pop();
      }
      saveHistorySearch();
    }
    /* 保存搜索记录 */
    function saveHistorySearch() {
      localStorage.setItem('sftv-search', historyList);
    }
    /* 删除某条记录 */
    function deleteHistorySearchByIndex(index: number) {
      historyList.splice(index, 1);
      saveHistorySearch();
    }
  }
});
</script>

<style lang="less" scoped>
.search-input-box {
  display: flex;
  justify-content: center;

  .search-wrap {
    position: relative;
  }

  input {
    width: 300px;
    height: 40px;
    font-size: 16px;
    padding: 0 20px;
    border: 2px solid #ccd0d7;
    border-radius: 4px;
  }

  .search-btn {
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding: 0 20px;
    border-radius: 4px;
    background-color: #ff6b6b;
    font-size: 16px;
    color: #ffffff;
    transition: all 0.1s;
    cursor: pointer;

    &:hover {
      background-color: #ff8080;
    }

    i {
      font-size: 18px;
      transform: translate(-7px, 1px);
    }
  }

  .suggest-box {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    // height: 300px;
    margin-top: 5px;
    padding: 5px 0;
    border-radius: 4px;
    border: 1px solid #e5e9ef;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    z-index: 99;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 0 10px;
      cursor: pointer;
    }

    li:hover {
      background-color: #f4f4f4;
    }

    span {
      display: inline-block;
      flex: 1;
    }

    .icon {
      font-size: 12px;
    }
  }
}

.search-input-box.index-page {
  input {
    height: 32px;
    border-width: 1px;
    border-radius: 4px 0 0 4px;
    font-size: 14px;
  }

  .search-btn {
    margin-left: 0;
    padding: 0 10px 0 20px;
    border-radius: 0 4px 4px 0;
    background-color: #ccd0d7;

    i {
      font-size: 14px;
      color: #535353;
    }
  }
}
</style>
