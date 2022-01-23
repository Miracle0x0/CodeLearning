# 第十章 定时器 QTimer 和进度条 QProgressBar

当我们要让程序定期去执行某函数的时候，`QTimer` 就排上用场了，比如一个游戏程序，它通常会定期去调用一个函数来进行更新操作。而进度条可以用来显示某项任务的进度，从而让用户界面更加友好。<br/>

我们通常将 `QTimer` 和 `QProgressBar` 一起搭配使用。

## 10.1 QTimer

以下这个程序中，按钮被点击后，`QLabel` 显示的数字会不断增加：<br/>

【代码】

```python
import sys
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QLabel, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.setFixedSize(200, 100)

        # 控件
        self.label = QLabel('0', self)               # 1
        self.label.setAlignment(Qt.AlignCenter)

        self.step = 0                                # 2

        self.timer = QTimer(self)                    # 3
        self.timer.timeout.connect(self.update_func)

        self.ss_button = QPushButton('Start', self)  # 4
        self.ss_button.clicked.connect(self.start_stop_func)

        # 布局
        self.v_layout = QVBoxLayout()
        self.v_layout.addWidget(self.label)
        self.v_layout.addWidget(self.ss_button)
        self.setLayout(self.v_layout)

    def start_stop_func(self):
        if not self.timer.isActive():
            self.ss_button.setText('Stop')
            self.timer.start(100)
        else:
            self.ss_button.setText('Start')
            self.timer.stop()

    def update_func(self):
        self.step += 1
        self.label.setText(str(self.step))


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

【说明】

1. 首先实例化一个 `QLabel`，并将文本设为 0。`setAlignment(Qt.AlignCenter)` 可以让 `QLabel` 控件在窗口中居中显示，而之前我们是通过 `addStretch(int)` 方法来让一个控件在布局中居中的，显然通过 `setAlignment(Qt.AlignCenter)` 方法更加方便：

```python
self.h_layout.addStretch(1)
self.h_layout.addWidget(self.label)
self.h_layout.addStretch(1)
```

2. step 变量用于计数，`QLabel` 控件显示的就是这里的 step，程序会通过 `QTimer` 来不断增加 step 的值；
3. 其次实例化一个 `QTimer`，并将 `timeout` 信号连接到自定义的槽函数 `update_func()` 上：

```python
def update_func(self):
    self.step += 1
    self.label.setText(str(self.step))
```

每次调用该槽函数就会将 step 值加 1，并且用 `QLabel` 显示当前值；

4. 最后我们实例化一个 `QPushButton` 按钮来控制定时器的启动和停止，连接的自定义槽函数如下：

```python
def start_stop_func(self):
    if not self.timer.isActive():
        self.ss_button.setText('Stop')
        self.timer.start(100)
    else:
        self.ss_button.setText('Start')
        self.timer.stop()
```

在槽函数中通过 `isActive()` 方法来判断定时器是否处于激活状态，若没有激活，则将按钮文字变成 Stop 并通过 `start(100)` 方法来启动定时器，100 表示 100 毫秒，也就是说每过 0.1 秒，定时器就会触发 `timeout` 信号，并执行 `update_func()` 槽函数；若已经处于激活状态，则将按钮文字变回 `Start` 并通过 `stop()` 方法停止定时器。<br/>

如果想在触发 `timeout` 信号后只调用一次 `update_func()` ，可以通过 `setSingleShot(True)` 方法来设置。<br/>

【效果】

![10-1](https://gitee.com/Miraclezjy/utoolspic/raw/master/10-1-2022-1-2319:34:17.gif)

## 10.2 QProgressBar

这里我们将 10.1 章节中的 `QLabel` 用 `QProgressBar` 来代替：<br/>

【代码】

```python
import sys
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtWidgets import QApplication, QWidget, QProgressBar, QPushButton, QHBoxLayout, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.setWindowTitle('QProgressBar示例')
        self.setFixedSize(400, 100)

        # 控件
        self.progressbar = QProgressBar(self)           # 1
        # self.progressbar.setOrientation(Qt.Vertical)
        self.progressbar.setMinimum(0)                  # 2
        self.progressbar.setMaximum(100)
        # self.progressbar.setRange(0, 100)

        self.step = 0                                   # 3

        self.timer = QTimer(self)                       # 4
        self.timer.timeout.connect(self.update_func)

        self.ss_button = QPushButton('Start', self)     # 5
        self.ss_button.clicked.connect(self.start_stop_func)
        self.reset_button = QPushButton('Reset', self)  # 6
        self.reset_button.clicked.connect(self.reset_func)

        # 布局
        self.h_layout = QHBoxLayout()
        self.v_layout = QVBoxLayout()

        self.h_layout.addWidget(self.ss_button)
        self.h_layout.addWidget(self.reset_button)
        self.v_layout.addWidget(self.progressbar)
        self.v_layout.addLayout(self.h_layout)

        self.setLayout(self.v_layout)

    def start_stop_func(self):
        if self.ss_button.text() == 'Start':
            self.ss_button.setText('Stop')
            self.timer.start(100)
        else:
            self.ss_button.setText('Start')
            self.timer.stop()

    def update_func(self):
        self.step += 1
        self.progressbar.setValue(self.step)

        if self.step >= 100:
            self.ss_button.setText('Start')
            self.timer.stop()
            self.step = 0

    def reset_func(self):
        self.progressbar.reset()
        self.ss_button.setText('Start')
        self.timer.stop()
        self.step = 0


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

