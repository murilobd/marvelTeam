<template>
  <sui-card class="marginAuto">
    <sui-image :src="character.imgUrl" />
    <sui-card-content>
      <sui-card-header>{{ character.name }}</sui-card-header>
      <sui-card-meta>
        <div class="ui grey label" v-if="character.comics && character.comics.available">
          {{character.comics.available}} commics
        </div>
        <div class="ui grey label" v-if="character.series && character.series.available">
          {{character.series.available}} series
        </div>
        <div class="ui grey label" v-if="character.stories && character.stories.available">
          {{character.stories.available}} stories
        </div>
      </sui-card-meta>
      <sui-card-description>{{ character.description }}</sui-card-description>
    </sui-card-content>
    <sui-button attached="bottom" :positive="character.selected" v-on:click="addToTeam()">
      <span v-if="!character.selected"><sui-icon name="add" /> Add to you team </span>
      <span v-if="character.selected"><sui-icon name="check" /> In your team</span>
    </sui-button>
  </sui-card>
</template>

<script>
import { mapState } from 'vuex';
import { TEAM_SIZE } from '@/common/config';

export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      nbOfSelected: (state) => state.nbOfSelected,
    }),
  },
  mounted() {},
  methods: {
    addToTeam() {
      if (this.character.selected) this.$store.dispatch('unselectCharacter', this.character.id);
      if (!this.character.selected && this.nbOfSelected >= TEAM_SIZE) {
        return;
      }
      if (!this.character.selected && this.nbOfSelected < TEAM_SIZE) this.$store.dispatch('selectCharacter', this.character.id);
    },
  },
};
</script>

<style scoped>
.marginAuto {
  margin: auto !important;
}
.ui.image {
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>
