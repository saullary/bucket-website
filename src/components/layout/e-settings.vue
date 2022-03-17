<template>
  <div v-if="asMobile">
    <v-expansion-panels accordion v-model="curIdx">
      <v-expansion-panel v-for="(it, i) in list" :key="i">
        <v-expansion-panel-header>
          {{ it.text }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <component
            :is="it.comp"
            :info="info"
            :active="i == curIdx"
            v-if="it.comp && activeIdxList.includes(i)"
          ></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>

  <div v-else class="e-settings">
    <div>
      <v-tabs color="black" v-model="curIdx" height="44" hide-slider>
        <v-tab v-for="(it, i) in list" :key="i">
          {{ it.text }}
        </v-tab>
      </v-tabs>
    </div>
    <div class="con-wrap">
      <component
        :is="it.comp"
        :info="info"
        :active="curItem.comp == it.comp"
        v-show="curItem.comp == it.comp"
        v-for="(it, i) in activeList"
        :key="i"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    info: Object,
    defTab: Number,
  },
  data() {
    const { tab = this.defTab || 0 } = this.$route.query;
    let curIdx = tab * 1;
    return {
      curIdx,
      activeIdxList: [curIdx],
    };
  },
  watch: {
    curIdx(tab) {
      if (!this.activeIdxList.includes(tab)) {
        this.activeIdxList.push(tab);
      }
      this.$router.replace({
        query: {
          tab,
        },
      });
    },
    "$route.query.tab"(tab) {
      if (tab != this.curIdx && tab > -1) {
        this.curIdx = tab * 1;
      }
    },
  },
  computed: {
    asMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    curItem() {
      return this.list[this.curIdx] || {};
    },
    activeList() {
      return this.list.filter((_, i) => {
        return this.activeIdxList.includes(i);
      });
    },
  },
};
</script>

<style lang="scss">
.e-settings {
  .theme--light.v-tabs > .v-tabs-bar {
    background-color: transparent;
  }
  .v-slide-group__content {
    padding-top: 2px;
    padding-left: 2px;
  }
  .v-tab--active {
    background: #fff;
    &,
    &:before {
      border-radius: 12px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    box-shadow: 0 0 2px #999999b3;
    font-weight: bold;
  }
  .con-wrap {
    margin-left: 2px;
    min-height: 70vh;
    padding: 15px;
    background: #fff;
    box-shadow: 0 0 2px #999999b3;
  }
}
</style>