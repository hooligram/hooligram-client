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

## Connecting to local hooligram-server

For debugging end-to-end, sometimes it's good to connect to a local a hooligram-server.
Assuming local server is running on `ws://localhost:8080` (see the README at the [hooligram-server](https://github.com/hooligram/hooligram-server) repo on how to run the server locally):

1. set `API_HOST=ws://localhost:8080` in `.env` file
2. run emulator
3. `adb tcp:8080 tcp:8080`
4. `yarn android`
5. check out the client-side & server logs and you should see that they are interacting with other!
