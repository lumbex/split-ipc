<template>
  <div class="blocking-loader">
    <div class="blocking-loader-wrap">
      <p class="page-loader">
        <img
          src="https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          alt="Loader"
        />
      </p>
      <p v-if="blockingLoaderData.title.length > 0" class="title">
        {{ blockingLoaderData.title }}
      </p>
      <p v-if="blockingLoaderData.sub.length > 0" class="sub">
        {{ blockingLoaderData.sub }}
      </p>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
  name: "BlockingLoader",
  computed: {
    blockingLoaderData() {
      return StoreUtils.rootGetters("loader/getBlockingLoaderData");
    }
  }
};
</script>

<style scoped></style>