【说明】

1. 实例化一个 `QProgressBar`，默认是水平的，但是我们可以通过 `setOrientation(Qt.Vertical)` 方法来让进度条垂直显示；
2. 通过 `setMinimum()` 和 `setMaximum()` 方法来设置范围，也可以单单用 `setRange()` 方法来实现，这里我们将范围设为 0-100；
3. 这里的 step 变量用于计数，之后 `QProgressBar` 会将值设为 step；
4. 实例化一个 `QTimer`，并将 `timeout` 信号连接到 update_func() 槽函数上：

```python
def update_func(self):
    self.step += 1
    self.progressbar.setValue(self.step)
    
    if self.step >= 100:
        self.ss_button.setText('Start')
        self.timer.stop()
        self.step = 0
```

每次触发 `timeout` 都会调用该槽函数，在这里我们将 `step` 值加 1，并将 progressbar 的值设为 step，当 step 值达到 progressbar 的最大值（也就是说进度条达到 100%），将按钮文本重新设为 Start，停止定时器并将 step 值重设为 0；

5. 实例化一个 `QPushButton` 按钮来控制 `QTimer` 的启动与停止，这里将它的 `clicked` 信号和 `start_stop_func()` 槽函数连接起来：

```python
def start_stop_func(self):
    if self.ss_button.text() == 'Start':
        self.ss_button.setText('Stop')
        self.timer.start(100)
    else:
        self.ss_button.setText('Start')
        self.timer.stop()
```

在槽函数中，我们通过按钮文字来进行判断，若为 Start，则说明定时器没有启动，所以将按钮文字设为 Stop，并且通过 `start(100)` 方法来启动，100 表示 100 毫秒，即 0.1 秒。也就是说之后每隔 0.1 秒就会触发 `timeout` 信号并调用 update_func() 槽函数；若按钮文字为 Stop，则将其设为 Start 并停止定时器（在 10.1 章节中是通过定时器 `isActive()` 方法来的，此处也可以使用）；

6. 该实例化的按钮用于重置进度条：

```python
def reset_func(self):
    self.progressbar.reset()
    self.ss_button.setText('Start')
    self.timer.stop()
    self.step = 0
```

其所连接的槽函数中通过 `reset()` 方法来进行重置，还有将按钮文字设为 Start，停止定时器以及将 step 值设为 0。<br/>

【效果】

![10-2](https://gitee.com/Miraclezjy/utoolspic/raw/master/10-2-2022-1-2320:04:12.gif)

## 10.3 小结

1. `QTimer` 定时器会根据设定的时间不断发出 `timeout` 信号并调用连接的槽函数，通过 `start(int)` 方法来设置时间并启动定时器，`stop()` 方法用于停止定时器；
2. 通过 `isActive()` 方法来判断定时器是否被激活，`setSingleShot()` 方法可以在触发 `timeout` 信号后只调用一次槽函数；
3. 通过 `setOrientation(Qt.Vertical)` 方法可以将进度条设为垂直显示；
4. `setMinimun()` 和 `setMaximum()` 方法用来设置进度条范围（可以用 `setRange()` 替代），`setValue()` 方法用于设置进度条的当前值，`reset()` 方法用于重置进度条。