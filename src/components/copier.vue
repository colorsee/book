<template>
  <textarea v-model="value" ref="container" class="textarea"></textarea>
</template>

<script>
export default {
  data: () => ({
    value: ""
  }),

  methods: {
    copy(value) {
      this.value = value;

      Promise.resolve().then(() => {
        this.$refs.container.select();
        document.execCommand("Copy");
        alt_page("成功复制到粘贴板");
      });
    }
  }
};
</script>

<style scoped>
.textarea {
  position: absolute;
  z-index: -1;
}
</style>