<template>
    <div class="checkbox-group-wrapper">
        <AppCheckbox
            v-for="item in itemsDataRef"
            :id="item.id"
            :key="item.id"
            :label="item.label"
            :value="item.value"
            :checked="item.checked"
            @on-change="handleOnChange"
        />
    </div>
</template>

<script>
import {nanoid} from "nanoid";
import AppCheckbox from "./AppCheckbox.vue";

export default {
    name: "AppCheckboxGroup",
    components: {AppCheckbox },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            itemsData: []
        }
    },
    computed: {
        itemsDataRef() {
            return this.itemsData
        },
    },
    created() {
        this.createItemsData()
    },
    methods: {
        createItemsData() {
            this.itemsData = this.items.map((item) => {
                return {
                    ...item,
                    id: nanoid(),
                };
            })
            this.$emit('on-change', this.itemsDataRef);

        },
        handleOnChange(id) {
            function updateItemData(arr, id) {
                return arr.map((item) => (item.id === id ? { ...item, ...{checked: !item.checked} } : item))
            }
            this.itemsData = updateItemData(this.itemsDataRef, id);
            this.$emit('on-change', this.itemsDataRef);
        },
    }
}
</script>



<style lang="css">
.checkbox-group-wrapper {
    padding: 0.5rem;
}
</style>
