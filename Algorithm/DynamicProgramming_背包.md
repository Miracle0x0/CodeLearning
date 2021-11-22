# 背包 DP

题目说明：有 **n** 个物品和一个容量为 **W** 的背包，每个物品有重量 $w_i$ 和价值 $v_i$ 两种属性，要求选若干物品放入背包，使背包中物品的总价值最大且背包中物品的总重量不超过背包的容量。

## 0-1 背包

已知条件：背包总容量 W，第 i 个物品的重量 $w_i$，价值 $v_i$。<br/>
设 DP 状态 $dp_{i, j}$ 为在只能放**前 i 个**物品的情况下，容量为 **j** 的背包所能达到的最大总价值。<br/>
状态转移方程为：

$$
dp_{i, j} = max(dp_{i-1,j}, dp_{i-1,j-w_i} + v_i)
$$

由于对 $dp_i$ 有影响的只有 $dp_{i-1}$，可以去掉第一维，直接用 $dp_i$ 来表示处理到当前物品时背包容量为 i 的最大价值，得出简化后的状态转移方程：

$$
dp_i = max(dp_i, dp_{j-w_i} + v_i)
$$

## 混合背包

解决该类问题的方法：

```c++
for i = 1, 2, ..., N {
    if (第 i 件物品属于 0-1 背包)
        zeroOnePack(...)
    else if (第 i 件物品属于完全背包)
        completePack(...)
    else if (第 i 键物品属于多重背包)
        multiplePack(...)
}
```

各类背包问题的代码封装如下：

-   0-1 背包

```c++
template<typename T>
void zeroOnePack(T dp[], int weight, int cost) {
    for (int i = v; i >= weight; i--)
        dp[i] = max(dp[i], dp[i - weight] + cost);
}
```

-   完全背包

```c++
template<typename T>
void completePack(T dp[], int weight, int cost) {
    for (int i = weight; i <= v; i++)
        dp[i] = max(dp[i], dp[i - weight] + cost);
}
```

-   多重背包

```c++
template<typename T>
void multiplePack(T dp[], int weight, int cost, int amount) {
    if (weight * amount >= v || amount == 0) {
        completePack(dp, weight, cost);
        return;
    }
    for (int k = 1; k <= amount; k <<= 1) {
        zeroOnePack(dp, weight * k, cost * k);
        amount -= k;
    }
    zeroOnePack(dp, weight * amount, cost * amount);
}
```
