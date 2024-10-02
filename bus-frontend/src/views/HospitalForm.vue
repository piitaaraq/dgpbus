<template>
  <div class="hospital-form-container container">
    <div class="explanatory-text">
      <h2 class="title is-2">{{ $t("formular.heading") }}</h2>
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
            <textarea class="textarea" v-model="form.description"></textarea>
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

export default {
  props: ['id'],
  data() {
    return {
      hospitalName: '',
      form: {
        name: '',
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
  },
  methods: {
    async fetchHospitalDetails() {
      try {
        const response = await axios.get(`http://localhost:8000/api/hospitals/${this.id}`);
        this.hospitalName = response.data.hospital_name; // Store hospital_name
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    },

    async goToConfirmation() {
      const formStore = useFormStore();  // Access the Pinia store

      console.log('Hospital ID:', this.id);  // Confirm the hospital ID is correct

      // Only calculate bus time for hospitals 1 and 8
      if ([1, 8].includes(Number(this.form.hospital))) {
        try {
          // Make the POST request to calculate the bus time
          const response = await axios.post('http://localhost:8000/api/patients/calculate_bus_time/', this.form);
          const busTime = response.data.bus_time;

          // Set form data and busTime in the store
          formStore.setFormData({ ...this.form, busTime: busTime || null });
          console.log('FormData stored in Pinia:', formStore.formData);
        } catch (error) {
          console.error('Error calculating bus time:', error);
          alert('An error occurred while calculating the bus time. Please try again.');
        }
      } else {
        // No bus time for other hospitals
        formStore.setFormData(this.form);
        console.log('FormData stored in Pinia (no bus time):', formStore.formData);
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
  padding: 20px;
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
