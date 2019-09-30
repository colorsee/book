<template>
  <div class="list">
    <div class="mypsg_2_list" v-for="item in list" :key="item.id">
      <div class="t">{{item.excerpt}}</div>
      <div class="c">
        <span>{{item.note}}</span>
        <i></i>
      </div>
      <div class="b">
        <span>赞 10</span>
        <span>留言 10</span>
        <span>进度：{{item.percent}}%</span>
        <span class="open">打开此页</span>
        <span class="set">修改</span>
        <span class="del" @click="remove(item.id)">删除</span>
        <span class="tmr">{{item.create_time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import scribing from "../api/scribing";

export default {
  props: ["list"],
  methods: {
    remove(id) {
      scribing.dscribing(id).then(() => this.$emit("reload"));
    }
  }
};
</script>