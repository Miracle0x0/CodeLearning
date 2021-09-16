# 第八章 下拉选择框 QComboBox 和数字调节框 QSpinBox

## QComboBox

```python
# encoding: utf-8

import sys
from PyQt5.QtWidgets import QApplication, QWidget, QComboBox, QFontComboBox, QLineEdit, QMessageBox, QVBoxLayout


class Demo(QWidget):
    choice = 'a'
    choice_list = ['b', 'c', 'd', 'e']

    def __init__(self):
        super(Demo, self).__init__()

        self.combobox_1 = QComboBox(self)               # 1
        self.combobox_2 = QFontComboBox(self)           # 2

        self.lineEdit = QLineEdit(self)                 # 3

        self.v_layout = QVBoxLayout()

        self.layout_init()
        self.combobox_init()

    def layout_init(self):
        self.v_layout.addWidget(self.combobox_1)
        self.v_layout.addWidget(self.combobox_2)
        self.v_layout.addWidget(self.lineEdit)

        self.setLayout(self.v_layout)

    def combobox_init(self):
        self.combobox_1.addItem(self.choice)            # 4
        self.combobox_2.addItem(self.choice_list)       # 5
        self.combobox_1.currentIndexChanged.connect(lambda: self.on_combobox_func(self.combobox_1)) # 6
        # self.combobox_1.currentTextChanged.connect(lambda: self.on_combobox_func(self.combobox_1))  # 7
        self.combobox_2.currentFontChanged.connect(lambda: self.on_combobox_func(self.combobox_2))

    def on_combobox_func(self, combobox):               # 8
        if combobox == self.combobox_1:
            QMessageBox.information(self, 'ComboBox 1',
                                    '{}: {}'.format(combobox.currentIndex(), combobox.currentText()))
        else:
            self.lineEdit.setFont(combobox.currentFont())


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1-2. 实例化一个 QComboBox 和 QFontComboBox，前者是普通的下拉框，框里是没有内容的，需要添加。而 QFontComboBox 是字体下拉框，继承于 QComboBox，该字体下拉框里会默认有许多字体供选择；
3. 这里实例化一个单行文本输入框，用于测试从字体下拉框中选择一项时，输入框中字体发生的变化；
4-5. addItem() 方法是添加一个选项，而 addItems() 接受一个可循环参数，这里传入了列表 self.choice_list；
6-7. 当下拉框当前选项发生变化的话，则会触发序号变化 currentIndexChanged 信号和文本变化 currentTextChanged 信号，我们在这里进行了信号与槽的连接，注意槽函数是带参数的，所以我们用 lambda 表达式进行处理；
8. 在自定义的槽函数中，我们通过判断 combobox 的种类，若是 self.combobox_1 的话，则出现信息框，并且显示当前文本及文本序号，currentIndex() 方法获取当前文本序号，currentText() 获取当前文本。若是 self.combobox_2 的话，则通过 setFont() 方法将输入框的字体设为当前选中的字体，currentFont() 获取字体下拉框的当前字体。

&emsp;&emsp;运行截图如下：
<div align=center>
<image src='images/8-1-1.png'>
</div>

&emsp;&emsp;点击第一个下拉框，改变选项，出现信息框，1 为序号，b 为文本：
<div align=center>
<image src='images/8-1-2.png'>
<image src='images/8-1-3.png'>
</div>

&emsp;&emsp;点击第二个下拉框换一种字体，然后输入框中的文本就会有相应的字体：
<div align=center>
<image src='images/8-1-4.png'>
<image src='images/8-1-5.png'>
</div>

## QSpinBox

```python
# encoding: utf-8

import sys
from PyQt5.QtWidgets import QApplication, QWidget, QSpinBox, QDoubleSpinBox, QHBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.spinbox = QSpinBox(self)
        self.spinbox.setRange(-99, 99)                              # 1
        self.spinbox.setSingleStep(1)                               # 2
        self.spinbox.setValue(66)                                   # 3
        self.spinbox.valueChanged.connect(self.value_change_func)   # 4

        self.double_spinbox = QDoubleSpinBox(self)                  # 5
        self.double_spinbox.setRange(-99.99, 99.99)
        self.double_spinbox.setSingleStep(0.01)
        self.double_spinbox.setValue(66.66)

        self.h_layout = QHBoxLayout()
        self.h_layout.addWidget(self.spinbox)
        self.h_layout.addWidget(self.double_spinbox)
        self.setLayout(self.h_layout)

    def value_change_func(self):
        decimal_part = self.double_spinbox.value() - int(self.double_spinbox.value())   # 6
        self.double_spinbox.setValue(self.spinbox.value() + decimal_part)               # 7


if __name__ == "__main__":
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 给实例化的 QSpinBox 设置范围，如果不设置的话 QSpinBox 默认范围为 0 ~ 99；
2. 设置步长，即每次点击递增或递减多少值；
3. 设置初始显示值；
4. 每次数字发生变化都会触发 valueChanged 信号；
5. QSpinBox 为整型数字调节框，而 QDoubleSpinBox 为浮点型数字调节框。QDoubleSpinBox 的默认范围为 0.00 ~ 99.99，而小数位默认是两位，不过可以通过 setDecimals(int) 方法来设置小数位数；
6-7. 该槽函数主要是在 QSpinBox 数值发生变化时，将 QDoubleSpinBox 的整数部分设置成 QSpinBox 的值，小数部分保持不变。所以要首先获取 QDoubleSpinBox 的小数部分再进行设置。通过 setValue() 方法可以设置调节框的值，而 value() 方法是获取值。

&emsp;&emsp运行截图如下：
<div align=center>
<image src='images/8-2-1.png'>
</div>
&emsp;&emsp;点击改变左边 QSpinBox 的值，右边 QDoubleSpinBox 值的整数部分也会相应改变：
<div align=center>
<image src='images/8-2-2.png'>
</div>

## 8.3 小结

1. 下拉框介绍了 QComboBox 和 QFontComboBox，后者是从前者继承并专门用来给用户选择字体的控件；
2. 添加选项内容方法为 addItem() 和 addItems()，后者添加可循环对象；
3. 当下拉框当前选项发生改变的时候，会触发 currentIndexChanged 和 currentTextChanged 信号；
4. setFont() 方法可以用来设置一些控件的字体；
5. 数字调节框介绍了 QSpinBox 和 QDoubleSpinBox，前者调节整型数字，后者调节浮点型数字；
6. 当调节框数字发生改变时，会触发 valueChanged 信号；
7. setRanged() 方法用来设置范围，setSingleStep() 方法用来设置步长，setValue() 方法用来设置初始值。