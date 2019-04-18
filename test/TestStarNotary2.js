const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

// Implement Task 2 Add supporting unit tests
// 1) The token name and token symbol are added properly.
it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();
    let user = accounts[0];
    let star_id = 456;
    await instance.createStar('My Awesome Star!', star_id , {from: user});
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    retStarName = await instance.tokenIdToStarInfo.call(star_id);

    assert.equal(retStarName, 'My Awesome Star!')
});

// 3) Stars Tokens can be transferred from one address to another.
it('lets a user transfer a star', async() => {
    let instance = await StarNotary.deployed();
    let user_1 = accounts[0];
    let user_2 = accounts[1];
    let star_id = 123;
    // 1. create a Star with different tokenId
    await instance.createStar('My Awesome Star!', star_id , {from: user_1});
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.transferStar(user_2,star_id);
    // 3. Verify the star owner changed.
    let starAddress = await instance.ownerOf.call(star_id);
    assert.equal(starAddress,user_2);
});
