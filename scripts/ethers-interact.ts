require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require("fs");
const util = require("util");
var ethers = require("ethers");
const fsPromises = fs.promises;

// The path to the contract ABI
const ABI_FILE_PATH = "artifacts/contracts/Counter.sol/Counter.json";
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = "0xbc1578a2dEC85D8bdEf063cA7cfB6421aa696DB9";

// load ABI from build artifacts
async function getAbi() {
  const data = await fsPromises.readFile(ABI_FILE_PATH, "utf8");
  const abi = JSON.parse(data)["abi"];
  //console.log(abi);
  return abi;
}

async function main() {
  let provider = ethers.getDefaultProvider(`${process.env.ROPSTEN_URL}`);
  const abi = await getAbi();

  /* 
    // READ-only operations require only a provider.
    // Providers allow only for read operations.
    let contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);
    const greeting = await contract.greet();
    console.log(greeting);
    */

  // WRITE operations require a signer
  let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const new_contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
  console.log(await (await new_contract.getCount()).toString());
  await new_contract.countDown();
  console.log((await provider.getBalance(new_contract.address)).toString());
  // npx hardhat run --network ropsten scripts/interact_with_smart_contract.ts
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
