<template>
  <div>
    <div class="d-flex al-c mt-3">
      <img src="img/icon/nav-folder.svg" height="14" class="mr-2" />
      <v-breadcrumbs :items="navItems" class="pl-0">
        <template v-slot:divider>
          <v-icon size="20" color="#aaa">mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>

    <v-card outlined>
      <div class="pd-15-20">
        <span>File Info</span>
      </div>
      <div class="pd-15-20 bdt-1">
        <v-skeleton-loader
          v-if="loading"
          type="article"
          max-width="500"
        ></v-skeleton-loader>
        <div v-else-if="!info">
          <span class="gray">Not Found</span>
        </div>
        <ul class="ls-none" v-else>
          <li
            class="mt-2 mb-2 fz-14 d-flex"
            v-for="(it, i) in infoList"
            :key="i"
          >
            <span class="d-ib pa-1" style="min-width: 130px"
              >{{ it.label }}:</span
            >
            <div v-if="it.name == 'ipfs'">
              <v-btn
                rounded
                text
                small
                target="_blank"
                :href="`https://${it.value}.ipfs.dweb.link`"
              >
                {{ it.value }}
              </v-btn>
              <v-btn icon small v-clipboard="it.value" @success="onCopied">
                <v-icon size="15" class="ml-auto">mdi-content-copy</v-icon>
              </v-btn>
            </div>
            <div v-else-if="it.name == 'url'">
              <p v-for="(link, j) in it.value" :key="j">
                <v-btn
                  rounded
                  text
                  small
                  color="primary"
                  :href="link"
                  target="_blank"
                >
                  {{ link }}
                </v-btn>
                <v-btn
                  icon
                  small
                  v-clipboard="link.encode()"
                  @success="onCopied"
                >
                  <v-icon size="15" class="ml-auto">mdi-content-copy</v-icon>
                </v-btn>
              </p>
            </div>
            <span v-else class="gray pa-1 ml-2">{{ it.value }}</span>
          </li>
        </ul>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: null,
      loading: true,
    };
  },
  computed: {
    navItems() {
      let { name, id } = this.$route.params;
      if (this.info) {
        name = this.info.name;
      }
      return [
        {
          text: "AR History",
          to: "/ar-history",
          exact: true,
        },
        {
          text: name,
          to: `/ar-file/${name}/${id}`,
        },
      ];
    },
    infoList() {
      const info = this.info;
      if (!info) return [];
      return [
        {
          label: "Name",
          value: this.fileName,
        },
        {
          label: "Size",
          value: this.$utils.getFileSize(info.size),
        },
        {
          label: "Last Modified",
          value: new Date(info.lastModified).format(),
        },
        {
          label: "IPFS Hash",
          name: "ipfs",
          value: info.cid,
        },
        // {
        //   label: "Object URL",
        //   name: "url",
        //   value: this.fileUrls,
        // },
      ];
    },
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        this.loading = true;
        const { id } = this.$route.params;
        const { data } = await this.$http.get(`/arweave/objects/${id}`);
        this.info = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>