# 第一章 HTML5 介绍

## 1.1 代码初体验

## 1.2 html 和 css 的关系

1. css 是用来修饰 html 样式的；
2. html 本身有一些默认样式，如果我们想要改变 html 标签的样式，就需要借助 css；
3. html + css 构成了我们网页的基本页面结构和样式。

## 1.3 标签的语法

1. **标签**由英文尖括号`<`和`>`括起来，如`<html>`就是一个标签；
2. html 中的标签一般都是成对出现的，分**开始标签**和**结束标签**，结束标签比开始标签多了一个`/`；例如：
   (1)`<p></p>`
   (2)`<div></div>`
   (3)`<span></span>`

3. 标签与标签之间是可以嵌套的，但先后顺序必须保持一致，如：`<div>`里嵌套`<p>`，那么`</p>`必须放在`</div>`的前面；
4. HTML 标签不区分大小写，`<h1>`和`<H1>`是一样的，但建议小写，因为大部分程序员都以小写为准。

## 1.4 html5 文档结构

1. **`<!DOCTYPE html>`**：文档类型声明，表示该文件为 HTML5 文件。`<!DOCTYPE>`声明必须是 HTML 文档的第一行，位于`<html>`标签之前；

2. **`<html></html>`标签对**：`<html>`标签位于 HTML 文档的最前面，用来标识 HTML 文档的开始；`</html>`标签位于 HTML 文档的最后面，用来标识 HTML 文档的结束；这两个标签对成对存在，中间的部分是文档的头部和主题；

3. **`<head></head>`标签对**：标签包含有关 HTML 文档的信息，可以包含一些辅助性标签。如`<title></title>`，`<link /><meta />`，`<style></style>`，`<script></script>`等，但是浏览器除了会在标题栏显示`<title>`元素的内容外，不会向用户显示 head 元素内的其他任何内容。

4. **`<body></body>`标签对**：它是 HTML 文档的主体部分，在此标签中可以包含`<p>` `<h1>` `<br>`等众多标签，`<body>`标签出现在`</head>`标签之后，且必须在闭标签`</html>`之前闭合。

## 1.5 认识 head 标签

1. `head`标签为双标签，有尾标签，即`<head></head>`；
2. `head`标签为头部标签，通常用来嵌套`meta`、`title`、`style`等标签；
3. `title`标签：在`<title>`和`</title>`标签之内的文字内容是网页的标题信息，它会出现在浏览器的标题栏中。网页的 title 标签用于告诉用户和搜索引擎这个网页的主要内容是什么，搜索引擎可以通过网页标题，迅速判断出网页的主题。每个网页的内容都是不同的，每个网页都应该有一个独一无二的 title；
4. `meta charset="UTF-8"`设置当前文件字符的字符编码；
5. `style`标签：双标签中设置当前文件样式。

## 1.6 认识 body 标签

&emsp;&emsp;在网页上要展示出来的页面内容一定要放在 body 标签中。

## 1.7 html 文件注释

&emsp;&emsp;html 中代码注释的语法为：`<!--注释文字-->`

# HTML5 语义化标签

## 2.1 语义化，让你的网页更好的被搜索引擎理解

&emsp;&emsp;**标签的用途**：我们学习网页制作时，常常会听到一个词：**语义化**。那么什么叫做语义化呢？说得通俗点就是：明白每个标签的用途（在什么情况下使用此标签合理）。比如，网页上的文章的**标题**就可以用标题标签，网页上的各个栏目的**栏目名称**也可以使用标题标签。文章中内容的段落就得放在**段落标签**中等等。<br/>
&emsp;&emsp;语义化可以带给我们的好处有：

1. 更容易被搜索引擎收录；
2. 更容易让屏幕阅读器读出网页内容。

## 2.2 段落标签

&emsp;&emsp;如果想在网页上显示文章，这时就需要`<p>`标签了，把文章的段落放到`<p>`标签中。语法：
`<p>段落文本</p>`<br/>
&emsp;&emsp;注意一段文字一个`<p>`标签，如在一篇新闻文章中有 3 段文字，就要把这 3 个段落分别放到 3 个`<p>`标签中。

## 2.3 使用`<span>`标签自定义语义

&emsp;&emsp;`<span>`标签是**没有语义**的，它可以用来**设置单独的样式**。<br/>
&emsp;&emsp;语法：`<span>文本</span>`

