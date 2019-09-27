<template>
  <div>
    <phone>
      <div class="settings">
        <div class="block font">
          <span class="les">A-</span>
          <input
            type="range"
            class="range"
            :value="value.fontSize"
            min="12"
            max="22"
            @change="handleFontSizeChange"
          />
          <span class="add">A+</span>
        </div>
        <div class="block color-box">
          <div class="color faf7ed" @click="handleBackgroundChange('#faf7ed', 'black')"></div>
          <div class="color e6f2e6" @click="handleBackgroundChange('#e6f2e6', '#999')"></div>
          <div class="color e4f1f5" @click="handleBackgroundChange('#e4f1f5', '#666')"></div>
          <div class="color e0e0e0" @click="handleBackgroundChange('#e0e0e0', '#333')"></div>
          <div class="color f5e4e4" @click="handleBackgroundChange('#f5e4e4', '#111')"></div>
          <div class="color c_191b1c" @click="handleBackgroundChange('#191b1c', '#f1f1f1')"></div>
          <div class="color c_52585c" @click="handleBackgroundChange('#52585c', '#f9f9f9')"></div>
          <div class="color blur"></div>
          <div class="color blur"></div>
          <div class="color blur"></div>
        </div>
        <div class="block modes">
          <div
            :class="{mode: true, active: value.mode === 'horizantol'}"
            @click="emitChange('mode', 'horizantol')"
          >&#xe661; 左右翻页</div>
          <div
            :class="{mode: true, active: value.mode === 'vertical'}"
            @click="emitChange('mode', 'vertical')"
          >&#xe662; 上下翻页</div>
        </div>
      </div>
    </phone>
    <tablet>
      <div class="set_style scroll_book act">
        <h3>设置</h3>
        <div class="set_style_list">
          <div class="l">阅读主题</div>
          <div class="r color_chose">
            <span
              v-for="c in colors"
              :key="c[0]"
              :class="{color: true, [c[2] || c[0]]: true, active: unit('background') === `#${c[0]}`}"
              @click="handleBackgroundSettingChange('#' + c[0], c[1])"
            ></span>
          </div>
        </div>
        <div class="set_style_list">
          <div class="l">字体大小</div>
          <div class="r">
            <p>
              <span
                class="size lessen"
                @click="handleSettingChange('fontSize', unit('fontSize') - 1)"
              >A-</span>
              <span class="size now">{{unit('fontSize')}}</span>
              <span
                class="size add"
                @click="handleSettingChange('fontSize', unit('fontSize') + 1)"
              >A+</span>
            </p>
          </div>
        </div>
        <div class="set_style_list">
          <div class="l">阅读方式</div>
          <div class="r">
            <span
              :class="{rad: true, read_s: true, bg_red: unit('mode') === 'vertical'}"
              @click="handleSettingChange('mode', 'vertical')"
            >&#xe662; 竖</span>
            <span
              :class="{rad: true, read_s: true, bg_red: unit('mode') === 'horizantol'}"
              @click="handleSettingChange('mode', 'horizantol')"
            >&#xe661; 横</span>
          </div>
        </div>
        <div class="set_style_list">
          <div class="l">&nbsp;</div>
          <div class="r">
            <div class="but_sure" @click="handleConfirm">确认</div>
            <div class="but_cance" @click="handleClose">取消</div>
          </div>
        </div>
      </div>
    </tablet>
  </div>
</template>

<script>
import Phone from "./phone.vue";
import Tablet from "./tablet.vue";

export default {
  props: ["value"],

  data: () => ({
    settings: {},
    colors: [
      ["faf7ed", "black"],
      ["e6f2e6", "#999"],
      ["e4f1f5", "#666"],
      ["e0e0e0", "#333"],
      ["f5e4e4", "#111"],
      ["191b1c", "#f1f1f1", "c_191b1c"],
      ["52585c", "#f9f9f9", "c_52585c"]
    ]
  }),

  methods: {
    handleFontSizeChange(e) {
      this.emitChange("fontSize", parseInt(e.currentTarget.value));
    },

    handleFontSizeClick(value) {
      if (value > 22 || value < 12) {
        return;
      }

      this.emitChange("fontSize", value);
    },

    handleBackgroundChange(background, color) {
      const newValue = {
        ...this.value,
        background,
        color
      };
      this.$emit("input", newValue);
    },

    handleSettingChange(key, value) {
      this.settings = {
        ...this.settings,
        [key]: value
      };
    },

    handleBackgroundSettingChange(background, color) {
      this.settings = { ...this.settings, background, color };
    },

    handleClose() {
      this.$emit("close");
    },

    handleConfirm() {
      this.$emit("input", { ...this.value, ...this.settings });
      this.handleClose();
    },

    emitChange(key, value) {
      const newValue = {
        ...this.value,
        [key]: value
      };
      this.$emit("input", newValue);
    },

    unit(key) {
      return this.settings[key] || this.value[key];
    }
  },

  components: { Phone, Tablet }
};
</script>

<style scoped>
.set_style {
  color: #333 !important;
}

.settings {
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff !important;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  height: 300px;
}

.block {
  padding: 0px 20px;
  border-bottom: 1px solid #a6a6a6;
  display: flex;
  justify-content: space-between;
}

.font {
  padding: 20px;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.color-box {
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -2.5%;
  padding: 20px;
}

.color-box .color {
  width: 14%;
  height: 30px;
  margin: 10px 2.5%;
  border-radius: 6px;
  border: 1px solid #cccccc;
}

.color.blur {
  opacity: 0;
}

.range {
  flex: 1;
  border-radius: 15px;
  margin: 0 10%;
  -webkit-appearance: none;
  height: 5px;
  background: rgba(0, 0, 0, 0)
    linear-gradient(
      to right,
      rgb(255, 51, 0),
      rgb(255, 51, 0),
      40%,
      rgb(134, 134, 134),
      rgb(134, 134, 134)
    )
    repeat scroll 0% 0%;
}

.range::-webkit-slider-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  -webkit-appearance: none;
  background-color: #ff3300;
}

.modes {
  padding: 30px 0;
  justify-content: center;
}

.mode {
  align-items: center;
  color: #868686;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid currentColor;
  margin: 0 5px;
  padding: 0 4px;
}

.mode.active {
  color: #fff;
}
</style>