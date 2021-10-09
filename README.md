https://github.com/MoralisWeb3/demo-apps
git@github.com:DanielMoralisSamples/Video_Tutorials.git

set up Moralis server
downoad ganache from https://www.trufflesuite.com/ganache
make it excecutable:
chmod a+x ganache-1.3.0-x86_64.AppImage
connect Ganache to MetaMask (HTTP://127.0.0.1:7545 - 1337)


connect Ganache to Moralis:

. Download the version required depending on your hardware / os
https://github.com/fatedier/frp/releases

2. Replace the following content in "frpc.ini", based on your devchain
In some Windows Versions, FRP could be blocked by firewall, just use a older release, for example frp_0.34.3_windows_386

Mac / Windows Troubleshooting: https://docs.moralis.io/faq#frpc


Ganache:
[common]
  server_addr = wztprkojqvh4.grandmoralis.com
  server_port = 7000
  token = L9ff5myOp3
[ganache]
  type = http
  local_port = 7545
  custom_domains = wztprkojqvh4.grandmoralis.com
Hardhat:
[common]
  server_addr = wztprkojqvh4.grandmoralis.com
  server_port = 7000
  token = L9ff5myOp3
[hardhat]
  type = http
  local_port = 8545
  custom_domains = wztprkojqvh4.grandmoralis.com
Run and enjoy!
 Linux
./frpc -c frpc.ini
 Windows
frpc.exe -c frpc.ini


https://hardhat.org/getting-started/
Install hardhat:

npm init (npx create-react-app demo-app)
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
or
first npm install to install node modules
sudo npm install -g --force nodemon
start local node:
npx hardhat node
connect to metamask
connect to moralis through frpc

Running tasks


Install brownie
requirements: nodejs + python
python -m pip install --user pipx
python -m pipx ensurepath
apt-get install python3-venv
pipx install eth-brownie

add network
brownie networks add Ethereum rinkeby_test host='https://speedy-nodes-nyc.moralis.io/e2bfe6d43f897c5ef0455cdc/eth/rinkeby' name="Eth Rinkeby Moralis" chainid=4 explorer='https://api-rinkeby.etherscan.io/api'
brownie networks list

brownie accounts list
brownie account new <id> (then enter private key)

brownie pm install smartcontractkit/chainlink-brownie-contracts@1.0.2
brownie pm install list

sudo snap install solc
brownie console --network rinkeby_test

# ETH Price Feed (price_feed.sol)
import ETH account from rinkeby test network
account = accounts.load("rinkeby_account")

deploy contract from imported account
Price_ETH.deploy({'from': account})

get ETH price
Price_ETH[0].getThePrice()/10**8