## 2.4 使用`<hx>`标签为网页增加标题

&emsp;&emsp;我们使用`<hx>`标签来制作**文章的标题**。<br/>
&emsp;&emsp;标题标签一共有 6 个，`h1 h2 h3 h4 h5 h6`分别为一级标题、二级标题、三级标题、四级标题、五级标题和六级标题，并且依据重要性递减。`<h1>`是最高的等级。<br/>
&emsp;&emsp;语法：`<hx>标题文本</hx>`，x $\in$ [1, 6]<br/>
&emsp;&emsp;此外，网页上各个**栏目的标题**也可以使用标签。<br/>
&emsp;&emsp;标题标签的样式都会加粗，`h1`标签字号最大，`h2`标签字号相对`h1`要小，以此类推，`h6`标签的字号最小。

## 2.5 使用`<div>`标签自定义块

&emsp;&emsp;在网页制作过程中，可以把一些独立的逻辑部分划分出来，放在一个`<div>`标签中，这个`<div>`标签的作用就相当于一个容器。<br/>
&emsp;&emsp;语法：`<div>...</div>`<br/>
&emsp;&emsp;确定逻辑部分：<br/>
&emsp;&emsp;什么是逻辑部分？它是页面上相互关联的一组元素。如网页中的独立的**栏目板块**，就是一个典型的逻辑部分。

## 2.6 `<header>`标签定义头部区域

## 2.7 `<footer>`标签定义底部区域

## 2.8 `<section>`定义区段

## 2.9 `<aside>`定义侧边栏区域

# 第三章 HTML5 效果标签

## 3.1 使用`<br>`标签实现换行效果

&emsp;&emsp;`<br/>`标签的作用相当于 word 文档里的回车。<br/>
&emsp;&emsp;与之前学过的标签不一样，`<br/>`标签是一个空标签，没有 HTML 内容的标签就是空标签，空标签只需要写一个开始标签，这样的标签有 `<br/>`、`<hr/>`和`<img />`。<br/>
&emsp;&emsp;注意，在 html 中是忽略**回车**和**空格**的，输入的回车和空格不会直接显示。<br/>
&emsp;&emsp;总结：在 html 代码中输入回车、空格都是没有作用的。在 html 文本中想输入回车换行，就必须输入`<br/>`。

## 3.2 使用特殊字符`&nbsp;`实现空格标签

&emsp;&emsp;在 html 代码中要想输入空格，必须写入`&nbsp;`。<br/>
&emsp;&emsp;语法：`&nbsp;`

## 3.3 使用`<hr>`标签实现水平线标签

&emsp;&emsp;在信息展示时，有时会需要加一些用于分隔的横线，这样会使文章看起来整齐一些。<br/>
&emsp;&emsp;注意：

1. `<hr/>`标签和`<br/>`标签一样也是一个**空标签**，所有只有一个开始标签，没有结束标签；
2. `<hr/>`标签在浏览器中的默认样式线条比较粗，颜色为灰色，可以使用 css 样式表对其进行修改；
3. 一般使用`<hr/>`而不是`<hr>`。

# 第四章 HTML5 列表标签

## 4.1 使用`<ul><li>`标签实现无序列表

&emsp;&emsp;在浏览网页时，你会发现网页上有很多信息的列表，如新闻列表、图片列表等。这些列表就可以使用 ul-li 标签来完成。ul-li 是**没有前后顺序**的信息列表。<br/>
&emsp;&emsp;语法：

```HTML
<ul>
    <li>信息</li>
    <li>信息</li>
    ......
</ul>
```

&emsp;&emsp;ul-li 在网页中显示的默认样式一般为：每项 li 前都自带一个圆点。

## 4.2 使用`<ol><li>`标签实现有序列表

&emsp;&emsp;如果想在网页中展示**有前后顺序**的信息列表，就可以使用`<ol>`标签来制作有序列表。<br/>
&emsp;&emsp;语法：

```HTML
<ol>
    <li>信息</li>
    <li>信息</li>
    ...
</ol>
```

&emsp;&emsp;`<ol>`在网页中显示的默认样式一般为：每项`<li>`前都自带一个序号，序号默认从 1 开始。

# 第五章 HTML5 图片，链接及表格标签

