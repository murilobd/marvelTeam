<template>
  <div class="home">
    <ListOfCharacters />
  </div>
</template>

<script>
import ListOfCharacters from '@/components/ListOfCharacters.vue';

export default {
  name: 'Home',
  components: {
    ListOfCharacters,
  },
};
</script>
