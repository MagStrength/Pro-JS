Vue.component('FilterComponent', {
    data() {
        return {
            userSearch: ''
        }
    },
    template:
        `<form action="#" class="search-form" @submit.prevent="$root.filter">
          <input type="text" class="filtered" v-model="$root.userSearch">
          <button type="submit" class="btn-search">
              <i class="fas fa-search"></i>
          </button>
      </form>`,
});