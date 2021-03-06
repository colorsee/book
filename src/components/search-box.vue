<template>
  <div :class="{search_box: true, scroll_book: true, act: active}">
    <div class="search_box_h">
      <h3>全文搜索</h3>
      <div class="close" @click="close">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
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
      <div class="search_list active" v-if="result">
        <div class="scrollview" v-if="result.length">
          <h4>
            搜索结果
            <span>{{this.result.length}}</span> 个
          </h4>
          <anchor
            class="search_list_item"
            v-for="item in result"
            :key="item.id"
            :data="{section: item.id, partcode: item.partcode}"
            @click="handleItemClick"
          >
            <div class="t">
              <div class="title">{{item.title}}</div>
              <div class="progress">{{item.progress | percent}}</div>
            </div>
            <div class="b" v-html="item.content"></div>
          </anchor>
        </div>
        <div class="empty" v-else>
          <h4>没有找到相关内容</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./icon.vue";
import Anchor from "./anchor.vue";
import percent from "../utils/percent";

export default {
  props: ["sections", "active"],

  data: () => ({
    result: null,
    keyword: ""
  }),

  methods: {
    close() {
      this.result = null;
      this.keyword = "";
      this.$emit("close");
    },

    handleSubmit() {
      const { sections, keyword } = this;
      const step = 1 / sections.length;

      if (!keyword) {
        return;
      }

      this.isActive = true;
      this.result = sections
        .map((v, i) => [i + 1, v])
        .filter(([, s]) => s.content.includes(keyword))
        .map(([i, s]) => {
          const [, result, partcode] = s.content.match(
            new RegExp(
              `.*(<p.*?data-partcode="(\\d+?)".*?${keyword}.*?<\\/p>).*`
            )
          );
          const [content] = result.match(
            new RegExp(`[^<>]{0,20}${keyword}[^<>]{0,30}`)
          );

          return {
            partcode,
            id: s.id,
            title: s.title,
            content: content.replace(
              keyword,
              `<span style="background: #ac8200; color: white; padding: 2px">${keyword}</span>`
            ),
            progress: i * step
          };
        });
    },

    handleItemClick() {
      this.$emit("close");
    }
  },

  components: { Icon, Anchor },
  filters: { percent }
};
</script>

<style scoped>
.search_list.active {
  display: block;
  height: 680px;
  overflow-y: auto;
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

.empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.t {
  display: flex;
}

.t > .title {
  flex: 1;
}

.t > .progress {
  font-size: 0.9em;
  color: #ac8200;
}
</style>