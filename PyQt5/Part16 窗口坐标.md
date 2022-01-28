# 第十六章 窗口坐标

## 16.1 理解坐标体系

![窗口坐标](https://gitee.com/Miraclezjy/utoolspic/raw/master/%E7%AA%97%E5%8F%A3%E5%B8%83%E5%B1%80-2022-1-2809:55:25.png)

我们可以把窗口分成三块：标题栏、边框和客户区。

- `x()`：得到窗口左上角在显示屏屏幕上的 x 坐标；
- `y()`：得到窗口左上角在显示屏屏幕上的 y 坐标；
- `pos()`：得到窗口左上角在显示屏屏幕上的 x 和 y 坐标，类型为 `QPoint()`；
- `geometry().x()`：得到客户区左上角在显示屏屏幕上的 x 坐标；
- `geometry().y()`：得到客户区左上角在显示屏屏幕上的 y 坐标；
- `geometry()`：得到客户区左上角在显示屏屏幕上的 x 和 y 坐标，以及客户区的宽度和长度，类型为 `QRect()`；
- `width()`：得到客户区的宽度；
- `height()`：得到客户区的长度；
- `geometry().width()`：得到客户区的宽度；
- `geometry().height()`：得到客户区的长度；
- `frameGeometry().width()`：得到窗口的宽度；
- `frameGeometry().height()`：得到窗口的长度；

【补充】

- `frameGeometry().x()`：即 `x()`，得到窗口左上角在显示屏屏幕上的 x 坐标；
- `frameGeometry().y()`：即 `y()`，得到窗口左上角在显示屏屏幕上的 y 坐标；
- `frameGeometry()`：即 `pos()`，得到窗口左上角在显示屏屏幕上的 x 和 y 坐标，以及窗口的宽度和长度，类型为 `QRect()`；

现在实例化一个 `QWidget` 窗口，并调用各个方法打印坐标：<br/>

【代码】

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget

if __name__ == '__main__':
    app = QApplication(sys.argv)
    widget = QWidget()
    widget.resize(200, 200)  # 通过 resize 方法设置窗口大小为 200 x 200
    widget.move(100, 100)  # 通过 move 方法将窗口移动到屏幕坐标为 (100, 100) 的位置上
    # widget.setGeometry(100, 100, 200, 200)  # 以上两个方法可以单独通过 setGeometry(x, y, width, height) 方法来完成
    widget.show()

    print('-----------------x(), y(), pos()-----------------')
    print(widget.x())
    print(widget.y())
    print(widget.pos())

    print('-----------------width(), height()-----------------')
    print(widget.width())
    print(widget.height())

    print('-----------------geometry().x(), geometry.y(), geometry()-----------------')
    print(widget.geometry().x())
    print(widget.geometry().y())
    print(widget.geometry())

    print('-----------------geometry.width(), geometry().height()-----------------')
    print(widget.geometry().width())
    print(widget.geometry().height())

    print('-----------------frameGeometry().x(), frameGeometry().y(), frameGeometry(), '
          'frameGeometry().width(), frameGeometry().height()-----------------')
    print(widget.frameGeometry().x())
    print(widget.frameGeometry().y())
    print(widget.frameGeometry())
    print(widget.frameGeometry().width())
    print(widget.frameGeometry().height())

    sys.exit(app.exec_())
```

【效果】

```python
-----------------x(), y(), pos()-----------------
100
100
PyQt5.QtCore.QPoint(100, 100)
-----------------width(), height()-----------------
200
200
-----------------geometry().x(), geometry.y(), geometry()-----------------
101
138
PyQt5.QtCore.QRect(101, 138, 200, 200)
-----------------geometry.width(), geometry().height()-----------------
200
200
-----------------frameGeometry().x(), frameGeometry().y(), frameGeometry(), frameGeometry().width(), frameGeometry().height()-----------------
100
100
PyQt5.QtCore.QRect(100, 100, 202, 239)
202
239
```

## 16.2 小结

1. 窗口可以分为标题栏、边框和客户区三个部分。但是从 Linux 系统上的输出结果来看，在 Linux 上的窗口并没有将窗口划分为这几个部分，而是始终保持一个整体；Mac 上的窗口没有边框这一部分；
2. `move(x, y)` 和 `resize(width, height)` 方法的功能可以单单通过 `setGeometry(x, y, width, height)` 方法来实现（也可以用该方法实现窗口中各控件的布局）。
