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
      <e-menu offset-y open-on-hover v-for="(it, i) in menus" :key="i">
        <v-btn
          slot="ref"
          text
          rounded
          :style="{
            background: it.btnBg,
          }"
          class="ml-4"
        >
          <div class="u-avatar" v-if="it.avatar">
            <v-avatar size="22">
              <v-img :src="it.avatar"></v-img>
            </v-avatar>
          </div>
          <span :style="{ color: it.color || '#555' }">{{ it.label }}</span>
          <img
            :src="`img/svg/header/ic-down-${it.color || 'def'}.svg`"
            width="10"
            class="ml-2"
          />
        </v-btn>

        <v-list dense>
          <v-list-item
            v-for="(sub, j) in it.subs"
            :key="j"
            link
            :to="sub.to"
            :href="sub.href"
            :target="sub.href ? '_blank' : ''"
          >
            <img
              :src="`img/svg/header/${sub.icon}.svg`"
              width="12"
              class="mr-2"
            />
            <span class="gray-6">{{ sub.label }}</span>
          </v-list-item>
        </v-list>
      </e-menu>
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
              href: "https://docs.bucket.4everland.org/",
            },
            {
              label: "Community",
              icon: "m-chat",
            },
            {
              label: "Bug Bounty",
              icon: "m-bug",
            },
            {
              label: "Changelog",
              icon: "m-log",
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
        subs: [
          {
            label: "Settings",
            icon: "m-settings",
            to: "/settings",
          },
          {
            label: "My Collection",
            icon: "m-collect",
          },
          {
            label: "My Referral",
            icon: "m-refer",
            to: "/referral",
          },
          {
            label: "Report",
            icon: "m-report",
          },
          {
            label: "Disconnect",
            icon: "m-logout",
          },
        ],
      });
      return list;
    },
  },
  data() {
    return {};
  },
};
</script>