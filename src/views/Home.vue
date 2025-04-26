<template>
    <div class="container py-4">
        
        <div class="row mb-4">
            <div class="col-12 mb-2">
                <input
                    v-model="searchTerm"
                    type="text"
                    class="form-control w-100"
                    placeholder="Search cards..."
                />
            </div>

            <div class="col-12 col-sm-12 col-md-2">
                <button class="btn btn-sm btn-dark w-100" @click="openAddModal">
                    Add Card
                </button>
            </div>
        </div>

        <div class="table-responsive-sm">
            <table class="table table-striped table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>Question</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="card in cardsFound" :key="card.id">
                        <td class="col-10">{{ card.question }}</td>
                        <td class="col-2">
                            <div class="row justify-content-center">
                                <div class="col-12 col-sm-12 col-md-6 mb-2">
                                    <button class="btn btn-sm btn-dark w-100" @click="openEditModal(card)">
                                        Edit
                                    </button>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 mb-2">
                                    <button class="btn btn-sm btn-danger w-100" @click="confirmDelete(card.id)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  
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
                        <div class="mb-3">
                            <div class="form-floating">
                                <textarea v-model="currentCard.question" placeholder=" " class="form-control w-100" id="question"></textarea>
                                <label for="floatingTextarea">Question</label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-floating">
                                <textarea v-model="currentCard.answer" placeholder=" " class="form-control w-100" id="answer"></textarea>
                                <label for="floatingTextarea">Answer</label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-floating">
                                <textarea v-model="currentCard.examples" placeholder=" " class="form-control w-100" id="examples"></textarea>
                                <label for="floatingTextarea">Examples</label>
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