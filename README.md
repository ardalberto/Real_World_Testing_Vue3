# Intro to State Management

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Mocking the network with mock service worker
- Install the mock service worker package
```bash
npm install msw --save-dev
```

- Create a folder called `mocks` in the `src` folder
- Create a `handlers.js` file in the `mocks` folder
  - This will handle the requests recieved from the server. To start, we can try it with the following code:
    ```js
    import { rest } from 'msw'

    export const handlers = [
    rest.get('/events', (req, res, ctx) => {
        const data = { message: 'Hello from Vue Mastery!' }
        return res(ctx.status(200), ctx.json(data))
    })
    ]
    ```

- Create a `server.js` file in the `mocks` folder
  - This will create the server that will handle the requests
    ```js
    import { setupServer } from 'msw/node'
    import { handlers } from './handlers'

    export const server = setupServer(...handlers)
    ```
- Edit `jest.config.js` to add the following code
    ```js
    setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js']
    ```
- Create a `setup.js` file in the `tests/unit` folder
  - This will setup the server before each test
    ```js
    import { server } from '../../src/mocks/server'

    beforeAll(() => server.listen(3000))
    ```

- Edit the smoke test to check it everything is working
    ```js
    import axios from 'axios'

    it('works', async () => {
        const result = await axios.get('/events')
        console.log(result.data)
        expect(true).toBeTruthy()
    })
    ```
    
- At this point we should see the message from our handler