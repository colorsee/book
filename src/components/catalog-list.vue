<template>
  <div class="list catalog-list">
    <div
      :key="item.id"
      :class="{item: true, active: currentArticle == item.id}"
      v-for="(item, i) in source"
      @click="handleClick"
    >
      <div class="detail">
        <anchor class="title" v-html="item.title" :data="{section: item.id}"></anchor>
        <div class="line"></div>
        <div class="status">{{ percent(i) | percentFilter }}</div>
      </div>
      <catalog-list
        v-if="item.child && item.child.length"
        :sum="percent(i)"
        :source="item.child"
        :level="step"
        :currentArticle="currentArticle"
      ></catalog-list>
    </div>
  </div>
</template>

<script>
import Anchor from "./anchor.vue";
import percent from "../utils/percent";

export default {
  name: "catalog-list",
  props: ["source", "level", "index", "sum", "currentArticle"],
  computed: {
    step() {
      return (1 / this.source.length) * this.level;
    }
  },
  methods: {
    handleClick() {
      this.$emit("close");
    },

    percent(index) {
      const { step, sum } = this;
      return sum + step * index;
    }
  },
  filters: { percentFilter: percent },
  components: { Anchor }
};
</script>

<style scoped>
.list {
  font-size: 0.9rem;
}

.item {
  color: #666;
  display: block;
  margin-left: 2em;
}

.item.active {
  color: #549bbc;
}

*::-webkit-scrollbar {
  width: 0;
}

.detail {
  display: flex;
  align-items: center;
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
