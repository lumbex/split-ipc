<template>
  <div id="app">
    <NotificationContainer />
    <BlockingLoader v-show="isLoading" />
    <router-view></router-view>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BlockingLoader from "@/components/loaders/BlockingLoader";
import NotificationContainer from "@/components/notification/NotificationContainer";

export default {
  name: "App",
  components: { BlockingLoader, NotificationContainer },
  computed: {
    isLoading() {
      return StoreUtils.rootGetters("loader/getLoader", "blocking");
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
#app {
  color: rgba(235, 235, 245, 0.6);
}
</style>
