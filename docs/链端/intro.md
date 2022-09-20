# 链端介绍

###      链的搭建

​      本项目使用了Hyperledger Besu搭建了一个测试链，Hyperledger Besu是一个开源的以太坊客户端，它采用Apache2.0许可协议，使用Java语言编写。它可以在以太坊公网或私有许可型网络上运行，也可以在Rinkeby、Ropsten和测试网络上运行。Hyperledger Besu包含了PoW、PoA和IBFT在内的几个共识算法，并且拥有专门为联盟链环境中使用而设计的全面的许可方案。

​       [Hyperledger Besu文档](https://besu.hyperledger.org/en/stable/) 

​       我们使用了IBFT2.0的共识算法搭建了一个4结点的测试链，虽然现阶段还没有体现多结点的用处，但这个项目未来还会进行拓展。

###   合约的编写

​		我们采用solidity语言编写智能合约，现阶段只有一个合约courseScoreService.sol，这个合约用来储存和管理学生的课程成绩。在未来的拓展中我们可能会加入更多的合约。