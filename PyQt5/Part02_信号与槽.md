# 第二章 信号与槽——裁判鸣枪与选手开跑

## 2.1 通过按钮来改变文本（一个信号连接一个槽）

&emsp;&emsp;很多程序上是有“开始”按钮的，按下去后按钮上的文本就变成了“停止”。下面就是一个示例（之后的代码都会用类来呈现）：

```python
# -*- coding: utf-8 -*-
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton


class Demo(QWidget):                                      # 1
    def __init__(self):
        super(Demo, self).__init__()
        self.button = QPushButton('Start', self)          # 2
        self.button.clicked.connect(self.change_text)     # 3

    def change_text(self):
        print('change text')
        self.button.setText('Stop')                       # 4
        self.button.clicked.disconnect(self.change_text)  # 5


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()                                         # 6
    demo.show()                                           # 7
    sys.exit(app.exec_())
```

1. 该类继承 QWidget，可以向其中添加 QPushButton、QLabel、QMainWindow、QDialog 等控件；
2. 实例化一个 QPushButton，因为继承于 QWidget，所以 self 不能忘（相当于告诉程序这个 QPushButton 是作用于 QWidget 的）；
3. 连接信号与槽函数。self.button 就是一个控件，clicked（按钮被点击）是该控件的一个信号，connect() 即连接，self.change_text 即下方定义的函数（我们称之为**槽函数**）。所以通用的公式可以是：widget.signal.connect(slot)；
4. 将按钮文本从 'Start' 改成 'Stop'；
5. 信号和槽解绑，解绑后再按按钮控制台不会再输出 'change text' ；如果注释掉这行解绑的代码，每按一次按钮，控制台都会输出一次 'change text'；
6. 实例化 Demo 类；
7. 使 demo 可见，其中的控件自然都可见（除非某控件刚开始设置隐藏）；

&emsp;&emsp;现在用鸣枪和开跑来类比上面这个例子：按钮控件是裁判，他鸣枪发出信号（clicked），change_text() 槽函数运行就是选手开跑。

## 2.2 多个信号连接同一个槽

&emsp;&emsp;2.1 这个示例是用一个信号连接一个槽，现在来看下多个信号连接同一个槽。<br>
&emsp;&emsp;QPushButton 还有两个信号是 pressed 和 released，这两个信号解释如下：

-   pressed：当鼠标在 button 上并点击左键的时候，触发信号
-   released：当鼠标左键被释放的时候触发信号

&emsp;&emsp;所以其实 pressed 和 released 两个连起来就是一个完整的 clicked。<br>
&emsp;&emsp;下面用这两个信号来解释如何将多个信号连接到同一个槽：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.button = QPushButton('Start', self)
        self.button.pressed.connect(self.change_text)   # 1
        self.button.released.connect(self.change_text)  # 2

    def change_text(self):
        if self.button.text() == 'Start':               # 3
            self.button.setText('Stop')
        else:
            self.button.setText('Start')


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

-   1-2. 将 pressed 和 released 信号连接搭配 change_text() 槽函数上；
-   3. 若当前按钮文本为 'Start'，则将文本改为 'Stop'；若为 'Stop'，将 'Start' 文本改为 'Stop'；当鼠标放开后释放 released 信号，再次调用槽函数，将文本改回 'Start'。

&emsp;&emsp;所以当鼠标点击按钮不放时，发出 pressed 信号，调用槽函数，将 'Start' 文本改为 'Stop'；当鼠标放开后释放 released 信号，再次调用槽函数，将文本改回 'Start'。

## 2.3 一个信号与另外一个信号连接

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.button = QPushButton('Start', self)
        self.button.pressed.connect(self.button.released)   # 1
        self.button.released.connect(self.change_text)      # 2

    def change_text(self):
        if self.button.text() == 'Start':
            self.button.setText('Stop')
        else:
            self.button.setText('Start')


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1-2. 将 pressed 信号和 released 信号连接起来，而 released 信号则与槽函数相连。这样当点击不放时，pressed 信号发出，released 信号也会发出，从而启动槽函数。释放鼠标则发出 released 信号，再次启动槽函数。所以程序运行效果跟 2.2 小节其实是一样的。

## 2.4 一个信号连接多个槽

&emsp;&emsp;信号都为 clicked，然后再多定义几个槽函数：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.resize(300, 300)                                       # 1
        self.setWindowTitle('demo')                                 # 2
        self.button = QPushButton('Start', self)
        self.button.clicked.connect(self.change_text)
        self.button.clicked.connect(self.change_window_size)        # 3
        self.button.clicked.connect(self.change_window_title)       # 4

    def change_text(self):
        print('change text')
        self.button.setText('Stop')
        self.button.clicked.disconnect(self.change_text)

    def change_window_size(self):                                   # 5
        print('change window size')
        self.resize(500, 500)
        self.button.clicked.disconnect(self.change_window_size)

    def change_window_title(self):                                  # 6
        print('change window title')
        self.setWindowTitle('window title changed')
        self.button.clicked.disconnect(self.change_window_title)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 首先在初始化函数中将窗口大小设置为宽 300，长 300；
2. 其次将窗口名称设置为 'demo'；
3-4. 信号和槽连接，可以看到信号还是 clicked，而槽函数多了两个；
5. 修改窗口大小的槽函数
6. 修改窗口名称的槽函数

&emsp;&emsp;现在运行点击按钮后，按钮文本会由 'Start' 变成 'Stop'，窗口大小从 (300, 300) 变成 (500, 500)，窗口标题由 'demo' 变为 'window title changed'。

## 2.5 自定义信号

&emsp;&emsp;注意这里将 QPushButton 换成了 QLabel 来讲解：

```python
# encoding: utf-8
import sys
from PyQt5.QtCore import pyqtSignal                 # 1
from PyQt5.QtWidgets import QApplication, QWidget, QLabel


class Demo(QWidget):
    my_signal = pyqtSignal()                        # 2

    def __init__(self):
        super(Demo, self).__init__()
        self.label = QLabel('Hello World', self)
        self.my_signal.connect(self.change_text)    # 3

    def change_text(self):
        if self.label.text() == 'Hello World':
            self.label.setText('Hello PyQt5')
        else:
            self.label.setText('Hello World')

    def mousePressEvent(self, QMouseEvent):         # 4
        self.my_signal.emit()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 需要先导入 pyqtSignal；
2. 实例化一个自定义的信号；
3. 将自定义的信号连接到自定义的槽函数上；
4. mousePressEvent() 方法是许多控件自带的，这里来自于 QWidget。该方法用来监测鼠标是否有按下。现在鼠标若被按下，则会发出自定义的信号。

## 2.6 小结

1. 可以将信号和槽视作裁判鸣枪与选手开跑，信号发出，则相应连接的槽函数启动；
2. 单个信号可以连接单个槽；单个信号可以连接多个槽；多个信号可以连接单个槽；信号可以与信号连接；也可以自定义信号；
3. mousePressEvent() 方法是许多控件自带的方法，用来监测鼠标是否被按下。