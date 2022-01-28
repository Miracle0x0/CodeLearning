# 第十七章 事件处理

事件就是由窗口、控件本身或者 PyQt5 自身产生的，配合用户动作的各种响应。“事件”和“信号”非常相似，但并不是一类。<br/>

事件类型种类繁多，这里主要介绍一些常用的事件：**窗口关闭事件处理**、**鼠标事件处理**以及**键盘事件处理**。

## 17.1 窗口关闭事件

当用户在编辑器中编辑时，若没有点击保存直接关闭窗口时（即触发窗口关闭事件），会出现弹框询问是否确认离开。采用 PyQt5 实现类似功能。<br/>

【代码】

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QTextEdit, QPushButton, QMessageBox, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()

        self.is_saved = True                                            # 1

        self.textedit = QTextEdit(self)                                 # 2
        self.textedit.textChanged.connect(self.on_textchanged_func)

        self.button = QPushButton('Save', self)                         # 3
        self.button.clicked.connect(self.on_clicked_func)

        self.v_layout = QVBoxLayout()   
        self.v_layout.addWidget(self.textedit)
        self.v_layout.addWidget(self.button)
        self.setLayout(self.v_layout)

    def on_textchanged_func(self):                      
        if self.textedit.toPlainText(): 
            self.is_saved = False
        else:
            self.is_saved = True

    def on_clicked_func(self):
        self.save_func(self.textedit.toPlainText())
        self.is_saved = True

    def save_func(self, text):          
        with open('saved.txt', 'w') as f:
            f.write(text)

    def closeEvent(self, QCloseEvent):                                  # 4
        if not self.is_saved:
            choice = QMessageBox.question(self, '', 'Do you want to save the text?',
                                          QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel)
            if choice == QMessageBox.Yes:
                self.save_func(self.textedit.toPlainText())
                QCloseEvent.accept()
            elif choice == QMessageBox.No:
                QCloseEvent.accept()
            else:
                QCloseEvent.ignore()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. `is_saved` 变量用于记录用户是否已经进行保存；
2. 实例化一个 `QTextEdit` 控件用于文本编辑，将其 `textChanged` 信号和自定义的槽函数连接起来：

```python
def on_textchanged_func(self):                      
    if self.textedit.toPlainText(): 
        self.is_saved = False
    else:
        self.is_saved = True
```

在槽函数中我们判断每次文本内容发生变化时，textedit 中是否还有文本，若有则将 `is_saved` 变量设为 False，即未保存；若无文本，则将其设为 True。

3. 实例化一个按钮用于保存操作，将 clicked 信号与自定义的槽函数进行连接：

```python
def save_func(self, text):          
    with open('saved.txt', 'w') as f:
        f.write(text)
```

我们将内容保存在当前目录下的 saved.txt 函数中。PyQt5 提供一个 `QFileDialog` 类可以让我们更好的完成保存操作，后续章节会涉及，这里只是先简单的完成下保存功能。

4. 这里我们重定义 QWidget 的窗口关闭函数 `closeEvent()`，如果用户还没有进行保存，则弹出一个 `QMessageBox` 窗口询问是否保存，若用户点击 `Yes`，则调用 save_func 函数进行保存，然后通过 `accept()` 方法来接受关闭窗口操作，窗口随之关闭；若点击 No，则不进行保存，但同样得关闭窗口；若点击 Cancel，也不进行保存，并通过 `ignore()` 方法来忽略这次关闭窗口的操作。

## 17.2 鼠标事件

鼠标移动、按下或者释放动作都会唤起相应的鼠标事件。<br/>

【代码】

