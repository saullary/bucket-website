<template>
  <v-app>
    <e-header v-if="!meta.noLogin"></e-header>
    <e-drawer v-if="!meta.noLogin" />
    <v-main>
      <!-- <e-serach v-if="!meta.noLogin" /> -->
      <div class="d-flex al-c ml-5 mt-5">
        <b class="fz-25 mr-3">{{ title }}</b>
        <template v-if="navItems.length">
          <v-icon size="20" color="#aaa">mdi-chevron-right</v-icon>
          <v-breadcrumbs :items="navItems" class="pa-0 ml-3">
            <template v-slot:divider>
              <v-icon size="20" color="#aaa">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </template>
      </div>
      <div class="pa-5">
        <e-wrap class="main-wrap">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </e-wrap>
      </div>
    </v-main>

    <e-alert></e-alert>
  </v-app>
</template>

<script>
export default {
  computed: {
    meta() {
      return this.$route.meta || {};
    },
    path() {
      return this.$route.path;
    },
    title() {
      return this.path.split("/")[1].capitalize();
    },
    navItems() {
      const { params } = this.$route;
      let items = [];
      // bucket domain
      if (this.path.indexOf("/bucket/domain") == 0) {
        items = [
          {
            text: "Domains",
            to: "/bucket/domain",
            exact: true,
          },
        ];
        const { name } = params;
        if (name)
          items.push({
            text: name,
            to: "/bucket/domain/" + name,
            exact: true,
          });
        return items;
      }
      // bucket storage ar
      else if (/^\/bucket\/(arweave|storage)/.test(this.path)) {
        const isAr = /^\/bucket\/arweave/.test(this.path);
        let to = isAr ? "/bucket/arweave" : "/bucket/storage/";
        items = [
          {
            text: isAr ? "AR History" : "Files",
            to,
            exact: true,
          },
        ];
        if (isAr) to += "/";
        const arr = this.path.replace(to, "").split("/");
        for (const i in arr) {
          const text = arr[i];
          if (!text) break;
          to += text + (arr[i + 1] == "" ? "" : "/");
          if (isAr && i < arr.length - 1) {
            continue;
          }
          items.push({
            text,
            to,
            exact: i < arr.length - 1,
          });
        }
        return items;
      }
      return items;
    },
  },
  watch: {
    navItems() {
      this.setNavItems();
    },
  },
  mounted() {
    this.setNavItems();
  },
  methods: {
    setNavItems() {
      this.$setState({
        navItems: this.navItems,
      });
    },
  },
};
</script>

<style lang="scss">
.main-wrap {
  background: #fff;
  box-shadow: 0 0 6px rgb(205 205 205 / 50%);
  min-height: 80vh;
}
</style>