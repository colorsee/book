<template>
  <phone>
    <div>
      <div v-if="mode === 'horizantol'" class="paginator fullscreen">
        <div class="item" @click="handlePageChange(-1)"></div>
        <div class="item" @click="handleActionClick('isToolbarShow')"></div>
        <div class="item" @click="handlePageChange(1)"></div>
      </div>

      <div class="toolbar fullscreen" v-if="isShow">
        <div class="title">
          <span><i class="fa fa-book"></i> {{info.title}}</span>
        </div>
        <div class="wrapper" @click="closeToolbar">
          <div class="tool"><i class="fa fa-bookmark"></i></div>
          <div class="tool" @click.capture.stop.prevent="handleBookmarkAdd"><i class="fa fa-map-signs"></i></div>
        </div>
        <div class="footer">
          <div class="action" @click="handleActionClick('isCatalogShow')">
            <span><i class="fa fa-book"></i></span>
            <span>目录</span>
          </div>
          <div class="action" @click="handleActionClick('isBookmarkShow')">
            <span><i class="fa fa-bookmark"></i></span>
            <span>书签</span>
          </div>
          <div class="action" @click="handleActionClick('isSettingsShow')">
            <span><i class="fa fa-cog"></i></span>
            <span>设置</span>
          </div>
          <div class="action" @click="handleActionClick('isProgressShow')">
            <span>&#xe606;</span>
            <span>进度</span>
          </div>
        </div>
      </div>
    </div>
  </phone>
</template>

<script>
import Phone from "./phone.vue";

export default {
  props: ["info", "mode", "isShow"],

  methods: {
    handlePageChange(step) {
      this.$emit("pageChange", step);
    },

    handleActionClick(key) {
      this.$emit("show", key);
    },

    handleBookmarkAdd() {
      this.$emit("add-bookmark");
    },

    closeToolbar() {
      this.$emit("close");
    }
  },

  components: { Phone }
};
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-direction: column;
}

.toolbar .title {
  height: 30px;
  color: #ffffff;
  font-size: 15px;
  line-height: 30px;
  padding: 0px 20px;
  white-space: nowrap;
  vertical-align: middle;
  text-overflow: ellipsis;
  background-color: rgba(0, 0, 0, 0.8);
}

.toolbar .wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 100px;
}

.wrapper .tool {
  height: 40px;
  width: 50px;
  margin-top: 10px;
  color: #ffffff;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px 0px 0px 10px;
  background-color: rgba(0, 0, 0, 0.8);
}

.toolbar .footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

.footer .action {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.paginator {
  display: flex;
}

.item {
  flex: 1;
}
</style>