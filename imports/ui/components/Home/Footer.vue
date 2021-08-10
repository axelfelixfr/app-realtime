<template>
  <v-footer padless>
    <v-col class="d-flex justify-center" cols="12">
      <strong
        >Made with 💖 by
        <a
          class="text-decoration-none mr-1"
          href="https://github.com/axelfelixfr"
          target="_blank"
          >@axelfelixfr
        </a></strong
      >— {{ new Date().getFullYear() }}
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
}
</style>