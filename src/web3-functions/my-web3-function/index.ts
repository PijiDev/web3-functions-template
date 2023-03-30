import { Web3Function, Web3FunctionContext} from "@gelatonetwork/web3-functions-sdk";
import { Contract, ethers, BigNumber } from "ethers";
import axios from "axios";

// Fill this out with your Web3 Function logic
Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, gelatoArgs, provider } = context;
  const contractAddress = "0x7aB45521E2ECA64D94a4cF4c2557419cbc938A71";
  const abiCoder = ethers.utils.defaultAbiCoder;
  const abi = [
    "function payOutERC20Invoice(RedeemDataERC20[] calldata redeemData, totalPerAssetToRedeem[] calldata assetsToRedeem ) public onlyGelato nonReentrant"
  ]
  const cometAbi = [
    'event Supply(address indexed from, address indexed dst, uint256 amount)',
    'function supply(address asset, uint amount)',
    'function withdraw(address asset, uint amount)',
    'function balanceOf(address account) returns (uint256)',
    'function getSupplyRate(uint) public view returns (uint)',
    'function getUtilization() public view returns (uint)',
  ];
  const cometAddress = "0xF09F0369aB0a875254fB565E52226c88f10Bc839"; //Polygon Mumbai cUSDCv3 address
  const comet = new ethers.Contract(cometAddress, cometAbi, provider);
  const paytrContract = new Contract(contractAddress, abi, provider);
  
  const signer = provider.getSigner();
  const contractWithSigner = paytrContract.connect(signer);

  const MUMBAI_URL: string = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.PROVIDER_URL}`;

  let redeemedInvoicesArray: any[] = [];
  let paymentReferenceArray: any[] = []; // get all the payment references that were prepaid

  const prepaidInvoices = await axios.post(MUMBAI_URL, {
    jsonrpc: '2.0',
    id: 0,
    method: 'eth_getLogs',
    // must be a list
    params: [{
      "fromBlock": "0x2032933",
      "toBlock": "latest",
      "address": contractAddress,
      // must also be a list
      "topics": ["0x68e7d9472318c08e07463bdd0ad82d85200ca5e829cd47f551285074084e6662"] //payment event
    }],
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const currentBlockNumber = await provider.getBlockNumber();
  const currentBlockNumberBN = BigNumber.from(currentBlockNumber);

  // Decode response.data and write payment references to array

  for (let i = 0; i < prepaidInvoices.data.result.length; i++) {
    const txBlockNumber = prepaidInvoices.data.result[i].blockNumber;
    const txDataRaw = prepaidInvoices.data.result[i].data;
    const txData = abiCoder.decode(["address", "address", "address", "uint", "uint", "bytes"], txDataRaw);
    const txPaymentReference = txData[5];
    paymentReferenceArray.push({ txPaymentReference, txBlockNumber });
  }
  
  const redeemedInvoices = await axios.post(MUMBAI_URL, {
    jsonrpc: '2.0',
    id: 0,
    method: 'eth_getLogs',
    params: [{
      "fromBlock": "0x2032933",
      "toBlock": "latest",
      "address": contractAddress,
      "topics": ["0x2d0e52fa86cff57c78a87757e8890fe1595f2eba4e0449ea8fa316cd24879549"] //redeem event
    }],
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (redeemedInvoices.data.result.length > 0) {
    console.log(redeemedInvoices.data.result[0].data);
  
    const redeemedInvoicesArray: string[] = [];
  
    for (let i = 0; i < redeemedInvoices.data.result.length; i++) {
      const txDataRedemeedInvoicesRaw = redeemedInvoices.data.result[i].data;
      const txDataRedeemedInvoices = abiCoder.decode(["address", "address", "uint", "string"], txDataRedemeedInvoicesRaw);
      const txPaymentReference = txDataRedeemedInvoices[3].toString();
      redeemedInvoicesArray.push(txPaymentReference);
    }

  }
  
  //loop paymentReferenceArray and get data from the mapping. The information needed for the payment is pushed to the referencesToPay array
  let referencesToPay: Array<any> = [];
  let paymentDataArray: Array<any> = [];
  let totalAmountSupplied: any = null;
  let totalAmountValidTransaction: any = null;
  let totalInterestAmountToRedeem: any = null;
  let totalAmountToRedeem: any = null;
  let totalPerAssetToRedeem: Array<any> = [];
  let totalWeight: any = null;

  for (let j = 0; j < paymentReferenceArray.length; j++) {
    const refString = paymentReferenceArray[j].txPaymentReference;
    const structInfo = await contractWithSigner.paymentMapping(refString);
    console.log(structInfo);
    console.log("ref.: ", refString);

    const amount = structInfo[0].toNumber();
    const feeAmount = structInfo[1].toNumber();
    const dueDate = structInfo[2];
    const payer = structInfo[3];
    const payee = structInfo[4];
    const asset = structInfo[5];
    const cometAddress = structInfo[6];
    const feeAddress = structInfo[7];
    const numberOfBlocksSupplied = currentBlockNumberBN.sub(paymentReferenceArray[j].txBlockNumber).toNumber();
    const txWeight = amount * numberOfBlocksSupplied; //calculate weight of each payment * blocks supplied
    console.log(txWeight);
    totalWeight! += txWeight;
    console.log(totalWeight);

    console.log("Current epoch: ", Math.floor(Date.now()));
    console.log("Ref. due date: ", dueDate);

    totalAmountSupplied! += amount + feeAmount;
    console.log("Total amount supplied: ", totalAmountSupplied);

    if (dueDate != 0x00 && Math.floor(Date.now() / 1000) > dueDate && !redeemedInvoicesArray.includes(paymentReferenceArray[j].txPaymentReference)) {
      referencesToPay.push({ amount, feeAmount, dueDate, payer, payee, asset, cometAddress, feeAddress, txWeight, refString });
      totalAmountValidTransaction! += amount + feeAmount;
    }
  }
  ////////////////
  //loop mappingDataArray to calculate the weight of each transaction compared to the total contract balance, interests included
  let contractBalance = await comet.callStatic.balanceOf(contractAddress);
  console.log("Contract balance in V3 cToken ", contractBalance);
  let totalInterestAccrued = BigNumber.from(contractBalance.sub(totalAmountSupplied));
  console.log("Total interest: ", totalInterestAccrued.toString());

  for (let k = 0; k < referencesToPay.length; k++) {

    const txAmountString = BigNumber.from(referencesToPay[k].amount.toString());
    const txAmount = txAmountString.toNumber();
    const txFeeAmountString = BigNumber.from(referencesToPay[k].feeAmount.toString());
    const txFeeAmount = txFeeAmountString.toNumber();
    const txWeightBN = BigNumber.from(referencesToPay[k].txWeight);
    const totalWeightBN = BigNumber.from(totalWeight);
    const txInterestAmountString = totalInterestAccrued.mul(txWeightBN).div(totalWeightBN);
    const txInterestAmount = txInterestAmountString.toNumber();

    let txPayer = referencesToPay[k].payer;
    let txPayee = referencesToPay[k].payee;
    let txAsset = referencesToPay[k].asset;
    let txCometAddress = referencesToPay[k].cometAddress;
    let txPaymentReference = referencesToPay[k].refString;
    let txFeeAddress = referencesToPay[k].feeAddress;
    totalInterestAmountToRedeem += txInterestAmount;

    paymentDataArray.push([txAmount, txInterestAmount, txFeeAmount, txPayer, txPayee, txAsset, txCometAddress, txFeeAddress, txPaymentReference]);
  }
  totalAmountToRedeem = totalAmountValidTransaction + totalInterestAmountToRedeem;
  if (totalAmountToRedeem === 0) {
    throw("Nothing to redeem");
  }
  totalPerAssetToRedeem.push(["0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9", "0xF09F0369aB0a875254fB565E52226c88f10Bc839", totalAmountToRedeem]);
  // let payment = await contractWithSigner.payOutERC20Invoice(paymentDataArray, totalPerAssetToRedeem);
  //   await payment.wait();

  // Return execution call data
  return {
    canExec: true,
    callData: contractWithSigner.payOutERC20Invoice(paymentDataArray, totalPerAssetToRedeem),
  };
});