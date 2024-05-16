<template>
  <ul class="breakdown-data-list divide-y divide-slate-100">
    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Subscription
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  {{ currentSubscriptionServiceData.name }}
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>

    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Owner
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  You
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>

    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Members
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  ({{ createSubscriptionBody.activeMembers }}/{{
                    currentSubscriptionServiceData.max_capacity
                  }})
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>

    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Cost
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  ₦{{ spotifyNGPrice | moneyFormat }}/month
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>

    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Billed
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  {{ createSubscriptionBody.billingDate }} monthly
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>

    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Invite
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  {{ createSubscriptionBody.invitationLink }}
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>

    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Address
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  {{ createSubscriptionBody.address }}
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>

    <li>
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Plan
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  {{ createSubscriptionBody.plan }}
                </span>
              </dt>
            </div>
          </dl>
        </div>
      </article>
    </li>
  </ul>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
  name: "SpotifyReviewBreakdownList",
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  computed: {
    createSubscriptionBody() {
      return StoreUtils.rootGetters("subscription/getCreateSubscriptionBody");
    },
    spotifyNGPrice() {
      return StoreUtils.rootGetters("service/getSpotifyNGPrice");
    }
  }
};
</script>

<style scoped></style>
