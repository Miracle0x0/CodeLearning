# 第七章 各种按钮介绍

&emsp;&emsp;本章一共会介绍四种按钮：QPushButton、QToolButton、QRadioButton 以及 QCheckButton。<br>

## 7.1 QPushButton

&emsp;&emsp;通过之前的章节，我们已经对该按钮有了一定了解，下面再介绍该按钮的其他方法：

```python
# encoding: utf-8
import sys
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.test_button = QPushButton('Test', self)
        self.test_button.setChecked(True)                           # 1
        self.test_button.setIcon(QIcon('button.png'))               # 2
        self.test_button.toggled.connect(self.button_state_func)    # 3

    def button_state_func(self):
        print(self.test_button.isChecked())                         # 4


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 按钮有标记和非标记两种状态，这两种状态下的按钮显示的样子不同。通过 setCheckable(True) 方法可以将按钮设置为一个可标记的按钮，那此时该按钮就拥有了标记和非标记两种状态了。可以通过 isCheckable() 方法来判断该按钮是否是可标记的；
2. 通过 setIcon() 方法给按钮设置一个图标，传入的参数为 QIcon()；
3. toggled 信号是专门用来配合按钮标记状态变化的，也就是说按钮标记状态发生变化就会发出 toggled 信号。在这里将 toggled 信号和自定义的槽函数连接了起来；
4. 通过 isChecked() 方法来判断按钮是否为标记状态，若是则返回 True，不是则返回 False。所以该槽函数会在按钮标记状态发生改变的时候启动，并打印 True 和 False。

&emsp;&emsp;运行截图如下：（注意 button.png 的路径，运行前要将 button.png 放在项目目录下）

<div align=center>
<image src="images/7-1-1.png">
</div>

&emsp;&emsp;点击 Test，按钮将变为标记状态：

<div align=center>
<image src="images/7-1-2.png">
</div>

&emsp;&emsp;再次按下，将变为非标记状态：

<div align=center>
<image src="images/7-1-1.png">
</div>

&emsp;&emsp;此时控制台一共打印了两次，一次 True，一次 False：

<div align=center>
<image src="images/7-1-3.png">
</div>

## 7.2 QToolButton

&emsp;&emsp;QToolButton 是与工具操作相关的按钮，通常和 QToolBar 搭配使用。QToolButton 一般不用来显示文本，而显示图标 QIcon。不过在使用方法上，QToolButton 和 QPushButton 还是很像的：

```python
# encoding: utf-8
import sys
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QApplication, QWidget, QToolButton


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.test_button = QToolButton(self)        # 1
        self.test_button.setCheckable(True)
        self.test_button.setIcon(QIcon('button.png'))
        self.test_button.toggled.connect(self.button_state_func)
        self.test_button.isCheckable()

    def button_state_func(self):
        print(self.test_button.isChecked())


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 请注意不能在 QToolButton 实例化的时候直接传入文本字符串，因为该控件没有相应的初始化函数。也就是说这样做是错误的：<font color="red">self.test_button = QToolButton('Test', self)</font>。如果要设置文本的话得通过 setText() 方法，但是 setText() 方法和 setIcon() 方法都使用的话，只会显示图标。

## 7.3 QRadioButton

&emsp;&emsp;该控件为单选按钮，也就是说默认每次只有一个按钮会被选中。下面我们来完成一个开关按钮的小程序：

```python

```
