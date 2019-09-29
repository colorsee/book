<template>
  <div class="wrapper fullscreen">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background: rgba(0, 0, 0, 0.8);
  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding-left: 10%;
  }
}

.container {
  color: #333;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100%;
}
</style>