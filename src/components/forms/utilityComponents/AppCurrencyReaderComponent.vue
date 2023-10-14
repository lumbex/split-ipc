<template>
    <span>
        <span v-if="currency === 'NGN'">₦</span>
        <span v-if="currency === 'USD'">$</span>
    </span>
</template>

<script >
  export default {
      name: "AppCurrencyReaderComponent",
      props: {
          currency: {
              type: String,
              default: "NGN",
          }
      }
  }
</script>

<style scoped lang="css">
    .check-box {
        align-items: center;
        border: 1px solid transparent;
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        padding: 0.5rem;
        user-select: none;
    }

    .label {
        padding-left: 0.5rem;
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.408px;
        color: #FFF;
    }

    .check-box__icon {
        display: block;
        height: 24px;
        width: 24px;
    }
    .check-box__icon svg {
        height: 24px;
        width: 24px;
        stroke: #FFFFFF;
    }
</style>