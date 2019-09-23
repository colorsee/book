<template>
  <div>
    <div class="monse_thr">
      <div class="monse_thr_list">
        <span class="l" @click="handleLineDraw">划线</span>
        <span class="c" @click="handleCopy">复制</span>
        <span class="r" @click="handleAnnotate">批注</span>
      </div>
      <div class="gary bot"></div>
      <div class="withe bot"></div>
    </div>
    <div class="monse_do">
      <div class="text">
        <textarea v-model="note"></textarea>
        <p class="chose">
          <input type="checkbox" v-model="isPrivate" />
          <span>仅自己可见</span>
        </p>
        <input class="ok" type="button" value="确认" @click="handleAnnotationSubmit" />
        <input class="cance" type="button" value="取消" @click="hideDo" />
      </div>
      <div class="gary top"></div>
      <div class="withe top"></div>
    </div>
  </div>
</template>

<script>
import scribing from "../api/scribing";
import getSelection from "../utils/getSelection";

export default {
  props: ["progress"],

  data: () => ({
    isPrivate: false,
    note: ""
  }),

  methods: {
    init() {
      this.selection = null;

      $("#content")
        .on("mousedown", e => {
          this.selection = null;

          $(".monse_thr").hide();
          $(".monse_do").hide();

          if (e.screenY < 300) {
            $(".monse_thr").css({
              top: e.screenY - 50 + "px",
              left: e.offsetX + "px"
            });
            $(".monse_do").css({
              top: e.screenY - 45 + "px",
              left: e.offsetX - 50 + "px"
            });
            $(".gary ,.withe")
              .addClass("top")
              .removeClass("bot");
          } else {
            $(".monse_thr").css({
              top: e.screenY - 116 + "px",
              left: e.offsetX + "px"
            });
            $(".monse_do").css({
              top: e.screenY - 256 + "px",
              left: e.offsetX - 50 + "px"
            });
            $(".gary ,.withe")
              .addClass("bot")
              .removeClass("top");
          }
        })
        .on("mouseup", () => {
          this.selection = getSelection();

          if (this.selection.value.length > 0) {
            $(".monse_thr").show();
            document.execCommand("Copy");
          }
        });
    },

    handleCopy() {
      document.execCommand("Copy", false);
      alt_page("成功复制到粘贴板");
      this.hideThr();
    },

    handleLineDraw() {
      this.submit(1, 0, "").then(() => {
        this.hideThr();
        alt_page("划线成功！");
      });
    },

    handleAnnotate() {
      this.hideThr();
      $(".monse_do").show();
    },

    handleAnnotationSubmit() {
      const isPublic = this.isPrivate === 1 ? 0 : 1;
      this.submit(isPublic, 1, this.note).then(() => {
        this.hideDo();
        alt_page("批注成功！");
      });
    },

    hideThr() {
      $(".monse_thr").hide();
    },

    hideDo() {
      $(".monse_do").hide();
      this.isPrivate = false;
      this.note = "";
    },

    submit(isPublic, type, note) {
      const {
        start_word,
        end_word,
        start_part,
        end_part,
        value
      } = this.selection;

      return scribing.ascribing(
        window.resource_id,
        window.article_id,
        start_part,
        start_word,
        end_part,
        end_word,
        value,
        this.progress.toFixed(2),
        isPublic,
        type,
        note
      );
    }
  }
};
</script>