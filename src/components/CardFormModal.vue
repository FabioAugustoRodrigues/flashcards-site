<template>
    <div class="modal fade" id="cardModal" tabindex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ isEditing ? 'Edit Card' : 'Add New Card' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="$emit('submit')">
                        <div class="mb-3" v-for="(field, label) in fields" :key="label">
                            <div class="form-floating">
                                <textarea
                                    v-model="card[field]"
                                    class="form-control w-100"
                                    :id="field"
                                    placeholder=" "
                                ></textarea>
                                <label :for="field">{{ label }}</label>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success">{{ isEditing ? 'Update' : 'Save' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
const props = defineProps({
    card: Object,
    isEditing: Boolean,
});
  
defineEmits(['submit']);
  
const fields = {
    Question: 'question',
    Answer: 'answer',
    Examples: 'examples'
};
</script>
  