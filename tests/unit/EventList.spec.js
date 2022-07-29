import EventList from '@/views/EventList.vue'
import { mount } from '@vue/test-utils'
import { createStore } from '@/store'
import router from '@/router'
import { events as mockEvents } from '../../db.json'

function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || {}
  return mount(EventList, {
    global: {
      plugins: [createStore(config.plugins.store), router]
    },
    ...config.mountOptions
  })
}

let wrapper

describe('EventList.vue', () => {
  beforeEach(() => {
    wrapper = mountEventList()
  })

  it('should render the events', () => {
    // const wrapper = mountEventList()

    expect(wrapper.exists()).toBeTruthy()
  })

  describe('page title', () => {
    it('is rendered with the correct text', () => {
      //   const wrapper = mountEventList()

      const title = wrapper.find('[data-testid=event-list-title]')
      expect(title.text()).toBeTruthy()
      expect(title.text()).toContain('Events for Good')
    })
  })

  describe('events', () => {
    it('are rendered in a list with necessary information', () => {
      //imported in db.json
      //   const mockEvents = [{ description: 'An event', title: 'A title', id: 0 }]

      wrapper = mountEventList({
        plugins: {
          store: {
            state: () => ({
              events: mockEvents
            })
          }
        }
      })

      const events = wrapper.findAll('[data-testid=event]')
      expect(events).toHaveLength(mockEvents.length)
      events.forEach((event, i) => {
        const eventText = event.text()
        expect(eventText).toContain(mockEvents[i].title)
        expect(eventText).toContain(mockEvents[i].date)
      })
    })
  })
})