## 5.1 使用`<img>`标签为网页添加图片

&emsp;&emsp;在网页制作中，为了使网页更加美观，可以使用`<img>`标签来插入图片。<br/>
&emsp;&emsp;语法：

```HTML
<img src="图片地址" alt="下载失败时的替换文本" title="提示文本">
```

1. **src**：标识图像的位置；
2. **alt**：指定图像的描述性文本，当图像不可见（或下载不成功）时，可看到该属性指定的文本；
3. **title**：提供在图像可见时对图像的描述（鼠标划过图片时显示的文本）；
4. 图像可以是 GIF、PNG、JPEG 格式的图像文件。

## 5.2 使用`<a>`标签为网页添加新标签

&emsp;&emsp;使用`<a>`标签可以实现超链接，它在网页制作中无处不在，只要有链接的地方就会有这个标签。<br/>
&emsp;&emsp;语法：

```HTML
<a href="目标网址" title="鼠标划过显示的文本">链接显示的文本</a>
```

&emsp;&emsp;`title`属性的作用是鼠标滑过链接文字时会显示这个属性的文本内容。这个属性在实际网页开发中作用很大，主要方便搜索引擎了解链接地址的内容（语义化更友好）。<br/>
&emsp;&emsp;此外，只要为文本加入了`a`标签后，文本颜色为蓝色（点击后变为紫色），后面可以通过 css 样式自定义。

## 5.3 在新建浏览器窗口中打开链接

&emsp;&emsp;`a`标签有`target`属性，代表打开网页的方式，可选值有`_self`和`_blank`，默认值为`_self`，代表在当前页面打开链接，`_blank`代表在新窗口打开链接。例如：

```HTML
    <a href="https://www.baidu.com/" target="_self">百度（当前窗口）</a>
    <a href="https://www.baidu.com/" target="_blank">百度（新窗口）</a>
```

## 5.4 使用`table`标签为网页添加表格

&emsp;&emsp;创建表格的四个元素：`table`、`tr`、`th`、`td`。<br/>

1. `<table>...</table>`：整个表格以`<table>`标记开始，`</table>`标记结束；
2. `<tr>...</tr>`：表格的一行。即，有几对 tr，表格就有几行；
3. `<td>...</td>`：表格的一个单元格，一行中包含几对 td 就有几列；
4. `<th>...</th>`：表格头部的一个单元格，表格表头；
5. 表格中列的个数，取决于一行中数据单元格的个数；
6. `border`属性可以为表格添加边框，属性值为数字。

&emsp;&emsp;注意：

1. `table`标签用来定义整个表格，为双标签，必须有结束标签；
2. `table`标签里面可以放`caption`标签和`tr`标签；
3. `caption`标签用来定义表格的标题；
4. `tr`标签用来设置表格的行，`tr`里面只能放`th`或者`td`标签，一组`tr`标签代表一行；
5. `th`用来设置表格的标题，会加粗居中显示，也就是`th`标签中的文本默认为粗体并且居中显示；
6. `td`用来设置表格的列，一组`td`标签代表一列；
7. table 表格在没有设置 border 属性之前，在浏览器中显示是没有表格线的。

&emsp;&emsp;示例：

```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>学习表格标签</title>
</head>

<body>
    <table border="1">
        <tr>
            <th>知识点</th>
            <th>重要程度</th>
            <th>难度</th>
            <th>学习周期</th>
        </tr>
        <tr>
            <td>html</td>
            <td>5星</td>
            <td>3星</td>
            <td>7天</td>
        </tr>
        <tr>
            <td>css</td>
            <td>5星</td>
            <td>4星</td>
            <td>10天</td>
        </tr>
        <tr>
            <td>js</td>
            <td>5星</td>
            <td>5星</td>
            <td>20天</td>
        </tr>
    </table>
</body>

</html>
```

&emsp;&emsp;显示效果：
//此处应插入图片

## 5.5 使用 thead、tbody、tfoot 定义表格

&emsp;&emsp;创建表格的三个区域：thead、tbody、tfoot。<br/>

