# Hooligram-client

## How to run

1. `git clone https://github.com/hooligram/hooligram-client.git`
2. `cd hooligram-client`
3. Define environment variables in file named `.env` in project root:

   ```env
   API_HOST=ws://<domain>:<port>/<end-point>
   ```

   To connect to a localhost server, use `10.0.2.2` as `<domain>` (for emulators)

4. Ensure emulator is ready or mobile device is connected to your machine
5. `yarn` or `npm install`
6. `yarn android` or `npm run android`
