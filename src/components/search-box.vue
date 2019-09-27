<template>
  <div class="search_box scroll_book">
    <div class="search_box_h">
      <h3>全文搜索</h3>
      <div class="close" @click="close">&Chi;</div>
      <div class="search_into">
        <input
          type="text"
          placeholder="输入要检索的内容"
          class="input"
          v-model="keyword"
          @keypress.enter="handleSubmit"
        />
        <icon name="search" @click.native="handleSubmit"></icon>
      </div>
      <div :class="{search_list: true, active: result.length}">
        <div class="scrollview">
          <h4>
            搜索结果
            <span>{{this.result.length}}</span>个
          </h4>
          <a
            class="search_list_item"
            v-for="item in result"
            :key="item.id"
            :href="`#section-${item.id}`"
            @click="handleItemClick"
          >
            <div class="t">{{item.title}}</div>
            <div class="b">{{item.content}}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./icon.vue";

export default {
  props: ["sections"],

  data: () => ({
    result: [],
    keyword: ""
  }),

  methods: {
    close() {
      $(".search_box").removeClass("act");
    },

    handleSubmit() {
      const { sections, keyword } = this;

      if (!keyword) {
        return;
      }

      this.result = sections
        .filter(s => s.content.includes(keyword))
        .map(s => {
          const [result] = s.content.match(
            new RegExp(`[^<>]{0,20}${keyword}[^<>]{0,20}`)
          );

          console.log(result);

          return {
            id: s.id,
            title: s.title,
            content: result
          };
        });
    },

    handleItemClick() {
      this.close();
      this.result = [];
      this.keyword = "";
    }
  },

  components: { Icon }
};
</script>

<style scoped>
.search_list.active {
  display: block;
  height: 720px;
  overflow-y: scroll;
}

.search_list_item {
  display: block;
  color: #333;
}

.search_into {
  display: flex;
}

.search_into .input {
  flex: 1;
}
</style>