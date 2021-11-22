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
