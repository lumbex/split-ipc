<template>
  <div class="app-form-wrapper">
    <div class="top-nav"></div>
    <div class="app-form">
      <SubscriptionUpdateSuccessCard />
    </div>
  </div>
</template>

<script>
import SubscriptionUpdateSuccessCard from "@/components/cards/updateSubscriptionTerms/SubscriptionUpdateSuccessCard";

export default {
  name: "UpdateTermsSuccessForm",
  components: {
    SubscriptionUpdateSuccessCard
  },
  data() {
    return { checked: false };
  },
  props: ["serviceTag"],
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
