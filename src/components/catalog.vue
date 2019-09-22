<template>
  <action>
    <div class="header">
      <h3>目录</h3>
      <div class="close" @click="handleClose">X</div>
    </div>
    <catalog-list :source="catalog" class="list"></catalog-list>
  </action>
</template>

<script>
import CatalogList from "./catalog-list.vue";
import Action from "./action.vue";

export default {
  props: ["catalog"],
  methods: {
    handleClose() {
      this.$emit("close");
    }
  },
  components: { CatalogList, Action }
};
</script>

<style scoped>
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