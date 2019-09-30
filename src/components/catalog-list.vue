<template>
  <div class="list catalog-list">
    <a
      :key="item.id"
      :class="{item: true, active: currentArticle == item.id}"
      v-for="item in source"
      :href="`#section-${item.id}`"
      @click="handleClick"
    >
      <div class="detail">
        <div class="title" v-html="item.title"></div>
        <!-- <div class="line"></div> -->
        <!-- <div class="status">{{ percent(index) | percentFilter }}</div> -->
      </div>
      <catalog-list
        v-for="(it, index) in item.child"
        :key="it.id"
        :progress="progress"
        :sum="sum + step * index"
        :currentArticle="currentArticle"
        :source="Array.isArray(it) ? it : [it]"
        :level="step"
        :index="index"
      ></catalog-list>
    </a>
  </div>
</template>

<script>
import percent from "../utils/percent";

export default {
  name: "catalog-list",
  props: ["source", "progress", "level", "sum", "index", "currentArticle"],
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
      const { step, progress, sum } = this;

      if (progress < sum + step * index) {
        return 1;
      }

      return 0;
    }
  },
  filters: { percentFilter: percent }
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
