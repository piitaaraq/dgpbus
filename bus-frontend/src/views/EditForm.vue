<template>
  <div class="edit-form-container container">
    <h2 class="title is-4">Immersukkatit iluarsikkit</h2>
    <form @submit.prevent="submitEditForm">
      <div class="field">
        <label class="label">Atit</label>
        <div class="control">
          <input class="input" type="text" v-model="form.name" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Inivit normua</label>
        <div class="control">
          <input class="input" type="text" v-model="form.room" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Nakorsiarfissavit ullua</label>
        <div class="control">
          <input class="input" type="date" v-model="form.appointment_date" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Piffissaq</label>
        <div class="control">
          <input class="input" type="time" v-model="form.appointment_time" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Napparsimmavimmi immikkoortoq</label>
        <div class="control">
          <input class="input" type="text" v-model="form.department" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Nutserisumik pisariaqartitsivit?</label>
        <div class="control">
          <label class="radio">
            <input type="radio" v-model="form.needs_translator" :value="true" /> Aap 
          </label>
          <label class="radio">
            <input type="radio" v-model="form.needs_translator" :value="false" /> Naamik
          </label>
        </div>
      </div>

      <div class="field is-grouped mt-4">
        <div class="control">
          <button class="button is-primary" type="submit">Allannguutit nassiutikkit</button>
        </div>
        <div class="control">
          <button class="button is-light" type="button" @click="goBack">Allanngortinnagit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['userId'],  // Accept the userId as a prop
  data() {
    return {
      form: {
        name: '',
        room: '',
        appointment_date: '',
        appointment_time: '',
        department: '',
        needs_translator: false
      }
    };
  },
  mounted() {
    this.fetchUserData();  // Fetch the existing user data when the component is mounted
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${this.userId}/`);
        this.form = response.data;  // Populate the form with the existing user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async submitEditForm() {
      try {
        // Send the edited data to the backend
        const response = await axios.put(`http://localhost:8000/api/users/${this.userId}/`, this.form);

        if (response.status === 200) {
          this.$router.push({ name: 'ConfirmForm', params: { userId: this.userId } });
        }
      } catch (error) {
        console.error('Error submitting edit form:', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'ConfirmForm', params: { userId: this.userId } });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
