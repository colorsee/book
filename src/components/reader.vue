<template>
  <div
    :class="{viewport: true, vertical: settings.mode === 'vertical'}"
    :style="{background: settings.background, color: settings.color}"
    ref="viewport"
    @scroll="handleViewportScroll"
  >
    <div id="content" :style="{height: settings.mode === 'horizantol' ? '100%' : 'unset'}">
      <horizantol
        v-if="settings.mode === 'horizantol'"
        :sections="sections"
        :style="{fontSize: settings.fontSize + 'px'}"
        class="content"
        ref="container"
        v-on="$listeners"
      ></horizantol>

      <div v-else @click="handleVerticalClick">
        <vertical
          v-for="item in sections"
          class="paragraphs"
          :key="item.id"
          :current="item"
          :style="{fontSize: settings.fontSize + 'px'}"
          :data-id="item.id"
        ></vertical>
      </div>
    </div>

    <control
      :info="info"
      :mode="settings.mode"
      :isShow="isToolbarShow"
      @pageChange="handlePageChange"
      @show="handleControlShow"
      @close="handleControlClose"
    ></control>

    <catalog
      v-if="isCatalogShow"
      :catalog="info.catalog_list"
      :progress="progress"
      @close="toggle('Catalog', false)"
    ></catalog>
    <bookmark v-if="isBookmarkShow" @close="toggle('Bookmark', false)"></bookmark>
    <settings
      v-if="isSettingsShow"
      :value="settings"
      @input="handleSettingsChange"
      @close="handleControlClose"
    ></settings>
    <progress-bar v-if="isProgressShow"></progress-bar>
  </div>
</template>

<script>
import Section from "../models/Section";
import Horizantol from "./horizantol.vue";
import Vertical from "./vertical.vue";
import Control from "./control.vue";
import Catalog from "./catalog.vue";
import Bookmark from "./bookmark.vue";
import Settings from "./settings.vue";
import ProgressBar from "./progress-bar.vue";

const defaultSettings = {
  fontSize: 16,
  background: "#faf7ed",
  color: "black",
  mode: "horizantol"
};

export default {
  props: ["sections", "info", "bookmarks", "resourceId", "progress"],

  data: () => ({
    isToolbarShow: false,
    isCatalogShow: false,
    isBookmarkShow: false,
    isSettingsShow: false,
    isProgressShow: false,
    settings: {}
  }),

  mounted() {
    this.loadSettings();
  },

  methods: {
    emitProgress(progress) {
      Promise.resolve().then(() => this.$emit("read", progress));
    },

    handleVerticalClick() {
      this.isToolbarShow = true;
    },

    handlePageChange(step) {
      if (step < 0) {
        this.prev();
      } else {
        this.next();
      }
    },

    handleControlShow(key) {
      this.closeControls();
      this[key] = true;
    },

    handleControlClose() {
      this.closeControls();
      this.isToolbarShow = false;
    },

    toggle(key, shouldShow) {
      this[`is${key}Show`] = shouldShow;
    },

    next() {
      const { container } = this.$refs;
      this.$refs.container.next();
    },

    prev() {
      const { container } = this.$refs;
      this.$refs.container.prev();
    },

    closeControls() {
      this.isCatalogShow = false;
      this.isBookmarkShow = false;
      this.isSettingsShow = false;
      this.isProgressShow = false;
    },

    restoreSettings(value) {
      localStorage.setItem("settings", JSON.stringify(value));
    },

    loadSettings() {
      const str = localStorage.getItem("settings");
      this.settings = JSON.parse(str) || defaultSettings;
    },

    handleSettingsChange(value) {
      this.settings = value;
      this.restoreSettings(value);
    },

    jumpTo(percent) {
      percent = percent / 100;

      if (this.settings.mode === "horizantol") {
        return this.$refs.container.jumpTo(percent);
      }

      const { scrollHeight, clientHeight } = this.$refs.viewport;
      const scrollTo = percent * scrollHeight - clientHeight;
      this.$refs.viewport.scrollTo(0, scrollTo);
    },

    handleViewportScroll() {
      if (this.settings.mode !== "vertical") {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = this.$refs.viewport;
      this.emitProgress((scrollTop + clientHeight) / scrollHeight);
    },

    content() {
      if (this.settings.mode === "horizantol") {
        return this.$refs.container.content();
      }

      const { viewport } = this.$refs;
      const { scrollTop } = viewport;
      const { innerHeight } = window;

      return $(viewport)
        .find(".paragraphs > h1, .paragraphs > div > *")
        .filter(
          (_, e) =>
            e.offsetTop >= scrollTop && e.offsetTop <= scrollTop + innerHeight
        )
        .text();
    }
  },

  components: {
    Horizantol,
    Vertical,
    Control,
    Catalog,
    Bookmark,
    Settings,
    ProgressBar
  }
};
</script>

<style scoped>
.viewport {
  width: 800px;
  box-sizing: border-box;
  padding: 40px;
  height: 100vh !important;
  overflow: hidden;
}

.viewport.vertical {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.content {
  height: 100%;
}

@media only screen and (max-width: 768px) {
  .viewport {
    width: 100%;
    padding: 40px;
  }
}
</style>