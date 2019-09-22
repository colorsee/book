<template>
  <div class="list">
    <div :key="item.id" class="item" v-for="item in source">
      <div class="detail">
        <div class="title">{{item.title}}</div>
        <div class="line"></div>
        <div class="status">0%</div>
      </div>
      <catalog-list v-for="it in item.child" :key="it.id" :source="Array.isArray(it) ? it : [it]"></catalog-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "catalog-list",
  props: ["source"]
};
</script>

<style scoped>
.list {
  overflow-y: scroll;
  font-size: 0.9rem;
}

.item {
  margin-left: 2em;
}

*::-webkit-scrollbar {
  width: 0;
}

.detail {
  display: flex;
  align-items: center;
  color: #666;
  margin-top: 1rem;
}

.detail .title {
  max-width: 80%;
}

.detail .line {
  flex: 1;
  border-bottom: 1px dashed currentColor;
  margin: 0 0.4em;
}
</style>