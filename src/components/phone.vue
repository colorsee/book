<template>
  <media :query="{maxWidth: 768}">
    <slot></slot>
  </media>
</template>

<script>
import Media from "vue-media";

export default {
  components: { Media }
};
</script>