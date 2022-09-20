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

##### 建立ibftConfigFile.json文件

```
{
 "genesis": {
   "config": {
      "chainId": 1337,
      "berlinBlock": 0,
      "ibft2": {
        "blockperiodseconds": 2,
        "epochlength": 30000,
        "requesttimeoutseconds": 4
      }
    },
    "nonce": "0x0",
    "timestamp": "0x58ee40ba",
    "gasLimit": "0x47b760",
    "difficulty": "0x1",
    "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
       "fe3b557e8fb62b89f4916b721be55ceb828dbd73": {
          "privateKey": "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
          "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
          "balance": "0xad78ebc5ac6200000"
       },
       "627306090abaB3A6e1400e9345bC60c78a8BEf57": {
         "privateKey": "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
         "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
         "balance": "90000000000000000000000"
       },
       "f17f52151EbEF6C7334FAD080c5704D77216b732": {
         "privateKey": "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
         "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
         "balance": "90000000000000000000000"
       }
      }
 },
 "blockchain": {
   "nodes": {
     "generate": true,
       "count": 4
   }
 }
}

```

初始化

```
besu operator generate-blockchain-config --config-file=ibftConfigFile.json --to=networkFiles --private-key-file-name=key
```

完成后会在networkFiles文件夹下生成genesis文件

```json
{
  "config" : {
    "chainId" : 1337,
    "berlinBlock" : 0,
    "ibft2" : {
      "blockperiodseconds" : 2,
      "epochlength" : 30000,
      "requesttimeoutseconds" : 4
    }
  },
  "nonce" : "0x0",
  "timestamp" : "0x58ee40ba",
  "gasLimit" : "0x47b760",
  "difficulty" : "0x1",
  "mixHash" : "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
  "coinbase" : "0x0000000000000000000000000000000000000000",
  "alloc" : {
    "fe3b557e8fb62b89f4916b721be55ceb828dbd73" : {
      "privateKey" : "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
      "comment" : "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
      "balance" : "0xad78ebc5ac6200000"
    },
    "627306090abaB3A6e1400e9345bC60c78a8BEf57" : {
      "privateKey" : "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
      "comment" : "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
      "balance" : "90000000000000000000000"
    },
    "f17f52151EbEF6C7334FAD080c5704D77216b732" : {
      "privateKey" : "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
      "comment" : "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
      "balance" : "90000000000000000000000"
    }
  },
  "extraData" : "0xf87ea00000000000000000000000000000000000000000000000000000000000000000f85494879aaab5a735152226b2a3339090b8abb73e5789943be7e0373b903c863876412474e5991a94598b6294529fc277bdc5dc1fcd68d94901f19860d817aa6e94f7f171877043c8931f1699580d653232a1bb99a2808400000000c0"
}
```





##### 创建配置文件

  node1.toml,node2.toml,node3.toml,node4.toml 

  四个文件分别如下

node1.toml

```
data-path="Node-1/data" # Path
	# Chain 创世文件
	genesis-file="networkFiles/genesis.json" # Path to the custom genesis file


	# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
	p2p-host="127.0.0.1"
  	max-peers=42


#bootnodes=["enode://a0847f9c409b24312009f951dc8846481c7631e9742c68fbbc65cbfd2d29cafeaab93eee5f38424e1066123190e93cfabbb4c70c73d785af7f4d99b51ac21f3d@127.0.0.1:30303"]

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
	genesis-file="networkFiles/genesis.json" # Path to the custom genesis file


	# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
	p2p-host="127.0.0.1"
	p2p-port=30304
  	max-peers=42


bootnodes=["enode://a0847f9c409b24312009f951dc8846481c7631e9742c68fbbc65cbfd2d29cafeaab93eee5f38424e1066123190e93cfabbb4c70c73d785af7f4d99b51ac21f3d@127.0.0.1:30303"]

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
	genesis-file="networkFiles/genesis.json" # Path to the custom genesis file

	# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
	p2p-host="127.0.0.1"
	p2p-port=30305
  	max-peers=42


bootnodes=["enode://a0847f9c409b24312009f951dc8846481c7631e9742c68fbbc65cbfd2d29cafeaab93eee5f38424e1066123190e93cfabbb4c70c73d785af7f4d99b51ac21f3d@127.0.0.1:30303"]

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
	genesis-file="networkFiles/genesis.json" # Path to the custom genesis file

	# 以下3块（p2p\rpc\ws）的host注意设置本机可访问的内外网IP
	p2p-host="127.0.0.1"
	p2p-port=30306
  	max-peers=42


bootnodes=["enode://a0847f9c409b24312009f951dc8846481c7631e9742c68fbbc65cbfd2d29cafeaab93eee5f38424e1066123190e93cfabbb4c70c73d785af7f4d99b51ac21f3d@127.0.0.1:30303"]

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

 
