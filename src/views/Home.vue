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

        <div class="row mb-4">
            <div class="col-12 col-sm-12 col-md-3">
                <button class="btn-theme" @click="openAddModal">
                    Add Card
                </button>
            </div>
        </div>

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
                                <button class="btn-theme" @click="openEditModal(card)">Edit</button>
                            </div>
                            <div class="col-12 col-sm-12 col-md-6 mb-2">
                                <button class="btn-theme" @click="confirmDelete(card.id)">Delete</button>
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

    <!-- Modals -->
    <div class="modal fade" id="cardModal" tabindex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cardModalLabel">{{ isEditing ? 'Edit Card' : 'Add New Card' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-3 mt-3">
                            <div class="input-group">
                                <textarea v-model="currentCard.question" placeholder=" " id="question" class="w-100" rows="2" required></textarea>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label for="question" class="form-label">Question</label>
                            </div>
                        </div>
                        <div class="mb-3 mt-4">
                            <div class="input-group">
                                <textarea v-model="currentCard.answer" placeholder=" " id="answer" class="w-100" rows="2" required></textarea>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label for="answer" class="form-label">Answer</label>
                            </div>
                        </div>
                        <div class="mb-3 mt-4">
                            <div class="input-group">
                                <textarea v-model="currentCard.examples" placeholder=" " id="examples" class="w-100" rows="2" required></textarea>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label for="examples" class="form-label">Examples</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn-theme">{{ isEditing ? 'Update' : 'Save' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import cardAPI from '../api/cards.js';

const searchTerm = ref('');
const cards = ref([]);
const cardModal = ref(null);
const isEditing = ref(false);
const currentCard = ref({
    id: null,
    question: '',
    answer: ''
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
        console.error('There was an error: ', error);
    }
};

const openAddModal = () => {
    isEditing.value = false;
    currentCard.value = { id: null, question: '', answer: '' };
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