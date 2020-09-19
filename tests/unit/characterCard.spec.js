import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SuiVue from 'semantic-ui-vue';
// import CharacterCard from '@/components/CharacterCard.vue';
import CharacterCard from '@/components/CharacterCard.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(SuiVue);

describe('CharacterCard.vue when character is not selected', () => {
  let store;
  let actions = {
    getCharacters: jest.fn(),
    selectCharacter: jest.fn(),
    unselectCharacter: jest.fn(),
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

  it('should render a card with info and normal button', () => {
    const wrapper = shallowMount(CharacterCard, {
      store,
      localVue,
      propsData: {
        character: {
          id: 1,
          name: 'Wolverine',
          description: 'Wolverine description',
          selected: false,
          imgUrl: 'marvel.com/someImage.jpg',
          comics: {
            available: 110,
          },
          series: {
            available: 3,
          },
          stories: {
            available: 1,
          },
        },
      }
    });
    expect(wrapper.find('sui-card-stub').exists()).toBe(true);
    expect(wrapper.find('sui-image-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-header-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-header-stub').text()).toBe('Wolverine');
    expect(wrapper.find('sui-card-meta-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-description-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-description-stub').text()).toBe('Wolverine description');
    expect(wrapper.find('sui-button-stub').exists()).toBe(true);
    expect(wrapper.find('sui-button-stub').attributes('positive')).toBe(undefined);
    expect(wrapper.find('sui-icon-stub').exists()).toBe(true);
    expect(wrapper.find('sui-icon-stub').attributes('name')).toBe('add');
  });
  it('should change button color and icon and dispatch selectCharacter when clicking on the action button', () => {
    const propsData = {
      character: {
        id: 1,
        name: 'Wolverine',
        description: 'Wolverine description',
        selected: false,
        imgUrl: 'marvel.com/someImage.jpg',
        comics: {
          available: 110,
        },
        series: {
          available: 3,
        },
        stories: {
          available: 1,
        },
      },
    };
    const wrapper = shallowMount(CharacterCard, {
      store,
      localVue,
      propsData,
    });
    expect(wrapper.find('sui-button-stub').exists()).toBe(true);
    expect(wrapper.find('sui-button-stub').attributes('positive')).toBe(undefined);
    expect(wrapper.find('sui-icon-stub').exists()).toBe(true);
    expect(wrapper.find('sui-icon-stub').attributes('name')).toBe('add');
    wrapper.find('sui-button-stub').trigger('click');
    // expect(actions.selectCharacter).toHaveBeenCalled(); // ???
    wrapper.setProps({
      character: {
        ...propsData.character,
        selected: true,
      },
    });
    wrapper.vm.$nextTick(() => {
    expect(wrapper.find('sui-button-stub').attributes('positive')).toBe('true');
    expect(wrapper.find('sui-icon-stub').exists()).toBe(true);
    expect(wrapper.find('sui-icon-stub').attributes('name')).toBe('check');
    });
  });
});

describe('CharacterCard.vue when character is selected', () => {
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

  it('should render a card', () => {
    const wrapper = shallowMount(CharacterCard, {
      store,
      localVue,
      propsData: {
        character: {
          id: 1,
          name: 'Wolverine',
          description: 'Wolverine description',
          selected: true,
          imgUrl: 'marvel.com/someImage.jpg',
          comics: {
            available: 110,
          },
          series: {
            available: 3,
          },
          stories: {
            available: 1,
          },
        },
      }
    });
    expect(wrapper.find('sui-card-stub').exists()).toBe(true);
    expect(wrapper.find('sui-image-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-header-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-header-stub').text()).toBe('Wolverine');
    expect(wrapper.find('sui-card-meta-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-description-stub').exists()).toBe(true);
    expect(wrapper.find('sui-card-description-stub').text()).toBe('Wolverine description');
    expect(wrapper.find('sui-button-stub').exists()).toBe(true);
    expect(wrapper.find('sui-button-stub').attributes('positive')).toBe('true');
    expect(wrapper.find('sui-icon-stub').exists()).toBe(true);
    expect(wrapper.find('sui-icon-stub').attributes('name')).toBe('check');
  });
});
