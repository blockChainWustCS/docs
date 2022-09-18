# 安装

# web3-contract-dev1.0
#### 1.搭建联盟链

##### 安装 Hyperledger Besu 

  环境: java11以上

  安装Besu

    wget -c [https://dl.bintray.com/hyperledger-org/besu-repo/besu-21.10.4.zip](https://dl.bintray.com/hyperledger-org/besu-repo/besu-20.10.2.zip)
    
     unzip besu-21.10.4.zip

##### 准备安装目录与配置文件

  mkdir -pv IBFT-Network/Node-1/data

  mkdir -pv IBFT-Network/Node-2/data

  mkdir -pv IBFT-Network/Node-3/data

 mkdir -pv IBFT-Network/Node-4/data

#####  建立genesis文件

    参考 [https://besu.hyperledger.org/en/stable/HowTo/Configure/Consensus-Protocols/IBFT/#genesis-file](#genesis-file)
    
    这里在 IBFT-Network目录下创建genesis.json文件  
    
     文件内容如下：

```json
 {
 "config": {
   "constantinoplefixblock": 0,
   "ethash": {
    "fixeddifficulty": 1000
   },
    "chainID": 21066
  },
 "nonce": "0x42",
 "gasLimit": "0x1000000",
 "difficulty": "0x10000",
 "alloc": {
  "fe3b557e8fb62b89f4916b721be55ceb828dbd73": {
   "privateKey": "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
   "comment": "private key and this comment are ignored. In a real chain, the private key should NOT be stored",
   "balance": "0xad78ebc5ac6200000"
  },
  "f17f52151EbEF6C7334FAD080c5704D77216b732": {
   "privateKey": "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
   "comment": "private key and this comment are ignored. In a real chain, the private key should NOT be stored",
   "balance": "90000000000000000000000"
  }
 }
}
```





##### 创建配置文件

  node1.toml,node2.toml,node3.toml,node4.toml 

  四个文件分别如下

node1.toml

```
data-path="Node-1/data" # Path
# Chain 创世文件
genesis-file="genesis.json" # Path to the custom genesis file
# Mining 开启挖矿
miner-enabled=true
miner-coinbase="0x0000000000000000000000000000000000000000"
# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
p2p-host="127.0.0.1"
p2p-port=30301
max-peers=42
#bootnodes=["enode://8a1b09617a77a0a1c85d0158e3a81fd4e3dd71254ad15a21f7f0217eee49744887278890f35e140c806d22cf4a439adc23a8c256897d74d55c372a4500f711c7@127.0.0.1:30301"]
# RPC 接口配置
rpc-http-enabled=true
rpc-http-host="127.0.0.1"
rpc-http-port=8545
rpc-http-cors-origins=["all"]
# WS请求配置
rpc-ws-enabled=true
rpc-ws-host="127.0.0.1"
rpc-ws-port=8845
host-allowlist=["*"]
# 用于远程管理 管理方法需要添加ADMIN支持
rpc-http-api=["ADMIN","ETH","NET","WEB3"]
```

node2.toml

```
 data-path="Node-2/data" # Path
	# Chain 创世文件
	genesis-file="genesis.json" # Path to the custom genesis file
	# Mining 开启挖矿
	miner-enabled=true
	miner-coinbase="0x0000000000000000000000000000000000000000"
	# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
	p2p-host="127.0.0.1"
	p2p-port=30302
  	max-peers=42
bootnodes=["enode://c4eec72d4e63b1e0d2b1555777e7524a4f7e248a7e422f069283663de71c9bd9e29bc81577d1e1cef1d8f654d69dc68c024323e5f18ba0069a9024759cc70796@127.0.0.1:30301"]
	# RPC 接口配置
	rpc-http-enabled=true
	rpc-http-host="127.0.0.1"
	rpc-http-port=8546
 	rpc-http-cors-origins=["all"]
	# WS请求配置
	rpc-ws-enabled=true
	rpc-ws-host="127.0.0.1"
	rpc-ws-port=8846
 	host-allowlist=["*"]
	# 用于远程管理 管理方法需要添加ADMIN支持
	rpc-http-api=["ADMIN","ETH","NET","WEB3"]
```

node3.toml

```
 data-path="Node-3/data" # Path
	# Chain 创世文件
	genesis-file="genesis.json" # Path to the custom genesis file
	# Mining 开启挖矿
	miner-enabled=true
	miner-coinbase="0x0000000000000000000000000000000000000000"
	# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
	p2p-host="127.0.0.1"
	p2p-port=30303
  	max-peers=42
bootnodes=["enode://c4eec72d4e63b1e0d2b1555777e7524a4f7e248a7e422f069283663de71c9bd9e29bc81577d1e1cef1d8f654d69dc68c024323e5f18ba0069a9024759cc70796@127.0.0.1:30301"]
	# RPC 接口配置
	rpc-http-enabled=true
	rpc-http-host="127.0.0.1"
	rpc-http-port=8547
 	rpc-http-cors-origins=["all"]
	# WS请求配置
	rpc-ws-enabled=true
	rpc-ws-host="127.0.0.1"
	rpc-ws-port=8847
 	host-allowlist=["*"]
	# 用于远程管理 管理方法需要添加ADMIN支持
	rpc-http-api=["ADMIN","ETH","NET","WEB3"]
```

node4.toml

```
 data-path="Node-4/data" # Path
	# Chain 创世文件
	genesis-file="genesis.json" # Path to the custom genesis file
	# Mining 开启挖矿
	miner-enabled=true
	miner-coinbase="0x0000000000000000000000000000000000000000"
	# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
	p2p-host="127.0.0.1"
	p2p-port=30304
  	max-peers=42
bootnodes=["enode://c4eec72d4e63b1e0d2b1555777e7524a4f7e248a7e422f069283663de71c9bd9e29bc81577d1e1cef1d8f654d69dc68c024323e5f18ba0069a9024759cc70796@127.0.0.1:30301"]
	# RPC 接口配置
	rpc-http-enabled=true
	rpc-http-host="127.0.0.1"
	rpc-http-port=8548
 	rpc-http-cors-origins=["all"]
	# WS请求配置
	rpc-ws-enabled=true
	rpc-ws-host="127.0.0.1"
	rpc-ws-port=8848
 	host-allowlist=["*"]
	# 用于远程管理 管理方法需要添加ADMIN支持
	rpc-http-api=["ADMIN","ETH","NET","WEB3"]
```

##### 启动四个结点

   ~/besu-21.10.4/bin/besu --config-file=node1.toml

   ~/besu-21.10.4/bin/besu --config-file=node2.toml

   ~/besu-21.10.4/bin/besu --config-file=node3.toml

   ~/besu-21.10.4/bin/besu --config-file=node4.toml

 
