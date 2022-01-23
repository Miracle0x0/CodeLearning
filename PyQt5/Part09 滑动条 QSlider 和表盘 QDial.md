# 第九章 滑动条 QSlider 和 表盘 QDial

## 9.1 QSlider

【代码】

```python
import sys
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont
from PyQt5.QtWidgets import QApplication, QWidget, QSlider, QLabel, QVBoxLayout, QHBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.setFixedSize(300, 300)

        # 控件
        self.slider1 = QSlider(Qt.Horizontal, self)
        self.slider1.setRange(0, 100)												  # 1
        self.slider1.valueChanged.connect(lambda: self.on_change_func(self.slider1))  # 2
																					  # 3
        self.slider2 = QSlider(Qt.Vertical, self)
        
        self.slider2.setMinimum(0)													  # 4
        self.slider2.setMaximum(100)												  # 5
        self.slider2.valueChanged.connect(lambda: self.on_change_func(self.slider2))

        self.label = QLabel('0', self)												  # 6
        self.label.setFont(QFont('Arial Black', 20))

        # 布局
        self.h_layout = QHBoxLayout()
        self.v_layout = QVBoxLayout()

        # 初始化
        self.layout_init()

    def layout_init(self):
        self.h_layout.addWidget(self.slider2)
        self.h_layout.addStretch(1)
        self.h_layout.addWidget(self.label)
        self.h_layout.addStretch(1)

        self.v_layout.addWidget(self.slider1)
        self.v_layout.addLayout(self.h_layout)

        self.setLayout(self.v_layout)

    def on_change_func(self, slider):
        if slider == self.slider1:
            self.slider2.setValue(self.slider1.value())
            self.label.setText(str(self.slider1.value()))
        else:
            self.slider1.setValue(self.slider2.value())
            self.label.setText(str(self.slider2.value()))


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

【说明】

- 1.通过传入 `Qt.Hrizontal` 可以实例化一个水平的滑动条，传入 `Qt.Vertical` 可以实例化一个垂直的滑动条；
- 2.通过 `setRange()` 方法可以设置滑动条的范围；
- 3.当滑动时，数组发生改变，触发 `valueChanged` 信号；
- 4-5.除了 `setRange()` 方法，还可以使用 `setMinimum()` 和 `setMaximum()` 方法来设置最小值和最大值；
- 6.这里实例化的 `QLabel` 是为了显示出 `QSlider` 当前的数值；
- 7.在自定义的槽函数中，将两个滑动条的数值同步，然后用 `QLable` 显示出当前数值。

【效果】

![9-1](https://gitee.com/Miraclezjy/utoolspic/raw/master/9-1-2022-1-2317:42:10.gif)

## 9.2 QDial

【代码】

```python
import sys
from PyQt5.QtGui import QFont
from PyQt5.QtWidgets import QApplication, QWidget, QDial, QLabel, QHBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.setWindowTitle('QDial')                         # 1

        # 控件
        self.dial = QDial(self)
        self.dial.setFixedSize(200, 200)                     # 2
        self.dial.setRange(0, 100)                           # 3
        self.dial.setNotchesVisible(True)                    # 4
        self.dial.valueChanged.connect(self.on_change_func)  # 5

        self.label = QLabel('0', self)
        self.label.setFont(QFont('Arial Black', 20))

        # 布局
        self.h_layout = QHBoxLayout()
        self.h_layout.addWidget(self.dial)
        self.h_layout.addWidget(self.label)
        self.setLayout(self.h_layout)

    def on_change_func(self):
        self.label.setText(str(self.dial.value()))


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

【说明】

- 1.`setWindowTitle()` 方法可以设置窗口标题；
- 2.实例化一个 `QDial` 控件后，通过 `setFixedSize()` 方法来固定 `QDial` 的大小。如果不设置该方法的话，我们会发现在改变表盘数值时，表盘大小会发生变化；
- 3.使用 `setRange()` 方法来设置表盘数值范围，当然也可以使用 `setMinimum()` 和 `setMaximum()` 方法；
- 4.`setNotchesVisible(True)` 可以显示刻度，刻度会根据我们设置的数值自动调整；
- 5.当改变表盘数值时，会触发 `valueChanged` 信号，在槽函数中我们让 `QLabel` 显示出当前表盘数值。

【效果】

![9-2](https://gitee.com/Miraclezjy/utoolspic/raw/master/9-2-2022-1-2318:07:27.gif)

## 9.3 小结

1. 可以看出 `QSlider` 和 `QDial` 用法都差不多；
2. `Qt.QHorizontal` 和 `Qt.Vertical` 分别用来是实现水平的滑动条和垂直的滑动条；
3. `setWindowTitle()` 可以设置窗口标题，`setFixedSize()` 可以固定窗口或控件大小。