1. `<thead>...</thead>`：`<thead>`标签定义表格的表头，该标签用于组合 HTML 表格的表头内容；
2. `<tbody>...</tbody>`：如果不加` <thead>``<tbody>``<tfoot> `, table 表格加载完后才显示。加上这些表格结构， tbody 包含行的内容下载完优先显示，不必等待表格结束后在显示，同时如果表格很长，用 tbody 分段，可以一部分一部分地显示。（通俗理解 table 可以按结构一块块的显示，不在等整个表格加载完后显示。）
3. `<tfoot>`元素用于对 HTML 表格中的表注（页脚）内容进行分组；
4. thead、tfoot 以及 tbody 元素使您有能力对表格中的行进行分组。当您创建某个表格时，您也许希望拥有一个标题行，一些带有数据的行，以及位于底部的一个总计行。这种划分使浏览器有能力支持独立于表格标题和页脚的表格正文滚动。当长的表格被打印时，表格的表头和页脚可被打印在包含表格数据的每张页面上。

# 第六章 HTML5 表单标签，与浏览者交互

## 6.1 使用`<form>`创建表单

&emsp;&emsp;网站通过 HTML 表单（form）与用户交互。表单可以把浏览者输入的数据传送到服务器端，这样服务器端程序就可以处理表单传过来的数据。<br/>
&emsp;&emsp;语法：

```HTML
<form method="传送方式" action="服务器文件">
```

1. **`<form>`**：`<form>`标签是成对出现的，以`<form>`开始，以`</form>`结束；
2. **`action`**：浏览者输入的数据被传送到的地方，比如一个 PHP 页面；
3. **`method`**：数据传送的方式（get / post）。

&emsp;&emsp;示例：

```HTML
<form method="post" action="save.php">
        <label for="username">用户名:</label>
        <input type="text" name="username" />
        <label for="pass">密码:</label>
        <input type="password" name="pass" />
</form>
```

&emsp;&emsp;注意：

1. 所有表单控件（文本框、文本域、按钮、单选框、复选框等）都必须放在`<form></form>`标签之间（否则用户输入的数据可能提交不到服务器上）；
2. `method: post / get`属于后端程序员考虑的问题，详见……

## 6.2 文本输入框、密码输入框、

&emsp;&emsp;当用户要在表单中键入字母、数字等内容时，就会用到**文本输入框**。文本框也可以转化为**密码输入框**。<br/>
&emsp;&emsp;语法：

```HTML
<form>
   <input type="text/password" name="名称" value="文本" />
</form>
```

&emsp;&emsp;说明：

1. `type`：

    - 当`type`为**text**时，输入框为**文本输入框**
    - 当`type`为**password**时，输入框为**密码输入框**

2. `name`：为文本框命名，以备后台程序 ASP、PHP 使用；
3. `value`：为文本输入框设置默认值（一般起到提示作用）。

&emsp;&emsp;示例：

```HTML
<form>
    姓名：
    <input type="text" name="myName">
    <br/>
    密码：
    <input type="password" name="pass">
</form>
```

&emsp;&emsp;效果：
//此处应有图片

## 6.3 `placeholder`属性的使用

&emsp;&emsp;占位符属性`placeholder`属于`input`标签。有时候需要提示用户输入框需要输入的内容，这时就会用到占位符，比如下面的效果：
//此处应有图片

&emsp;&emsp;说明：

1. `placeholder`属性为输入框占位符，里面可以放提示的输入信息；
2. `placeholder`属性的值可以任意填写，当输入框输入内容时，占位符内容消失；输入框无内容时，占位符内容显示；
3. 占位符内容不是输入框真正的内容。

## 6.4 数字输入框

&emsp;&emsp;数字框`number`类型属于`input`标签。效果如下：//此处应有图片<br/>
&emsp;&emsp;说明：

1. `input`的`type`属性设置为`number`，则表示该输入框的类型为数字；
2. 数字框只能输入数字，输入其它字符无效；
3. 数字框最右侧会有一个加减符号，可以调整输入数字的大小，不同浏览器表现不一致。

## 6.5 网址输入框

&emsp;&emsp;网址框`url`类型属于`input`标签。效果如下：//此处应有图片<br/>
&emsp;&emsp;说明：

1. `input`的`type`属性设置为`url`，则表示输入框的类型为网址；
2. 网址框的值需以 http:// 或 https:// 开头，且后面必须有内容，否则表单提交的时候会报错误提示。

## 6.6 邮箱输入框

