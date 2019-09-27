<template>
  <div
    class="content"
    ref="container"
    :style="{transform: `translateX(calc((-80px - 100%) * ${page})`}"
  >
    <component
      v-if="Number.isInteger(current.level)"
      :is="`h${current.level + 1}`"
      :id="`section-${current.id}`"
    >{{current.title}}</component>
    <div class="paragraphs" v-html="current.content" ref="content" :data-id="current.id"></div>
  </div>
</template>

<script>
export default {
  props: ["sections"],

  data: () => ({
    section: 0,
    page: 0,
    pageCount: 1
  }),

  computed: {
    current() {
      return this.sections[this.section] || {};
    },

    progress() {
      this.step = 1 / this.sections.length;
      const { page, pageCount, section } = this;

      return ((page + 1) / pageCount + section) * this.step;
    },

    readerWidth() {
      return window.innerWidth < 768 ? window.innerWidth : 800;
    }
  },

  mounted() {
    this.initMouseScroll();
    this.initHashChange();
  },

  destroyed() {
    this.removeHashChange();
    this.removeMouseScroll();
  },

  updated() {
    const { children } = this.$refs.content;
    const last = children[children.length - 1];

    if (!last) {
      this.pageCount = 1;
      return;
    }

    const { width } = getComputedStyle(last);
    const widthNumber = parseInt(width) + 80;
    this.pageCount = Math.floor(last.offsetLeft / widthNumber) + 1;
  },

  methods: {
    emitProgress() {
      Promise.resolve().then(() => this.$emit("read", this.progress));
    },

    nextSection() {
      if (this.section >= this.sections.length - 1) {
        return;
      }

      this.section += 1;
      this.page = 0;
    },

    prevSection() {
      if (this.section < 1) {
        return Promise.resolve();
      }

      this.section -= 1;
      this.page = 10000;
      return Promise.resolve().then(() => (this.page = this.pageCount - 1));
    },

    next() {
      if (this.page + 1 === this.pageCount) {
        this.nextSection();
      } else {
        this.page += 1;
      }
      this.emitProgress();
    },

    prev() {
      if (this.page < 1) {
        this.prevSection().then(this.emitProgress);
        return;
      }

      this.page -= 1;
      this.emitProgress();
    },

    jumpTo(percent) {
      this.section = Math.ceil(percent / this.step - 1);
      this.emitProgress();
    },

    scroll() {
      let st = null;

      return delta => {
        if (st) {
          return;
        }

        if (delta < 0) {
          this.prev();
        } else {
          this.next();
        }

        st = setTimeout(() => {
          st = null;
        }, 500);
      };
    },

    content() {
      return $(this.$refs.container)
        .find("h1, .paragraphs > *")
        .filter((_, e) => e.offsetLeft === this.readerWidth * this.page)
        .text();
    },

    initHashChange() {
      window.addEventListener("hashchange", this.handleHashChange);
    },

    removeHashChange() {
      window.removeEventListener("hashchange", this.handleHashChange);
    },

    initMouseScroll() {
      const scroll = this.scroll();
      this._scrollListener = ({ deltaY }) => scroll(deltaY);
      this.$refs.container.addEventListener("wheel", this._scrollListener);
    },

    removeMouseScroll() {
      this.$refs.container.removeEventListener("wheel", this._scrollListener);
      this._scrollListener = null;
    },

    handleHashChange() {
      const { hash } = window.location;
      const [_, id] = hash.match(/#section-(\d+)/);
      this.section = this.sections.findIndex(
        s => s.id == id || s.content.includes(`section-${id}`)
      );
      this.page = 10000;

      Promise.resolve().then(() => {
        const target = document.getElementById(`section-${id}`);
        this.page = target.offsetLeft / this.readerWidth;
        this.emitProgress();
      });
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  column-width: 620px;
  column-gap: 80px;
  box-sizing: border-box;
  height: 100%;
  line-height: 1.8;
}

@media only screen and (max-width: 768px) {
  .content {
    column-width: calc(100vw - 80px);
  }
}
</style>

<style>
.paragraphs p {
  text-indent: 2em !important;
  margin: 0.8rem 0;
}

@media only screen and (max-width: 768px) {
  .paragraphs p {
    text-indent: 0 !important;
  }
}
</style>