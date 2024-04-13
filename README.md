### 创建项目
先创建项目目录：

```bash
mkdir hardhat-proj

cd hardhat-proj
```

初始化项目：

```bash
npm init

npm install --save-dev hardhat

npx hardhat
```

### 编写合约

```bash
npm install @openzeppelin/contracts --save-dev
```

### 编译合约

```bash
npx hardhat compile
```

### 编写测试用例

```bash
npx hardhat test test/test.js
```

### 部署合约

```bash
npx hardhat run scripts/deploy_pro.js --network sepolia
```

### 验证合约

```bash
npx hardhat verify 0xD13367A6Ac907a0cE6fd0e02026758775ca0f318 "Hephaestus" "Hephaestus" --network sepolia
```

其中 0xD13367A6Ac907a0cE6fd0e02026758775ca0f318 是合约部署后，产生的合约地址。