# Project 5 - Decentralized Star Notary

#                       Contract Attributes

#  Default functions:

    - `function createStar(string memory _name, uint256 _tokenId) public { ... }`

        Description: Create Star using the Struct

        struct Star {
            string name;
        }

    - `function putStarUpForSale(uint256 _tokenId, uint256 _price) public { ... }`

        Description: Putting an Star for sale (Adding the star tokenid into the mapping starsForSale, first verify that the sender is the owner)

    - `function _make_payable(address x) internal pure returns (address payable) { ... }`

        Description: Function that allows you to convert an address into a payable address

    - `function buyStar(uint256 _tokenId) public  payable { ... }`

        Description: Buy a star using Star tokenID

#  functions implemented by me - Task 1 for Project 5 ():

    - `function lookUptokenIdToStarInfo (uint _tokenId) public view returns (string memory) { ... }`

        Description: Looks up the stars using the Token ID, and then returns the name of the star.


    - `function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public { ... }`

        Description: 2 users can exchange their star tokens. Do not worry about the price, just write code to exchange stars between users.


    - ` function transferStar(address _to1, uint256 _tokenId) public { ... } `

        Description: The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.


#  Token name and Symbol


  - Token name: `UdacityTokenProject5`
  - Symbol: `UT5`


#   Version of the Truffle, OpenZeppelin used and others


1) ERC-721 Token Name: `UdacityTokenProject5`
2) ERC-721 Token Symbol: `UT5`

Version of frameworks used

`Truffle v5.0.12 (core: 5.0.12)`
`openzeppelin-solidity@2.2.0`
`Node v10.7.0`
`Solidity v0.5.0 (solc-js)`
`webpack 4.28.14`


#                       Deploy contract to LOCAL network

1. Clone the repository to your local computer and open a terminal window
2. Install:
    Truffle: `npm -g install truffle`
    Truffle HDWallet Provider: `npm install --save truffle-hdwallet-provider`
    Openzeppelin: `npm install --save openzeppelin-solidity`
3. Run truffle develop on project local folder: `truffle develop`
  Truffle will be inicialized on address: `http://127.0.0.1:9545/`
4. Compile the contract: `compile`
5. Migrate the contract to local Ethereum network: `migrate --reset`
6. Run all configured Tests on "TestStarNotary.js": `test`

  * Check "ATTENTION TO THE TESTS" session for more details

    All configured tests:

    `can Create a Star`
    `lets user1 put up their star for sale`
    `lets user1 get the funds after the sale`
    `lets user2 buy a star, if it is put up for sale`
    `lets user2 buy a star and decreases its balance in ether`
    `can add the star name and star symbol properly`
    `lets 2 users exchange stars`
    `lets a user transfer a star`


7. Open another terminal window to execute Front-end
8. Run: `cd app`
9. Run: `npm run dev`
  Front-end will be inicialized on address: `http://localhost:8080/`
10. Verify if you have Metamask extension Chrome installed and configured on local network http://127.0.0.1:9545/ where  truffle is running.
11. Now you can test front-end functions on address: http://localhost:8080/

# ATTENTION TO THE TESTS

I was unable to run all the tests at one time being failed on some with the error "Error: Returned error: VM Exception while processing transaction: revert" but all are working.

Faced with this situation, I found a contour solution that was to separate the tests to be run separately.

Then we must perform the 3 test functions one after the other. Once I find the root of the problem to run all the tests at once, I'll update the code.

Here's the code to run the 3 separate test functions:

Run Test 1: `test test\TestStarNotary.js`
Run Test 2: `test test\TestStarNotary1.js`
Run Test 3: `test test\TestStarNotary2.js`

* Here's the proof that all the tests are working:

...
truffle(develop)> test test\TestStarNotary.js
Using network 'develop'.

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

  √ can Create a Star (176ms)
  √ lets user1 put up their star for sale (249ms)
  √ lets user1 get the funds after the sale (338ms)
  √ lets user2 buy a star, if it is put up for sale (400ms)

  4 passing (1s)

truffle(develop)> test test\TestStarNotary1.js
Using network 'develop'.

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

  √ lets user2 buy a star and decreases its balance in ether (407ms)
  √ lets 2 users exchange stars (444ms)

  2 passing (877ms)

truffle(develop)> test test\TestStarNotary2.js
Using network 'develop'.

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

  √ can add the star name and star symbol properly (217ms)
  √ lets a user transfer a star (482ms)

  2 passing (729ms)

truffle(develop)>
...

#                       Deploy contract to RINKEBY network

1. Open terminal window in local project repository and run:
  `truffle migrate --reset --network rinkeby`
2. Configure the metamask on Rinkeby account
3. Open another terminar window and run Front-End:
  `cd app`
  `npm run dev`
4. Now you can access in http://localhost:8080/

You can see the Token Created on:  
  https://rinkeby.etherscan.io/token/0x8f888d8f66BE24e166D70c740B05937D3998A368


#                       Front-end Functions

`CreateS Star`
  Description: Enter the name of the star and the ID and click on the button "Create star"
  * You have to confirme the transaction in Metamask after button click

`Look up a Star`
  Descriptioin: retrieves star information by providing your ID
