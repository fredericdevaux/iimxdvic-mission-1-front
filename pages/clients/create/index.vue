<template>
  <v-form
    ref="form"
    v-model="valid"
    enctype="multipart/form-data"
    class="register-form"
  >
    <v-text-field
      v-model="name"
      label="Nom du client"
      :rules="requiredRules"
      required
    />
    <v-file-input
      v-model="image"
      label="Image du client"
      accept="image/png, image/jpeg"
      hint="Uniquement des formats d'image (jpeg et png)"
      prepend-icon=""
      prepend-inner-icon="mdi-panorama"
      outlined
      :show-size="1000"
    />
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Créer
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CreateClient',
  data: () => ({
    valid: true,
    name: '',
    image: '',
    formError: '',
    requiredRules: [
      v => !!v || 'Ce champ est requis'
    ]
  }),
  methods: {
    ...mapActions({
      createClient: 'clients/createClient'
    }),
    async validate () {
      this.$refs.form.validate()
      try {
        await this.createClient({
          name: this.name,
          image: this.image
        })
        this.$router.push('/clients')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style scoped>

</style>
