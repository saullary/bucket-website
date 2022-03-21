<template>
  <div>
    <v-data-table
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
    <div class="ta-c mt-8">
      <template v-if="!list.length">
        <img
          :src="`img/svg/common/empty${tableLoading ? 1 : 2}.svg`"
          height="100"
        />
        <div class="mt-3 gray fz-15">
          {{ tableLoading ? `Loading buckets...` : `No buckets` }}
        </div>
        <div class="mt-8" v-if="!tableLoading">
          <v-btn color="primary" rounded :to="bucketPath + '?new=bucket'"
            >Create Now</v-btn
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