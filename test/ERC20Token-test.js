const {expect} = require('chai');

describe('ERC20Token', function () {
  let dev, owner, alice, bob, charlie, dan, eve, ERC20Token, erc20token;
  const INIT_SUPPLY = ethers.utils.parseEther('1000000');
  const NAME = 'ERC20Token';
  const SYMBOL = 'ERC';
  beforeEach(async function () {
    [dev, owner, alice, bob, charlie, dan, eve] = await ethers.getSigners();
    ERC20Token = await ethers.getContractFactory('ERC20Token');
    erc20token = await ERC20Token.connect(dev).deploy(owner.address, INIT_SUPPLY, {gasPrice: 0});
    await erc20token.deployed();
  });
  describe('Deployment', function () {
    it(`Should have name ${NAME}`, async function () {
      expect(await erc20token.name()).to.equal(NAME);
    });
    it(`Should have name ${SYMBOL}`, async function () {
      expect(await erc20token.symbol()).to.equal(SYMBOL);
    });
    it('Should mint supply to owner', async function () {
      expect(await erc20token.balanceOf(owner.address)).to.equal(INIT_SUPPLY);
    });
    it('Should emit Transfer at deployment', async function () {
      const receipt = await erc20token.deployTransaction.wait();
      const txHash = receipt.transactionHash;
      await expect(txHash).to.emit(erc20token, 'Transfer').withArgs(ethers.constants.AddressZero, owner.address, INIT_SUPPLY);
    });
  });
});
