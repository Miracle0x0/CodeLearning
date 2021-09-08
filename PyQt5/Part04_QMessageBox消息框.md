# 第四章 QMessageBox 消息框

&emsp;&emsp;在程序中加入各种消息框来提示可以提高用户体验度。<br>

## 4.1 各种类型的消息框

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QMessageBox


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.button = QPushButton('information', self)
        self.button.clicked.connect(self.show_messagebox)   # 1

    def show_messagebox(self):
        QMessageBox.information(self, 'Title', 'Content', QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 实例化一个 QPushButton 并将 clicked 信号与自定义的 show_messagebox 槽函数连接起来，这样点击按钮后，信号发出，槽函数就会启动；
2. 在槽函数中我们创建了一个信息框（information），基本用法如下：

```python
QMessageBox.information(QWidget, 'Title', 'Content', buttons)
```

&emsp;&emsp;第一个参数填 self，表示该信息框属于我们这里的 Demo 窗口；第二个参数类型为字符串，填入的是该信息框的标题；第三个参数类型也是字符串，填入的是信息框的提示内容；最后一个参数为信息框上要添加的按钮，在示例代码中我们添加了 Yes、No 和 Cancel 三个按钮，多个按钮之间用 | 来连接，常见的按钮种类有以下几种：

-   QMessageBox.Ok
-   QMessageBox.Yes
-   QMessageBox.No
-   QMessageBox.Close
-   QMessageBox.Cancel
-   QMessage.Open
-   QMessage.Save

&emsp;&emsp;如果你没有指定信息框的按钮，那信息框会自己默认合适的按钮上去：

```python
QMessageBox.information(self, 'Title', 'Content')
```

&emsp;&emsp;除了信息框（information），还有以下几种，用法都是类似的：

-   QMessageBox.question 问答框
-   QMessageBox.warning 警告框
-   QMessageBox.critical 错误框
-   QMessageBox.about 关于框

## 4.2 与消息框交互

&emsp;&emsp;在上面的示例中，不管用户按了哪个按钮，程序都用关闭消息框来作出反应。然而用户会希望点击不同按钮，程序作出的反应不同。下面举一个简单的示例：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QMessageBox


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.button = QPushButton('Click Me!', self)
        self.button.clicked.connect(self.show_messagebox)

    def show_messagebox(self):
        choice = QMessageBox.question(self, 'Change Text?', 'Would you like to change the button text?', QMessageBox.Yes | QMessageBox.No)      # 1

        if choice == QMessageBox.Yes:                         # 2
            self.button.setText('Changed!')
        elif choice == QMessageBox.No:                        # 3
            pass


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 当点击消息框上某个按钮之后，会返回这个按钮，而这里将返回的按钮结果保存在 choice 中；
2. 若是按下了 Yes，则改变按钮的文字；
3. 若是按下了 No，则什么都不做。

## 4.3 小结

1. 消息框的种类

|   消息框    |             名称             |
| :---------: | :--------------------------: |
| information |            信息框            |
|  question   |            问答框            |
|   warning   |            警告框            |
|  critical   |            错误框            |
|    about    |            关于框            |
|   aboutQt   | 展示 Qt 软件信息，此处不展开 |

2. 语法形式（buttons 可以不用指定）：

```python
QMessageBox.information(QWidget, 'Title', 'Content', buttons)
```

3. 在与消息框交互的时候，可以用一个变量来保存消息框返回的按钮信息，接下来再用判断语句来作出不同的反应 。