&emsp;&emsp;邮箱框`email`类型属于`input`标签。效果如下：//此处应有图片<br/>
&emsp;&emsp;说明：

1. `input`的`type`属性设置为`email`，则表示该输入框的类型为邮箱；
2. 邮箱框的值必须包含`@`；
3. 邮箱框的值`@`之后必须有内容，否则会报错误提示。

## 6.7 使用`<textarea>`标签创建文本域

&emsp;&emsp;当用户需要在表单中输入大段文字时，需要用到文本输入域。<br/>
&emsp;&emsp;语法：

```HTML
<textarea rows="行数" cols="列数">文本</textarea>
```

&emsp;&emsp;说明：

1. `textarea`标签是成对出现的，以`<textarea>`标签开始，以`</textarea>`标签结束；
2. **`cols`**：多行输入域的**列数**；
3. **`rows`**：多行输入域的**行数**；
4. 在`<textarea></textarea>`标签之间可以输入默认值。

&emsp;&emsp;示例：

```HTML
<form  method="post" action="save.php">
    <label>联系我们</label>
    <textarea cols="50" rows="10">在这里输入内容...</textarea>
</form>
```

&emsp;&emsp;注意：这两个属性可以用 css 样式的 width 和 height 来代替：col 用 width，row 用 height 来代替。

## 6.8 使用`<label>`标签

&emsp;&emsp;`label`标签不会向用户呈现任何特殊效果，它的作用是为鼠标用户改进了可用性。如果你在`label`标签内点击文本，就会出发此控件。也就是说，当用户单击选中该`label`标签时，浏览器就会自动将焦点转到和标签相关的表单控件上（就自动选中和该`label`标签相关联的表单控件上）。<br/>
&emsp;&emsp;语法：

```HTML
<label for="控件id名称">
```

&emsp;&emsp;注意：标签的**for 属性中的值**应当与相关控件的**id 属性值**相同。<br/>
&emsp;&emsp;示例：

```HTML
<form>
    <label for="email">输入你的邮箱地址</label>
    <input type="email" id="email" placeholder="Enter email">
</form>
```

## 6.9 单选框、复选框

&emsp;&emsp;在使用表单设计调查表时，为了减少用户的操作，使用选择框是一个好主意。HTML 中有两种选择框，即**单选框**和**复选框**，两者的区别是**单选框**中的选项用户只能选择一项，而**复选框**中用户可以选择任意项，包括全选。<br/>
&emsp;&emsp;语法：

```HTML
<input type="radio/checkbox" value="值" name="名称" checked="checked"/>
```

&emsp;&emsp;说明:

1. **`type`**

    - 当`type`为`radio`时，控件为**单选框**
    - 当`type`为`checkbox`时，控件为**复选框**

2. **`value`**：提交数据到服务器的值（后台程序 PHP 使用）；
3. **`name`**：为控件命名，以备后台程序 ASP、PHP 使用；
4. **`checked`**：当设置`checked="checked"`时，该选项被默认选中。

&emsp;&emsp;注意：**同一组**的单选按钮，`name`取值**一定要一致**，这样同一组的单选按钮才可以起到单选的作用。

## 6.10 使用`select`、`option`标签创建下拉菜单

&emsp;&emsp;下拉列表在网页中也常会用到，它可以有效的节省网页空间。它既可以单选，又可以多选。示例如下：

```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>select下拉框</title>
</head>

<body>
    <form>
        <select>
            <option value="看书">看书</option>
            <option value="旅游">旅游</option>
            <option value="运动">运动</option>
            <option value="购物" selected="selected">购物</option>
        </select>
    </form>
</body>

</html>
```

&emsp;&emsp;说明：

1. `select`和`option`标签都是双标签，总是成对出现；
2. `select`标签里面只能放`option`标签，表示下拉列表的选项；
3. `option`标签放选项内容，不放置其它标签；
4. `value`：

```HTML
<option value="提交值（向服务器提交的值）">选项（显示的值）</option>
```

5. `selected="selected"`：设置了该属性，则选项默认被选中。

## 6.11 提交按钮

&emsp;&emsp;在表单中有两种按钮可以使用，分别为：提交按钮、重置按钮。当用户需要提交表单信息到服务器时，需要用到**提交按钮**。<br/>
&emsp;&emsp;语法：

