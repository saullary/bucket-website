<style lang="scss">
.mobile .projects .v-expansion-panel-header .mdi-chevron-down {
  position: relative;
  right: -16px;
}
.projects {
  .v-expansion-panel {
    &::before,
    &::after {
      display: none;
    }
    box-shadow: 0 0 1px #999;
    &:hover {
      box-shadow: 0 1px 4px rgb(153 153 153 / 50%);
    }
    &.v-expansion-panel--active {
      box-shadow: 0 1px 4px rgb(153 153 153 / 60%);
      &:hover {
        box-shadow: 0 1px 4px rgb(153 153 153 / 90%);
      }
    }
  }

  .theme--light.v-expansion-panels .v-expansion-panel--disabled {
    color: rgba(0, 0, 0, 0.87);
    .v-expansion-panel-header {
      pointer-events: all;
    }
  }
}
</style>

<template>
  <div class="projects">
    <v-expansion-panels v-model="curIdx" multiple :disabled="limit > 0">
      <v-expansion-panel
        class="mb-3"
        v-for="(it, i) in list.slice(0, limit)"
        :key="i"
      >
        <v-expansion-panel-header @click="onItem(it)">
          <v-row>
            <v-col cols="8" md="4">
              <div class="d-flex al-c grow-0">
                <img :src="it.img" height="60" width="60" class="bdrs-8 bd-1" />
                <div class="ml-3">
                  <h3>{{ it.name }}</h3>
                </div>
              </div>
            </v-col>
            <v-col cols="4" v-if="!asMobile" class="d-flex al-c f-center">
              state
            </v-col>
            <v-col cols="4" :class="asMobile ? 'ta-c' : 'd-flex al-c'">
              <div v-if="asMobile" class="mb-2">
                <span>state</span>
              </div>
              <v-btn
                :to="getDetailPath(it)"
                @click.stop="onStop"
                class="ml-auto mr-2"
                color="primary"
                rounded
                small
                >View Detail</v-btn
              >
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="mt-2">
            <v-row class="statis-row">
              <v-col
                cols="12"
                md="6"
                lg="4"
                v-for="(row, j) in it.statisList"
                :key="j"
              >
                <div class="pa-3">
                  <component :is="row.comp" :list="row.data" />
                </div>
              </v-col>
              <!-- <v-col cols="4">
                <rect-data :list="it.statis2" />
              </v-col> -->
            </v-row>
          </div>
          <div class="mt-3 ta-r">
            <v-btn color="primary" small rounded outlined
              >View Build Logs</v-btn
            >
            <v-btn color="error" small outlined rounded class="ml-3"
              >Delete</v-btn
            >
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="ta-c">
      <div :class="!limit ? 'main-wrap' : ''" class="pb-15" v-if="!list.length">
        <div
          :style="{
            height: loading ? '80px' : '60px',
          }"
        ></div>
        <e-empty :loading="loading" :title="loading ? '' : 'No Projects, Yet!'">
          {{
            loading
              ? "Loading projects..."
              : "Create a project from a template, or import a Git repository."
          }}
        </e-empty>
        <div class="mt-10" v-if="!loading">
          <v-btn color="primary" rounded to="/hosting/new"
            >Create a New Project</v-btn
          >
        </div>
      </div>
      <div class="mt-8" v-else-if="limit">
        <v-btn color="primary" rounded outlined to="/hosting/projects"
          >View More</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
const statisList = [
  {
    comp: "rect-data",
    data: [
      {
        title: "New Users",
      },
      {
        title: "Total Users",
      },
      {
        title: "Total UV",
      },
      {
        title: "Total PV",
      },
    ],
  },
  {
    comp: "rect-data",
    data: [
      {
        title: "Bandwidth used",
        unit: "KB",
      },
      {
        title: "Build Minutes used",
        unit: "Minutes",
      },
      {
        title: "Storage used",
        unit: "MB",
      },
    ],
  },
];
export default {
  props: {
    limit: Number,
  },
  computed: {
    asMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  data() {
    return {
      curIdx: [],
      list: [
        {
          name: "doge-1",
          id: 1,
          img: "http://tt0.bucket.foreverland.xyz/screenshot.png",
          statisList,
        },
        {
          name: "doge-2",
          id: 2,
          img: "https://api.4everland.org/project/task/screenshot/6151897aba71230001413515.png",
          statisList,
        },
      ],
      loading: false,
    };
  },
  methods: {
    onStop() {},
    getDetailPath(it) {
      return `/hosting/project/${it.name}/${it.id}`;
    },
    onItem(it) {
      if (!this.limit) return;
      const path = this.getDetailPath(it);
      this.$router.push(path);
    },
  },
  mounted() {
    this.loading = true;
    this.list = [];
    setTimeout(() => {
      this.loading = false;
    }, 1e3);
  },
};
</script>