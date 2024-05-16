<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next"></div>
    </div>

    <div class="app-form">
      <p class="page-title text-3xl text-white mb-2">
        What’s your link?
      </p>
      <p class="page-sub">
        Kindly provide the
        <span class="text-white font-bold">Invitation Link</span> to your
        <span class="text-white font-bold">{{
          currentSubscriptionServiceData.name
        }}</span>
        subscription - make sure its accurate for smooth sailing.
        <!-- Make sure your number is available on <span class="text-white font-bold">WhatsApp</span> so members can easily reach you for access to this subscription -->
      </p>

      <form action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group">
            <div class="flex flex-row justify-start">
              <div class="input-wrap-hold w-[90%] flex-grow-1 flex-basis-0">
                <div class="">
                  <label class="" for="pageInput">Join Link</label>
                </div>

                <div class="flex flex-row items-center">
                  <input
                    type="text"
                    class="alt"
                    v-model="newJoinLink"
                    required
                    v-on:change="isValidInput"
                    id="pageInput"
                    :placeholder="inviteLinkPlaceholder"
                  />
                </div>
              </div>

              <div @click="pasteJoinLink" class="input-action ">
                PASTE<span></span>
              </div>
            </div>
          </div>

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
          <div class="form-info-box">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1714034423/splitcash/images/Shield_ydygge.png"
              alt="more info"
            />
            <p>
              Your data is completely safe and only shared with active members
              of your subscription
            </p>
          </div>

          <button
            type="submit"
            class="app-btn light-btn"
            :disabled="inputError !== ''"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import AppUtils from "@/utils/baseUtils/AppUtils";

import BackIcon from "@/components/icons/BackIcon";
import ArrowUpSmIcon from "@/components/icons/ArrowUpSmIcon.vue";

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
  name: "ChangeJoinLinkForm",
  components: {
    BackIcon,
    ArrowUpSmIcon
  },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checked: false,
      newJoinLink: "",
      inputError: ""
    };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
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
    async pasteJoinLink() {
      const textFromClipboard = await AppUtils.grabTextFromClipboard();

      this.newJoinLink += textFromClipboard;
      this.isValidInput;
    },
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    isValidInput() {
      const urlSubString = `www.${this.currentSubscriptionServiceData.name.toLowerCase()}.com`;

      const condition = isValidHttpUrl(this.newJoinLink);
      const condition2 = this.newJoinLink.includes(urlSubString);

      if (condition && condition2) {
        this.inputError = "";
        return true;
      } else {
        this.inputError = `Invalid invite link. Make sure you're submitting the right link from your ${this.currentSubscriptionServiceData.name} account.`;
        return false;
      }
      // return !!emailAddress.match(regex);
    },

    submit() {
      if (this.inputError === "") {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          newJoinLink: this.newJoinLink
        });

        StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
      }
    }
  }
};
</script>

<style scoped>
.input-action {
  display: flex;
  padding: 18px 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background: #4e4e52;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  margin-top: -10px;
  margin-right: -15px;
  color: #ffffff;
}
</style>
