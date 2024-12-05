- ~~do not console log history~~
- ~~move init model to separate shareable var~~
- ~~move init chat to separate shareable var~~
- `/models`
  ```js
  // Map to store models keyed by system instructions
  const modelMap = new Map<string, GenerativeModel>();
  // Map to store chats keyed by system instructions
  const chatMap = new Map<string, GenerativeChat>();
  ```
  - `/chats`
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
- implement `localStorage` => later in Firebase
- update `/about`
- update footer with links