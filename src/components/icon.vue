<template>
  <i :class="{iconfont: true, [`icon-${name}`]: true}"></i>
</template>

<script>
export default {
  props: ["name"]
};
</script>

<style scoped>
.iconfont {
  display: block;
}
</style>