```HTML
<input type="submit" value="提交">
```

-   `type`：只有当`type`值设置为`submit`时，按钮才有提交作用
-   `value`：按钮上显示的文字

&emsp;&emsp;示例：

```HTML
<form method="post" action="save.php">
    <label for="myName">姓名：</label>
    <input type="text" value=" " name="myName " />
    <input type="submit" value="提交" name="submit" />
</form>
```

## 6.12 使用重置按钮，重置表单信息

&emsp;&emsp;当用户输入有误时，可能需要重置表单信息到初始时的状态，可以使用`重置按钮`使输入框恢复到初始状态，只需要把`type`设置为`reset`。<br/>
&emsp;&emsp;语法：

```HTML
<input type="reset" value="重置">
```

-   `type`：只有当`type`设置为`reset`时，按钮才有重置作用
-   `value`：按钮上显示的文字

&emsp;&emsp;示例：

```HTML
<form method="post" antion="save.php">
    <label for="myName">姓名：</label>
    <input type="text" value=" " name="myName" />
    <input type="reset" value="重置" name="resetBtn" />
</form>
```

# 第七章 CSS3 介绍，为网页添加样式

## 7.1 认识 CSS 样式

&emsp;&emsp;CSS 全称为**层叠样式表（Cascading Style Sheets）**，它主要用于定义 HTML 内容在浏览器内的显示样式，如文字大小、颜色、字体加粗等。<br/>
&emsp;&emsp;如下列代码：

```CSS
p {
    font-size: 12px;
    color: red;
    font-weight: bold;
}
```

&emsp;&emsp;使用 css 样式的一个好处是通过定义某个样式，可以让不同网页位置的文字有着统一的字体、字号或者颜色等。

## 7.2 CSS 样式的优势

&emsp;&emsp;为什么使用 css 样式来设置网页的外观样式呢？比如说我们想把“超酷的互联网”、“服务及时贴心”、“有趣易学”这三个短语的文本颜色设置为红色，这时就可以通过设置样式来设置，而且只需要编写一条 css 样式语句。<br/>

```CSS
span {
    color:red;
}
```

## 7.3 CSS 代码语法

&emsp;&emsp;css 样式由**选择符**和**声明**组成，而声明又由**属性**和**值**组成，如下面的示例：

```CSS
p { color: blue; }
```

&emsp;&emsp;上面的代码中，p 为选择符，{} 包括的内容为声明，color 为属性，blue 为值。<br/>

-   **选择符**：又称选择器，指明网页中要应用样式规则的元素，如本例中是网页中所有的段（p）的文字将变成蓝色，而其他的元素（如 ol）不会受到影响。
-   **声明**：在英文大括号 {} 中的的就是声明，属性和值之间用英文冒号“:”分隔。当有多条声明时，中间可以英文分号“;”分隔，如下所示：

```CSS
p { font-size: 12px; color: red; }
```

&emsp;&emsp;注意：

1. 最后一条声明可以没有分号，但是为了以后修改方便，一般也加上分号；
2. 为了使样式更加容易阅读，可以将每条代码写在一个新行内，如下所示：

```CSS
p {
    font-size: 12px;
    color: red;
}
```

## 7.4 CSS 注释代码

&emsp;&emsp;就像在 HTML 的注释一样，在 CSS 中也有注释语句：用`/*注释语句*/`来标明（`Html 中使用<!--注释语句-->`)。如下所示：

```CSS
/*设置段落默认格式*/
p {
    font-size: 12px;
    color: red;
}
```

## 7.5 CSS 样式

&emsp;&emsp;从 css 样式代码插入的形式来看，css 样式基本上可以分为三种：**内联式**、**嵌入式**和**外部式**。

### 7.5.1 内联式 CSS 样式

&emsp;&emsp;**内联式** css 样式表就是把 css 代码直接写在现有的 HTML 标签中，如以下代码：

```CSS
<p style="color:red">这里文字是红色。</p>
```

&emsp;&emsp;注意要写在元素的开始标签里，并且 css 样式代码要写在 `style=""` 的双引号中，如果有多条 css 样式代码设置可以写在一起，如以下代码：

```CSS
<p style="color:red; font-size: 12px;">文字内容</p>
```

### 7.5.2 嵌入式 CSS 样式

