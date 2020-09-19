import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SuiVue from 'semantic-ui-vue';
import TeamCharacters from '@/components/TeamCharacters.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(SuiVue);

describe('TeamCharacters.vue without store data', () => {
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
    const wrapper = shallowMount(TeamCharacters, { store, localVue, stubs: ['router-link'] });
    expect(actions.getCharacters).toHaveBeenCalled();
    expect(wrapper.find('#loader').exists()).toBe(true);
    expect(wrapper.find('h1').exists()).toBe(false);
    expect(wrapper.find('p').exists()).toBe(false);
    expect(wrapper.find('charactercard-stub').exists()).toBe(false);
  });
});

describe('TeamCharacters.vue with store data and no team members', () => {
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

  it('should render router-link to list of characters when mounted', () => {
    const wrapper = shallowMount(TeamCharacters, { store, localVue, stubs: ['router-link'] });
    expect(actions.getCharacters).toHaveBeenCalled();
    expect(wrapper.find('#loader').exists()).toBe(false);
    expect(wrapper.find('p').text()).toMatch('Go add members to your team');
    expect(wrapper.find('charactercard-stub').exists()).toBe(false);
  });
});

describe('TeamCharacters.vue team members selection', () => {
  const state = {
    nbOfSelected: 2,
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
      selected: true,
      imgUrl: 'marvel.com/someImage3.jpg',
    }, {
      id: 4,
      name: 'Deadpool',
      description: '',
      selected: true,
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

  it('should render character cards when team members are selected', () => {
    const wrapper = shallowMount(TeamCharacters, { store, localVue, stubs: ['router-link'] });
    expect(actions.getCharacters).toHaveBeenCalled();
    expect(wrapper.find('h1').text()).toMatch('Currently in your team:');
    expect(wrapper.find('charactercard-stub').exists()).toBe(true);
    expect(wrapper.findAll('charactercard-stub').at(1).exists()).toBe(true);
  });
});
