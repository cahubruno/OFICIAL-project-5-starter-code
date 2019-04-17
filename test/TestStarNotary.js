const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});




it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', 'AWS', tokenId, {from: accounts[0]})
    //assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')

    retStar = await instance.tokenIdToStarInfo.call(tokenId);

    retName = retStar[0].toString()
    retSymbol = retStar[1].toString()

    assert.equal(retName, 'Awesome Star!')
    assert.equal(retSymbol, 'AWS')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', 'AWS', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', 'AWS', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', 'AWS', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', 'AWS', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
});

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();
    let user = accounts[0];
    let star_id = 456;
    await instance.createStar('Awesome Star!',"TKN", star_id , {from: user});
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    retStar = await instance.tokenIdToStarInfo.call(star_id);

    retName = retStar[0].toString()
    retSymbol = retStar[1].toString()

    assert.equal(retName, 'Awesome Star!')
    assert.equal(retSymbol, 'TKN')
});

it('lets 2 users exchange stars', async() => {
    let instance = await StarNotary.deployed();
    let user_1 = accounts[0];
    let user_2 = accounts[1];
    // 1. create 2 Stars with different tokenId
    await instance.createStar('Star user 1',"TKN", 1 , {from: user_1});
    await instance.createStar('Star user 2',"TKN", 2 , {from: user_2});
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    await instance.exchangeStars(1,2);
    // 3. Verify that the owners changed
    let star_1 = await instance.ownerOf.call(1);
    let star_2 = await instance.ownerOf.call(2);

    assert.equal(star_1,user_2);
    assert.equal(star_2,user_1);

});

it('lets a user transfer a star', async() => {
  let instance = await StarNotary.deployed();
  let user_1 = accounts[0];
  let user_2 = accounts[1];
  let star_id = 123;
    // 1. create a Star with different tokenId
    await instance.createStar('Star user 1',"TKN", star_id , {from: user_1});
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.transferStar(user_2,star_id);
    // 3. Verify the star owner changed.
    let starAddress = await instance.ownerOf.call(star_id);
    assert.equal(starAddress,user_2);
});

it('lookUptokenIdToStarInfo test', async() => {
    let tokenId1 = 1;
    let instance = await StarNotary.deployed();
    // 1. create a Star with different tokenId
    await instance.createStar('Awesome Star1', 'AW1', tokenId1, {from: accounts[0]});
    let tokenId2 = 2;
    await instance.createStar('Awesome Star2', 'AW2', tokenId2, {from: accounts[0]});
    // 2. Call your method lookUptokenIdToStarInfo
    star1NameRecovered = await instance.lookUptokenIdToStarInfo(tokenId1);
    star2NameRecovered = await instance.lookUptokenIdToStarInfo(tokenId2);
    // 3. Verify if you Star name is the same
    assert.equal(star1NameRecovered, 'Awesome Star1');
    assert.equal(star2NameRecovered, 'Awesome Star2');
});
