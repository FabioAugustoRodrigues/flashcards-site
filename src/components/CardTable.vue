<template>
    <div class="table-responsive-sm">
        <table class="table table-striped table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Question</th>
                    <th>Class.</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="card in cards" :key="card.id">
                    <td class="col-9">{{ card.question }}</td>
                    <td class="col-1">
                        <span v-if="card.classification === 3" class="w-100 badge bg-success">Easy</span>
                        <span v-else-if="card.classification === 2" class="w-100 badge bg-warning">Medium</span>
                        <span v-else class="w-100 badge bg-danger">Hard</span>
                    </td>
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