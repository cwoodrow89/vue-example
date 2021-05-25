<template>
  <main class="Search-Container">
    <div
      v-for="job in remote.results"
      :key="job.id"
    >
      <job-item :item="job" />
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import JobItem from './job-item';

export default {
  name: 'SearchPage',

  components: {
    JobItem,
  },

  data() {
    return {
      remote: {
        results: [],
      },
      config: {
        getResultsUrl: '/api/search/jobs',
      },
      ui: {
        loading: true,
      },
    };
  },

  mounted() {
    this.getResults();
  },

  methods: {
    getResults() {
      axios.get(this.config.getResultsUrl).then((response) => {
        this.remote.results = response.data;
      });
    },
  },
};
</script>

<style scoped type="text/scss" lang="scss">
  .Search-Container {
    max-width: 700px;
    margin: auto;
    padding: 0 15px;
    width: 90%;
  }

</style>
