<template>
  <div>
    <sui-loader
      id="loader"
      active
      centered
      inline
      v-if="!characters || !characters.length"
    />

    <h1 v-if="filterCharacters.length">
      Currently in your team:
    </h1>

    <p v-if="characters.length && !filterCharacters.length">
      <router-link to="/"> Go add members to your team </router-link>
    </p>

    <div class="ui stackable three column grid">
      <div
        class="column"
        v-for="character in filterCharacters"
        v-bind:key="character.id"
      >
        <CharacterCard :character="character"></CharacterCard>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterCard from '@/components/CharacterCard.vue';
import { mapState } from 'vuex';

export default {
  name: 'Team',
  components: {
    CharacterCard,
  },
  props: {
  },
  data() {
    return {
      searchTxt: null,
    };
  },
  mounted() {
    this.$store.dispatch('getCharacters');
  },
  computed: {
    ...mapState({
      characters: (state) => state.characters || [],
    }),
    filterCharacters() {
      return this.characters.filter((c) => c.selected);
    },
  },
};
</script>

<style scoped>
</style>
