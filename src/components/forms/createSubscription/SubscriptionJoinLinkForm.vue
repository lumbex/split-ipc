<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
        <!--        <p>Up Next: <span>Address</span></p>-->
      </div>
    </div>

    <div class="app-form">
      <p class="page-title">
        Add your
        {{ currentSubscriptionServiceData.name | firstCaseCapital }} invite link
      </p>
      <p class="page-sub">
        New members use this link to join your subscription after making payment
      </p>

      <form action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group">
            <label for="pageInput">Invite Link</label>
            <input
              type="url"
              v-model="pageInput"
              v-on:change="isValidInput"
              required
              id="pageInput"
              :placeholder="inviteLinkPlaceholder"
            />
          </div>
          <!-- <p class="form-group-info">
            You can find this link in the "Manage Members" section of your
            Spotify account.
          </p> -->
          <p v-if="inputError.length > 0" class="form-group-error">
            {{ inputError }}
          </p>

          <div
            v-if="urlToGetInviteLink !== ''"
            class="flex justify-center mt-4 mb-4"
          >
            <a
              class="flex flex-row text-grey justify-center items-center rounded-lg bg-white text-sm py-1 pl-1 pr-2 fill-grey"
              @click="openUrlInBrowser(urlToGetInviteLink)"
            >
              <ArrowUpSmIcon /> Open
              {{ currentSubscriptionServiceData.name }} Web
            </a>
          </div>
        </div>

        <div class="space-filler"></div>

        <div class="app-form-base">
          <div class="custom-checkbox">
            <div class="indicator">
              <span><PadLockIcon /></span>
            </div>
            <div class="text-sm">
              Your data is safe and is only shared with members joining this
              subscription.
            </div>
          </div>

          <button
            type="submit"
            class="app-btn light-btn"
            :disabled="pageInput.length <= 0 || isValidInput() === false"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import PadLockIcon from "../../icons/PadLockIcon.vue";
import ArrowUpSmIcon from "../../icons/ArrowUpSmIcon.vue";

const isValidHttpUrl = string => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export default {
  name: "SubscriptionJoinLinkForm",
  components: { BackIcon, PadLockIcon, ArrowUpSmIcon },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checked: false,
      pageInput: "",
      inputError: ""
    };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    inviteLinkPlaceholder() {
      return `https://www.${this.currentSubscriptionServiceData.name.toLowerCase()}.com/…`;
    },
    urlToGetInviteLink() {
      let sampleUrl = "";

      if (
        this.currentSubscriptionServiceData.name.toLowerCase() === "spotify"
      ) {
        sampleUrl = "https://www.spotify.com/ph-en/account/family";
      }

      return sampleUrl;
    }
  },
  methods: {
    openUrlInBrowser(url) {
      const message = {
        messageAction: "open_url_in_browser",
        messageBody: JSON.stringify({ url: url })
      };
      StoreUtils.dispatch("ipc/postMessage", message);
    },
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    isValidInput() {
      const urlSubString = `www.${this.currentSubscriptionServiceData.name.toLowerCase()}.com`;

      if (
        isValidHttpUrl(this.pageInput) === true &&
        this.pageInput.includes(urlSubString) === true
      ) {
        this.inputError = "";
        return true;
      } else {
        this.inputError = `Invalid invite link. Make sure you're submitting the right link from your ${this.currentSubscriptionServiceData.name} account.`;
        return false;
      }
      // return !!emailAddress.match(regex);
    },
    submit() {
      if (this.isValidInput() === true) {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          invitationLink: this.pageInput
        });
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      } else {
        this.inputError = `Invalid invite link. Make sure you're submitting the right link from your ${this.currentSubscriptionServiceData.name} account.`;
      }
    }
  }
};
</script>

<style scoped></style>