&emsp;&emsp;**嵌入式** css 样式，就是可以把 css 样式代码写在`<style type="text/css"></style>`标签之间。如以下代码，实现把`<span>`标签中的文字设置为红色：

```CSS
<style type="text/css">
    span {
        color: red;
    }
</style>
```

&emsp;&emsp;嵌入式 css 样式必须写在`<style></style>`之间，并且一般情况下嵌入式 css 样式写在`<head></head>`之间。

### 7.5.3 外部式 CSS 样式

&emsp;&emsp;**外部式**（也成为外联式）css 样式就是把 css 代码写在一个单独的外部文件中，这个 css 样式文件以`.css`为拓展名，在`<head>`内（不是在`<style>`标签内）使用`<link>`将 css 样式文件链接到 HTML 文件内，如以下代码：

```CSS
<link href="base.css" rel="stylesheet" type="text/css">
```

&emsp;&emsp;说明：

1. css 样式文件名称以有意义的英文字母命名，如 main.css；
2. `rel="stylesheet" type="text/css"`是固定写法，不可修改；
3. `<link>`标签位置一般写在`<head>`标签之内。

## 7.6 三种链接方式的优先级

&emsp;&emsp;一般来说，三种样式的优先级为：**内联式 > 嵌入式 > 外部式**。<br/>
&emsp;&emsp;但这里的**嵌入式 > 外部式**有一个前提：嵌入式 css 样式的位置一定在外部式的后面，否则优先级顺序会发生变化。<br/>
&emsp;&emsp;总结地说，就是满足**就近原则**，即 css 样式离被设置元素越近优先级越高。<br/>
&emsp;&emsp;此处总结的优先级还有一个前提，就是内联式、嵌入式、外部式样式表中 css 样式的**权值**相同。

# 第八章 CSS3 选择器

## 8.1 什么是选择器

&emsp;&emsp;每一条 css 样式声明（定义）由两部分组成，形式如下：

```CSS
选择器 {
    样式;
}
```

&emsp;&emsp;在 {} 之前的部分就是“选择器”，“选择器”指明了 {} 中的“样式”的作用对象，也就是“样式”作用于网页中的哪些元素。比如以下代码中的`body`就是选择器。

```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>选择器</title>
    <style type="text/css">
    body {
        font-size: 12px;
        color: red;
    }
    </style>
</head>

<body>
    <p>慕课网（IMOOC）是学习编程最简单的免费平台。慕课网提供了丰富的移动端开发、php开发、web前端、html5教程以及css3视频教程等课程资源。它富有交互性及趣味性，并且你可以和朋友一起编程。</p>
</body>

</html>
```

## 8.2 标签选择器

&emsp;&emsp;标签选择器其实就是 html 代码中的标签，如`<html> <body> <h1> <p> <img>`，例如以下代码：

```CSS
p { font-size: 12px; line-height: 1.6em; }
```

&emsp;&emsp;上面的 css 样式代码的作用是：为 p 标签设置 12px 字号，行间距设置 1.6em 的样式。

## 8.3 类选择器

&emsp;&emsp;类选择器在 css 样式编码中是最常用到的，语法如下：

```CSS
.类选择器名称 { css 样式代码; }
```

&emsp;&emsp;说明：

1. 以英文圆点开头；
2. 类选择器名称为任意英文字符

&emsp;&emsp;步骤：

-   第一步：使用合适的表情把要修饰的内容标记起来

```CSS
<span>我的文字</span>
```

-   第二步：使用`class = "类选择器名称"`为标签设置一个类

```CSS
<span class="stress">我的文字</span>
```

-   第三步：设置类选择器 css 样式

```CSS
.stress {
    color: red;
}
```

## 8.4 ID 选择器

&emsp;&emsp;示例：

```HTML
<body>
    <!-- 给元素 id 属性赋值 -->
    <div id='box'>我是一个div</div>
</body>
```
```CSS
<style>
    /*# 加上元素的 id 值，构成 id 选择器*/
    #box {
        color: red;
    }
</style>
```

&emsp;&emsp;说明：
1. 使用 ID 选择器，必须给标签添加上 id 属性，为标签设置`id="ID名称"`，而不是`class="类名称"`；
2. ID 选择符的前面是`#`，而不是`.`；
3. id 属性的值即为当前标签的 id，尽量有实际意义。