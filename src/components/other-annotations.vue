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
        <span>{{item.update_time}}</span>
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
        <a class="open">打开此页</a>
      </div>
    </div>
  </div>
</template>

<script>
import percent from "../utils/percent";

export default {
  props: ["list"],
  filters: {
    percent
  }
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