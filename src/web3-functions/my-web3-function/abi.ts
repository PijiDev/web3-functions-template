export const paytrAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_gelatoAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_cometAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_ERC20FeeProxyAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "payer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "paymentReference",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dueDate",
          "type": "uint256"
        }
      ],
      "name": "DueDateUpdatedEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "paymentReference",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "feeAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "feeAddress",
          "type": "address"
        }
      ],
      "name": "PayOutERC20Event",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "feeAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dueDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "paymentReference",
          "type": "bytes"
        }
      ],
      "name": "PaymentERC20Event",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "ERC20FeeProxyAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowedCometAddresses",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowedRequestNetworkFeeAddresses",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "gelatoAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "paymentMapping",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "feeAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dueDate",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "payer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "cometAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "feeAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_payee",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_feeAddress",
          "type": "address"
        },
        {
          "internalType": "uint48",
          "name": "_dueDate",
          "type": "uint48"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_feeAmount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_paymentReference",
          "type": "bytes"
        },
        {
          "internalType": "address",
          "name": "_cometAddress",
          "type": "address"
        }
      ],
      "name": "payInvoiceERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_paymentReference",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_dueDateUpdated",
          "type": "uint256"
        }
      ],
      "name": "updateDueDate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "interestAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "feeAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "payer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "payee",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "asset",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "cometAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "feeAddress",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "paymentReference",
              "type": "bytes"
            }
          ],
          "internalType": "struct Paytr.RedeemDataERC20[]",
          "name": "redeemData",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "asset",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "cometAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Paytr.totalPerAssetToRedeem[]",
          "name": "assetsToRedeem",
          "type": "tuple[]"
        }
      ],
      "name": "payOutERC20Invoice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assetERC20",
          "type": "address"
        }
      ],
      "name": "fundsToOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_cometAddressToAdd",
          "type": "address"
        }
      ],
      "name": "addCometAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_requestNetworkFeeAddress",
          "type": "address"
        }
      ],
      "name": "addRequestNetworkFeeAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_gelatoAddress",
          "type": "address"
        }
      ],
      "name": "setGelatoAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_ERC20FeeProxyAddress",
          "type": "address"
        }
      ],
      "name": "setERC20FeeProxy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]