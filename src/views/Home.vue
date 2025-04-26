<template>
    <div class="container p-4">
      
        <div class="row mb-4">
            <div class="col-12 mb-2">
                <input v-model="searchTerm" type="text" class="form-control w-100" placeholder="Search cards..." />
            </div>
            <div class="col-12 col-md-2">
                <button class="btn btn-sm btn-dark w-100" @click="openAddModal">Add Card</button>
            </div>
        </div>
  
        <CardOverview :total="cardsFound.length" />
        <CardTable :cards="cardsFound" @edit="openEditModal" @delete="confirmDelete" />
        <CardFormModal :card="currentCard" :isEditing="isEditing" @submit="handleSubmit" />
    </div>
  </template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import cardAPI from '../api/cards.js';
  
import CardTable from '../components/CardTable.vue';
import CardFormModal from '../components/CardFormModal.vue';
import CardOverview from '../components/CardOverview.vue';
 
const searchTerm = ref('');
const cards = ref([]);
const cardModal = ref(null);
const isEditing = ref(false);
const currentCard = ref({
    id: null,
    question: '',
    answer: '',
    examples: ''
});

onMounted(() => {
    cardModal.value = new Modal(document.getElementById('cardModal'));
    searchCards();
});

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
        console.error('There was an error:', error);
    }
};

const openAddModal = () => {
    isEditing.value = false;
    currentCard.value = { id: null, question: '', answer: '', examples: '' };
    cardModal.value.show();
};

const openEditModal = (card) => {
    isEditing.value = true;
    currentCard.value = { ...card };
    cardModal.value.show();
};

const handleSubmit = async () => {
    try {
        if (isEditing.value) {
            await cardAPI.update(currentCard.value.id, currentCard.value);
        } else {
            await cardAPI.create(currentCard.value);
        }
    
        cardModal.value.hide();
        await searchCards();
    } catch (error) {
        console.error('Error saving card:', error);
    }
};

const confirmDelete = async (id) => {
    if (confirm('Are you sure you want to delete this card?')) {
        try {
            await cardAPI.delete(id);
            await searchCards();
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    }
};
</script>