<style lang="scss">
#e-header {
  box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 15%) !important;
}
.u-avatar {
  background: #cac3e0;
  padding: 4px;
  border-radius: 100px;
  transform: scale(1.4);
  position: relative;
  left: -10px;
}
</style>
<template>
  <v-app-bar id="e-header" app clipped-left height="60" color="#fff">
    <a href="/">
      <img src="img/svg/logo.svg" height="30" class="d-b" />
    </a>
    <v-spacer></v-spacer>
    <template>
      <v-btn
        text
        rounded
        :style="{
          background: it.btnBg,
        }"
        v-for="(it, i) in menus"
        :key="i"
        class="ml-4"
      >
        <div class="u-avatar" v-if="it.avatar">
          <v-avatar size="22">
            <v-img :src="it.avatar"></v-img>
          </v-avatar>
        </div>
        <span :style="{ color: it.color }">{{ it.label }}</span>
        <img
          :src="`img/svg/header/ic-down-${it.color || 'def'}.svg`"
          width="10"
          class="ml-2"
        />
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      userInfo: (s) => s.userInfo,
    }),
    menus() {
      let list = [
        {
          label: "Support",
          subs: [
            {
              label: "Documents",
              icon: "m-docs",
            },
          ],
        },
      ];
      const info = this.userInfo;
      list.push({
        label: (info.username || "unkown").cutStr(6, 6),
        avatar: info.avatar || "img/svg/header/u-wallet.svg",
        color: "white",
        btnBg: "#CAC3E0",
      });
      return list;
    },
  },
  data() {
    return {};
  },
};
</script>