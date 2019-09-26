<template>
  <div class="search_box scroll_book">
    <div class="search_box_h">
      <h3>全文搜索</h3>
      <div class="close" @click="close">&Chi;</div>
      <div class="search_into">
        <input
          type="text"
          placeholder="输入要检索的内容"
          v-model="keyword"
          @keypress.enter="handleSubmit()"
        />
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

      this.result = sections
        .map(s => {
          const result = s.content.match(
            new RegExp(`(?<=\\>)\\S*?${keyword}\\S*?(?=\\<)`)
          );

          return {
            id: s.id,
            title: s.title,
            content: result && result.shift()
          };
        })
        .filter(s => s.content);
    },

    handleItemClick() {
      this.close();
      this.result = [];
      this.keyword = "";
    }
  }
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
</style>