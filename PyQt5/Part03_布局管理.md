# 第三章 布局管理

&emsp;&emsp;把各个控件摆放好，让整个界面更加有序好看，这就是布局管理器的作用。

## 3.1 垂直布局 QVBoxLayout

&emsp;&emsp;该布局方式就是将各个控件按**从上到下**垂直的方式摆放。下面看一个例子：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.user_label = QLabel('Username:', self)
        self.pwd_label = QLabel('Password:', self)

        self.v_layout = QVBoxLayout()               # 1
        self.v_layout.addWidget(self.user_label)    # 2
        self.v_layout.addWidget(self.pwd_label)     # 3

        self.setLayout(self.v_layout)               # 4


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 实例化一个垂直布局管理器 QVBoxLayout；
2-3. 通过调用 addWidget() 方法来将控件一个个添加到垂直布局中，最先添加的出现在最上方；
4. 将 self.v_layout 设为整个窗口的最终布局方式。

## 3.2 水平布局 QHBoxLayout

&emsp;&emsp;将控件从左到右依次水平摆放：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QHBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.user_label = QLabel('Username:', self)
        self.user_line = QLineEdit(self)            # 1

        self.h_layout = QHBoxLayout()               # 2
        self.h_layout.addWidget(self.user_label)    # 3
        self.h_layout.addWidget(self.user_line)     # 4

        self.setLayout(self.h_layout)               # 5


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. QLineEdit 控件就是一个用来进行单行文本输入的框；
2. 实例化一个水平布局管理器；
3-4. 将 QLabel 和 QLineEdit 控件添加到水平布局管理器中，先添加的出现在左边；
5. 将 self.h_layout 设为整个窗口的最终布局方式。

## 3.3 混合使用 QVBoxLayout 和 QHBoxLayout

&emsp;&emsp;我们将实现一个用于输入账号密码，并有登陆和注册按钮的小窗口：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QHBoxLayout, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()

        self.user_label = QLabel('Username:', self)
        self.pwd_label = QLabel('Password:', self)
        self.user_line = QLineEdit(self)
        self.pwd_line = QLineEdit(self)
        self.login_button = QPushButton('Log in', self)
        self.signin_button = QPushButton('Sign in', self)

        self.label_v_layout = QVBoxLayout()                         # 1
        self.line_v_layout = QVBoxLayout()                          # 2
        self.button_h_layout = QHBoxLayout()                        # 3
        self.label_line_h_layout = QHBoxLayout()                    # 4
        self.all_v_layout = QVBoxLayout()                           # 5

        self.label_v_layout.addWidget(self.user_label)              # 6
        self.label_v_layout.addWidget(self.pwd_label)
        self.line_v_layout.addWidget(self.user_line)
        self.line_v_layout.addWidget(self.pwd_line)
        self.button_h_layout.addWidget(self.login_button)
        self.button_h_layout.addWidget(self.signin_button)

        self.label_line_h_layout.addLayout(self.label_v_layout)     # 7
        self.label_line_h_layout.addLayout(self.line_v_layout)
        self.all_v_layout.addLayout(self.label_line_h_layout)
        self.all_v_layout.addLayout(self.button_h_layout)

        self.setLayout(self.all_v_layout)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1-3. 实例化三个布局管理器分别用来管理 QLabel, QLineEdit 和 QPushButton；
4-5. 这两个布局管理器用来管理 1-3 中的布局，它们添加的不是 QLabel、QLineEdit 或者 QPushButton 控件，而是通过 addLayout() 方法添加布局管理器。第 4 行的水平布局管理器将 self.label_v_layout 垂直布局和 self.line_v_layout 垂直布局这两个布局管理器从左到右依次水平摆放。第 5 行的垂直布局管理器将 self.label_line_h_layout 和 self.button_h_layout 垂直从上到下摆放；
6-7. 添加控件用 addWidget()，添加布局用 addLayout()。

<br>&emsp;&emsp;上面的代码是将两个 QLabel 用垂直布局方式摆放，将两个 QLineEdit 也用垂直方式摆放，最后用一个水平布局管理器来摆放两个垂直布局管理器。那么换一种思路，可以把 QLabel 和 QLineEdit 用水平布局方式摆放：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QHBoxLayout, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()

        self.user_label = QLabel('Username:', self)
        self.pwd_label = QLabel('Password:', self)
        self.user_line = QLineEdit(self)
        self.pwd_line = QLineEdit(self)
        self.login_button = QPushButton('Log in', self)
        self.signin_button = QPushButton('Sign in', self)

        self.user_h_layout = QHBoxLayout()
        self.pwd_h_layout = QHBoxLayout()
        self.button_h_layout = QHBoxLayout()
        self.all_v_layout = QVBoxLayout()

        self.user_h_layout.addWidget(self.user_label)
        self.user_h_layout.addWidget(self.user_line)
        self.pwd_h_layout.addWidget(self.pwd_label)
        self.pwd_h_layout.addWidget(self.pwd_line)
        self.button_h_layout.addWidget(self.login_button)
        self.button_h_layout.addWidget(self.signin_button)
        self.all_v_layout.addLayout(self.user_h_layout)
        self.all_v_layout.addLayout(self.pwd_h_layout)
        self.all_v_layout.addLayout(self.button_h_layout)

        self.setLayout(self.all_v_layout)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

