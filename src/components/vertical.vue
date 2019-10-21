<template>
  <div class="content">
    <component
      v-if="Number.isInteger(current.level)"
      :is="`h${current.level + 1}`"
      :id="`section-${current.id}`"
    >{{current.title}}</component>
    <div v-html="current.content" ref="content"></div>
  </div>
</template>

<script>
import { restoreProgress } from "../utils/progress.js";

export default {
  props: ["current"],

  mounted() {
    restoreProgress(true);
  },

  updated() {
    restoreProgress();
  }
};
</script>