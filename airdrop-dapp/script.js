//const contractTokenAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';
const contractTokenABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAirdropAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
const contractAirdropABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_airdropReceivers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amount",
        type: "uint256[]",
      },
    ],
    name: "drop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

let signer;
let contractToken;
let contractAirdrop;

const provider = new ethers.providers.Web3Provider(window.ethereum, 97); 

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    console.log(signer);

    contractAirdrop = new ethers.Contract(
      contractAirdropAddress,
      contractAirdropABI,
      signer
    );
  });
});

async function getBalance() {
  let ERC20Balance = document.getElementById("ERC20Balance");
  ERC20Balance.innerText = await contractToken.balanceOf(signer.getAddress());
  console.log(ERC20Balance.innerHTML);
}

async function airdropTokensWithTransfer() {
  let tokenAddress = document.getElementById("tokenAddress").value;
  console.log(tokenAddress);
  let _arrayOfAddress = document.getElementById("arrayOfReceivers").value;
  let arrayOfAddress = _arrayOfAddress.split(",");

  let _arrayOfAmounts = document.getElementById("arrayOfAmounts").value;
  let arrayOfAmounts = _arrayOfAmounts.split(",");
  console.log(arrayOfAmounts);
  //TODO check for allowance
  console.log(await signer.getAddress());

  await loadTokenContract(tokenAddress);

  let allowance = await contractToken.allowance(
    signer.getAddress(),
    contractAirdropAddress
  );

  console.log(Number(allowance));
  if (Number(allowance) == 0) {
    contractToken.approve(contractAirdropAddress, 1000000);
  } else if (Number(allowance) > 0) {
    await contractAirdrop.drop(tokenAddress, arrayOfAddress, arrayOfAmounts);
  }
}

async function loadTokenContract(_tokenAddress) {
  console.log(signer);
  contractToken = new ethers.Contract(_tokenAddress, contractTokenABI, signer);
}
