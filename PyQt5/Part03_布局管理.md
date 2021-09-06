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

&emsp;&emsp;表单布局可以将控件以两列的形式进行排布，左列控件为文本标签，右列为输入型的控件，如 QLineEdit。用这个布局管理器我们可以更快速方便地构写有表单的界面。我们用