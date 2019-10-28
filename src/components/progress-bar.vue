<template>
  <div class="container">
    <div
      class="chapters block"
      :style="{ justifyContent: isChapterVisible ? 'space-between' : 'center' }"
    >
      <div v-if="isChapterVisible" class="step" @click="handleChapterChange('prev')">&lt;上一章</div>
      <div class="name">
        <h4 class="title">当前进度</h4>
        <div class="progress">{{ progress | percent }}</div>
      </div>
      <div v-if="isChapterVisible" class="step" @click="handleChapterChange('next')">下一章&gt;</div>
    </div>
    <div class="range-box block">
      <input
        type="range"
        class="range"
        :value="progress * 100"
        min="0"
        max="100"
        @change="handleProgressChange"
      />
    </div>
  </div>
</template>

<script>
import percent from "../utils/percent";

export default {
  props: ["title", "progress", "isChapterVisible"],
  methods: {
    handleChapterChange(type) {
      this.$emit("change", { type });
    },
    handleProgressChange({ target }) {
      this.$emit("progress", { value: target.value });
    }
  },
  filters: {
    percent
  }
};
</script>

<style scoped>
.block {
  border-bottom: 1px solid #a6a6a6;
}
.container {
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
}

.chapters {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.step {
  font-size: 0.9em;
  padding: 5px 0;
}

.name {
  text-align: center;
}

.name .title {
  font-size: 20px;
  font-weight: normal;
  margin: 0;
}

.name .progress {
  font-size: 0.8em;
}

.range-box {
  padding: 50px 20px;
  display: flex;
}

.range {
  flex: 1;
  border-radius: 15px;
  -webkit-appearance: none;
  height: 5px;
  background: rgba(0, 0, 0, 0)
    linear-gradient(
      to right,
      rgb(255, 51, 0),
      rgb(255, 51, 0),
      10%,
      rgb(134, 134, 134),
      rgb(134, 134, 134)
    )
    repeat scroll 0% 0%;
}

.range::-webkit-slider-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  -webkit-appearance: none;
  background-color: #ff3300;
}
</style>