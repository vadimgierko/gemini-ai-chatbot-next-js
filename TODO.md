# GEMINI CHATBOT TODO

## APP'S NAME
- decide
  - what the subdomain the app should be deployed on
    - `[app-name].vadimgierko.com` OR
    - `[app-name].apps.vadimgierko.com` OR
    - `[app-name].app.vadimgierko.com`
  - should the app name be
    - just `ai-chatbot` OR
    - have tech stack in it, like
      - `gemini-ai-chat` OR
      - `gemini-ai-chat-next-js`?
- update `package.json` & other info with the new repo link & name

## ABOUT PAGE

<mark>style about page as in `Linky Notes`</mark>

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
- update `/about`
- update footer with links