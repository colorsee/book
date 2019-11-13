<template>
  <a @click="handleClick" class="anchor">
    <slot></slot>
  </a>
  
</template>

<script>
export default {
  props: ["data"],
  methods: {
    handleClick(e) {
      console.log(this.data,e.target.className);
      if(e.target.className == 'anchor title red'){
      	this.$emit("tk",this.data.section);
      	return
      }
//    for(var )
      window.history.replaceState(this.data, null);
      this.$emit("handleClick");
      this.$emit("handleClick1");
      this.$emit("close");
      $(
      '.set_style,.bok_Catalog,.search_box,change_form,.mypsg_1,.mypsg_2,.mypsg_3'
    ).removeClass('act')
    }
  }
};
</script>

<style scoped>
.anchor {
  cursor: pointer;
}
</style>