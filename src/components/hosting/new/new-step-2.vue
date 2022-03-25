<template>
  <div>
    <div class="main-wrap">
      <h3>Deploy</h3>
      <div class="d-flex al-c">
        <v-progress-circular
          :size="15"
          :width="1.5"
          color="#999"
          indeterminate
        />
        <div class="gray fz-15 ml-3">
          Deployment started <e-time>{{ Date.now() }}</e-time>
        </div>
      </div>

      <e-toggle-card class="mt-5" title="Building" :value="cardOpen(0)">
        <build-log :logs="logs" />
      </e-toggle-card>
      <e-toggle-card class="mt-5" title="Syncing to IPFS" :value="cardOpen(1)">
        <e-label-val label="IPFS Hash">Pending</e-label-val>
      </e-toggle-card>
      <e-toggle-card
        class="mt-5"
        title="Assigning Domains"
        :value="cardOpen(2)"
      >
        <div>hhh</div>
      </e-toggle-card>
    </div>
    <div class="ta-r mt-4">
      <v-btn rounded outlined @click="onCancel">Cancel</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curIdx: 0,
      logs: [
        {
          timestamp: Date.now(),
          content: "test1",
        },
        {
          timestamp: Date.now(),
          content: "test1",
        },
        {
          timestamp: Date.now(),
          content: "test1",
        },
        {
          timestamp: Date.now(),
          content: "test1",
        },
        {
          timestamp: Date.now(),
          content: "test1",
        },
        {
          timestamp: Date.now(),
          content: "test1 9923 ddd ddd sss dddd sss ddd",
        },
      ],
    };
  },
  methods: {
    cardOpen(i) {
      return i > -1 && i <= this.curIdx;
    },
    onCancel() {
      this.$confirm("", "Are you sure to quit this deployment ?").then(() => {
        this.$router.replace("/hosting/projects");
      });
    },
  },
};
</script>