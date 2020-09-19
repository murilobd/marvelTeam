<template>
  <div>
    <sui-loader
      id="loader"
      active
      centered
      inline
      v-if="!characters || !characters.length"
    />

    <h1 v-if="characters.length">
      Create your team by selecting {{teamSize}} characters from the list of super-heroes.
    </h1>
    <p v-if="characters.length"> {{nbOfSelected}}/{{teamSize}} team members selected </p>

    <sui-grid divided="vertically" v-if="characters.length">
      <sui-grid-row :columns="2">
        <sui-grid-column>
          <sui-input
            id="searchInput"
            class="width100 marginHorizontal10"
            v-model="searchTxt"
            placeholder="Search the characters..."
          />
        </sui-grid-column>
        <sui-grid-column>
          <sui-dropdown
            id="filterDropdown"
            class="width100 marginHorizontal10"
            fluid
            :options="comics"
            placeholder="Filter By Comic"
            search
            selection
            v-model="selectedComic"
          />
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>

    <div class="ui stackable three column grid">
      <div
        class="column"
        v-for="character in filterCharacters"
        v-bind:key="character.id"
      >
        <CharacterCard :character="character"></CharacterCard>
      </div>
    </div>

    <sui-modal v-model="modalOpened" id="successModal">
      <sui-modal-header>Congratulations!! Your team is complete.</sui-modal-header>
      <sui-modal-content>
        <div class="ui stackable three column grid">
          <div
            v-for="character in selectedItems"
            v-bind:key="character.id"
            >
            <sui-image
              wrapped
              size="small"
              :src="character.imgUrl"
            />
            <p v-text="character.name" />
          </div>
        </div>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="closeModal">
          Ok
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

  </div>
</template>

<script>
import CharacterCard from '@/components/CharacterCard.vue';
import { mapState } from 'vuex';
import { TEAM_SIZE } from '@/common/config';

export default {
  name: 'ListOfCharacters',
  components: {
    CharacterCard,
  },
  props: {
  },
  data() {
    return {
      searchTxt: null,
      selectedComic: null,
      teamSize: TEAM_SIZE,
      modalOpened: false,
    };
  },
  mounted() {
    this.$store.dispatch('getCharacters');
  },
  methods: {
    inCurrentComic(character) {
      if (!this.selectedComic || this.selectedComic === 'all') return true;
      return character.comics && character.comics.items
        && character.comics.items.length
        && character.comics.items.find((com) => com.resourceURI === this.selectedComic);
    },
    queryCharacter(c) {
      return !this.searchTxt
        || (c.name && c.name.toLowerCase().indexOf(this.searchTxt) > -1)
        || (c.description && c.description.toLowerCase().indexOf(this.searchTxt) > -1);
    },
    openModal() {
      this.modalOpened = true;
    },
    closeModal() {
      this.modalOpened = false;
    },
  },
  watch: {
    nbOfSelected(newNumber) {
      if (newNumber === TEAM_SIZE) {
        this.openModal();
      }
    },
  },
  computed: {
    ...mapState({
      characters: (state) => state.characters || [],
      comics: (state) => [{ text: 'All', key: 'all', value: 'all' }].concat(state.comics),
      nbOfSelected: (state) => state.nbOfSelected,
    }),
    selectedItems() {
      return this.characters.filter((c) => c.selected);
    },
    filterCharacters() {
      return this.characters.filter((c) => this.queryCharacter(c) && this.inCurrentComic(c));
    },
  },
};
</script>

<style scoped>
.width100 {
  width: 100%;
}
.marginHorizontal10 {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
