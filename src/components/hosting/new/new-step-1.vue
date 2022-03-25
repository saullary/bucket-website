<template>
  <div v-if="info" class="hide-msg">
    <div class="main-wrap">
      <h3>Github Repository</h3>
      <!-- <div class="gray fz-14">Import project from github repository.</div> -->
      <div class="d-flex al-c">
        <e-icon-link img="img/svg/hosting/m-github.svg" :link="info.cloneUrl">
          4everland/hosting-website
        </e-icon-link>
        <e-icon-link
          class="ml-6"
          img="img/svg/hosting/m-branch.svg"
          :link="info.cloneUrl.replace('.git', '/tree/' + form.currentBranch)"
        >
          {{ form.currentBranch }}
        </e-icon-link>
      </div>
    </div>
    <div class="main-wrap mt-5">
      <h3>Basic Configuration</h3>
      <v-row>
        <v-col cols="6" md="4">
          <h4>Project Name</h4>
          <v-text-field
            v-model="form.name"
            persistent-placeholder
            outlined
            dense
          />
        </v-col>
        <v-col cols="6" md="4">
          <h4>Branch</h4>
          <v-select
            v-model="form.currentBranch"
            :items="branchList"
            outlined
            dense
            :menu-props="{ offsetY: true }"
          >
          </v-select>
        </v-col>
        <v-col cols="6" md="4">
          <h4>Root Directory</h4>
          <e-menu offset-y>
            <v-text-field
              slot="ref"
              v-model="form.rootDirectory"
              outlined
              dense
            ></v-text-field>
            <div class="bg-white ov-a" style="max-height: 300px">
              <div class="pa-10 ta-c" v-if="!dirList.length">
                <v-progress-circular
                  :size="40"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <v-radio-group v-model="form.rootDirectory" v-else>
                <v-treeview
                  dense
                  :open="[srcDir]"
                  :load-children="getRepoDir"
                  :items="dirList"
                >
                  <template v-slot:prepend="{ item }">
                    <v-radio v-if="item.radio" :value="item.id"></v-radio>
                  </template>
                </v-treeview>
              </v-radio-group>
            </div>
          </e-menu>
        </v-col>
      </v-row>
    </div>
    <div class="main-wrap mt-5">
      <h3>Build Configuration</h3>
    </div>
    <div class="ta-r mt-4">
      <v-btn color="primary" rounded @click="onDeploy">Deploy</v-btn>
      <v-btn rounded outlined class="ml-6" @click="$emit('back')">Back</v-btn>
    </div>
  </div>
</template>

<script>
const srcDir = "./";

export default {
  props: {
    info: Object,
  },
  data() {
    return {
      dirList: [],
      srcDir,
      form: {
        name: "",
        currentBranch: "",
        rootDirectory: srcDir,
      },
      rootDirList: [],
      branchList: [],
    };
  },
  watch: {
    info() {
      this.onInit();
    },
    "form.currentBranch"(val) {
      if (this.dirBranch && val != this.dirBranch) {
        this.getRepoDir();
      }
    },
  },
  created() {
    this.onInit();
  },
  methods: {
    onInit() {
      const { name, defaultBranch = "" } = this.info;
      Object.assign(this.form, {
        name,
        currentBranch: defaultBranch,
        rootDirectory: srcDir,
      });
      this.branchList = defaultBranch ? [defaultBranch] : [];
      this.getBranchList();
      this.dirList = [];
    },
    onDeploy() {
      this.$emit("next");
    },
    async getBranchList() {
      try {
        const { data } = await this.$http2.get(
          "/project/branch/repo/" + this.info.id
        );
        this.branchList = data;
        this.form.currentBranch = data[0];
        this.getRepoDir();
      } catch (error) {
        console.log(error);
      }
    },
    async getRepoDir(item) {
      const params = {};
      if (item) {
        params.rootPath = item.id;
      } else {
        this.dirList = [];
      }
      this.dirBranch = params.ref = this.form.currentBranch;
      const { name, namespace } = this.info;
      let { data } = await this.$http2.get(
        `/repo/${namespace}/dir/${name}/ref`,
        {
          params,
        }
      );
      data = data
        .map((it) => {
          it.id = it.fullPath;
          if (it.type == "dir") {
            it.children = [];
            if (!item) it.radio = true;
          }
          return it;
        })
        .sort((a) => {
          return a.type == "dir" ? -1 : 1;
        });
      if (item) {
        item.children = data;
      } else {
        this.dirList = [
          {
            name,
            id: srcDir,
            type: "dir",
            radio: true,
            children: data,
          },
        ];
      }
    },
  },
};
</script>