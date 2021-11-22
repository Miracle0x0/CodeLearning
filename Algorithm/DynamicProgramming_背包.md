# 背包 DP

题目说明：有 **n** 个物品和一个容量为 **W** 的背包，每个物品有重量 $w_i$ 和价值 $v_i$ 两种属性，要求选若干物品放入背包，使背包中物品的总价值最大且背包中物品的总重量不超过背包的容量。

## 0-1 背包

已知条件：背包总容量 W，第 i 个物品的重量 $w_i$，价值 $v_i$。**每个物品最多选取一次**。<br/>

设 DP 状态 $dp_{i, j}$ 为在只能放**前 i 个**物品的情况下，容量为 **j** 的背包所能达到的最大总价值。那么对于第 i 个物品，若不将其**放入**背包，那么背包的剩余容量不变，背包中物品的总价值也不变，此种情况下最大价值为 $dp_{i-1, j}$；若将其**放入**背包，背包的剩余容量会减少 $w_i$，背包中物品的总价值会增加 $v_i$，此情况下最大价值为 $dp_{i-1,j-w_i} + v_i$。<br/>

由此得出状态转移方程为：
$$
dp_{i, j} = max(dp_{i-1,j}, dp_{i-1,j-w_i} + v_i)
$$

由于对 $dp_i$ 有影响的只有 $dp_{i-1}$，可以去掉第一维，直接用 $dp_i$ 来表示处理到当前物品时背包容量为 i 的最大价值，得出简化后的状态转移方程：

$$
dp_i = max(dp_i, dp_{j-w_i} + v_i)
$$

核心代码：

```c++
template<typename T>
void ZeroOnePack(T dp[], int weight, int value) {
    for (int i = W; i >= weight; i--)
        dp[i] = max(dp[i], dp[i - weight] + value);
}
```

## 完全背包

已知条件：背包总容量 W，第 i 个物品的重量 $w_i$，价值 $v_i$。**每个物品可以选取无限次**。<br/>

依然设 DP 状态 $dp_{i, j}$ 为在只能放**前 i 个**物品的情况下，容量为 **j** 的背包所能达到的最大总价值。<br/>

考虑朴素的做法：对于第 i 件物品，枚举其被选取的次数来进行转移。这种做法的时间复杂度是 $~O~$($n^3$) 的。状态转移方程为：
$$
dp_{i, j} = \max_{k=0}^{+\infty}(dp_{i-1,j-k\times w_i} + v_i \times k)
$$
下面考虑优化。可以发现，对于 $dp_{i, j}$ ，只要通过 $dp_{i, j-w_i}$ 转移即可。优化后的状态转移方程为：
$$
dp_{i,j} = \max(dp_{i-1,j}, dp_{i, j - w_i} + v_i)
$$
为什么可以这样处理呢？因为当我们这样转移时，$dp_{i, j-w_i}$ 已经由 $dp_{i, j-2\times w_i}$ 更新过，$dp{i,j-w_i}$ 就是充分考虑了第 i 件物品所选次数之后得到的最优结果。换言之，我们通过最优子结构的性质重复使用了之前的枚举过程，优化了枚举步骤的复杂度。<br/>

与 0-1 背包类似，我们可以去掉第一维优化空间复杂度，但需要注意此处的更新方向。<br/>

核心代码：

```c++
template<typename T>
void CompletePack(T dp[], int weight, int value) {
    for (int i = weight; i <= W; i++)
        dp[i] = max(dp[i], dp[i - weight] + value);
}
```

## 多重背包

已知条件：背包总容量 W，第 i 个物品的重量 $w_i$，价值 $v_i$。**每个物品可以选取 $k_i$ 次**。<br/>

朴素的想法是：把**每种物品选 $k_i$ 次**等价转换为**有 $k_i$ 个相同的物品，每个物品选一次**。这样就转换成了一个 0-1 背包模型，套用前面的方法可以解决。状态转移方程如下：
$$
dp_{i,j} = \max_{k=0}^{k_i}(dp_{i-1,j-k\times w_i} + v_i\times k)
$$
时间复杂度为 $~O~(~W~$$\sum_{i=1}^{n}k_i)$。<br/>

核心代码：

```c++
template<typename T>
void MultiplePack(T dp[], int weight, int value, int k) {
    if (weight * k >= W || k == 0) {//退化为完全背包
        CompletePack(dp, weight, value);
        return;
    }
    for (int i = 1; i <= k; i <<= 1) {//二进制分组优化
        ZeroOnePack(dp, weight * i, value * i);
        k -= i;
    }
    ZeroOnePack(dp, weight * k, value * k);
}
```

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
