'reach 0.1';

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    // Specify Alice's interact interface here
    ready_alert: Fun(true, Null),
  });
  const Bob = API('Bob', {
    // Specify Bob's interact interface here
  });
  init();
  // The first one to publish deploys the contract
  Alice.only(() => {
    interact.ready_alert()
  })
  Alice.publish();
  commit();
  // write your program here
  exit();
});
