## C# 转 VB.NET 对照指南（上：宏观语法、对照表与工程细节）

从 C# 转到 VB.NET，最让人安心的一点是：**两者共享同一套 .NET CLR 类型系统、BCL（基类库）和生态**，底层对象、GC、异步模型和 NuGet 包几乎完全一致；差异主要集中在**语法糖、大小写不敏感、默认行为、少数运算符**，以及 **`Module`（模块）**、**委托与事件**、**异步与 LINQ** 等语法细节上。

---

### 1. 最核心的宏观语法特点

1. **大小写不敏感（Case-Insensitive）**
   * `Dim userName As String` 和 `dim USERNAME as string` 在 VB.NET 中是同一个标识符。
   * IDE 通常会自动纠正关键字和标识符的大小写风格，但团队代码规范仍建议保持一致。
2. **以“换行”为语句结束，用 `_`（行延续符）换行**
   * 不需要分号 `;`（同一行写多条语句才用 `:` 分隔）。
   * 长表达式或长参数列表跨行时，通常在行尾加空格加下划线 ` _`（现代 VB 编译器在逗号后、运算符后等许多场景已可隐式换行，但显式 ` _` 依然常见）。
3. **关键字语义更偏“自然英语”**
   * 用 `Sub`（无返回值）和 `Function`（有返回值）区分过程与函数，而不是统一用返回类型签名。
   * 块级结构显式闭合：`If ... End If`、`For ... Next`、`Select Case ... End Select`、`Try ... Catch ... Finally ... End Try`。

---

### 2. C# 与 VB.NET 关键语法对照表

