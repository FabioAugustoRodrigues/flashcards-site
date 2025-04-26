<template>
    <div class="table-responsive-sm">
        <table class="table table-striped table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Question</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="card in cards" :key="card.id">
                    <td class="col-10">{{ card.question }}</td>
                    <td class="col-2">
                        <div class="row justify-content-center">
                            <div class="col-12 col-md-6 mb-2">
                                <button class="btn btn-sm btn-dark w-100" @click="$emit('edit', card)">
                                    Edit
                                </button>
                            </div>
                            <div class="col-12 col-md-6 mb-2">
                                <button class="btn btn-sm btn-danger w-100" @click="$emit('delete', card.id)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
  
        <div v-if="cards.length === 0" class="text-muted">
            No card found.
        </div>
    </div>
</template>
  
<script setup>
defineProps(['cards']);
defineEmits(['edit', 'delete']);
</script>  