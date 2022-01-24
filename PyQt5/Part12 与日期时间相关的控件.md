# 第十二章 与日期时间相关的控件

本章介绍 `QCalendarWidget` 和 `QDateTimeEdit` 两个控件。

## 12.1 QCalendarWidget

下面来简单显示一个日历控件，点击不同的星期，会显示不同的心情：<br/>

【代码】

```python
import sys
from PyQt5.QtCore import QDate, Qt
from PyQt5.QtWidgets import QApplication, QWidget, QCalendarWidget, QLabel, QVBoxLayout

# 英文系统
# EMOTION = {  # 1
#     'Mon': '(╯°Д°)╯︵ ┻━┻',
#     'Tue': '(╯￣Д￣)╯╘═╛',
#     'Wed': '╭(￣▽￣)╯╧═╧',
#     'Thu': '_(:з」∠)_',
#     'Fri': '(๑•̀ㅂ•́) ✧',
#     'Sat': '( ˘ 3˘)♥',
#     'Sun': '(இ௰இ)'
# }
EMOTION = {  # 1
    '周一': '(╯°Д°)╯︵ ┻━┻',
    '周二': '(╯￣Д￣)╯╘═╛',
    '周三': '╭(￣▽￣)╯╧═╧',
    '周四': '_(:з」∠)_',
    '周五': '(๑•̀ㅂ•́) ✧',
    '周六': '( ˘ 3˘)♥',
    '周日': '(இ௰இ)'
}


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.calendar = QCalendarWidget(self)
        self.calendar.setMinimumDate(QDate(1946, 2, 14))  # 2
        self.calendar.setMaximumDate(QDate(6666, 6, 6))  # 3
        # self.calendar.setDateRange(QDate(1946, 2, 14), QDate(6666, 6, 6))
        # self.calendar.setFirstDayOfWeek(Qt.Monday)                            # 4
        # self.calendar.setSelectedDate(QDate(1946, 2, 14))                     # 5
        self.calendar.setGridVisible(True)  # 6
        self.calendar.clicked.connect(self.show_emotion_func)  # 6

        print(self.calendar.minimumDate())  # 7
        print(self.calendar.maximumDate())
        print(self.calendar.selectedDate())

        self.label = QLabel(self)  # 8
        self.label.setAlignment(Qt.AlignCenter)

        weekday = self.calendar.selectedDate().toString('ddd')  # 9
        self.label.setText(EMOTION[weekday])

        self.v_layout = QVBoxLayout()
        self.v_layout.addWidget(self.calendar)
        self.v_layout.addWidget(self.label)

        self.setLayout(self.v_layout)
        self.setWindowTitle('QCalendarWidget')

    def show_emotion_func(self):  # 10
        weekday = self.calendar.selectedDate().toString('ddd')
        self.label.setText(EMOTION[weekday])


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. 设置一个字典，并将各个星期及对应的颜文字分别作为键值输入；
2. 通过 `setMinimumDate()` 和 `setMaximumDate()` 可以设置日历的最小和最大日期(可用 `setDateRange()` 替代)，传入的参数为 `QDate`。
3. `setFirstDayOfWeek()` 方法可以设置一个星期的第一天，默认第一天为星期天，可传入的参数有：
   - `Qt.Monday`
   - `Qt.Tuesday`
   - `Qt.Wednesday`
   - `Qt.Thursday`
   - `Qt.Friday`
   - `Qt.Saturday`
   - `Qt.Sunday`
4. `setSelectedDate()` 方法可以设置日历初始化时所显示的日期，如果不设置，则默认是当天日期；
5. `setGridVisible(bool)` 方法可以设置是否在日历上显示网格；
6. 当点击到日历上的某个日期时，clicked信号就会被触发。
7. `minimumDate()`、`maximumDate()` 和 `selectedDate()` 分别获取日历的最早日期，最后日期和当前所选日期，类型为 `QDate`；
8. 实例化一个 `QLabel`控件用于显示颜文字；
9. 首先通过 `selectedDate()` 方法获取到当前所选日期，接着通过 `toString(‘ddd‘)` 方法获取星期的缩写，然后作为字典的键获取对应的值(与系统语言相关)；
10. 在槽函数中同理，获取到对应的值后，让 `QLabel` 控件进行显示。

【效果】

![12-1](https://gitee.com/Miraclezjy/utoolspic/raw/master/12-1-2022-1-2321:59:03.png)

## 12.2 QDateTimeEdit

`QDateTimeEdit` 是 `QDateEdit` 和 `QTimeEdit` 的父类，看名字就知道 `QDateTimeEdit` 可以编辑日期和时间，`QDateEdit` 只能编辑日期(年月日)，而 `QTimeEdit` 只能编辑时间(时分秒)，三种控件用法十分类似，以下重点讲`QDateTimeEdit`：

```python
import sys
from PyQt5.QtCore import QDate, QTime, QDateTime
from PyQt5.QtWidgets import QApplication, QWidget, QDateTimeEdit, QDateEdit, QTimeEdit, QVBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()    
        self.datetime_1 = QDateTimeEdit(self)                                           # 1
        self.datetime_1.dateChanged.connect(lambda: print('Date Changed!'))

        self.datetime_2 = QDateTimeEdit(QDateTime.currentDateTime(), self)              # 2
        self.datetime_2.setDisplayFormat('yyyy-MM-dd HH:mm:ss')
        self.datetime_2.timeChanged.connect(lambda: print('Time Changed!'))
        print(self.datetime_2.date())
        print(self.datetime_2.time())
        print(self.datetime_2.dateTime())

        self.datetime_3 = QDateTimeEdit(QDateTime.currentDateTime(), self)              # 3
        self.datetime_3.dateTimeChanged.connect(lambda: print('DateTime Changed!'))
        self.datetime_3.setCalendarPopup(True)

        self.datetime_4 = QDateTimeEdit(QDate.currentDate(), self)                      # 4
        self.datetime_5 = QDateTimeEdit(QTime.currentTime(), self)

        self.date = QDateEdit(QDate.currentDate(), self)                                # 5
        self.date.setDisplayFormat('yyyy/MM/dd')
        print(self.date.date())

        self.time = QTimeEdit(QTime.currentTime(), self)                                # 6
        self.time.setDisplayFormat('HH:mm:ss')
        print(self.time.time())

        self.v_layout = QVBoxLayout()
        self.v_layout.addWidget(self.datetime_1)
        self.v_layout.addWidget(self.datetime_2)
        self.v_layout.addWidget(self.datetime_3)
        self.v_layout.addWidget(self.datetime_4)
        self.v_layout.addWidget(self.datetime_5)
        self.v_layout.addWidget(self.date)
        self.v_layout.addWidget(self.time)

        self.setLayout(self.v_layout)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

