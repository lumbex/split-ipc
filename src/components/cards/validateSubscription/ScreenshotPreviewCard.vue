<template>

    <div v-if="isFullscreen"  class="screenshot-preview fullscreen">
        <div class="mark">
            <p class="title">The Screenshot should be something like this</p>
        </div>
        
        <div class="visual">
            <div class="image-wrap">
                <img
                    :src="imageUrl"
                    alt="Sample Screenshot" />
            </div>

            <div @click="toggleFullscreen" class="icon">
                <CloseIcon />
            </div>
        </div>
    </div>

    <div v-else @click="toggleFullscreen" class="screenshot-preview">
        <div class="mark">
            <p class="title">Check Sample screenshot</p>
        </div>

        <div class="visual">
            <div class="image-wrap">
                <img
                    :src="imageUrl"
                    alt="Sample Screenshot" />
            </div>

            <div class="icon">
                <AnchorRightIcon />
            </div>
        </div>
    </div>
</template>

<script>
import AnchorRightIcon from "@/components/icons/AnchorRightIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
    name: "ScreenshotPreviewCard",
    components: {CloseIcon, AnchorRightIcon },
    props: {
        imageUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isFullscreen: false,
        }
    },
    methods: {
        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen
        }
    }
}
</script>

<style scoped>

</style>