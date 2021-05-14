<template>
  <div class="search-item">
    <div class="pic-cover">
      <a :href="`/play/${data.id}`"><img v-lazy="data.img" /></a>
    </div>
    <div class="right-info">
      <div class="title">
        <a :href="`/play/${data.id}`" v-html="title"></a>
      </div>
      <div class="intros">
        <div class="line">
          <div class="left">
            <span class="key">类型：</span>
            <span class="value">{{ data.type }}</span>
          </div>
          <div class="right">
            <span class="key">地区：</span>
            <span class="value">{{ data.area }}</span>
          </div>
        </div>
        <div class="line">
          <div class="left">
            <span class="key">年份：</span>
            <span class="value">{{ data.year }}</span>
          </div>
          <div class="right">
            <span class="key">风格：</span>
            <span class="value">{{ data.style }}</span>
          </div>
        </div>
        <div class="desc">简介：{{ data.description }}</div>
      </div>
      <div class="navigate">
        <a :href="`/play/${data.id}`">
          <i class="icon icon-play"></i>
          <span>开始播放</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: () => ({}) }
  },
  computed: {
    title () {
      return this.data.title.replace(new RegExp(this.data.title, 'g'), `<em>${this.data.title}</em>`)
    }
  }
}
</script>

<style lang="less" >
.search-item {
  display: flex;
  height: 210px;

  .pic-cover {
    width: 150px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right-info {
    position: relative;
    flex: 1;
    margin-left: 20px;
    border-bottom: 1px solid #b3a2bd;
  }

  .title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;

    em {
      font-style: normal;
      color: #ff6b6b;
    }

    a:hover {
      color: #ff6b6b;
    }
  }

  .line {
    display: flex;
    margin: 4px 0;
    font-size: 13px;

    .left {
      width: 300px;
    }
    .right {
      width: 300px;
    }

    .key {
      color: #99a2aa;
    }
  }

  .desc {
    color: #99a2aa;
    font-size: 13px;
  }

  .navigate {
    position: absolute;
    right: 0;
    bottom: 10px;
    font-size: 18px;

    i {
      position: absolute;
      top: 2px;
      left: -22px;
      font-size: 20px;
    }

    &:hover span,
    &:hover i {
      color: #ff8080;
    }

    span,
    i {
      color: #ff6b6b;
    }
  }
}
</style>