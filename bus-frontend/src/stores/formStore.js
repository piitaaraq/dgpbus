// src/stores/formStore.js
import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    formData: {
      name: '',
      accommodation: '',
      room: '',
      appointment_date: '',
      appointment_time: '',
      department: '',
      description: '',
      needs_translator: false,
      busTime: null,  // Ensure busTime is initialized
      hospital: null, // Add hospital to store hospital ID

    },
  }),
  actions: {
    setFormData(data) {
      this.formData = data;
    },
    setBusTime(busTime) {
      this.formData.busTime = busTime;  // Update busTime in formData
    },
  },
});
