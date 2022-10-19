Vue.component('ErrorComponent', {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    isVisible() {
      return this.text !== ''
    }
  },
  template:
    `<div class="error-wrapper" v-if="isVisible">
  <div class="error-close-btn" @click="text=''">+</div>
  <div class="error-content">
      Ошибка выполнения запроса
  </div>
</div>`

})