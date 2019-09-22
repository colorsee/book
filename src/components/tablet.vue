<template>
  <media :query="{minWidth: 769}">
    <slot></slot>
  </media>
</template>

<script>
import Media from "vue-media";

export default {
  components: { Media }
};
</script>