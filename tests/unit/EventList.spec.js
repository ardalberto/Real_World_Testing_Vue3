import EventList from '@/views/EventList.vue'
import { mount } from '@vue/test-utils'
import store from '@/store'
import router from '@/router'

describe('EventList.vue', () => {
  it('should render the events', () => {
    const wrapper = mount(EventList, {
      global: {
        plugins: [store, router]
      }
    })

    expect(wrapper.exists()).toBeTruthy()
  })

  describe('page title', () => {
    it('is rendered with the correct text', () => {
      const wrapper = mount(EventList, {
        global: {
          plugins: [store, router]
        }
      })

      const title = wrapper.find('[data-testid=event-list-title]')
      expect(title.text()).toBeTruthy()
      expect(title.text()).toContain('Events for Good')
    })
  })
})
