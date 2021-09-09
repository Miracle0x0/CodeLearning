# 第六章 文本编辑器 QTextEdit 和文本编辑框 QTextBrowser

## 6.1 同步显示文本

&emsp;&emsp;QTextEdit 用于编辑文本，QTextBrowser 无法编辑，只用于显示。在 QTextEdit 控件生成的界面中输入文字时，在 QTextBrowser 控件生成的界面中会同步显示。请看下方代码：

```python
# encoding: utf_8
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QTextEdit, QTextBrowser, QHBoxLayout, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.edit_label = QLabel('QTextEdit', self)
        self.browser_label = QLabel('QTextBrowser', self)
        self.text_edit = QTextEdit(self)
        self.text_browser = QTextBrowser(self)

        self.edit_v_layout = QVBoxLayout()
        self.browser_v_layout = QVBoxLayout()
        self.all_h_layout = QHBoxLayout()

        self.layout_init()
        self.text_edit_init()

    def layout_init(self):
        self.edit_v_layout.addWidget(self.edit_label)
        self.edit_v_layout.addWidget(self.text_edit)

        self.browser_v_layout.addWidget(self.browser_label)
        self.browser_v_layout.addWidget(self.text_browser)

        self.all_h_layout.addLayout(self.edit_v_layout)
        self.all_h_layout.addLayout(self.browser_v_layout)

        self.setLayout(self.all_h_layout)

    def text_edit_init(self):
        self.text_edit.textChanged.connect(self.show_text_func)     # 1

    def show_text_func(self):
        self.text_browser.setText(self.text_edit.toPlainText())     # 2


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

&emsp;&emsp;程序非常简单。通过实例化两个 QLabel、一个 QTextEdit 以及一个 QTextBrowser 再通过垂直布局和水平布局就可以完成整个界面。关键点是在信号和槽的连接上。<br>

1. 将 self.text_edit 的 textChanged 信号连接到自定义的槽函数上。也就是说当 self.text_edit 中的文本发生改变的时候，就会发出 textChanged 信号，然后调用函数 show_text_func() 槽函数。<br>
2. 在槽函数中我们通过 setText() 方法将 self.text_browser 的文本设为 self.text_edit 的文本，而 self.text_edit 中的文本通过 toPlainText() 获取，而不是 text()。

&emsp;&emsp;有趣的是，当我们在编辑框中输入 Html 代码时，右边的浏览框会对其执行：

<div align=center>
<image src="images/6-1-1.png">
</div>

## 6.2 小结

1. QTextEdit 用来编辑文本，QTextBrowser 用来显示文本；
2. setText() 用来设置文本，toPlainText() 用来获取文本，这两个控件都有这些方法；
3. 浏览框会执行 Html 代码。
