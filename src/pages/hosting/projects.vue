<template>
  <div>
    <v-expansion-panels v-model="curIdx" multiple>
      <v-expansion-panel class="mb-3" v-for="(it, i) in list" :key="i">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="4">
              <div class="d-flex al-c grow-0">
                <img :src="it.img" height="60" width="60" class="bdrs-8 bd-1" />
                <div class="ml-3">
                  <h3>{{ it.name }}</h3>
                </div>
              </div>
            </v-col>
            <v-col cols="4" class="d-flex al-c f-center"> state </v-col>
            <v-col class="d-flex al-c">
              <v-btn
                :to="`/hosting/project/${it.name}/${it.id}`"
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
          <div>0</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curIdx: [],
      list: [
        {
          name: "doge-1",
          id: 1,
          img: "http://tt0.bucket.foreverland.xyz/screenshot.png",
        },
        {
          name: "doge-2",
          id: 2,
          img: "https://api.4everland.org/project/task/screenshot/6151897aba71230001413515.png",
        },
      ],
    };
  },
  methods: {
    onStop() {},
  },
};
</script>