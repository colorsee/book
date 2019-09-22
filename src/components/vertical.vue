<template>
  <div class="content">
    <component
      v-if="Number.isInteger(current.level)"
      :is="`h${current.level + 1}`"
    >{{current.title}}</component>
    <div class="paragraphs" v-html="current.content" ref="content"></div>
  </div>
</template>

<script>
export default {
  props: ["current"]
};
</script>