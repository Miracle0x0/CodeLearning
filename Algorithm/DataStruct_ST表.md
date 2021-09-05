# 数据结构——ST 表

## 前言

&emsp;&emsp;ST（Sparse Table）表，中文名**稀疏表**，是一种数据结构。</br>
&emsp;&emsp;ST 表常用于解决**可重复贡献问题**。什么是可重复贡献问题呢？</br>
&emsp;&emsp;举例来说：要求 10 个数中的最大数，完全可以先求前 6 个数的 max_num，再求后 7 个数的 max_num，然后再对所求的两个 max_num 求较大数。虽然中间有几个数被重复计算了，但并不影响最后的答案。</br>
&emsp;&emsp;**常见的可重复贡献问题有**：区间最值、区间按位和、区间按位或、区间 GCD 等。而像区间和这样的问题就不是可重复贡献问题。</br>

## 一、ST 表的构建

&emsp;&emsp;这里以区间最值作为例子来构建 ST 表。</br>
&emsp;&emsp;ST 表是基于**倍增**算法的。</br>
&emsp;&emsp;我们设 f[i][j] 表示区间 [i, i + 2$^j$ - 1] 内的最值，显然 f[i][0] = max[i, i] = num$_i$。由倍增思想可得，跳 2$^i$ 步相当于先跳 2$^{i-1}$ 步再跳 2$^{i-1}$ 步；同理区间[i, i + 2$^j$ - 1] 内的最值相当于是区间 [i, i + 2$^{j-1}$ - 1] 和 [i + 2$^{j-1}$, i + 2$^j$ - 1] 内的最值。</br>
&emsp;&emsp;所以可得式子 f[i][j] = max(f[i][j - 1], f[i + 2$^{j-1}$][j - 1])。</br>
&emsp;&emsp;则只需要枚举起点（也就是枚举 i )，接着枚举区间长度（也就是枚举 j），使得整个区间被包进去，就可以构建出 ST 表了。</br>
**对于询问：**</br>
&emsp;&emsp;当询问区间[l, r]内的最值时，我们当然希望直接输出 f[l][x]，（l + 2$^x$ - 1 = r）。由上面的分析可得 x = _log$_2$_(r - l + 1)。</br>
&emsp;&emsp;但问题来了，我们要求的 j 是个整数，但经过对数运算得出的 x 可能是个非整数，若是对其进行取整，向下取整可能使区间变小，向上取整又可能使区间变长，显然不太合适。</br>
&emsp;&emsp;所以这里有一个办法，那就是把区间 [l, r] 分为两个子区间，一部分是向下取整得到的 [l, l + 2$^{log_2(r - l + 1)}$ - 1] 也就是 f[l][$\lfloor$x$\rfloor$]；为了防止向下取整使得区间可能变小带来的影响，我们再塞一个新区间 [r - 2$^x$ + 1, r]。</br>
&emsp;&emsp;由于是可重复贡献问题，虽然两区间有所重叠，但不会造成影响。</br>
&emsp;&emsp;ST 表预处理的时间复杂度为 _O(nlog$_2$n)_，查询的时间复杂度为则为 _O(1)_。</br>

## 二、例题参考代码

[洛谷 P3865](https://www.luogu.com.cn/problem/P3865) 【模板】ST 表
<br>AC 代码如下：<br>

```c++
#include<cstdio>
#include<cctype>

#define max(a, b) ((a)>(b) ? (a):(b))
const int maxn = 1e5 + 10, maxm = 2e6 + 10;

int n, m, l, r, res, lg;

int f[maxn][21], logn[maxn];

inline int read() {                 //快速读入
    int x = 0, flag = 1;
    char ch = getchar();
    while (!isdigit(ch))
        if (ch == '-') flag = -1, ch = getchar();
    while (isdigit(ch)) x = x * 10 + ch - 48, ch = getchar();
    return x * flag;
}

void pre() {                        //预处理 log 值，防止查询时影响速度
    logn[1] = 0, logn[2] = 1;
    for (int i = 3; i <= n; i++)
        logn[i] = logn[i >> 1] + 1;
}

int main() {
    scanf("%d %d", &n, &m);
    pre();
    for (int i = 1; i <= n; i++) scanf("%d", &f[i][0]);                 //f[i][0] 显然就是其本身
    for (int j = 1; j <= 21; j++) {                                     //2 的 21 次方满足两百万数据，若数据变大，这里上限也要变大
        for (int i = 1; i + (1 << j) - 1 <= n; i++) {
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);   //倍增的处理
        }
    }
    while (m--) {
        scanf("%d %d", &l, &r);
        lg = logn[r - l + 1];
        res = max(f[l][lg], f[r - (1 << lg) + 1][lg]);                  //区间重叠计算
        printf("%d\n", res);
    }
    return 0;
}
```

## 三、使用 ST 表处理其他问题

&emsp;&emsp;其实只需要对区间最值 ST 表略做修改即可。<br>
&emsp;&emsp;比如区间按位与，则只需要修改以下代码：

```c++
f[i][j] = f[i][j - 1] & f[i + (1 << (j - 1))][j - 1];       //倍增的处理
ans = f[l][lg] & f[r][r - (1 << lg) + 1][lg];               //区间重叠运算
```

&emsp;&emsp;再比如区间 GCD：

```c++
f[i][j] = gcd(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);   //倍增的处理
ans = gcd(f[l][lg], f[r - (1 << lg) + 1][lg]);              //区间重叠运算
```

&emsp;&emsp;值得一提的是，处理区间 GCD 时，ST 表与线段树的时间复杂度基本相近，但前者却显然要好写得多。<br>
&emsp;&emsp;ST 表的缺点在于只能处理可重复贡献问题，以及不支持区间修改罢了。

## 四、相关例题

-   4.1 ST 表
    [洛谷 P3865](https://www.luogu.com.cn/problem/P3865)
    裸模板题

-   4.2 平衡的阵容 G
    [洛谷 P2880](https://www.luogu.com.cn/problem/P2880)
    需要同时求区间最大最小值，多建一个数组即可

-   4.3 降雨量
    [洛谷 P2471](https://www.luogu.com.cn/problem/P2471)
    同样是区间最值问题，由于不涉及区间修改，用 ST 表可能比线段树要更好写。<br>

&emsp;&emsp;其实涉及 RMQ（区间最值）问题的题目，只要不对区间修改，就可以考虑使用 ST 表。