```python
import sys
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.button_label = QLabel('No Button Pressed', self)              # 1
        self.xy_label = QLabel('x:0, y:0', self)                           # 2
        self.global_xy_label = QLabel('global x:0, global y:0', self)      # 3

        self.button_label.setAlignment(Qt.AlignCenter)
        self.xy_label.setAlignment(Qt.AlignCenter)
        self.global_xy_label.setAlignment(Qt.AlignCenter)

        self.v_layout = QVBoxLayout()
        self.v_layout.addWidget(self.button_label)
        self.v_layout.addWidget(self.xy_label)
        self.v_layout.addWidget(self.global_xy_label)
        self.setLayout(self.v_layout)

        self.resize(300, 300)
        self.setMouseTracking(True)                                        # 4

    def mouseMoveEvent(self, QMouseEvent):                                 # 5
        x = QMouseEvent.x()
        y = QMouseEvent.y()
        global_x = QMouseEvent.globalX()
        global_y = QMouseEvent.globalY()

        self.xy_label.setText('x:{}, y:{}'.format(x, y))
        self.global_xy_label.setText('global x:{}, global y:{}'.format(global_x, global_y))

    def mousePressEvent(self, QMouseEvent):                                # 6
        if QMouseEvent.button() == Qt.LeftButton:
            self.button_label.setText('Left Button Pressed')
        elif QMouseEvent.button() == Qt.MidButton:
            self.button_label.setText('Middle Button Pressed')
        elif QMouseEvent.button() == Qt.RightButton:
            self.button_label.setText('Right Button Pressed')

    def mouseReleaseEvent(self, QMouseEvent):                              # 7
        if QMouseEvent.button() == Qt.LeftButton:
            self.button_label.setText('Left Button Released')
        elif QMouseEvent.button() == Qt.MidButton:
            self.button_label.setText('Middle Button Released')
        elif QMouseEvent.button() == Qt.RightButton:
            self.button_label.setText('Right Button Released')

    def mouseDoubleClickEvent(self, QMouseEvent):                          # 8
        if QMouseEvent.button() == Qt.LeftButton:
            self.button_label.setText('Left Button Double Clicked')
        elif QMouseEvent.button() == Qt.MidButton:
            self.button_label.setText('Middle Button Double Clicked')
        elif QMouseEvent.button() == Qt.RightButton:
            self.button_label.setText('Right Button Double Clicked')


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. button_label 用于显示鼠标的点击和释放动作；
2. xy_label 用于记录鼠标相对于 QWidget 窗口的坐标；
3. global_xy_label 用于记录鼠标相对于显示屏屏幕的坐标；
4. `setMouseTracking(True)` 方法可以让窗口始终追踪鼠标，否则只能每次等鼠标被点击后，窗口才会开始记录鼠标的动作变化；而鼠标释放后，窗口又不会进行记录了，这样比较麻烦；
5. `mouseMoveEvent()` 为鼠标移动时所触发的响应函数，在函数中，我们通过 `x()` 和 `y()` 方法获取鼠标相对于 QWidget 窗口的坐标，用 `globalx()` 和 `globaly()` 方法获取鼠标相对于显示屏屏幕的坐标；
6. `mousePressEvent()` 为鼠标被按下时所触发的响应函数，在函数中，我们通过 `button()` 方法来确认被按下的键，然后用 button_label 显示被按下的键；
7. `mouseReleaseEvent()` 为鼠标被释放时所触发的响应函数，同理，在函数中，我们通过 `button()` 方法来确认被释放的键，然后用 button_label 显示被释放的键；
8. `mouseDoubleClickEvent()` 为鼠标被双击时所触发的响应函数，同理，在函数中，我们通过 `button()` 方法来确认被双击的键，然后用 button_label 显示被双击的键。

## 17.3 键盘事件

每当用户按下或释放键盘上的任意键时都会触发键盘事件。<br/>

【代码】

```python
import sys
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.pic_label = QLabel(self)  # 1
        self.pic_label.setPixmap(QPixmap('images/keyboard.png'))
        self.pic_label.setAlignment(Qt.AlignCenter)

        self.key_label = QLabel('No Key Pressed', self)  # 2
        self.key_label.setAlignment(Qt.AlignCenter)

        self.v_layout = QVBoxLayout()
        self.v_layout.addWidget(self.pic_label)
        self.v_layout.addWidget(self.key_label)
        self.setLayout(self.v_layout)

    def keyPressEvent(self, QKeyEvent):  # 3
        if QKeyEvent.key() == Qt.Key_Up:
            self.pic_label.setPixmap(QPixmap('images/up.png'))
            self.key_label.setText('Key Up Pressed')
        elif QKeyEvent.key() == Qt.Key_Down:
            self.pic_label.setPixmap(QPixmap('images/down.png'))
            self.key_label.setText('Key Down Pressed')
        elif QKeyEvent.key() == Qt.Key_Left:
            self.pic_label.setPixmap(QPixmap('images/left.png'))
            self.key_label.setText('Key Left Pressed')
        elif QKeyEvent.key() == Qt.Key_Right:
            self.pic_label.setPixmap(QPixmap('images/right.png'))
            self.key_label.setText('Key Right Pressed')

    def keyReleaseEvent(self, QKeyEvent):  # 4
        self.pic_label.setPixmap(QPixmap('images/keyboard.png'))
        self.key_label.setText('Key Released')


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. pic_label 用于设置图片，先将初始化的图片设为 keyboard.png；
2. key_label 用于记录按键状态；
3. `keyPressEvent()` 为键盘某个键被按下时所触发的响应函数，在这个函数中我们判断被按下的键种类，并将 pic_label 设为相应的箭头图片，将 key_board 设为相应的文本；
4. `keyReleasedEvent()` 在键盘上的任意键被释放时所触发的响应函数，在这个函数中，我们将 pic_label 设为初始图片 keyboard.png，并将 key_label 文本设为‘Key Released’。

【提示】<br/>

可以在 QtAssistant 中输入 Qt::key 找到所有键盘值：

![Qt_key](https://gitee.com/Miraclezjy/utoolspic/raw/master/qt-key-2022-1-2821:35:53.png)

## 17.4 小结

1. 本章一共介绍了三种事件类型：窗口关闭事件、鼠标事件和键盘事件，分别是对窗口关闭、鼠标和键盘动作的响应。事件类型还有很多，之后章节会有涉及；

2. `setMouseTracking(True)` 可以让窗口时刻追踪鼠标，而不需要在鼠标被按下时才会进行追踪；

3.  `x()` 和 `y()` 获取鼠标相对于窗口部件的坐标值，而 `globalX()` 和 `globalY()` 获取鼠标相对于显示屏窗口的坐标值；

4. `button()` 方法用于获取鼠标被按下或释放的键，`key()` 方法用于获取键盘被按下或释放的键。