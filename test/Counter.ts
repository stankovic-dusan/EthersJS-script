import { ethers } from "hardhat";
import { expect } from "chai";
import { Counter } from "../typechain/Counter";

describe("Counter", () => {
  let counter: Counter;
  let signers: any;

  beforeEach(async () => {
    signers = await ethers.getSigners();

    const counterFactory = await ethers.getContractFactory("Counter", signers[0]);

    counter = (await counterFactory.deploy()) as Counter;
    await counter.deployed();

    const initialCount = await counter.getCount();
    expect(initialCount).to.eq(0);
    expect(counter.address).to.properAddress;
  });
  // 4
  describe("count up", async () => {
    it("should count up", async () => {
      await counter.countUp();
      let count = await counter.getCount();
      expect(count).to.eq(1);
    });
  });
  describe("count down", async () => {
    // 5
    it.skip("should fail", async () => {
      // this test will fail
      await counter.countDown();
    });
    it("should count down", async () => {
      await counter.countUp();
      await counter.countDown();
      const count = await counter.getCount();
      expect(count).to.eq(0);
    });
  });
});
