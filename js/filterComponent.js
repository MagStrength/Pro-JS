Vue.component("filter-component", {
    props: [],
    template:
        `<form action="#" class="search-form" @submit.prevent="$root.filter">
          <input type="text" class="filtered" v-model="$root.userSearch">
          <button type="submit" class="btn-search">
              <i class="fas fa-search"></i>
          </button>
      </form>`,
});