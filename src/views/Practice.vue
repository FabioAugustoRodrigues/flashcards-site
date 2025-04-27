<template>
    <div class="container py-3 text-center">
        <div class="p-4">
            <div v-if="completed">
                <div class="alert alert-success">
                    <strong>Congratulations!</strong> You have completed all flashcards.
                </div>
                <button @click="restart" class="btn btn-primary">Restart</button>
            </div>

            <div v-else-if="cards.length">
                <div class="p-5 shadow rounded">
                    <h3 class="mb-4">{{ cards[currentIndex].question }}</h3>

                    <div class="text-muted fw-bold mb-4 mt-2" style="min-height: 60px;">
                        <small v-if="showAnswer">{{ cards[currentIndex].answer }}</small>
                        <small v-else class="blurred-text">{{ cards[currentIndex].answer }}</small>
                    </div>

                    <button v-if="!showAnswer" @click="revealAnswer" class="btn btn-sm btn-dark w-100 mb-2">
                        Show Answer
                    </button>

                    <div v-if="showAnswer" class="row">
                        <div class="col-12 col-sm-12 col-md-4 mb-2">
                            <button @click="classifyCard(3)" class="difficulty-button difficulty-easy">Easy</button>        
                        </div>
                        <div class="col-12 col-sm-12 col-md-4 mb-2">
                            <button @click="classifyCard(2)" class="difficulty-button difficulty-medium">Medium</button>        
                        </div>
                        <div class="col-12 col-sm-12 col-md-4 mb-2">
                            <button @click="classifyCard(1)" class="difficulty-button difficulty-hard">Hard</button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <p>Loading flashcards...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/cards";

const cards = ref([]);
const currentIndex = ref(0);
const showAnswer = ref(false);
const completed = ref(false);

const fetchCards = async () => {
    const response = await api.getAll(true);
    cards.value = response.data.data;
};

const classifyCard = async (classification) => {
    const card = cards.value[currentIndex.value];
    const updatedCard = {
        question: card.question,
        answer: card.answer,
        classification: classification,
    };
    await api.update(card.id, updatedCard);
    nextCard();
};

const nextCard = () => {
    showAnswer.value = false;
    if (currentIndex.value < cards.value.length - 1) {
        currentIndex.value++;
    } else {
        completed.value = true;
    }
};

const revealAnswer = () => {
    showAnswer.value = true;
};

const restart = () => {
    currentIndex.value = 0;
    completed.value = false;
};

onMounted(() => {
    fetchCards();
});
</script>

<style scoped>
.container {
    max-width: 500px;
}

.blurred-text {
    filter: blur(5px);
    color: rgba(0, 0, 0, 0.3);
    font-size: 0.9em;
    text-align: center;
    margin-top: -10px;
}

/* practice buttons */
.difficulty-button {
    display: block;
    width: 100%;
    padding: 12px 0;
    border: none;
    font-size: 1em;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.difficulty-easy {
    background-color: #4a8c2b;
}

.difficulty-easy:hover {
    opacity: 0.9;
}

.difficulty-medium {
    background-color: #d89e00;
}

.difficulty-medium:hover {
    opacity: 0.9;
}

.difficulty-hard {
    background-color: #c62828;
}

.difficulty-hard:hover {
    opacity: 0.9;
}
</style>
