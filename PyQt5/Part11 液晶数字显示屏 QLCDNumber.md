# 第十一章 液晶数字显示屏 QLCDNumber

`QLCDNumber` 控件用于显示一个带有类似液晶显示屏效果的数字。

## 11.1 简单示例

【代码】

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLCDNumber, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.resize(600, 600)

        # 控件
        self.lcd1 = QLCDNumber(self)                    # 1
        self.lcd1.setDigitCount(10)
        self.lcd1.display(1234567890)

        self.lcd2 = QLCDNumber(self)                    # 2
        self.lcd2.setSegmentStyle(QLCDNumber.Flat)
        # self.lcd2.setSmallDecimalPoint(True)
        self.lcd2.setDigitCount(10)
        self.lcd2.display(0.123456789)

        self.lcd3 = QLCDNumber(self)                    # 3
        self.lcd3.setSegmentStyle(QLCDNumber.Filled)
        self.lcd3.display('HELLO')

        self.lcd4 = QLCDNumber(self)                    # 4
        self.lcd4.setSegmentStyle(QLCDNumber.Outline)
        self.lcd4.setMode(QLCDNumber.Hex)
        self.lcd4.setDigitCount(6)
        self.lcd4.display(666)

        # 布局
        self.v_layout = QVBoxLayout()
        self.v_layout.addWidget(self.lcd1)
        self.v_layout.addWidget(self.lcd2)
        self.v_layout.addWidget(self.lcd3)
        self.v_layout.addWidget(self.lcd4)

        self.setLayout(self.v_layout)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 实例化一个 `QLCDNumber` 控件，然后通过 `setDigitCount()` 方法来设置一共可以显示多少位数字；
2. lcd2 显示浮点型数字。通过 `setSegmentStyle()` 可以设置显示屏数字样式，可传入的参数有：

| 常量               |  值  | 描述                                     |
| ------------------ | :--: | ---------------------------------------- |
| QLCDNumber.Outline |  0   | 让内容浮显，颜色同显示屏背景颜色相同     |
| QLCDNumber.Filled  |  1   | 让内容浮显，颜色同窗口标题颜色相同       |
| QLCDNumber.Flat    |  2   | 让内容扁平化显示，颜色同窗口标题颜色相同 |

`setSmallDecimalPoint(bool)` 方法可以设置小数点的显示方式：若为 True，那么小数点就会在两个数字之间显示出来，而不会单独占一个位置；如果为 False，那就会单独占位（默认为 False）；

3. lcd3 显示的为字符串，可以显示的字母种类有限：A, B, C, D, E, F, h, H, L, o, P, r, u, U, Y, O / 0, S / 5, g / 9；
4. 可以通过 `setMode()` 方法来更改数字显示方式，这里用传入 `QLCDNumber.Hex` 让数字以 16 进制方式显示，总共可以传入以下参数：

| 参数           |  值  |   描述   |
| -------------- | :--: | :------: |
| QLCDNumber.Hex |  0   | 十六进制 |
| QLCDNumber.Dec |  1   |  十进制  |
| QLCDNumber.Oct |  2   |  八进制  |
| QLCDNumber.Bin |  3   |  二进制  |

【效果】

![10-3](https://gitee.com/Miraclezjy/utoolspic/raw/master/10-3-2022-1-2321:29:17.png)

## 11.2 小结

1. `QLCDNumber` 显示方式其实就跟电子表的显示方式一样；
2. `setDigitCount(int)` 用于设置可显示位数；`setSegmentStyle()` 用于设置样式；`setMode()` 用于设置数字显示方式；`display()` 用于显示。