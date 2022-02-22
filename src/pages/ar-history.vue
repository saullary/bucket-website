<template>
  <div>
    <div class="d-flex al-c mt-3">
      <img src="img/icon/nav-folder.svg" height="14" class="mr-2" />
      <v-breadcrumbs :items="navItems" class="pl-0">
        <template v-slot:divider>
          <v-icon size="20" color="#aaa">mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <div class="d-flex ml-auto shrink-0">
        <nav-item icon="ic-sync" unit="MB">0</nav-item>
        <nav-item icon="ic-synced" unit="MB" class="ml-7">0</nav-item>
        <nav-item unit="Objects" class="ml-7">{{ total }}</nav-item>
      </div>
    </div>

    <v-data-table
      class="hide-bdb"
      :headers="headers"
      :items="list"
      :loading="tableLoading"
      v-model="selected"
      :show-select="list.length > 0"
      item-key="name"
      no-data-text=""
      loading-text=""
      checkbox-color="#0F8DFF"
      hide-default-footer
      disable-pagination
      @click:row="onRow"
    >
      <template v-slot:item.arweaveHash="{ item }">
        <v-btn
          color="primary"
          rounded
          x-small
          text
          target="_blank"
          v-if="item.arweaveHash"
          @click.stop="onStop"
          :href="`https://${item.arweaveHash}.ipfs.dweb.link`"
        >
          <span class="d-ib line-1" style="width: 160px">
            {{ item.arweaveHash }}
          </span>
        </v-btn>
        <v-btn
          v-if="item.arweaveHash"
          icon
          small
          @click.stop="onStop"
          v-clipboard="item.arweaveHash"
          @success="$toast('Copied to clipboard !')"
        >
          <!-- <v-icon size="14" color="primary">mdi-content-copy</v-icon> -->
          <img src="img/icon/copy1.svg" width="11" />
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "key" },
        { text: "Size", value: "size" },
        { text: "AR Hash", value: "arweaveHash" },
        { text: "Last Modified", value: "LastModified" },
        { text: "AR Status", value: "arweaveStatus" },
      ],
      list: [],
      total: 0,
      tableLoading: false,
      selected: [],
    };
  },
  computed: {
    navItems() {
      return [
        {
          text: "AR History",
          to: "/ar-history",
          exact: true,
        },
      ];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        this.tableLoading = true;
        const { data } = await this.$http.get(
          "https://yapi.foreverland.xyz/mock/81/arweave/history"
        );
        this.list = data.list;
        this.total = data.page.total;
        console.log(this.list);
      } catch (error) {
        console.log(error);
      }
      this.tableLoading = false;
    },
    onRow(it) {
      console.log(it);
    },
  },
};
</script>