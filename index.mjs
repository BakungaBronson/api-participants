import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);

let userArray = [];

const createBob = async(ctcAlice) => {
  console.log('Creating new Bob user!');
  const accBob = await stdlib.newTestAccount(startingBalance);
  const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
  console.log(`Adding new Bob user with address ${accBob.getAddress()} to User's array!`)
  userArray[userArray.length] = accBob.getAddress();
  console.log(`User's Array: ${userArray}`);
}

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);

console.log('Starting backends...');
await Promise.all([
  backend.Alice(ctcAlice, {
    ...stdlib.hasRandom,
    // implement Alice's interact object here
    ready_alert: () => {
      console.log('Alice: Ready to accept attachers!');
    }
  }),
]);

createBob(ctcAlice);
createBob(ctcAlice);

console.log('Goodbye, Alice and Bob!');
