# Python 正则表达式学习

## 第一关：正则表达式基础知识

### 正则模块函数 re.findall()

-   **re.findall()函数**

    -   作用：遍历整个字符串，可以获取其中所有匹配的字符串，返回一个列表。
    -   一般用法：re.findall(r'正则表达式', '要匹配的文本')

-   **示例**

    -   从字符串中匹配单词 to

    ```python
    import re
    text = "0537-146987425,0537-299656897,The moment you think about giving up,think of the reason why you held on so long. Total umbrella for someone else if he, you’re just not for him in the rain.Never put your happiness in someone else’s hands.Sometimes you have to give up on someone in order to respect yourself. aaaa bbbbcc d dddddd"
    print(re.findall(r'to', text))
    ```

    运行结果：

    ```python
    ['to', 'to']
    ```

    </br>

    -   匹配在 text 中以 g 开头的所有单词

    ```python
    print(re.findall(r'\bg\w*?\b',text))
    ```

    运行结果：

    ```python
    ['giving', 'give']
    ```

    </br>

    -   查找字母长度为 4 的单词

    ```python
    print(re.findall(r'\b\w{4}\b',text))
    ```

    运行结果：

    ```python
    ['0537', '0537', 'held', 'long', 'else', 'just', 'rain', 'your', 'else', 'have', 'give', 'aaaa']
    ```

    </br>

    -   查找出 xxxx-xxxxxxxx 格式的数据

    ```python
    print(re.findall(r'\d{4}-\d{8}',text))
    ```

    运行结果：

    ```python
    ['0537-14698742', '0537-29965689']
    ```

### 各种正则表达式元字符的含义

| 元字符 |                  功能说明                   |
| :----: | :-----------------------------------------: |
|   ^    |              匹配字符串的开始               |
|   $    |              匹配字符串的结束               |
|   .    |          匹配换行符以外的任意字符           |
|   \d   |                  匹配数字                   |
|   \b   |             匹配单词头或单词尾              |
|   \w   |        匹配任何字母、数字以及下划线         |
|   \s   | 匹配任何空白字符，包括空格、制表符、换页符  |
|   \B   |         与 \b 相反，匹配非单词边界          |
|   \W   |                 与 \w 相反                  |
|   \S   |                 与 \s 相反                  |
| {m, n} | {} 前的字符或子模式重复至少 m 次，至多 n 次 |

