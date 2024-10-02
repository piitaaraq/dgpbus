<template>
  <div class="columns">
    <div class="confirmation-form-container container column is-8">
      <div class="explanatory-text">
        <h2 class="title is-2">{{ $t("confirm.heading") }} </h2>
        <p>
          {{ $t("confirm.para1") }}
        </p>
        <p>
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
          <tr>
            <th v-if="busTime">{{ $t("confirm.bustime") }}</th>
            <td>{{ busTime }}</td>
          </tr>
        </table>

        <!-- Confirm and Go Back buttons -->
        <div class="field is-grouped mt-4">
          <div class="control">
            <button class="button is-large is-primary" @click="submitUserData">{{ $t("confirm.confirm") }} </button>
            <!-- Button to accept entry -->
          </div>
          <div class="control">
            <button class="button is-large is-light" @click="goBack">{{ $t("confirm.back") }} </button>
          </div>
          <div class="control">
            <button class="button is-large is-danger" @click="editEntry">{{ $t("confirm.edit") }} </button>
            <!-- Edit button to delete and start over -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { useFormStore } from '@/stores/formStore';

export default {
  setup() {
    const formStore = useFormStore();  // Access the form store
    const { formData } = formStore;    // Get formData from store
    const busTime = formData.busTime;  // Get busTime from formData

    // Debugging: Log formData and busTime
    console.log('Form Data:', formData);
    console.log('Bus Time:', busTime);

    // For debugging purpose only: Make formStore globally accessible in browser console
    window.formStore = formStore;

    return { formData, busTime };  // Return formData and busTime for template usage
  },
  methods: {
    async submitUserData() {
      try {
        // Validate the formData and make sure it's complete
        console.log('Submitting user data:', this.formData);

        // Submit formData to the backend via POST request
        await axios.post('http://localhost:8000/api/patients/', this.formData);

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
  /* min-width: 300px; */
  padding: 20px;
}

.explanatory-text {
  /* flex: 1; */
  /* min-width: 300px; */
  margin: 20px 0 20px;
  font-size: 1.5rem;
}

.form-section {
  flex: 1;
}

.greyed-out-box {
  /* flex: 1; */
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(0, 165, 207, 0.5));
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 5px;
  font-size: 1.25rem;
}

.table {
  font-size: 1.5rem;
}
</style>
