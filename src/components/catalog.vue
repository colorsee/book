<template>
  <action class="container">
    <div class="header">
      <h3>目录</h3>
      <div class="close" @click="handleClose">X</div>
    </div>
    <catalog-list
      :source="catalog"
      :progress="progress"
      :level="1"
      :sum="0"
      :index="1"
      class="list"
      @close="handleClose"
    ></catalog-list>
  </action>
</template>

<script>
import CatalogList from "./catalog-list.vue";
import Action from "./action.vue";

export default {
  props: ["catalog", "progress"],
  methods: {
    handleClose() {
      this.$emit("close");
    }
  },
  components: { CatalogList, Action }
};
</script>

<style scoped>
.container {
  overflow-y: auto;
  padding-bottom: 32px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list {
  flex: 1;
  margin-left: -2em;
}
</style>