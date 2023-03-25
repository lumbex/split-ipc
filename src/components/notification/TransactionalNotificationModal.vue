<template>
  <div class="notification-modal">
    <vodal
      :show="notification.showTransactionalNotificationModal"
      :height="450"
      :width="400"
      animation="zoom"
      @hide="closeNotificationModal"
    >
      <div class="notification-modal-inner">
        <div class="transactional-notification">
<!--          <p class="title class">-->
<!--            {{ notification.transactionalNotificationModalBody }}-->
<!--          </p>-->
          <p class="title class">
            {{ notification.transactionalNotificationModalBody.title }}
          </p>

          <p class="icon">
            <span
              v-if="
                notification.transactionalNotificationModalBody.iconType ===
                  'balance-enquiry'
              "
              class="avatar"
            >
              {{
                notification.transactionalNotificationModalBody
                .transactionObject.accountName | getInitials
              }}
            </span>
            <span
              v-if="
                notification.transactionalNotificationModalBody.iconType ===
                  'transaction-successful'
              "
            >
              <svg
                viewBox="0 0 505 505"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M252.06 504.12C391.269 504.12 504.12 391.269 504.12 252.06C504.12 112.851 391.269 0 252.06 0C112.851 0 0 112.851 0 252.06C0 391.269 112.851 504.12 252.06 504.12Z"
                  fill="#3DB39E"
                />
                <path
                  d="M463.163 114.609L240.246 345.403L240.64 370.215H250.88L492.308 175.655C485.218 153.994 475.372 133.12 463.163 114.609Z"
                  fill="#37A18E"
                />
                <path
                  d="M499.397 103.582L454.892 59.471C448.984 53.563 439.138 53.563 432.837 59.471L242.609 256L160.295 174.868C154.387 168.96 144.541 168.96 138.24 174.868L98.8551 213.859C92.9471 219.767 92.9471 229.613 98.8551 235.521L230.4 365.883C233.945 369.428 238.671 370.609 243.397 370.215C248.123 370.609 252.849 369.427 256.394 365.883L499.397 125.637C505.305 119.335 505.305 109.489 499.397 103.582Z"
                  fill="#F2F1EF"
                />
                <path
                  d="M256.394 365.883L499.397 125.637C505.305 119.729 505.305 109.883 499.397 103.975L492.308 97.28L243.003 342.252L105.157 207.951L99.2491 213.859C93.3411 219.767 93.3411 229.613 99.2491 235.521L230.794 365.884C234.339 369.429 239.065 370.61 243.791 370.216C248.123 370.609 252.849 369.428 256.394 365.883Z"
                  fill="#E6E5E3"
                />
              </svg>
            </span>
          </p>

          <div
            v-if="
              notification.transactionalNotificationModalBody.iconType ===
                'balance-enquiry'
            "
            class="transaction-info"
          >
            <div class="info-card">
              <div class="row">
                <div class="col-4">
                  <span class="title">Name</span>
                </div>
                <div class="col-8">
                  <span class="value">
                    {{
                      notification.transactionalNotificationModalBody
                        .transactionObject.accountName | firstCaseCapitalSpace
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <div class="row">
                <div class="col-4">
                  <span class="title">BVN</span>
                </div>
                <div class="col-8">
                  <span class="value">
                    {{
                      notification.transactionalNotificationModalBody
                        .transactionObject.bvn
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <div class="row">
                <div class="col-4">
                  <span class="title">Phone No.</span>
                </div>
                <div class="col-8">
                  <span class="value">
                    {{
                      notification.transactionalNotificationModalBody
                        .transactionObject.accountCustomerPhone
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <div class="row">
                <div class="col-4">
                  <span class="title">Balance</span>
                </div>
                <div class="col-8">
                  <span class="value">
                    ₦{{
                      notification.transactionalNotificationModalBody
                        .transactionObject.accountBalance | newAmountFormatter
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <div class="row">
                <div class="col-4">
                  <span class="title">Ledger Balance</span>
                </div>
                <div class="col-8">
                  <span class="value">
                    ₦{{
                      notification.transactionalNotificationModalBody
                        .transactionObject.accountLedgerBalance
                        | newAmountFormatter
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="
              notification.transactionalNotificationModalBody.iconType ===
                'transaction-successful'
            "
            class="transaction-info"
          >
            <div class="info-card">
              <div class="row">
                <div class="col-4">
                  <span class="title">Reference</span>
                </div>
                <div class="col-8">
                  <span class="value">
                    {{
                      notification.transactionalNotificationModalBody
                        .transactionObject.reference
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <div class="row">
                <div class="col-4">
                  <span class="title">CBA Ref</span>
                </div>
                <div class="col-8">
                  <span class="value">
                    {{
                      notification.transactionalNotificationModalBody
                        .transactionObject.cbaReference
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="notification-modal-actions">
          <p class="notification-modal-action full text-center">
            <button
              @click="closeNotificationModal"
              class="btn btn-primary btn-tragedy only"
            >
              close
            </button>
          </p>
        </div>
      </div>
    </vodal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NotificationUtils from "@/utils/BaseUtils/NotificationUtils";

export default {
  name: "TransactionalNotificationModal",
  computed: {
    ...mapState(["notification"])
  },
  methods: {
    closeNotificationModal() {
      this.notification.transactionalNotificationModalBody.closeAction();
      NotificationUtils.closeTransactionalNotificationModal();
    }
  }
};
</script>

<style scoped>
/*Notification Modal*/
.notification-modal {
}
.notification-modal.-notification-success {
  background-color: #d6f3e9;
  border: 1px solid #c6eee0;
  color: #1b654a;
}
.notification-modal.-notification-warning {
  color: #7d5e28;
  background-color: #fcf0db;
  border: 1px solid #fbeacd;
}
.notification-modal.-notification-error {
  color: #7f3737;
  background-color: #fde1e1;
}
.notification-modal .vodal-dialog {
  border-radius: 12px !important;
  padding: 0 !important;
}
.notification-modal .notification-modal-inner {
  padding: 20px;
}
.notification-modal .notification-modal-title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 20px;
}
.notification-modal .notification-modal-message {
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 25px;
}

.notification-modal .notification-modal-actions {
}
.notification-modal .notification-modal-action {
}
.notification-modal .notification-modal-action button {
}
.notification-modal .notification-modal-action button.only {
}
.notification-modal .notification-modal-action button.twin {
}
/*Notification Modal END*/
</style>
