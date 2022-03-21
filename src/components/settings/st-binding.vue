<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" v-for="(it, i) in list" :key="i">
        <div class="item bg-f8a pa-5 bd-1 bdrs-10">
          <div class="d-flex al-c">
            <img :src="`img/svg/settings/${it.icon}.svg`" height="30" />
            <b class="ml-3">{{ it.title }}</b>
          </div>
          <div class="mt-2 gray fz-14" style="min-height: 40px">
            {{ it.desc }}
          </div>
          <div class="mt-3 d-flex al-c">
            <v-btn color="primary" rounded small min-width="75">Verify</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "Github",
          desc: "Get verified by connecting your github account.",
          icon: "m-github",
        },
        {
          title: "MetaMask",
          desc: "Get verified by connecting your metamask account.",
          icon: "m-metamask",
        },
        {
          title: "Email",
          desc: "Verify your email address to receive updates and notices for your account.",
          icon: "m-email",
        },
      ],
    };
  },
};
</script>