<template>
  <div>
    <v-data-table
      v-if="list.length || tableLoading"
      class="hide-bdb"
      :headers="headers"
      :items="list.slice(0, 5)"
      :loading="tableLoading"
      item-key="name"
      no-data-text=""
      loading-text=""
      hide-default-footer
      disable-pagination
      @click:row="onItem"
    >
      <template v-slot:item.name="{ item }">
        <v-btn x-small text color="primary" rounded>
          <b>{{ item.name }}</b>
        </v-btn>
      </template>
    </v-data-table>
    <div class="ta-c" :class="tableLoading ? 'mt-8' : 'mt-15'">
      <template v-if="!list.length">
        <img
          :src="`img/svg/common/empty${tableLoading ? 1 : 2}.svg`"
          :height="tableLoading ? 100 : 130"
        />
        <div class="mt-5">
          <p class="fw-b mb-3 fz-18" v-if="!tableLoading">No buckets, Yet!</p>
          <p class="fz-15 gray">
            {{
              tableLoading
                ? `Loading buckets...`
                : `Create a bucket and store your files in IPFS.`
            }}
          </p>
        </div>
        <div class="mt-10" v-if="!tableLoading">
          <v-btn color="primary" rounded :to="bucketPath + '?new=bucket'"
            >Create a New Bucket</v-btn
          >
        </div>
      </template>
      <div v-else>
        <v-btn color="primary" rounded outlined :to="bucketPath"
          >View More</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../../pages/bucket/storage-mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      headers: [
        { text: "Bucket Name", value: "name" },
        { text: "Domain", value: "defDomain" },
        { text: "CreateAt", value: "createAt" },
      ],
      bucketPath: "/bucket/storage/",
    };
  },
  methods: {
    onItem(it) {
      console.log(it);
      this.$router.push(`${this.bucketPath}${it.name}/`);
    },
  },
};
</script>