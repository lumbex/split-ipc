<template>
  <ul class="breakdown-data-list divide-y divide-slate-100">

<!--      <li>formBody {{formBody}} </li>-->
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

      <li v-if="formBody.region">
      <article
        class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
      >
        <div class="data-box min-w-0 relative flex-auto">
          <span class="sr-only">Title</span>
          <h2 class="title font-semibold text-slate-900 truncate pr-20">
            Region
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  {{
                    formBody.region === "US"
                      ? `United States`
                      : formBody.region === "NG"
                      ? `Nigeria`
                      : formBody.region === "UK"
                      ? `United Kingdom`
                      : formBody.region === "CA"
                      ? `Canada`
                      : `Not Set`
                  }}
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
                  {{ formBody.billingDate }} monthly
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
                  {{ formBody.plan }}
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
            Price
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  <AppCurrencyReaderComponent :currency="formBody.slotPriceInputCurrency" />{{ formBody.slotPrice | moneyFormat }}/month
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
            Open slot(s)
          </h2>
          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div class="absolute top-0 right-0 flex items-center space-x-1">
              <dt class="text-sky-500">
                <span class="sr-only">Value</span>
                <span class="value-span bg-[#575244] rounded-md px-4">
                  {{ formBody.availableSlots }}
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
                      Total Settlement
                  </h2>
                  <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                      <div class="absolute top-0 right-0 flex items-center space-x-1">
                          <dt class="text-sky-500">
                              <span class="sr-only">Value</span>
                              <span class="value-span bg-[#575244] rounded-md px-4">
                                  <AppCurrencyReaderComponent :currency="formBody.slotPriceInputCurrency" />{{ formBody.totalSettlement | moneyFormat }}/month
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
import AppCurrencyReaderComponent from "@/components/forms/utilityComponents/AppCurrencyReaderComponent.vue";

export default {
  name: "ReviewBreakdownList",
    components: {AppCurrencyReaderComponent},
  // props: ["serviceTag", ],
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        },
        serviceTag: {
            type: String,
            defaults: "apple_music"
        }
    },
  computed: {
    formBody() {
        return StoreUtils.rootGetters("form/getFormBody");
    },
  }
};
</script>

<style scoped></style>
