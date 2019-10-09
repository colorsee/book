<template>
  <button @click="handleClick" class="anchor">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    handleClick() {
      window.history.replaceState(this.data, null);
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.anchor {
  color: blue;
  cursor: pointer;
}
</style>