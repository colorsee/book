<template>
  <action>
    <div class="header">
      <h3>书签</h3>
      <div class="close" @click="handleClose">X</div>
    </div>
    <div class="list">
      <div :key="item.id" class="item" v-for="item in bookmarks">
        <!-- <h4 class="title">我是书签的章节名称</h4> -->
        <div>
          <p class="excerpt">{{item.excerpt}}</p>
          <div class="extra">
            <span>进度：{{item.percent | percent}}</span>
            <div class="actions">
              <div class="action">打开</div>
              <div class="action dangerous" @click="remove(item.id)">删除</div>
            </div>
            <div>{{item.create_time | datetime}}</div>
          </div>
        </div>
      </div>
    </div>
  </action>
</template>

<script>
import markAPI from "../api/mark";
import Action from "./action.vue";
import percent from "../utils/percent";
import datetime from "../utils/datetime";

export default {
  data: () => ({
    bookmarks: []
  }),

  mounted() {
    this.load();
  },

  methods: {
    load() {
      markAPI.lmark(1, 1, ({ posts }) => (this.bookmarks = posts));
    },

    remove(id) {
      markAPI.rmark(id, () => this.load());
    },

    handleClose() {
      this.$emit("close");
    }
  },

  filters: { percent, datetime },
  components: { Action }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  color: #a6a6a6;
}

.item .title {
  border-bottom: 1px dashed #a6a6a6;
  padding-bottom: 10px;
  margin: 0;
  margin-top: 10px;
  color: #999999;
}

.item .excerpt {
  color: #999999;
  padding: 10px 0px;
  font-size: 0.9em;
}

.item .extra {
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item + .item {
  margin-top: 40px;
}

.extra .actions {
  display: flex;
}

.actions .action {
  border-radius: 3px;
  border: 1px solid #cccccc;
  background-color: #ebebeb;
  padding: 3px 4px;
  margin: 0 5px;
}

.actions .action.dangerous {
  background-color: #ff3300;
  border: 1px solid #cc0000;
  color: white;
}
</style>>
