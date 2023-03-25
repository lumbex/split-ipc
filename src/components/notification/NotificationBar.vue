<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <div class="notification-icon">
      <CopyIcon />
    </div>
    <div class="notification-message">{{ notification.message }}</div>
    <span
      @click="removeNotification(notification)"
      class="notification-bar-close"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="M28.2 24L47.1 5.1c1.2-1.2 1.2-3.1 0-4.2 -1.2-1.2-3.1-1.2-4.2 0L24 19.7 5.1 0.9c-1.2-1.2-3.1-1.2-4.2 0 -1.2 1.2-1.2 3.1 0 4.2l18.9 18.9L0.9 42.9c-1.2 1.2-1.2 3.1 0 4.2C1.5 47.7 2.2 48 3 48s1.5-0.3 2.1-0.9l18.9-18.9L42.9 47.1c0.6 0.6 1.4 0.9 2.1 0.9s1.5-0.3 2.1-0.9c1.2-1.2 1.2-3.1 0-4.2L28.2 24z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CopyIcon from "@/components/icons/CopyIcon";

export default {
  components: { CopyIcon },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.removeNotificationSlide(this.notification),
      5000
    );
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationTypeClass() {
      return `-notification-${this.notification.type}`;
    }
  },
  methods: {
    ...mapActions("notification", ["removeNotificationSlide"]),
    removeNotification(_notification) {
      this.$store.dispatch(
        "notification/removeNotificationSlide",
        _notification,
        {
          root: true
        }
      );
    }
  }
};
</script>

<style scoped></style>
