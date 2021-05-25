<template>
  <div id="app">
    <header-layout />
    <search-page-layout />
    <sidebar />
    <notification />
  </div>
</template>

<script>
import SearchPageLayout from './components/search-page-layout';
import headerLayout from './components/header';
import Notification from './components/notification';
import Sidebar from './components/sidebar';

export default {
  name: 'App',
  components: {
    SearchPageLayout,
    headerLayout,
    Notification,
    Sidebar,
  },
};
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
