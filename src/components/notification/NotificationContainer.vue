<template>
  <div class="notification-container">
    <slide-x-right-transition group :duration="1200">
      <NotificationBar
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </slide-x-right-transition>

    <!--    Notification Modal-->
<!--    <NotificationModal />-->
<!--    <TransactionalNotificationModal />-->
  </div>
</template>

<script>
import NotificationBar from "./NotificationBar";
import { mapState } from "vuex";
import { SlideXRightTransition } from "vue2-transitions";
// import NotificationModal from "./NotificationModal";
// import TransactionalNotificationModal from "./TransactionalNotificationModal";

export default {
  name: "NotificationContainer",
  components: {
    // TransactionalNotificationModal,
    NotificationBar,
    SlideXRightTransition,
    // NotificationModal
  },
  computed: mapState("notification", ["notifications"])
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
}
</style>
