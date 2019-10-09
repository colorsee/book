<template>
  <div class="list">
    <div class="mypsg_2_list" v-for="item in list" :key="item.id">
      <div class="t">{{item.excerpt}}</div>
      <div class="c" v-if="item.type === '1'">
        <textarea
          class="textarea"
          v-if="modifying === item.id"
          v-model="newContent"
          @blur="handleTextareaBlur(item)"
        ></textarea>
        <span v-else>{{item.note}}</span>
        <i></i>
      </div>
      <div class="b">
        <span>赞 10</span>
        <span>留言 10</span>
        <span>进度：{{item.percent | percent}}</span>
        <anchor
          class="open"
          :data="{section: item.start_article_id, partcode: item.start_part}"
        >打开此页</anchor>
        <span class="set" v-if="item.type === '1'" @click="handleModify(item)">修改</span>
        <span class="del" @click="remove(item.id)">删除</span>
        <span class="tmr">{{item.create_time | datetime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Anchor from "./anchor.vue";
import scribing from "../api/scribing";
import percent from "../utils/percent";
import datetime from "../utils/datetime.js";

export default {
  props: ["list"],
  data: () => ({
    modifying: "",
    newContent: ""
  }),
  methods: {
    remove(id) {
      scribing.dscribing(id).then(() => this.$emit("reload"));
    },
    handleModify(item) {
      this.modifying = item.id;
      this.newContent = item.note;
    },
    handleTextareaBlur(item) {
      scribing
        .ascribing(
          window.resource_id,
          item.start_article_id,
          item.start_part,
          item.start_word,
          item.end_part,
          item.end_word,
          item.excerpt,
          item.percent,
          item.public,
          item.type,
          this.newContent,
          item.id
        )
        .then(() => {
          this.modifying = "";
          item.note = this.newContent;
          this.newContent = "";
        });
    }
  },
  filters: { percent, datetime },
  components: { Anchor }
};
</script>

<style scoped>
.textarea {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
}
</style>