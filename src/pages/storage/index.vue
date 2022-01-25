<template>
  <div v-if="!s3">
    <v-skeleton-loader
      class="mt-2"
      type="article"
      max-width="500"
    ></v-skeleton-loader>
  </div>

  <div v-else>
    <storage-upload
      ref="upload"
      :info="pathInfo"
      @uploaded="getList"
    ></storage-upload>

    <div class="d-flex nowrap ov-a btn-wrap">
      <div v-show="inBucket">
        <v-btn color="primary" @click="addBucket">
          <!-- <v-icon size="15">mdi-folder-multiple-plus</v-icon> -->
          <img src="img/icon/add1.svg" width="12" />
          <span class="ml-2">New Bucket</span>
        </v-btn>
      </div>
      <div v-show="inFile">
        <v-btn
          color="primary"
          :href="fileUrl"
          target="_blank"
          :loading="!fileInfo"
          :download="fileName"
        >
          <!-- <v-icon size="15">mdi-cloud-download</v-icon> -->
          <img src="img/icon/download.svg" width="16" />
          <span class="ml-2">Download</span>
        </v-btn>
        <v-btn
          class="ml-5"
          outlined
          v-clipboard="fileUrl"
          @success="$toast('Copied to clipboard !')"
        >
          <!-- <v-icon size="15">mdi-content-copy</v-icon> -->
          <img src="img/icon/copy.svg" width="16" />
          <span class="ml-2">Copy Path</span>
        </v-btn>
        <e-menu offset-y open-on-hover>
          <v-btn slot="ref" class="ml-5" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-list dense>
            <v-list-item link @click="onRename(fileName)">
              <span>Rename</span>
            </v-list-item>
            <v-list-item link @click="onDelFile">
              <span class="red-1">Delete</span>
            </v-list-item>
          </v-list>
        </e-menu>
      </div>
      <div v-show="inFolder">
        <v-btn color="primary" @click="$refs.upload.showPop = true">
          <!-- <v-icon size="15">mdi-cloud-upload</v-icon> -->
          <img src="img/icon/upload.svg" width="16" />
          <span class="ml-2">Upload</span>
        </v-btn>
        <v-btn
          class="ml-5"
          outlined
          :disabled="folderLen >= 20"
          @click="addFolder"
        >
          <!-- <v-icon size="15">mdi-folder-plus-outline</v-icon> -->
          <img src="img/icon/add0.svg" width="12" />
          <span class="ml-2">New Folder</span>
        </v-btn>
      </div>

      <e-menu offset-y open-on-hover>
        <v-btn
          slot="ref"
          class="ml-5"
          outlined
          v-show="!inFile && selected.length"
        >
          <!-- <v-icon>mdi-dots-vertical</v-icon> -->
          <span>Actions</span>
          <v-icon size="18">mdi-chevron-down</v-icon>
        </v-btn>
        <v-list dense>
          <template v-if="selected.length == 1">
            <!-- <v-list-item :to="getPath(selected[0])"> Open </v-list-item> -->
            <template v-if="selected[0].isFile">
              <v-list-item :href="getViewUrl(selected[0])" target="_blank">
                Download
              </v-list-item>
              <v-list-item
                link
                v-clipboard="getViewUrl(selected[0])"
                @success="onCopied"
              >
                Copy Path
              </v-list-item>
              <v-list-item link @click="onRename(selected[0].name)">
                <span>Rename</span>
              </v-list-item>
            </template>
            <template v-else-if="inBucket">
              <v-list-item :to="`/domain?bucket=${selected[0].name}`">
                Add Domain
              </v-list-item>
            </template>
          </template>
          <v-list-item link @click="onDelete()">
            <span class="red-1">Delete</span>
          </v-list-item>
        </v-list>
      </e-menu>
      <!-- <v-btn
        @click="onDelete()"
        :loading="deleting"
        color="error"
        class="ml-5"
        min-width="36"
        v-show="!inFile && selected.length"
      >
        <v-icon size="18">mdi-trash-can-outline</v-icon>
      </v-btn> -->
    </div>

    <div class="d-flex al-c mt-3">
      <v-breadcrumbs :items="navItems" class="pl-0"></v-breadcrumbs>
      <div class="gray fz-14 ml-auto shrink-0" v-if="!inFile && !tableLoading">
        Total: {{ list.length }}
      </div>
    </div>

    <div v-if="inFile">
      <v-card outlined>
        <div class="pd-15-20">
          <span>File Info</span>
        </div>
        <div class="pd-15-20 bdt-1">
          <v-skeleton-loader
            v-if="fileLoading"
            type="article"
            max-width="500"
          ></v-skeleton-loader>
          <div v-else-if="!fileInfo">
            <span class="gray">Not Found</span>
          </div>
          <ul class="ls-none" v-else>
            <li
              class="mt-2 mb-2 fz-14 d-flex"
              v-for="(it, i) in fileInfoList"
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
                  <v-btn icon small v-clipboard="link" @success="onCopied">
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
    <div v-else>
      <v-data-table
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
        <!-- <template v-slot:item.data-table-select="row">
          <v-checkbox v-model="row.isSelected" @input="row.select"></v-checkbox>
        </template> -->
        <template v-slot:item.name="{ item }">
          <v-btn
            :color="inBucket ? 'primary' : '#000'"
            rounded
            text
            small
            @click.stop="onRow(item)"
          >
            <v-icon v-if="inFolder && !item.isFile" size="18" class="mr-2"
              >mdi-{{ inBucket ? "folder-multiple" : "folder" }}</v-icon
            >
            <b>{{ item.name.cutStr(10, 10) }}</b></v-btn
          >
          <v-btn
            icon
            small
            color="primary"
            v-if="item.isFile && originList.length"
            @click.stop="onStop"
            :href="getViewUrl(item)"
            target="_blank"
          >
            <v-icon size="14">mdi-eye-outline</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.domain="{ item }">
          <div v-if="item.domainInfo">
            <span>{{ item.domainInfo.domain.cutStr(10, 20) }}</span>

            <!-- <e-menu
              :open-on-hover="!asMobile"
              offset-y
              @input="onDomain(item.name, $event)"
            >
              <v-btn
                slot="ref"
                color="primary"
                text
                small
                :to="asMobile ? null : `/domain?bucket=${item.name}`"
              >
                <v-icon size="14">mdi-plus</v-icon>
                <span v-if="item.domainInfo.count > 1">
                  {{ item.domainInfo.count - 1 }}
                </span>
              </v-btn>
              <v-list dense>
                <v-list-item
                  link
                  :to="row.to"
                  v-for="(row, j) in item.domains"
                  :key="j"
                >
                  <v-list-item-title>
                    <v-icon v-if="row.icon" class="mr-1" size="16">{{
                      row.icon
                    }}</v-icon>
                    <span :class="row.valid ? 'color-suc' : ''">{{
                      row.name
                    }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </e-menu> -->
          </div>
        </template>
        <template v-slot:item.hash="{ item }">
          <v-btn
            rounded
            small
            text
            target="_blank"
            v-if="item.hash"
            @click.stop="onStop"
            :href="`https://${item.hash}.ipfs.dweb.link`"
          >
            {{ item.hash.cutStr(10, 10) }}
          </v-btn>
          <v-btn
            v-if="item.hash"
            icon
            small
            @click.stop="onStop"
            v-clipboard="item.hash"
            @success="$toast('Copied to clipboard !')"
          >
            <v-icon size="14" color="primary">mdi-content-copy</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.act="{ item }">
          <v-btn icon small color="error" @click="onDelete(item)">
            <v-icon size="16">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <div class="ta-c mt-8" v-if="!list.length">
        <img src="img/empty1.svg" width="80" />
        <div class="mt-3 gray fz-14">
          {{
            tableLoading
              ? `${inBucket ? "Loading buckets" : "Loading files"}...`
              : `${inBucket ? "No buckets" : "No folders or files found"}`
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      popUpload: false,
      fileLoading: false,
      fileInfo: null,
      domainsMap: {},
    };
  },
  computed: {
    asMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    headers() {
      if (this.inBucket)
        return [
          { text: "Bucket Name", value: "name" },
          { text: "Domain", value: "domain" },
          { text: "CreateAt", value: "createAt" },
          // { text: "Actions", value: "act" },
        ];
      return [
        { text: "Name", value: "name" },
        { text: "Size", value: "size" },
        { text: "IPFS Hash", value: "hash" },
        { text: "Last Modified", value: "updateAt" },
        // { text: "Actions", value: "act" },
      ];
    },
    fileInfoList() {
      const info = this.fileInfo;
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
          value: info.updateAt.format(),
        },
        {
          label: "IPFS Hash",
          name: "ipfs",
          value: info.hash,
        },
        {
          label: "Object URL",
          name: "url",
          value: this.fileUrls,
        },
      ];
    },
    originList() {
      const { Bucket } = this.pathInfo;
      let list = (this.domainsMap[Bucket] || [])
        .filter((it) => it.valid)
        .map((it) => it.name);
      const item = this.domainList.filter((it) => it.bucketName == Bucket)[0];
      if (item && !list.includes(item.domain)) list.push(item.domain);
      return list.map((domain) => {
        return (this.$inDev ? "http:" : "https:") + "//" + domain;
      });
    },
    fileUrls() {
      if (!this.fileInfo || !this.inFile) return [];
      const { Key } = this.pathInfo;
      const list = this.originList.map((origin) => {
        return origin + "/" + Key;
      });
      if (!list.length) list.push(this.fileInfo.url);
      return list;
    },
    fileUrl() {
      return this.fileUrls[0] || "";
    },
  },
  watch: {
    path() {
      if (!this.inStorage) return;
      // if (oldVal == this.BasePath) {
      //   const { Bucket } = this.pathInfo;
      //   console.log(Bucket);
      // }
      this.selected = [];
      this.folderList = [];
      this.getList();
      this.checkNew();
    },
    s3() {
      this.getList();
    },
    async bucketList(val) {
      if (!val.length) return;
      const { data } = await this.$http.get("/domains/stat");
      // console.log(data);
      if (data && data.stats) {
        this.domainList = data.stats;
        localStorage.domainList = JSON.stringify(this.domainList);
      }
    },
  },
  mounted() {
    this.getList();
    this.checkNew();
  },
  methods: {
    onCopied() {
      this.$toast("Copied to clipboard !");
    },
    async onDomain(bucketName, isOpen) {
      if (!isOpen || this.loadingDomains) return;
      try {
        this.loadingDomains = true;
        const { data } = await this.$http.get("/domains", {
          params: { bucketName },
        });
        this.$set(
          this.domainsMap,
          bucketName,
          data.list.map((it) => {
            return {
              name: it.domain,
              valid: it.valid,
              to: "/domain/" + it.domain,
            };
          })
        );
      } catch (error) {
        //
      }
      this.loadingDomains = false;
    },
    async addFolder() {
      try {
        const { value: name } = await this.$prompt("", "New Folder", {
          icon: "mdi-folder-plus",
          hideIcon: true,
          inputAttrs: {
            label: "Folder Name",
            counter: true,
            maxlength: 60,
            trim: true,
            rules: [(v) => !!(v || "").trim() || "Invalid"],
            required: true,
          },
        });
        // this.$router.push(this.path + name + "/");
        const { Prefix } = this.pathInfo;
        this.tableLoading = true;
        await this.putObject(Prefix + name + "/");
        await this.getList();
        await this.$sleep(200);
        this.$toast(`${name} created successfully`);
      } catch (error) {
        console.log(error);
        if (error) this.$alert(error.message);
      }
      this.tableLoading = false;
    },
    async putObject(Key) {
      const { Bucket } = this.pathInfo;
      return new Promise((resolve, reject) => {
        this.s3.putObject(
          {
            Bucket,
            Key,
          },
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
    },
    async addBucket() {
      try {
        const msg1 = "Bucket names must be between 3 and 48 characters long.";
        const { value: Bucket } = await this.$prompt("", "New Bucket", {
          icon: "mdi-folder-multiple-plus",
          hideIcon: true,
          inputAttrs: {
            label: "Bucket Name",
            // placeholder: "",
            counter: true,
            maxlength: 48,
            trim: true,
            rules: [
              (v) => !!(v || "").trim() || msg1,
              (v) =>
                /^[a-z\d-.]+$/.test(v) ||
                "Bucket names can consist only of lowercase letters, numbers, dots (.), and hyphens (-).",
              (v) =>
                (/^[a-z\d]/.test(v) && /[a-z\d]$/.test(v)) ||
                "Bucket names must begin and end with a letter or number.",
              (v) =>
                !/--/.test(v) || "Continuous use of dash(-) is not allowed",
            ],
            required: true,
          },
        });
        if (Bucket.length < 3) return this.$alert(msg1);
        this.$loading();
        this.s3.createBucket(
          {
            Bucket,
          },
          async (err) => {
            if (err) return this.onErr(err);
            await this.$sleep(500);
            this.$loading.close();
            this.getBuckets();
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
