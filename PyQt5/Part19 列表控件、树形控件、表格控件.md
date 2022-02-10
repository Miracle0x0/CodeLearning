# 第十九章 列表控件、树形控件、表格控件

列表控件可以让我们以列表形式呈现内容，使界面更加有序美观。`QListWidget` 列表控件应当与 `QListWidgetItem` 一起使用，后者作为项被添加入列表控件中，也就是说列表控件中的每一项都是一个 `QListWidgetItem`。`QListWidget` 是一个基于项（Item-based）的控件。<br/>

同样基于项的控件还有 `QTreeWidget` 树形控件和 `QTableWidget` 表格控件，前者以树形方式呈现内容，并于 `QTreeWidgetItem` 搭配使用；后者以表格形式呈现内容，并于 `QTableWidgetItem` 一起使用。

## 19.1 列表控件 QListWidget

左侧列表为待选择项，双击后会显示在右侧列表中；双击右侧列表中的某项可以取消选择。<br/>

【代码】

```python
import sys
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QListWidget, QListWidgetItem, QHBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.pic_label = QLabel(self)                       # 1
        self.pic_label.setPixmap(QPixmap('arrows/forward_flat.png'))

        self.listwidget_1 = QListWidget(self)               # 2
        self.listwidget_2 = QListWidget(self)
        self.listwidget_1.doubleClicked.connect(lambda: self.change_func(self.listwidget_1))
        self.listwidget_2.doubleClicked.connect(lambda: self.change_func(self.listwidget_2))

        for i in range(6):                                  # 3
            text = 'Item {}'.format(i)
            self.item = QListWidgetItem(text)
            self.listwidget_1.addItem(self.item)

        self.item_6 = QListWidgetItem('Item 6', self.listwidget_1)  # 4

        self.listwidget_1.addItem('Item 7')                         # 5
        str_list = ['Item 9', 'Item 10']
        self.listwidget_1.addItems(str_list)

        self.item_8 = QListWidgetItem('Item 8')                     # 6
        self.listwidget_1.insertItem(8, self.item_8)
        # self.listwidget_1.insertItem(8, 'Item 8')

        self.h_layout = QHBoxLayout()
        self.h_layout.addWidget(self.listwidget_1)
        self.h_layout.addWidget(self.pic_label)
        self.h_layout.addWidget(self.listwidget_2)
        self.setLayout(self.h_layout)

    def change_func(self, listwidget):                              # 7
        if listwidget == self.listwidget_1:
            item = QListWidgetItem(self.listwidget_1.currentItem())
            self.listwidget_2.addItem(item)
            print(self.listwidget_2.count())
        else:
            self.listwidget_2.takeItem(self.listwidget_2.currentRow())
            print(self.listwidget_2.count())


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```

1. pic_label 用于显示图片；
2. 实例化两个 `QListWidget`，listwidget_1 放在左边用于显示可选的内容，listwidget_2 放在右边用于显示被双击的项。然后将这两个 `QListWidget` 控件的 `doubleClicked` 信号和自定义的槽函数连接起来，每当双击 `QListWidget` 中的某项时，就会触发该槽函数；
3. 循环创建六个 `QListWidgetItem`，并通过调用 `addItem(QListWidgetItem)` 将其添加到 listwidget_1 中；
4. 也可以通过实例化时直接指定父类的方式进行添加；
5. 也可以不用 `QListWidgetItem`，直接调用 `addItem(str)` 方法来添加一项内容，也可以使用 `addItem(Iterable)` 来添加一组内容（但若要让项呈现更多功能的话，还是应该选择 `QListWidgetItem`）；
6. 通过 `insertItem(row, QListWidgetItem)` 方法可以在指定行中加入一项内容；
7. 槽函数

## 19.2 树形控件 QTreeWidget

【代码】

```python
import sys
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QWidget, QTreeWidget, QTreeWidgetItem, QLabel, QHBoxLayout


class Demo(QWidget):
    def __init__(self):
        super(Demo, self).__init__()
        self.resize(500, 300)
        self.label = QLabel('No Click')                         # 1

        self.tree = QTreeWidget(self)                           # 2
        self.tree.setColumnCount(2)
        self.tree.setHeaderLabels(['Install Components', 'Test'])
        self.tree.itemClicked.connect(self.change_func)

        self.preview = QTreeWidgetItem(self.tree)               # 3
        self.preview.setText(0, 'Preview')

        # self.preview = QTreeWidgetItem()
        # self.preview.setText(0, 'Preview')
        # self.tree.addTopLevelItem(self.preview)

        self.qt5112 = QTreeWidgetItem()                         # 4
        self.qt5112.setText(0, 'Qt 5.11.2 snapshot')
        self.qt5112.setCheckState(0, Qt.Unchecked)
        self.preview.addChild(self.qt5112)

        choice_list = ['macOS', 'Android x86', 'Android ARMv7', 'Sources', 'iOS']
        self.item_list = []
        for i, c in enumerate(choice_list):                     # 5
            item = QTreeWidgetItem(self.qt5112)
            item.setText(0, c)
            item.setCheckState(0, Qt.Unchecked)
            self.item_list.append(item)

        self.test_item = QTreeWidgetItem(self.qt5112)           # 6
        self.test_item.setText(0, 'test1')
        self.test_item.setText(1, 'test2')

        self.tree.expandAll()                                   # 7

        self.h_layout = QHBoxLayout()
        self.h_layout.addWidget(self.tree)
        self.h_layout.addWidget(self.label)
        self.setLayout(self.h_layout)

    def change_func(self, item, column):
        self.label.setText(item.text(column))                   # 8

        print(item.text(column))
        print(column)
        if item == self.qt5112:                                 # 9
            if self.qt5112.checkState(0) == Qt.Checked:
                [x.setCheckState(0, Qt.Checked) for x in self.item_list]
            else:
                [x.setCheckState(0, Qt.Unchecked) for x in self.item_list]
        else:                                                   # 10
            check_count = 0
            for x in self.item_list:
                if x.checkState(0) == Qt.Checked:
                    check_count += 1

            if check_count == 5:
                self.qt5112.setCheckState(0, Qt.Checked)
            elif 0 < check_count < 5:
                self.qt5112.setCheckState(0, Qt.PartiallyChecked)
            else:
                self.qt5112.setCheckState(0, Qt.Unchecked)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    demo = Demo()
    demo.show()
    sys.exit(app.exec_())
```
