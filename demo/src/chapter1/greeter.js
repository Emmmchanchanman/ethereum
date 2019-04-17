var Web3=require("web3");
var solc = require("solc");
var fs = require("fs");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var code = fs.readFileSync("Greeter.sol").toString();
var input={
        'Greeter.sol':code
}
var output = solc.compile({sources:input});
var abi = JSON.parse(output.contracts['Greeter.sol:Greeter'].metadata).output.abi;
web3.personal.unlockAccount(web3.eth.accounts[0],"1234");
var contract=web3.eth.contract(abi);
contract.new({from:web3.eth.accounts[0],data:'0x'+output.contracts['Greeter.sol:Greeter'].bytecode,gas:470000},
        function(e,contractData){
                if(!contractData.address){
        console.log("已经发起交易，交易地址:"+contractData.transactionHash+"正在
等待挖矿");
                }
                else{
                console.log("智能合约部署成功，地址:"+contractData.address);
                var instance = contract.at(contractData.address);
                console.log(instance.greet());
                instance.setGreeting("你好，左华洋",transact={'from':web3.eth.accounts[0]},
                function(e,data){
                        console.log(instance.greet());
                }
        )
                }
        }
)
