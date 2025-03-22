- decide what the subdomain the app should be deployed on
  - `[app-name].vadimgierko.com` OR
  - `[app-name]/apps.vadimgierko.com`
  - should the app name be just `ai-chatbot` OR have tech stack in it?
- update `package.json` & other info with the new repo link & name
- update About
- get rid of API routes, but save them as the example somewhere
- consider invoking server function `getChatMessage()` as form action in `<ChatInput />` instead of `onClick`
  - [see docs](https://nextjs.org/docs/app/getting-started/updating-data#forms)
  - check how `formData` works [see docs](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)
- use `useActionState` [see docs](https://nextjs.org/docs/app/getting-started/updating-data#showing-a-pending-state) instead of manually setting loading state.
- enable streaming chat messages [see docs](https://ai.google.dev/gemini-api/tutorials/web-app?lang=node#stream-response):
  👇 DOESN'T WORK !!! 
  ```js
  const result = await chat.sendMessageStream(msg);
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    res.write(chunkText);
  }
  ```
  SEE https://github.com/vercel/next.js/discussions/67501

---

- ## private features
  - implement current chat features as `temporary chat`
    - doesn't appear in `chats history`
    - doesn't use or modify `app memory`
    - still uses `system instructions` of general model
  - enable storing models' settings & chat history in `local storage` as extra private feature (no storing in db/cloud)
- ## `/models` (separate models instances with different `system instructions` & `context` & `tuning` later)
  - ### `/chats` (inside models)
    - `/[id]`
      - add `chat` state?
        ```js
        const chat = {
          history,
          systemInstruction
        }
        ```
      - `/settings`
        - enable editing `systemInstruction`
- implement app `memory`
  - ~~in chat~~
  - between chats
  - enable user to manage memory (if user want app to remember or forget smth)
- implement `context caching`
  - `system instructions`
  - knowledge about you
  - the way of responding
- enable working with files
  - locally
  - cloud
  - cache it
- enable models `tuning`/training
- `localStorage` => Firebase
- update `/about`
- update footer with links