| 维度 | C# | VB.NET | 说明 / 坑点提示 |
| :--- | :--- | :--- | :--- |
| **变量声明** | `var x = 10;`<br>`int y = 5;` | `Dim x = 10`<br>`Dim y As Integer = 5` | 推荐开启 `Option Infer On` 和 `Option Strict On` |
| **常量** | `const int Max = 100;` | `Const Max As Integer = 100` | 编译期常量 |
| **无返回值方法** | `void DoWork() { }` | `Sub DoWork()`<br>`  ...`<br>`End Sub` | VB 中 `Sub` 不能直接写 `Return` 带值 |
| **有返回值方法** | `int Add(int a, int b) { return a + b; }` | `Function Add(a As Integer, b As Integer) As Integer`<br>`  Return a + b`<br>`End Function` | 也可通过 `Add = a + b` 赋值返回（不推荐混用） |
| **默认参数传递** | 默认 **按值传递**（`ref`/`out`/`in` 显式修饰） | 默认 **`ByVal`**（显式引用传递用 `ByRef`） | VB 的 `ByVal` 传引用类型时拷贝的是**引用本身**（与 C# 默认传参一致）；`ByRef` 类似 C# 的 `ref` |
| **字符串拼接** | `var s = a + b;` | `Dim s = a & b` | **强烈建议用 `&` 拼接字符串**；`+` 在关闭 `Option Strict` 时可能尝试隐式数值转换引发异常 |
| **整除与取模** | `7 / 2`（整除 `3`），`7 % 2`（`1`） | `7 \ 2`（整除 `3`），`7 / 2`（浮点 `3.5`），`7 Mod 2`（`1`） | **高频踩坑点**：VB 中 `/` 是浮点除法，反斜杠 `\` 才是整数除法 |
| **相等与引用比较** | `==` / `!=` | `=` / `<>` | 对象引用比较用 `Is` / `IsNot`（如 `If obj Is Nothing Then`） |
| **逻辑与/或** | `&&` / `\|\|`（短路）<br>`&` / `\|`（非短路/位运算） | `AndAlso` / `OrElse`（短路）<br>`And` / `Or`（**默认非短路**，同时兼作位运算） | **高频踩坑点**：写 `If obj IsNot Nothing And obj.Count > 0` 会因非短路而报 `NullReferenceException`，应写 `AndAlso` |
| **条件分支** | `switch (x) { case 1: ... case > 10: ... }` | `Select Case x`<br>`  Case 1`<br>`  Case Is > 10`<br>`  Case 2 To 5`<br>`End Select` | 支持范围 `To` 和关系表达式 `Is > ...`，无需 `break` |
| **循环** | `for (int i = 0; i < n; i++)`<br>`foreach (var item in list)` | `For i As Integer = 0 To n - 1`<br>`For Each item In list` | 注意 VB 的 `For ... To` 是**闭区间**（包含上界），步长用 `Step` |
| **空值检查 / 空合并** | `x?.Prop ?? fallback` | `x?.Prop`（VB 14+ 支持 `?.`）<br>`If(x, fallback)` | 双参数 `If(a, b)` 等价于 `a ?? b`；三参数 `If(cond, a, b)` 等价于 `cond ? a : b` |
| **类型转换** | `(TargetType)obj`<br>`obj as TargetType`<br>`obj is TargetType` | `CType(obj, TargetType)` / `DirectCast(...)`<br>`TryCast(obj, TargetType)`<br>`TypeOf obj Is TargetType` | `DirectCast` 类似 C# 强转/拆箱，类型不符抛 `InvalidCastException`；`TryCast` 类似 `as` |
| **事件订阅** | `btn.Click += OnClick;` | `AddHandler btn.Click, AddressOf OnClick`<br>或在方法后加 `Handles btn.Click` | `Handles` 是 VB 特色，声明方法时即可绑定 `WithEvents` 声明的对象事件 |

---

### 3. VB.NET 特有的实用语法与工程细节

1. **`With ... End With` 块**
   对同一对象连续读写多个属性或调用方法时，减少重复书写对象名：

       With config
           .Host = "localhost"
           .Port = 5432
           .EnableSsl = True
       End With

   在配置对象、WinForms 控件初始化或 DTO 赋值时很常见，但嵌套过深会降低可读性。
2. **三个编译选项（强烈建议在项目级开启）**
   接手 VB.NET 项目时，先看 `.vbproj` 或文件头部的选项：
   * **`Option Explicit On`**：强制先声明再使用变量（现代项目默认开启）。
   * **`Option Strict On`**：禁止隐式缩小转换（如 `Double` 转 `Integer`）和 late binding（后期绑定）。**如果项目里没开，强烈建议评估后开启**，能提前暴露大量运行时类型错误。
   * **`Option Infer On`**：允许局部变量类型推断（类似 C# 的 `var`）。
3. **历史遗留特性（阅读旧代码时要认得）**
   由于 VB.NET 承接了大量 VB6 迁移过来的代码，老项目中可能会看到：
   * `On Error GoTo ...` / `On Error Resume Next`：旧式错误处理，新逻辑应统一使用 `Try ... Catch ... Finally`。
   * `ReDim` / `ReDim Preserve`：动态调整数组大小（`Preserve` 保留原有元素）。
   * 缺省属性与 `Object` 后期绑定：当 `Option Strict Off` 时，调用未知成员会在运行时通过反射/IDispatch 解析，重构时 IDE 无法保证安全替换。


## C# 转 VB.NET 对照指南（下：模块、委托与事件、异步与 LINQ）

### 4. 模块（`Module`）的概念、用法与工程坑点

在 VB / VB.NET 中，**`Module`（模块）** 是用来存放**共享成员**的一种容器。如果用 C# 的思维来理解，最直接的类比就是：**C# 中带有 `static` 修饰符的 `static class`（静态类）**——但 VB 的 `Module` 还有几项独特的语法便利和编译期细节。

#### 4.1 `Module` 的核心特点

1. **不能被实例化（`New`）或继承**：不是对象模板，没有实例状态；编译到 IL 后本质上是密封且不可实例化的类，成员对应为 `static`。
2. **成员可“免模块名前缀”直接调用（最大特色）**：只要 `Module` 作用域可见，内部声明的 `Public` 成员可直接写 `Normalize(x)` 调用，也可写 `StringHelpers.Normalize(x)` 消歧。
3. **支持 `Friend` 可见性**：常用 `Friend`（类似 C# 的 `internal`），表示仅在当前程序集内可见。
4. **首次访问时自动初始化（懒加载）**：模块级变量在第一次访问该模块任意成员时初始化，线程安全由 CLR 保障。

#### 4.2 `Module` 语法示例与 C# 对照

**VB.NET 写法**

    Public Module StringHelpers
        Public Const DefaultSeparator As String = ","
        Friend AppName As String = "OrderService"

        Public Function Normalize(input As String) As String
            If String.IsNullOrWhiteSpace(input) Then
                Return String.Empty
            End If
            Return input.Trim()
        End Function
    End Module

    Public Sub Demo()
        Dim s1 = Normalize("  abc  ")
        Dim s2 = StringHelpers.Normalize("  abc ")
    End Sub

**等价的 C# 写法**

    public static class StringHelpers
    {
        public const string DefaultSeparator = ",";
        internal static string AppName = "OrderService";

        public static string Normalize(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return string.Empty;
            }
            return input.Trim();
        }
    }

    public void Demo()
    {
        var s1 = StringHelpers.Normalize("  abc  ");
    }

#### 4.3 `Module` 工程实践中的适用场景与坑点

1. **适用场景**：纯无状态的工具函数 / 扩展方法集合、程序集内共享常量或少量全局状态（如 `Sub Main()` 入口）。
2. **命名冲突（重名歧义）**：多模块出现同名 `Public` 成员且免前缀调用时会导致编译歧义，需显式加模块名前缀。
3. **可变全局状态风险**：模块中的 `Public` / `Friend` 可变变量本质上是全局变量，在并发或单元测试中易引入副作用；优先使用无状态函数或常量，需要状态隔离或依赖注入时改用类。
4. **跨语言互操作**：C# 引用 VB 的 `Module` 时按静态类处理，必须写 `ModuleName.MemberName`。

---

### 5. 委托（`Delegate`）与事件（`Event`）的声明与调用

两者底层同样基于 `System.MulticastDelegate` 与 CLR 事件模型，主要体现在 `Sub` / `Function` 区分以及 `AddressOf`、`RaiseEvent`、`WithEvents`、`Handles` 等关键字上。

#### 5.1 委托（`Delegate`）：声明、赋值与调用

* 声明必须写明 `Sub` 或 `Function ... As 返回类型`，也可直接用 `System.Action(Of ...)` 与 `System.Func(Of ...)`。
* 取方法引用必须加 **`AddressOf`**；合并/移除委托使用 **`[Delegate].Combine` / `[Delegate].Remove`**（VB 中 `+=` 仅用于事件，不用于委托变量合并）。

**VB.NET 委托示例**

    Public Delegate Sub NotifyHandler(message As String)
    Public Delegate Function CalcHandler(a As Integer, b As Integer) As Integer

    Public Class DelegateDemo
        Public Shared Sub PrintMessage(msg As String)
            Console.WriteLine(msg)
        End Sub

        Public Sub Run()
            Dim notify As NotifyHandler = AddressOf PrintMessage
            Dim add As Func(Of Integer, Integer, Integer) = Function(x, y) x + y

            notify("Hello VB.NET")
            Console.WriteLine(add(3, 5))

            Dim multiNotify As NotifyHandler = [Delegate].Combine(
                AddressOf PrintMessage,
                CType(Sub(m) Console.WriteLine("Backup: " & m), NotifyHandler)
            )
            multiNotify?.Invoke("Broadcast")
        End Sub
    End Class

#### 5.2 事件（`Event`）：声明、触发与订阅

* **`Event` / `RaiseEvent`**：内部触发事件用 `RaiseEvent`，订阅者为空时自动安全跳过。
* **`AddHandler` / `RemoveHandler`**：动态订阅与取消订阅（类似 C# `+=` / `-=`）。
* **`WithEvents` + `Handles`**：在字段/属性上声明 `WithEvents`，方法末尾写 `Handles 字段名.事件名` 自动绑定与解绑。

**VB.NET 事件示例**

    Public Class OrderProcessedEventArgs
        Inherits EventArgs
        Public Property OrderId As String
    End Class

    Public Class OrderService
        Public Event OrderProcessed As EventHandler(Of OrderProcessedEventArgs)

        Public Sub CompleteOrder(orderId As String)
            RaiseEvent OrderProcessed(Me, New OrderProcessedEventArgs With {.OrderId = orderId})
        End Sub
    End Class

    Public Class OrderMonitor
        Private WithEvents _service As OrderService

        Public Sub New(service As OrderService)
            _service = service
        End Sub

        Private Sub HandleOrderProcessed(sender As Object, e As OrderProcessedEventArgs) Handles _service.OrderProcessed
            Console.WriteLine("Monitor caught: " & e.OrderId)
        End Sub
    End Class

#### 5.3 委托与事件常见坑点

1. **`WithEvents` 不能用于局部变量**：只能修饰类、结构或模块的字段/属性。
2. **订阅生命周期与内存泄漏**：使用 `AddHandler` 订阅长生命周期发布者时，记得适时 `RemoveHandler`；`WithEvents` 字段重新赋值或设为 `Nothing` 时，属性 setter 会自动断开旧对象事件。
3. **签名匹配**：`Handles` 绑定方法的参数列表（及 `Function` 返回类型）必须与事件委托兼容。

---

### 6. 异步编程（`Async` / `Await`）与 `LINQ` 写法对照

#### 6.1 异步编程（`Async` / `Await`）

* `async void` -> `Async Sub`（尽量仅用于事件处理器）
* `async Task` -> `Async Function ... As Task`
* `async Task<T>` -> `Async Function ... As Task(Of T)`

**VB.NET 异步示例**

    Imports System.Net.Http
    Imports System.Threading.Tasks

    Public Class AsyncDemo
        Private Shared ReadOnly Http As New HttpClient()

        Public Async Function FetchTextAsync(url As String) As Task(Of String)
            Dim content = Await Http.GetStringAsync(url).ConfigureAwait(False)
            Return content.Trim()
        End Function

        Public Async Function ProcessAsync(url As String) As Task
            Dim text = Await FetchTextAsync(url)
            Console.WriteLine($"Length: {text.Length}")
        End Function
    End Class

#### 6.2 `LINQ` 写法（查询表达式与方法链）

* 查询表达式关键字词组带空格且首字母大写，如 `From ... Where ... Order By ... Select ...`；Lambda 写法为 `Function(x) ...` 或 `Sub(x) ...`。

**VB.NET LINQ 示例**

    Imports System.Linq

    Public Class OrderItem
        Public Property Id As Integer
        Public Property Customer As String
        Public Property Amount As Decimal
        Public Property IsPaid As Boolean
    End Class

    Public Module LinqDemo
        Public Sub QueryExamples(orders As IEnumerable(Of OrderItem))
            Dim highValueOrders =
                From o In orders
                Where o.IsPaid AndAlso o.Amount >= 100D
                Order By o.Amount Descending, o.Id Ascending
                Select New With {
                    .OrderId = o.Id,
                    .CustomerName = o.Customer,
                    .Total = o.Amount
                }

            Dim paidByCustomer = orders.
                Where(Function(o) o.IsPaid).
                GroupBy(Function(o) o.Customer).
                Select(Function(g) New With {
                    .Customer = g.Key,
                    .TotalAmount = g.Sum(Function(x) x.Amount)
                }).
                ToList()
        End Sub
    End Module

#### 6.3 异步与 LINQ 常见坑点

1. **避免滥用 `Async Sub`**：普通异步方法用 `Async Function ... As Task` / `Task(Of T)`，方便调用方 `Await` 与捕获异常。
2. **延迟执行与匿名类型**：LINQ 查询同样延迟执行，需要立即执行时调用 `.ToList()` 或 `.ToArray()`；匿名类型写法为 `New With { .Prop = expr }`。

---

### 7. 快速上手建议

1. **写新逻辑时**：优先使用 `AndAlso` / `OrElse`、`If(a, b)`、`TryCast` / `DirectCast`、字符串插值 `$"..."` 与 `Async Function ... As Task(Of T)`。
2. **改老代码时**：先检查工程或文件头部的 `Option Strict` 设置，警惕隐式转换、字符串 `+` 拼接与遗留 `On Error` / 后期绑定写法。