[第一关训练](https://www.educoder.net/tasks/8b76eiaqfhcl)

## 第二关：re 模块中常用的功能函数（一）

### compile()函数

-   功能：编译正则表达式模式，返回一个对象的模式（可以把那些常用的正则表达式编译成正则表达式对象，提高一点效率）
-   格式：re.compile(pattern, flags=0)

    -   pattern: 编译时用的表达式字符串（即正则表达式）
    -   flags: （可选）编译标志位，用于修改正则表达式的匹配方式，如：是否区分大小写，多行匹配等。常用的 flags 有：

        |       标志       |                           含义                           |
        | :--------------: | :------------------------------------------------------: |
        |   re.S(DOTALL)   |             使 . 匹配包括换行在内的所有字符              |
        | re.I(IGNORECASE) |                   使匹配对大小写不敏感                   |
        |   re.L(LOCALE)   |         做本地化识别（locale-aware）匹配，法语等         |
        | re.M(MULTILINE)  |                  多行匹配，影响 ^ 和 $                   |
        |  re.X(VERBOSE)   | 该标志通过给予更灵活的格式以便将正则表达式写得更易于理解 |
        |       re.U       | 根据 Unicode 字符集解析字符，这个标志影响 \w, \W, \b, \B |

-   示例

    ```python
    import re
    text = "The moment you think about giving up,think of the reason why you held on so long."
    text1 = "Life is a journey,not the destination,but the scenery along the should be and the mood at the view."
    rr = re.compile(r'\w*o\w*')
    print(rr.findall(text))     #查找text中所有包含'o'的单词
    print(rr.findall(text1))    #查找text1中所有包含'o'的单词
    ```

    运行结果：

    ```python
    ['moment', 'you', 'about', 'of', 'reason', 'you', 'on', 'so', 'long']
    ['journey', 'not', 'destination', 'along', 'should', 'mood']
    ```

    </br>

### match()函数

-   功能：在字符串刚开始的位置匹配，在开头匹配到目的字符便返回，如果开头没有目的字符将匹配失败，返回 None
-   格式：re.match(pattern, string, flags=0)
-   注：match()函数返回的是一个 match object 对象，而 match object 对象有以下方法：

    -   group(): 返回被正则匹配的字符串
    -   start(): 返回匹配开始的位置
    -   end(): 返回匹配结束的位置
    -   span(): 返回一个元祖包含匹配（开始，结束）的位置
    -   groups(): 返回正则整体匹配的字符串，可以一次输入多个组号，对应组号匹配的字符串

-   示例：

    ```python
    print(re.match('edu','educoder.net').group())
    print(re.match('edu','www.educoder.net').group())
    ```

    运行结果：

    ```python
    edu
    Traceback (most recent call last):
    File "D:/DClionProjects/Miracle/extension.py", line 4, in <module>
        print(re.match('edu', 'www.educoder.net').group())
    AttributeError: 'NoneType' object has no attribute 'group'
    ```

    </br>

### search()函数

-   功能：re.search()函数会在字符串内查找模式匹配，只要找到第一个匹配然后返回。如果字符串没有匹配，则返回 None。
-   格式：re.search(pattern, string, flags=0)
-   注：match() 和 search() 比较类似，它们的区别在于 match() 只匹配字符串的开头，如果开头没有出现目的字符串，即使后面出现了也不会进行匹配；search() 函数会在整个字符内匹配，只要找到一个目的字符就返回。
-   示例

    ```python
    print(re.search('edu','www.educoderedu.net').group())
    print(re.search('eduaaa','www.educoderedu.net').group())
    ```

    运行结果

    ```python
    edu
    Traceback (most recent call last):
    File "D:/DClionProjects/Miracle/extension.py", line 4, in <module>
        print(re.search('eduaaa', 'www.educoderedu.net').group())
    AttributeError: 'NoneType' object has no attribute 'group'
    ```

[第二关训练](https://www.educoder.net/tasks/7sqru6jk3gtw)

## 第三关：re 模块中常用的功能函数（二）

### finditer()函数

-   功能：搜索字符串，返回一个 Match 对象的迭代器（包含匹配的开始和结束位置，如下面的 i 所示）。找到正则匹配的所有子串，把它们作为一个迭代器返回。

-   格式：re.finditer(pattern, string, flags=0)

-   示例

    ```python
    itext = re.finditer(r'\d+','12 edueduedu44coder deducoder, 11skdh   ds 12')      #匹配所有的数字
    for i in itext:
        print(i)
        print(i.group())
        print(i.span())   #span()返回一个元组包含匹配 (开始,结束) 的位置
    ```

    运行结果：

    ```python
    <re.Match object; span=(0, 2), match='12'>  # i
    12                                          # i.group()
    (0, 2)                                      # i.span()
    <re.Match object; span=(12, 14), match='44'>
    44
    (12, 14)
    <re.Match object; span=(31, 33), match='11'>
    11
    (31, 33)
    <re.Match object; span=(43, 45), match='12'>
    12
    (43, 45)
    ```

### split()函数

-   功能：按照能够匹配的子串，将 string 分割后返回列表。
-   格式：re.split(pattern, string)
    可以使用 re.split 来分割字符串，如：re.split(r'\s+', text) 将字符串 text 按空格分割成一个单词列表。
-   示例
    以数字为分割符，将字符串分割：

    ```python
    print(re.split(r'\d+','asas2kdjs4jds5djdfj1djf0'))
    ```

    运行结果

    ```python
    ['asas', 'kdjs', 'jds', 'djdfj', 'djf', '']
    ```

    </br>

### sub()函数

-   功能：使用 repl 替换 string 中的每一个字符串后，返回替换后的字符串。
-   格式：re.sub(pattern, repl, string, count)
-   示例

    ```python
    import re
    text = "aaa,bbb,ccc,ddd"
    print(re.sub(r',', '-', text))
    ```

    运行结果

    ```python
    aaa-bbb-ccc-ddd
    ```

    </br>

### subn()函数

-   功能：返回替换次数。
-   格式：re.subn(pattern, repl, string, count=0, flags=0)
-   示例

    ```python
    print(re.subn('\d','A','1asd2dkjf34'))
    ```

    运行结果

    ```python
    ('AasdAdkjfAA', 4)
    ```

    可以看到，subn() 不仅返回了替换后的字符串，还返回了替换的次数。

[第三关训练](https://www.educoder.net/tasks/3xoqfthzfbgm)
