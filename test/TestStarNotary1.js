const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('My Awesome Star!', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
});

// 2) 2 users can exchange their stars.
it('lets 2 users exchange stars', async() => {
    let instance = await StarNotary.deployed();
    let user_1 = accounts[0];
    let user_2 = accounts[1];
    // 1. create 2 Stars with different tokenId
    await instance.createStar('Star user 1', 1 , {from: user_1});
    await instance.createStar('Star user 2', 2 , {from: user_2});
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    await instance.exchangeStars(1, 2, {from : user_1})
    // 3. Verify that the owners changed
    let star_1 = await instance.ownerOf.call(1);
    let star_2 = await instance.ownerOf.call(2);
    assert.equal(star_1,user_2);
    assert.equal(star_2,user_1);
});
