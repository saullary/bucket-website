<template>
  <div class="ta-c mt-15">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  mounted() {
    this.onLogin();
  },
  methods: {
    async onLogin() {
      try {
        const params = {
          _auth: 1,
          redirect_url: location.origin,
          platform: "github",
        };
        if (localStorage.inviteBy) {
          params.inviteCode = localStorage.inviteBy;
        }
        const { data } = await this.$http.get("/login", {
          params,
        });
        location.href = data.login_url;
      } catch (error) {
        console.log(error);
        this.$alert(error.message).then(() => {
          location.href = "https://www.4everland.org/bucketlogin";
        });
      }
    },
  },
};
</script>
