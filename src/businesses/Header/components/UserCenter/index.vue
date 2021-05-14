<template>
  <div class="user-center">
    <div class="search-icon"></div>
    <div class="user-signin" v-if="isSignIn">
      <div class="item" :class="{ visible }" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
        <a class="user-face" href="#">
          <img :src="user_face" />
        </a>
        <div class="vp-tool" :style="{ visibility: visible ? 'visible' : 'hidden' }">
          <div class="user_name">{{ 'er发现' }}</div>
          <div class="logout">
            <span @click="logout">退出登录</span>
          </div>
        </div>
      </div>
      <div class="item">
        <a href="#">消息</a>
      </div>
      <history-tool class="item" />
    </div>
    <div class="user-logout" v-else>
      <div class="logout-face">
        <a href="/sign_in">
          <img :src="defaultAvatar" />
        </a>
      </div>
      <div class="item">
        <a href="/sign_in">登录</a>
      </div>
      <div class="item">
        <a href="/register">注册</a>
      </div>
    </div>
    <div>
      <a href="https://github.com/Mubens/stress-free-tv" class="refrence">GitHub</a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef } from 'vue';
import store from '@/store';

export default defineComponent({
  components: {
    'history-tool': () => import('./HistoryTool.vue')
  },
  setup() {
    const visible = shallowRef(false);
    let timeout = 0;

    const isSignIn = computed(() => {
      return !!store.getState().token;
    });

    return {
      visible,
      isSignIn,
      user_face: store.getState().user_face,
      logout,
      onMouseOver,
      onMouseLeave,
      defaultAvatar: require('@/assets/images/default_avatar.jpg')
    };

    function logout() {
      store.reamoveToken();
    }
    function onMouseOver() {
      timeout && clearTimeout(timeout);
      visible.value = true;
    }
    function onMouseLeave() {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        visible.value = false;
      }, 200);
    }
  }
});
</script>

<style lang="less" scoped>
.user-center {
  box-sizing: border-box;
  display: flex;
  height: 100%;
  align-items: center;
}

.user-signin,
.user-logout {
  display: flex;
}

.face() {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-face {
  .face();
  transition: all 0.1s;
  z-index: 9;
}

.visible {
  .user-face {
    transform: scale(1.8, 1.8) translateY(15px);
  }

  .vp-tool {
    opacity: 1;
  }
}

.logout-face {
  .face();
  width: 28px;
  height: 28px;
  border: 1px solid #cccccc;
}

.item {
  position: relative;
  display: flex;
  margin: 0 15px;
  align-items: center;
}

.refrence {
  display: inline-block;
  width: 100px;
  height: 36px;
  border-radius: 2px;
  color: #ffffff;
  line-height: 36px;
  text-align: center;
  background-color: #ff6b6b;
}

.vp-tool {
  position: absolute;
  opacity: 0;
  top: 130%;
  left: 50%;
  width: 240px;
  padding: 30px 0 0;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transform: translateX(-50%);
  transition: all 0.3s;
  z-index: 1;

  .user_name {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }

  .logout {
    margin: 5px 0;

    span {
      display: block;
      font-size: 14px;
      padding: 5px 15px;
      cursor: pointer;

      &:hover {
        background-color: #f4f4f4;
      }
    }
  }
}
</style>
