<template>
  <div class="d-flex al-c ml-5 mt-5">
    <div class="d-flex al-c" @click="onMenu">
      <v-btn icon v-if="asMobile">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <b class="mr-3" :class="asMobile ? 'fz-18' : 'fz-25'">{{ title }}</b>
    </div>
    <template v-if="navItems.length">
      <v-icon size="20" color="#aaa">mdi-chevron-right</v-icon>
      <v-breadcrumbs :items="navItems" class="pa-0 ml-3">
        <template v-slot:divider>
          <v-icon size="20" color="#aaa">mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    asMobile() {
      return this.$vuetify.breakpoint.mdAndDown;
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
    onMenu() {
      this.$setMsg({
        name: "showDrawer",
      });
    },
    setNavItems() {
      this.$setState({
        navItems: this.navItems,
      });
    },
  },
};
</script>