<template>
  <div class="language-selection">
    <!-- <p id="qulequtaq" class="title is-2">Bussinik biliuttinnissamillu inniminniineq - bestilling af kørsel</p> -->
    <!-- Greenlandic language box -->
    <div class="box language-box is-primary" @click="selectKalaallisut">
      <p class="language-text">Kalaallisut</p>
    </div>

    <!-- Danish language box (Placeholder for now) -->
    <div class="box language-box placeholder">
      <p class="language-text">Dansk</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectKalaallisut() {
      // Redirect or proceed to the Greenlandic part of the app
      this.$router.push({ name: 'HospitalList' });  // Adjust the route name as needed
    },
  },
};
</script>

<style scoped>
/* Flexbox to center the boxes vertically and horizontally */
.language-selection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh-100px);
  /* Full viewport height */
}

/* Styling for the language boxes */
.language-box {
  width: 300px;
  /* Adjust the width as needed */
  cursor: pointer;
  margin-bottom: 20px;
  /* Space between boxes */
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease;
}

.language-box:hover {
  background-color: #00d1b2;
  /* Hover effect */
}

/* Styling for the large text */
.language-text {
  font-size: 2rem;
  font-weight: bold;
}

/* Placeholder style for the Danish box (if inactive) */
.placeholder {
  opacity: 0.5;
  /* Make it visually distinct */
  cursor: not-allowed;
}
</style>
