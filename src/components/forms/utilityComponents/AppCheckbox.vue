<template>
    <div
            :class="wrapperClass"
            tabindex="0"
            role="checkbox"
            :aria-labelledby="`label-${id}`"
            :aria-checked="checked"
            @click="handleClick"
    >
        <span :class="iconClass">
            <SquareIcon v-if="!checked" />
            <CheckSquareIcon v-if="checked" />
        </span>
        <span :id="`label-${id}`" class="label">
            {{ label }}
        </span>
    </div>
</template>

<script >
  import CheckSquareIcon from "@/components/icons/CheckSquareIcon.vue";
  import SquareIcon from "@/components/icons/SquareIcon.vue";

  export default {
      name: "AppCheckbox",
      components: { CheckSquareIcon, SquareIcon },
      props: {
          value: {
              type: String,
              default: "",
          },
          label: {
              type: String,
              default: "",
          },
          checked: {
              type: Boolean,
              default: false,
          },
          id: {
              type: String,
              default: "",
          },
          disabled: {
              type: Boolean,
              default: false,
          },
      },
      computed: {
          wrapperClass() {
              const { checked } = this.$props;
              return {
                  "check-box": true,
                  "check-box--checked": checked,
              };
          },
          iconClass() {
              const { checked } = this.$props;
              return {
                  "check-box__icon": true,
                  "check-box__icon--checked": checked,
              };
          }
      },
      methods: {
          handleClick() {
              this.$emit('on-change', this.id);
          },
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