<template>
    <div class="container py-4">
        
        <form @submit.prevent="searchCards" class="mb-4">
            <div class="row mb-2">
                <div class="col-12 col-sm-12 col-md-10 mb-2">
                    <div class="input-group">
                        <input
                            v-model="searchTerm"
                            type="text"
                            class="w-100"
                            required
                            placeholder=" "
                        />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label for="name">Card term</label>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-2 mb-2">
                    <button class="btn-theme w-100" type="submit">
                        Search
                    </button>
                </div>
            </div>

        </form>
        
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>Question</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="card in cardsFound" :key="card.id">
                    <td class="col-9">{{ card.question }}</td>
                    <td class="col-3">
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-12 col-md-6 mb-2">
                                <button class="btn-theme">Edit</button>
                            </div>
                            <div class="col-12 col-sm-12 col-md-6 mb-2">
                                <button class="btn-theme">Delete</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
  
        <div v-if="cardsFound.length === 0" class="text-muted">
            No card found.
        </div>
    </div>
  </template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import cardAPI from '../api/cards.js';
  
const searchTerm = ref('');
const cards = ref([]);
  
const cardsFound = computed(() => {
    if (!searchTerm.value.trim()) return cards.value;
        return cards.value.filter(card =>
        card.question.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});
  
const searchCards = async () => {
    try {
        const response = await cardAPI.getAll();
        cards.value = response.data.data;
    } catch (error) {
        console.error('There was an error: ', error);
    }
};
  
onMounted(() => {
    searchCards();
});
</script>  