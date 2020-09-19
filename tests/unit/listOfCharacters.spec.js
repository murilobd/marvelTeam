import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SuiVue from 'semantic-ui-vue';
// import CharacterCard from '@/components/CharacterCard.vue';
import ListOfCharacters from '@/components/ListOfCharacters.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(SuiVue);

describe('ListOfCharacters.vue without store data', () => {
  let store;
  let actions = {
    getCharacters: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      actions,
      state: {
        nbOfSelected: 0,
        characters: [],
      },
    });
  });

  it('should render a loader', () => {
    const wrapper = shallowMount(ListOfCharacters, { store, localVue });
    expect(actions.getCharacters).toHaveBeenCalled();
    expect(wrapper.find('#loader').exists()).toBe(true);
    expect(wrapper.find('h1').exists()).toBe(false);
    expect(wrapper.find('p').exists()).toBe(false);
    expect(wrapper.find('#searchInput').exists()).toBe(false);
    expect(wrapper.find('#filterDropdown').exists()).toBe(false);
    expect(wrapper.find('charactercard-stub').exists()).toBe(false);
  });
});

describe('ListOfCharacters.vue with store data', () => {
  let store;
  let actions = {
    getCharacters: jest.fn(),
    selectCharacter: jest.fn(),
    unselectCharacter: jest.fn(),
  };
  const state = {
    nbOfSelected: 0,
    characters: [{
      id: 1,
      name: 'Wolverine',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage.jpg',
    }, {
      id: 2,
      name: 'Iron Man',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage2.jpg',
    }, {
      id: 3,
      name: 'Black Panther',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage3.jpg',
    }, {
      id: 4,
      name: 'Deadpool',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage4.jpg',
    }],
  };

  beforeEach(() => {
    store = new Vuex.Store({
      actions,
      state,
    });
  });

  it('should render h1, search input, dropdown and characters cards when mounted', () => {
    const wrapper = shallowMount(ListOfCharacters, { store, localVue });
    expect(actions.getCharacters).toHaveBeenCalled();
    expect(wrapper.find('#loader').exists()).toBe(false);
    expect(wrapper.find('h1').text()).toMatch('Create your team by selecting 3 characters from the list of super-heroes.');
    expect(wrapper.find('p').text()).toMatch('0/3 team members selected');
    expect(wrapper.find('#searchInput').exists()).toBe(true);
    expect(wrapper.find('#filterDropdown').exists()).toBe(true);
    expect(wrapper.find('charactercard-stub').exists()).toBe(true);
    expect(wrapper.findAll('charactercard-stub').at(3).exists()).toBe(true);
  });
});

describe('ListOfCharacters.vue team members selection', () => {
  const state = {
    nbOfSelected: 0,
    characters: [{
      id: 1,
      name: 'Wolverine',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage.jpg',
    }, {
      id: 2,
      name: 'Iron Man',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage2.jpg',
    }, {
      id: 3,
      name: 'Black Panther',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage3.jpg',
    }, {
      id: 4,
      name: 'Deadpool',
      description: '',
      selected: false,
      imgUrl: 'marvel.com/someImage4.jpg',
    }],
  };
  let store;
  let actions = {
    getCharacters: jest.fn(),
    selectCharacter: jest.fn(),
    unselectCharacter: jest.fn(),
  };
  let mutations = {
    increment: state => { if (state.nbOfSelected < 3) state.nbOfSelected++; },
  };

  beforeEach(() => {
    store = new Vuex.Store({
      actions,
      state,
      mutations,
    });
  });

  it('should render success modal when all 3 team members are selected', () => {
    const wrapper = shallowMount(ListOfCharacters, { store, localVue });
    expect(wrapper.find('#successModal').attributes('open')).toBe(undefined);
    mutations.increment(store.state);
    mutations.increment(store.state);
    mutations.increment(store.state);
    // needed because opening the modal changed in a watcher (nbOfSelected)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#successModal').attributes('open')).toBe('true');
    });
  });
});

// TODO: searchTxt change
// TODO: dropdown value change