&emsp;&emsp;相比而言，这种布局方式更加清晰明了。

## 3.4 表单布局 QFormLayout

&emsp;&emsp;表单布局可以将控件以两列的形式进行排布，左列控件为文本标签，右列为输入型的控件，如 QLineEdit。用这个布局管理器我们可以更快速方便地构写有表单的界面。我们用 QFormLayout 来改写下上面的代码：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QHBoxLayout, QVBoxLayout, QFormLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()

        self.user_label = QLabel('Username:', self)
        self.pwd_label = QLabel('Password:', self)
        self.user_line = QLineEdit(self)
        self.pwd_line = QLineEdit(self)
        self.login_button = QPushButton('Log in', self)
        self.signin_button = QPushButton('Sign in', self)

        self.f_layout = QFormLayout()                           # 1
        self.button_h_layout = QHBoxLayout()
        self.all_v_layout = QVBoxLayout()

        self.f_layout.addRow(self.user_label, self.user_line)   # 2
        self.f_layout.addRow(self.pwd_label, self.pwd_line)
        self.button_h_layout.addWidget(self.login_button)
        self.button_h_layout.addWidget(self.signin_button)
        self.all_v_layout.addLayout(self.f_layout)              # 3
        self.all_v_layout.addLayout(self.button_h_layout)

        self.setLayout(self.all_v_layout)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 实例化一个 QFormLayout 控件；
2. 调用 addRow() 方法传入 QLabel 和 QLineEdit 控件；
3. 将表单布局添加到总布局中。

&emsp;&emsp;可以发现代码比之前的更加简洁了。<br>

## 3.5 网格布局 QGridLayout

&emsp;&emsp;当使用该布局管理器的时候，可以把整个窗体想象成带有坐标的，然后只用把各个控件放在相应的坐标就好了，请看示例（还是上方的登陆框）：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QGridLayout, QVBoxLayout, QHBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()

        self.user_label = QLabel('Username:', self)
        self.pwd_label = QLabel('Password:', self)
        self.user_line = QLineEdit(self)
        self.pwd_line = QLineEdit(self)
        self.login_button = QPushButton('Log in', self)
        self.signin_button = QPushButton('Sign in', self)

        self.grid_layout = QGridLayout()                            # 1
        self.h_layout = QHBoxLayout()
        self.v_layout = QVBoxLayout()

        self.grid_layout.addWidget(self.user_label, 0, 0, 1, 1)     # 2
        self.grid_layout.addWidget(self.user_line, 0, 1, 1, 1)
        self.grid_layout.addWidget(self.pwd_label, 1, 0, 1, 1)
        self.grid_layout.addWidget(self.pwd_line, 1, 1, 1, 1)
        self.h_layout.addWidget(self.login_button)
        self.h_layout.addWidget(self.signin_button)
        self.v_layout.addLayout(self.grid_layout)                   # 3
        self.v_layout.addLayout(self.h_layout)                      # 4

        self.setLayout(self.v_layout)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

&emsp;&emsp;这里混合使用 QVBoxLayout、QHBoxLayout 和 QGridLayout 来完成布局。<br>
1. 实例化一个 QGridLayout 布局管理器；
2. QGridLayout 的 addWidget() 方法遵循如下语法形式：

```python
addWidget(widget, row, column, rowSpan, columnSpan)
```

&emsp;&emsp;widget 就是要添加的控件；row 为第几行，0 代表第一行；column 为第几列，0 代表第一列；rowSpan 表示要让这个控件去占用几行（默认一行）；columnSpan 表示要让这个控件去占用几列（默认一列）。<br>

&emsp;&emsp;在上方程序中，我们将 self.user_label 放在 (0, 0) 这个坐标，也就是第一行第一列，占用一行一列；将 self.user_line 放在 (0, 1)，即第一行第二列，也就是 self.user_label 的右边，占用一行一列；将 self.pwd_label 放在 (1, 0)，即第二行第一列，在 self.user_label 的正下方，占用一行一列；最后我们将 self.pwd_line 放在 (1, 1)，即第二行第二列，占用一行一列。<br>
&emsp;&emsp;因为默认都是一行一列，所以也可以写成：

```python
self.grid_layout.addWidget(self.user_label, 0, 0)        
self.grid_layout.addWidget(self.user_line, 0, 1)
self.grid_layout.addWidget(self.pwd_label, 1, 0)
self.grid_layout.addWidget(self.pwd_line, 1, 1)
```

&emsp;3-4. 最后，程序用垂直布局管理器将一个网格布局和一个水平布局添加进去。

&emsp;&emsp;当然也可以尝试只用 QGridLayout 来完成这次界面的布局，但是效果并不是很好。<br>
&emsp;&emsp;合理的运用这三种布局方式可以在程序设计上事半功倍。

## 3.6 小结

1. QLineEdit 控件为单行文本输入框；
2. 了解四种布局方式：垂直布局 QVBoxLayout、水平布局 QHBoxLayout、表单布局 QFormLayout 和网格布局 QGridLayout；
3. addWidget() 方法用来添加控件，addLayout() 方法用来添加布局；
4. 请记住 QGridLayout 的 addWidget() 语法形式：

```python
addWidget(widget, row, column, rowSpan, columnSpan)
```