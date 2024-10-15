<template>
  <div class="confirmation-form-container container px-3">
    <div class="explanatory-text py-2">
      <h3 class="title is-3 is-size-4-mobile">{{ $t("confirm.heading") }} </h3>
      <p class="is-size-4">
        {{ $t("confirm.para1") }}
      </p>
      <p class="is-size-4">
        {{ $t("confirm.para2") }}
      </p>
    </div>

    <!-- Greyed-out box showing user input -->
    <div class="form-section">
      <table class="table is-fullwidth">
        <tr>
          <th>{{ $t("confirm.name") }}</th>
          <td>{{ formData.name }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.phone") }}</th>
          <td>{{ formData.phone_no }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.accommodation") }}</th>
          <td>{{ formData.accommodation }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.room") }}</th>
          <td>{{ formData.room }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.appDate") }}</th>
          <td>{{ formData.appointment_date }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.appTime") }}</th>
          <td>{{ formData.appointment_time }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.department") }}</th>
          <td>{{ formData.department }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.desc") }}</th>
          <td>{{ formData.description }}</td>
        </tr>
        <tr>
          <th>{{ $t("confirm.translator") }}</th>
          <td>{{ formData.needs_translator ? 'Yes' : 'No' }}</td>
        </tr>
        <tr v-if="busTime">
          <th>{{ $t("confirm.bustime") }}</th>
          <td>{{ busTime }}</td>
        </tr>
      </table>

      <!-- Confirm and Go Back buttons -->
      <div class="field is-grouped mt-4">
        <div class="control">
          <button class="button is-primary" @click="submitUserData">{{ $t("confirm.confirm") }} </button>
          <!-- Button to accept entry -->
        </div>
        <div class="control">
          <button class="button is-light" @click="goBack">{{ $t("confirm.back") }} </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import { useFormStore } from '@/stores/formStore';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export default {
  setup() {
    const formStore = useFormStore();  // Access the form store
    const { formData } = formStore;    // Get formData from store
    const busTime = formData.busTime;  // Get busTime from formData

    return { formData, busTime };  // Return formData and busTime for template usage
  },
  methods: {
    async submitUserData() {
      try {

        // Submit formData to the backend via POST request
        await axios.post(`${apiUrl}/api/patients/`, this.formData);

        // On successful submission, navigate to the homepage or a success page
        this.$router.push({ name: 'HomePage' });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    goBack() {
      this.$router.go(-1);  // Navigate back to the form page
    }
  }
};
</script>


<style scoped>
.confirmation-form-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-section {
  flex: 1;
}

.table {
  max-width: 100%;
}
</style>
