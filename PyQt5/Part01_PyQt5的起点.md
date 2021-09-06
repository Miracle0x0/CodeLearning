# 第一章 PyQt5 的起点

## 1.1 开始安装 PyQt5

## 1.2 程序运行起点

通过下方代码就可以呈现一个非常简单的 PyQt5 程序。

```python
# -*- coding: utf-8 -*-
import sys
from PyQt5.QtWidgets import QApplication, QLabel

if __name__ == "__main__":
    app = QApplication(sys.argv)    # 1
    label = QLabel('Hello World')   # 2
    label.show()                    # 3
    sys.exit(app.exec_())           # 4
```

1. 想要创建应用必须先实例化一个 QApplication，并将 sys.argv 作为参数传入；
2. 实例化一个 QLabel 控件，该控件用来展示文字或图片，这里用于展示文本。可以像上方代码一样直接传入 'Hello World' 进行实例化，也可以先实例化，再调用 setText() 方法来设置文本：

```python
# -*- coding: utf-8 -*-
import sys
from PyQt5.QtWidgets import QApplication, QLabel

if __name__ == "__main__":
    app = QApplication(sys.argv)
    label = QLabel()
    label.setText('Hello World')
    label.show()
    sys.exit(app.exec_())

```

3. 通过调用 show() 方法使控件可见（默认是隐藏）；
4. app.exec*() 是执行应用，让应用开始运转循环，直到窗口关闭返回 0 给 sys.exit()，退出整个程序。由于在 Python2 中 exec 是关键字，PyQt5 使用 exec*()，而 exec 在 Python3 中不是关键字，如果使用 Python3 则在上述代码中使用 exec() 也可。

还可以直接在字符串中加上 html 代码，修改文本样式。

```python
# -*- coding: utf-8 -*-
import sys
from PyQt5.QtWidgets import QApplication, QLabel

if __name__ == "__main__":
    app = QApplication(sys.argv)
    label = QLabel('<font color = "red">Hello</font> <h1>World</h1>')  # 使用 html 修改文本样式
    label.show()
    sys.exit(app.exec_())
```

## 1.3 小结

1. QLabel 是文本控件，但是也可以用来展示图片；
2. 可以直接在字符串中添加 html 代码；
3. app.exec_() 用来执行应用，sys.exit() 退出程序（exec 就是英文当中的 execute【执行】的缩写）。
