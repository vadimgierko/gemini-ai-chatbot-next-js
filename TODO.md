# GEMINI CHATBOT TODO

## CHATS CRUD

- enable chats CRUD using Firebase   
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