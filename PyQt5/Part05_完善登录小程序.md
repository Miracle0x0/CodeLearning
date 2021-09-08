# 第五章 完善登录框小程序

&emsp;&emsp;在这一章中，我们结合前面所学的知识来完善登录框小程序。<br>
&emsp;&emsp;为方便起见，我们先引入该程序用到的模块和组件：

```python
# encoding: utf-8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QDialog, QLabel, QLineEdit, QPushButton, \
    QGridLayout, QVBoxLayout, QHBoxLayout, QMessageBox
```

## 5.1 登录界面布局

&emsp;&emsp;首先完成登录界面布局，请看下方代码：

```python
class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.resize(300, 100)

        self.user_label = QLabel('Username:', self)
        self.pwd_label = QLabel('Password:', self)
        self.user_line = QLineEdit(self)
        self.pwd_line = QLineEdit(self)
        self.login_button = QPushButton('Log in', self)
        self.signin_button = QPushButton('Sign in', self)

        self.grid_layout = QGridLayout()
        self.h_layout = QHBoxLayout()
        self.v_layout = QVBoxLayout()

        self.layout_init()

    def layout_init(self):
        self.grid_layout.addWidget(self.user_label, 0, 0, 1, 1)
        self.grid_layout.addWidget(self.user_line, 0, 1, 1, 1)
        self.grid_layout.addWidget(self.pwd_label, 1, 0, 1, 1)
        self.grid_layout.addWidget(self.pwd_line, 1, 1, 1, 1)
        self.h_layout.addWidget(self.login_button)
        self.h_layout.addWidget(self.signin_button)
        self.v_layout.addLayout(self.grid_layout)
        self.v_layout.addLayout(self.h_layout)

        self.setLayout(self.v_layout)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

&emsp;&emsp;程序首先将窗口的宽设为 300，长设为 100，接着实例化了几个控件：两个文本控件、两个单行文本输入框和两个按钮；然后搭配使用网格布局管理器、水平布局管理器和垂直布局管理器来完成整个界面的布局。这里不再详细解释代码的意思。<br>
&emsp;&emsp;有一点需要注意一下，我们把布局管理专门放在了一个函数 layout_init() 中，然后只用在初始化函数中加上 layout_init() 就行。把对不同控件的操作分开来放在相应的函数中，这样写不仅可以让代码更加清晰明了，也方便日后维护。<br>
&emsp;&emsp;此时程序运行截图如下：

<div align = center>
<img src="./images/5-5-1-1.png">
</div>

## 5.2 完善单行文本输入框和按钮功能

&emsp;&emsp;该步骤要完成的结果与前面示例类似，不同的是在单行文本输入框中有浅灰色的提示文字，Log in 按钮刚开始无法点击，只能等两个输入框中都有文本输入的时候才可以进行点击。<br>
&emsp;&emsp;首先对输入框功能进行完善。

```python
    def lineEdit_init(self):
        self.user_line.setPlaceholderText('Please enter your username')
        self.pwd_line.setPlaceholderText('Please enter your password')

        self.user_line.textChanged.connect(self.check_input_func)
        self.pwd_line.textChanged.connext(self.check_input_func)
```

&emsp;&emsp;在未输入前，我们会看到输入框上就已经有了一行浅灰色的提示文字，但点击的话浅灰色的文字就会不见。这种功能就是通过 setPlaceholderText() 方法来实现的。在这里还进行了信号和槽的连接，将 QLineEdit 的 textChanged() 信号连接到一个自定义的槽 self.check_input_func 上。textChanged() 信号会在输入框中文本发生变化的时候发出，所以槽函数的任务就是判断两个输入框是否都有文字了：

```python
    def check_input_func(self):
        if self.user_line.text() and self.pwd_line.text():
            self.login_button.setEnabled(True)
        else:
            self.login_button.setEnabled(False)
```

&emsp;&emsp;如果账号框和密码框都有文本（通过 text() 方法获取输入框文本），那就使登录按钮可用（setEnabled(True)），否则登录按钮不可用。<br>
&emsp;&emsp;接下来对按钮进行完善：

```python
    def pushbutton_init(self):
        self.login_button.setEnabled(False)
```

&emsp;&emsp;使刚开始显示的登录按钮不可用，只有等账号框和密码框都有文本的时候才能用（上面的槽函数）。<br>
&emsp;&emsp;当我们点击登录按钮的时候，账号框和密码框都有文本了，那点击后肯定是要验证账号密码是否正确：

```python
    def pushbutton_init(self):
        self.login_button.setEnabled(False)
        self.login_button.clicked.connect(self.check_login_func)
```

&emsp;&emsp;所以我们将登录按钮的 clicked 信号和一个用于检查账号密码是否正确的自定义槽函数连接起来。<br>
&emsp;&emsp;首先我们在程序的最开始处定义一个全局变量 USER_PWD：

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QDialog, QLabel, QLineEdit, QPushButton, \
    QGridLayout, QVBoxLayout, QHBoxLayout, QMessageBox

USER_PWD = {
    'la_vie': 'password'
}
```

&emsp;&emsp;该字典的键 'la_vie' 就是当做账号，值 'password' 就当做密码（之后复杂的程序会使用数据库，这里就先简单定义一个全局变量来使用）。<br>
&emsp;&emsp;然后定义检查账号密码的槽函数：

```python
    def check_login_func(self):
        if USER_PWD.get(self.user_line.text()) == self.pwd_line.text():
            QMessageBox.information(self, 'Information', 'Log in Successfully!')
        else:
            QMessageBox.information(self, 'Wrong', 'Wrong Username or Password!')

        self.user_line.clear()
        self.pwd_line.clear()
```

&emsp;&emsp;将账号框的文本当做 get() 的参数来获取值，然后跟密码框的文本进行比较，若相同则显示信息框提示登录成功，否则显示账号或密码错误。最后无论成功还是失败，都会用 clear() 方法来清空账号框和密码框。<br>
&emsp;&emsp;最后将 self.lineEdit_init() 和 self.pushbutton_init() 放在类的初始化函数中：

```python
class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.resize(300, 100)

        self.user_label = QLabel('Username:', self)
        self.pwd_label = QLabel('Password:', self)
        self.user_line = QLineEdit(self)
        self.pwd_line = QLineEdit(self)
        self.login_button = QPushButton('Log in', self)
        self.signin_button = QPushButton('Sign in', self)

        self.grid_layout = QGridLayout()
        self.h_layout = QHBoxLayout()
        self.v_layout = QVBoxLayout()

        self.lineEdit_init()        # 单行文本输入框
        self.pushbutton_init()      # 按钮
        self.layout_init()
```

&emsp;&emsp;此时程序运行截图如下：

<div align=center>
<image src="./images/5-5-2-1.png">
</div>

&emsp;&emsp;输入 la_vie 和 password，点击 Log in 按钮，则显示信息框提示登录成功。

<div align=center>
<image src="./images/5-5-2-2-succeed.png">
</div>

&emsp;&emsp;输入一个错误的账号或错误的密码，就会显示错误框提示账号或密码错误：

<div align=center>
<image src="./images/5-5-2-2-fail.png">
</div>

点击 OK 后，账号框和密码框文本都被清空，恢复原状：

<div align=center>
<image src="./images/5-5-2-1.png">
</div>

## 5.3 完善注册界面布局及功能

&emsp;&emsp;接下来就是要完善 Sign in 这个按钮的功能。这里我们想的是点击这个按钮后，会出现一个新的界面用于注册。