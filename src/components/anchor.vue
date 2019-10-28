<template>
  <a @click="handleClick" class="anchor">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    handleClick() {
      console.log(this.data);
      window.history.replaceState(this.data, null);
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.anchor {
  cursor: pointer;
}
</style>