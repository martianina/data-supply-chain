// this action is to import user previous sytems scans from the bpr staging system 
// and import the data as gingerscience transactions to deplete stock
//
// this was necessary when transitioning form the old system to gingerscience

import { createTransactions, createTransactionsIndividually } from "./createTransactions";


const main = async () => {
//  await createTransactions()
  await createTransactionsIndividually();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Seeding complete!");
  });
