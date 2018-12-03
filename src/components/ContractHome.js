import React, { Component } from "react";
import "../styles/ContractHome.css";
import { Thumbnail, Button } from "react-bootstrap";
const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "constructor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "value",
				"type": "int256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const address = '0xdeadbeef123456789000000000000'


const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/'),
);
const eth = new Eth(web3.currentProvider)
const contract = new EthContract(eth)

export default class ContractHome extends Component {

  constructor(props){
    super(props);
    this.startApp = this.startApp.bind(this);
    this.initContract = this.initContract.bind(this);
    this.listenForClicks = this.listenForClicks.bind(this);
    this.waitForTxToBeMined = this.waitForTxToBeMined.bind(this);

    var contractContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"constructor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"int256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
    var contract = contractContract.new(
       {
         from: web3.eth.accounts[0],
         data: '0x608060405234801561001057600080fd5b50610336806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636d4ce63c1461005c57806390fa17bb146100ec578063fd8f590714610103575b600080fd5b34801561006857600080fd5b50610071610170565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100b1578082015181840152602081019050610096565b50505050905090810190601f1680156100de5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100f857600080fd5b50610101610212565b005b34801561010f57600080fd5b5061016e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610260565b005b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102085780601f106101dd57610100808354040283529160200191610208565b820191906000526020600020905b8154815290600101906020018083116101eb57829003601f168201915b5050505050905090565b6040805190810160405280600681526020017f62616e616e6100000000000000000000000000000000000000000000000000008152506000908051906020019061025d929190610265565b50565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102a657805160ff19168380011785556102d4565b828001600101855582156102d4579182015b828111156102d35782518255916020019190600101906102b8565b5b5090506102e191906102e5565b5090565b61030791905b808211156103035760008160009055506001016102eb565b5090565b905600a165627a7a72305820afebf4cc26deba5e7b9e44950d3a7f262994f3057c8d209eec2386be10210bb80029',
         gas: '4700000'
       }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
     })

  }
  //https://medium.com/metamask/calling-a-smart-contract-with-a-button-d278b1e76705


  startApp(web3) {
    this.initContract(contract)
  }

  initContract (contract) {

    const Booking = contract(abi)
    const booking = Booking.at(address)
    this.state = {bookingContract:booking};

  }

  listenForClicks(){
    console.log("clicked");
    this.state.miniToken.get()
    .then(function (txHash) {
      console.log('Transaction sent')
      console.log(txHash)
      //this.waitForTxToBeMined(txHash)
    })
    .catch(console.error)

  }


  async waitForTxToBeMined (txHash) {
    let txReceipt
    while (!txReceipt) {
      try {
        txReceipt = await eth.getTransactionReceipt(txHash)
      } catch (err) {
        alert("error");
      }
    }
    alert("Success");
  }

  render(){
    return (
      <div>
        <h2> Home of the contracts </h2>
        <br/><br/>
        <Thumbnail style={{"width":"337px", "margin":"0 auto", "textAlign":"center"}}>
          <h3> Contract Interaction </h3>
          <hr/>
          <button className="transferFunds" onClick={this.listenForClicks}> transact </button>
          <br/>
          <br/>
          <ol id="secretPlace"></ol>
        </Thumbnail>

      </div>
    );
  }

}
