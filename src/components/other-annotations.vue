<template>
  <div class="list">
    <div class="mypsg_3_list" v-for="item in list" :key="item.id">
      <div class="t">
        <div class="user">
          <div
            class="portrait"
            style="background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2188301108,2208747323&fm=26&gp=0.jpg')"
          ></div>
          <span class="name">{{item.member_id.nickname}}的批注</span>
        </div>
        <span>{{item.update_time | datetime}}</span>
      </div>
      <div class="c">
        <p>{{item.excerpt}}</p>
        <p>
          <span>{{item.note}}</span>
          <i></i>
        </p>
      </div>
      <div class="b">
        <span>赞10</span>
        <span>转发10</span>
        <span>进度：{{item.percent | percent}}</span>
        <anchor
          class="open"
          :data="{section: item.start_article_id, partcode: item.start_part}"
        >打开此页</anchor>
      </div>
    </div>
  </div>
</template>

<script>
import Anchor from "./anchor.vue";
import percent from "../utils/percent";
import datetime from "../utils/datetime.js";

export default {
  props: ["list"],
  filters: {
    percent,
    datetime
  },
  components: { Anchor }
};
</script>

<style scoped>
.mypsg_3_list .t {
  display: flex;
  justify-content: space-between;
}

.user {
  display: flex;
  align-items: center;
}

.user .name {
  margin-left: 10px;
}

.portrait {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white no-repeat;
  background-size: cover;
}
</style>