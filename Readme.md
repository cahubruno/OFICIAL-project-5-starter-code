# Project 5 - Decentralized Star Notary

## Steps to follow

1. Clone the repository to your local computer.
2. Open the terminal and install the packages on main Folder of project: `npm install`
3. On terminal, install the packages on main SubFolder 'app' of project: `npm install`
4. Install truffle:
  On terminal, execute: `npm install --save truffle-hdwallet-provider`
5. Install OpenZeppelin:
  On terminal, execute: `npm install --save openzeppelin-solidity`
6. For starting the development console, run: `truffle develop`
7. For compiling the contract, inside the development console, run: `compile`
8. For migrating the contract to the locally running Ethereum network, inside the development console, run: `migrate --reset`
9. For running unit tests the contract, inside the development console, run:`test`
10. Step 6 activated smart contract on the local network.
11. Now, for running the Front End of the DAPP, open another terminal window and go inside the project directory, and run:
`cd app`
`npm run dev`
The Front End will be activated on: http://localhost:8080/
12. configure the metamask to local network on address: http://127.0.0.1:9545
13. In step 3 several accounts were shown. Capture the private key of each and add in metamask
14. Now you can enter the address http://localhost:8080/ to enter a star supplied with the name, symbol and id.
15. For each transaction, the metamask will request approval.
16. Button "Create Star" cresates a star in the smart contract
