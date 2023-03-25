<template>
  <div class="app-layout">
    <div class="side-view">
      <p class="title">Join Forces with your Friends 🤝 Split Payments 💸</p>
      <div class="split-ad">
        <img
          src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1659629976/splitcash/images/split-gex-ad_dsiuwm.png"
          alt="SplitCash Ad"
        />
      </div>
      <div class="plug">
        <img
          src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1659629975/splitcash/images/get-the-app_lsyz8v.png"
          alt="Download SplitCash"
        />
        <a href="https://justsplit.cash">Visit our website 😉</a>
      </div>
    </div>
    <div class="main-view bg-spleet-gradient">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GradientLayout"
};
</script>

<style scoped></style>
