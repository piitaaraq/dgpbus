<template>
  <div class="hospital-form-container container px-3">
    <div class="explanatory-text mb-3">
      <h3 class="title is-3 is-size-4-mobile">{{ $t("formular.heading") }}</h3>
      <p class="is-size-4 content">
        {{ $t("hospitalform.para0", { hospital: hospitalName }) }}
      </p>
      <p class="is-size-4 content">
        {{ $t('hospitalform.para1') }}
      </p>
      <p class="is-size-4 content">
        {{ $t('hospitalform.para2') }}
      </p>
      <p class="is-size-4 content">
        {{ $t('hospitalform.para3') }}
      </p>
    </div>

    <div class="form-section">
      <form @submit.prevent="submitForm">
        <div class="field">
          <label class="label">{{ $t("formular.name") }}</label>
          <div class="control">
            <input class="input is-medium" type="text" v-model="form.name" required />
          </div>
        </div>

        <div class="field">
          <div class="field">
            <label class="label">{{ $t("formular.phone") }}</label>
            <div class="control">
              <input class="input is-medium" type="text" v-model="form.phone_no" required />
            </div>
          </div>

          <div class="field">
            <label class="label">{{ $t("formular.accommodation") }}</label>
            <div class="control">
              <div class="select is-medium">
                <select v-model="form.accommodation" required>
                  <option value="">{{ $t("formular.selectAccommodation") }}</option>
                  <option v-for="accommodation in accommodations" :key="accommodation.id" :value="accommodation.name">
                    {{ accommodation.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <label class="label">{{ $t("formular.room") }}</label>
          <div class="control">
            <input class="input is-medium" type="text" v-model="form.room" required />
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("formular.appDate") }}</label>
          <div class="control">
            <input class="input is-medium" type="date" v-model="form.appointment_date" required />
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("formular.appTime") }}</label>
          <div class="control">
            <input class="input is-medium" type="time" v-model="form.appointment_time" required />
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("formular.department") }}</label>
          <div class="control">
            <input class="input is-medium" type="text" v-model="form.department" required />
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("formular.desc") }}</label>
          <div class="control">
            <textarea class="textarea" v-model="form.description" required></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("formular.translator") }}</label>
          <div class="control">
            <label class="radio">
              <input type="radio" v-model="form.needs_translator" :value="true" />
              {{ $t("formular.radioY") }}
            </label>
            <label class="radio">
              <input type="radio" v-model="form.needs_translator" :value="false" />
              {{ $t("formular.radioN") }}
            </label>
          </div>
        </div>
        <div class="field is-grouped mt-4" style="display: flex; gap: 10px">
          <div class="control">
            <button class="button is-large is-primary" type="button" @click="goToConfirmation">
              {{ $t("formular.submit") }}
            </button>
          </div>
          <div class="control">
            <button class="button is-large is-light" type="button" @click="goBack">
              {{ $t("formular.back") }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useFormStore } from '@/stores/formStore';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export default {
  props: ['id'],
  data() {
    return {
      hospitalName: '',
      accommodations: [],  // Array to hold fetched accommodations
      form: {
        name: '',
        accommodation: '',  // Bind selected accommodation
        room: '',
        phone_no: '',
        appointment_date: '',
        appointment_time: '',
        department: '',
        description: '',
        needs_translator: false,
        hospital: this.id,  // Automatically associate the hospital ID
      }
    };
  },
  mounted() {
    this.fetchHospitalDetails(); // Fetch hospital details on mount
    this.fetchAccommodations(); // Fetch accommodations on mount in order to list them in the form
  },
  methods: {
    async fetchHospitalDetails() {
      try {
        const response = await axios.get(`${apiUrl}/api/hospitals/${this.id}`);
        this.hospitalName = response.data.hospital_name; // Store hospital_name
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    },
    async fetchAccommodations() {
      try {
        const response = await axios.get(`${apiUrl}/api/accommodations/`);
        this.accommodations = response.data;  // Store the fetched accommodations
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    },

    async goToConfirmation() {
      const formStore = useFormStore();  // Access the Pinia store

      // Find the accommodation by name and get its ID
      const selectedAccommodation = this.accommodations.find(acc => acc.name === this.form.accommodation);
      const formWithAccommodationId = {
        ...this.form,
        accommodation_id: selectedAccommodation ? selectedAccommodation.id : null  // Use accommodation_id
      };

      // Only calculate bus time for hospital 1 and when the accommodation is "Det grønlandske Patienthjem"
      if (Number(this.form.hospital) === 1 && this.form.accommodation === 'Det grønlandske Patienthjem') {
        try {
          // Make the POST request to calculate the bus time
          const response = await axios.post(`${apiUrl}/api/patients/calculate_bus_time/`, formWithAccommodationId);
          const busTime = response.data.bus_time;

          // Set form data and busTime in the store
          formStore.setFormData({ ...formWithAccommodationId, busTime: busTime || null });
        } catch (error) {
          console.error('Error calculating bus time:', error);
          alert('An error occurred while calculating the bus time. Please try again.');
        }
      } else {
        // No bus time calculation for other hospitals or accommodations
        formStore.setFormData(formWithAccommodationId);
      }

      // Navigate to the confirmation page
      this.$router.push({ name: 'ConfirmForm' });
    },

    goBack() {
      this.$router.push({ name: 'HospitalList' });
    },
  },
}
</script>

<style scoped>
/* Flexbox layout for wide screens */
.hospital-form-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.explanatory-text {
  flex: 1;
  margin-right: 40px;
  min-width: 300px;
}

.content {
  font-size: 1.5rem;
}

.label {
  font-size: 1.25rem;
}

.radio {
  font-size: 1.25rem;
}

.form-section {
  flex: 1;
  min-width: 300px;
}

@media (max-width: 768px) {

  /* Stack content vertically for small screens */
  .hospital-form-container {
    flex-direction: column;
  }

  .explanatory-text,
  .form-section {
    margin-right: 0;
  }
}

.radio {
  margin-right: 30px;
}
</style>
