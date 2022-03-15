<style lang="scss">
.e-drawer {
  box-shadow: 5px 0px 30px 0px rgba(0, 0, 0, 0.1);
  .v-navigation-drawer__border {
    display: none;
  }
  .mini-arrow {
    right: -10px;
    bottom: 25px;
    background: #fff;
    transform: rotate(45deg);
    .icon {
      transform: rotate(-45deg);
    }
  }
  &.v-navigation-drawer--mini-variant .mini-arrow {
    .icon {
      transform: rotate(135deg);
    }
  }
  .v-list-item--active {
    color: #34a9ff;
    background: none;
    &.sub::before {
      opacity: 0;
    }
    &.v-list-group__header::before {
      opacity: 0.12 !important;
    }
  }
}
</style>

<template>
  <v-navigation-drawer
    class="e-drawer"
    :mini-variant.sync="mini"
    v-model="drawer"
    app
    clipped
  >
    <e-stor-usage v-show="false"></e-stor-usage>
    {{ hasActive }}
    <div class="pa-5"></div>
    <v-list rounded dense>
      <!-- :prepend-icon="item.action" -->
      <template v-for="(it, i) in list">
        <v-list-group
          v-model="it.active"
          :group="it.group"
          v-if="it.subs"
          :key="i"
          no-action
        >
          <template v-slot:activator>
            <e-drawer-icon
              :it="it"
              :active="(hasActive && it.group.test(path)) || it.active"
            ></e-drawer-icon>
            <v-list-item-content>
              <v-list-item-title>
                <b>{{ it.label }}</b>
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            class="sub"
            :to="sub.to"
            :href="sub.href"
            :target="sub.href ? '_blank' : ''"
            v-for="(sub, j) in it.subs"
            :key="j"
          >
            <!-- <v-list-item-icon>
            <img
              :src="`img/icon/${sub.img}${
                path.indexOf(it.to) == 0 ? '' : '-0'
              }.svg`"
              width="18"
            />
          </v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title v-text="sub.label"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :to="it.to"
          :href="it.href"
          :target="it.href ? '_blank' : ''"
          :key="i"
        >
          <e-drawer-icon
            :it="it"
            :active="path.indexOf(it.to) == 0"
          ></e-drawer-icon>
          <v-list-item-content>
            <v-list-item-title>
              <b>{{ it.label }}</b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <div class="pos-a mini-arrow" @click="mini = !mini">
      <v-icon class="icon">mdi-chevron-left</v-icon>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

const initFilePath = "/storage/";
const initDomainPath = "/domain";

export default {
  data() {
    return {
      drawer: null,
      mini: false,
      groupIdx: 0,
      filesPath: initFilePath,
      domainPath: initDomainPath,
    };
  },
  computed: {
    ...mapState({
      noticeMsg: (s) => s.noticeMsg,
      userInfo: (s) => s.userInfo,
      token: (s) => s.token(),
    }),
    path() {
      return this.$route.path;
    },
    hasActive() {
      // todo: use array to save active
      return false; //this.list.filter((it) => it.active).length > 0;
    },
    list() {
      return [
        {
          label: "Overview",
          img: "m-overview",
          to: "/overview",
          active: false,
        },
        {
          label: "Hosting",
          img: "m-hosting",
          group: /projects/i,
          subs: [
            {
              label: "Projects",
              to: "/projects",
            },
          ],
        },
        {
          label: "Bucket",
          img: "m-bucket",
          active: false,
          group: /storage|ar|domain/i,
          subs: [
            {
              label: "Files",
              to: this.path.includes(initFilePath)
                ? initFilePath
                : this.filesPath,
            },
            {
              label: "AR History",
              to: "/arweave",
            },
            {
              label: "Domains",
              to: this.path.includes(initDomainPath)
                ? initDomainPath
                : this.domainPath,
            },
          ],
        },
      ];
    },
  },
  watch: {
    groupIdx() {
      console.log(this.groupIdx);
    },
    noticeMsg({ name }) {
      if (name == "showDrawer") {
        this.drawer = true;
      }
    },
    path(val, oldVal) {
      if (val.includes(initFilePath)) {
        this.filesPath = val;
        if (!oldVal.includes(initFilePath)) {
          this.$setMsg({
            name: "updateUsage",
          });
        }
      } else if (val.includes(initDomainPath)) {
        this.domainPath = val;
      }
    },
  },
  methods: {
    onLogout() {
      localStorage.clear();
      location.href = "index.html";
    },
  },
};
</script>