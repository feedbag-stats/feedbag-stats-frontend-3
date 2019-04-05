<template>
  <b-container class="seperate main-container">

    <b-row>
      <b-col md="10" offset-md="1">

        <div v-if="error.statusCode === 404" class="text">
          <h1>Da bist du wohl an der falschen Adresse</h1>
          <p>
            Diese Seite gibt es nicht. :(
          </p>
        </div>
        <h1 v-else>Ein Fehler ist aufgetreten</h1>

        <nuxt-link to="/">
          <button class="btn dark">Startseite</button>
        </nuxt-link>

      </b-col>
    </b-row>

  </b-container>
</template>

<style scoped>
h1 {
  margin-bottom: 10px;
}
.text {
  margin-bottom: 80px;
}
</style>

<script>
export default {
  props: ["error"],
  layout: "default",
};
</script>
