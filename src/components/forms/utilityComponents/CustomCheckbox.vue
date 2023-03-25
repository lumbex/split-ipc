<template>
  <div @click="selected = !selected" class="custom-checkbox">
    <div class="question">
      I’ve read, understood and agree to the
      <a href="#">Rule of Use</a> and Apple Music’s <a href="#">Terms of Service</a>
    </div>
    <div class="indicator">
      <span><CheckedIcon /></span>
      <span><UncheckedIcon /></span>
    </div>
  </div>
</template>

<script>
import UncheckedIcon from "@/components/icons/UncheckedIcon";
import CheckedIcon from "@/components/icons/CheckedIcon";
export default {
  name: "CustomCheckbox",
  components: {CheckedIcon, UncheckedIcon},
  data () {
    return {
      selected: false
    }
  },
  methods: {
    toggleSelect(){

    }
  }
}
</script>

<style scoped>

</style>