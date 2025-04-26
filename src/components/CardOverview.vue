<template>
    <div class="col-12 mb-4">
        <div class="card" style="border-left: 5px solid #eb7a00;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="card-title mb-0" style="color: #eb7a00;">
                        <i class="bi bi-lightning-charge-fill"></i> Flashcards Overview
                    </h5>
                    <span class="badge bg-light text-dark">{{ total }} cards found</span>
                </div>
                <p class="card-text mb-2">
                    Keep practicing daily to maintain <strong>100% retention</strong> and boost your memory power!
                </p>
            </div>
        </div>
    </div>
</template>
  
<script setup>
defineProps(['total']);
</script>
  