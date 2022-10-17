Vue.component('error', {
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
    `<div class="error-wrapper" v-show="errorFlag">
          <div class="error-close-btn" @click="$root.error=false">+</div>
          <div class="error-content">
              Ошибка выполнения запроса
          </div>
        </div>`
});