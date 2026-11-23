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

### 8. 访问修饰符与可见性（Access Modifiers）

VB.NET 的可见性语义和底层 IL 规则与 C# 基本一致，但关键字名称不同，且在**模块级成员默认可见性**、**组合修饰符**以及**嵌套类访问限制**上有一些容易踩坑的细节。

#### 8.1 C# 与 VB.NET 可见性对照表

| 作用域 / 语义 | C# | VB.NET | 说明 |
| :--- | :--- | :--- | :--- |
| **公开（跨程序集可见）** | `public` | `Public` | 任意可访问该类型的代码均可调用 |
| **当前程序集内可见** | `internal` | `Friend` | VB 中用 `Friend` 表示程序集内可见，而不是 `Internal` |
| **派生类（含外部程序集）及本类** | `protected` | `Protected` | 仅限本类型及派生类型访问（结构体不能被继承，通常不用） |
| **当前程序集 + 派生类** | `protected internal` | `Protected Friend` | 词序相反：VB 是 `Protected Friend`，C# 是 `protected internal` |
| **仅当前程序集内的派生类** | `private protected` | `Private Protected` | 词序同样相反：VB 是 `Private Protected`，C# 是 `private protected` |
| **仅当前类型内可见** | `private` | `Private` | 私有成员，仅限声明它的类/结构/模块内部访问 |

#### 8.2 默认可见性差异（高频踩坑点）

1. **命名空间级类型（`Class`、`Structure`、`Module`、`Interface`、`Enum`）**
   * **C#**：未写修饰符时，顶层类型默认是 `internal`。
   * **VB.NET**：未写修饰符时，顶层类型默认是 **`Public`**（不过显式写出 `Public` 或 `Friend` 可读性更好）。
2. **类 / 结构体 / 模块内部成员**
   * 在类或结构体中，`Dim x As Integer` 或 `Sub Foo()` 未写修饰符时，默认是 **`Public`**（这与 C# 中类成员默认 `private` 不同）；在 `Module` 中，未写修饰符的成员同样默认是 **`Public`**。
   * **工程建议**：明确写上 `Public`、`Private` 或 `Friend`，不要依赖隐式默认可见性。

#### 8.3 代码示例与组合修饰符说明

**VB.NET 示例**

    Public Class BaseRepository
        ' 仅当前程序集内的派生类可访问
        Private Protected _connectionString As String

        ' 当前程序集或任意派生类可访问
        Protected Friend Sub LogDebug(msg As String)
            Console.WriteLine(msg)
        End Sub

        ' 仅派生类可访问
        Protected Overridable Sub Validate()
        End Sub

        ' 仅本类内部可访问
        Private _retryCount As Integer = 3
    End Class

    Friend Class InternalCache
        ' 仅当前程序集内可见
    End Class

**等价的 C# 示例**

    public class BaseRepository
    {
        private protected string _connectionString;

        protected internal void LogDebug(string msg)
        {
            Console.WriteLine(msg);
        }

        protected virtual void Validate()
        {
        }

        private int _retryCount = 3;
    }

    internal class InternalCache
    {
    }

#### 8.4 可见性常见坑点

1. **成员可见性不能高于所属类型**
   * 如果一个类是 `Friend`（相当于 C# `internal`），即使内部成员标为 `Public`，外部程序集也无法直接通过该类型访问它。
2. **`Protected Friend` 与 `Private Protected` 的词序**
   * C# 习惯先写 `protected` 再写 `internal` / `private`，而 VB.NET 习惯写 `Protected Friend` 和 `Private Protected`，跨语言切换时容易写反。
3. **模块（`Module`）中的 `Friend` 成员**
   * 团队内部共享但不想暴露给外部调用方的工具变量或辅助方法，优先用 `Friend` 限制在当前程序集内，减少外部耦合。

### 9. 类（`Class`）、结构体（`Structure`）与构造函数（`Sub New`）

VB.NET 中的 `Class` 对应引用类型、`Structure` 对应值类型，底层同样是 .NET 的类与 `System.ValueType`；构造函数统一命名为 **`Sub New`**（而不是与类名同名）。

#### 9.1 声明与构造函数（`Sub New`）对比

| 维度 | C# | VB.NET | 说明 |
| :--- | :--- | :--- | :--- |
| **类声明** | `public class User { }` | `Public Class User`<br>`End Class` | 引用类型，支持继承 |
| **结构体声明** | `public struct Point { }` | `Public Structure Point`<br>`End Structure` | 值类型，不支持继承，可实现接口 |
| **构造函数** | `public User(string name) { }` | `Public Sub New(name As String)`<br>`End Sub` | 统一用 `Sub New`，无返回值 |
| **调用基类构造** | `: base(name)` | `MyBase.New(name)` | 放在 `Sub New` 的第一行 |
| **调用同类其他构造** | `: this(name, 0)` | `Me.New(name, 0)` | 放在 `Sub New` 的第一行，用于构造函数链 |
| **自动属性** | `public string Name { get; set; }` | `Public Property Name As String` | 也可设默认值：`Public Property Retry As Integer = 3` |
| **只读属性** | `public string Id { get; }` | `Public ReadOnly Property Id As String` | 仅可在构造函数或声明处赋值 |

#### 9.2 类与构造函数示例（含 `MyBase.New` / `Me.New`）

**VB.NET 写法**

    Public Class EntityBase
        Public ReadOnly Property Id As Guid

        Protected Sub New(id As Guid)
            Me.Id = id
        End Sub
    End Class

    Public Class Customer
        Inherits EntityBase

        Public Property Name As String
        Public Property Tier As String = "Standard"

        ' 链式调用同类另一构造函数
        Public Sub New(name As String)
            Me.New(Guid.NewGuid(), name)
        End Sub

        ' 调用基类构造函数
        Public Sub New(id As Guid, name As String)
            MyBase.New(id)
            Me.Name = name
        End Sub
    End Class

**等价的 C# 写法**

    public class EntityBase
    {
        public Guid Id { get; }

        protected EntityBase(Guid id)
        {
            Id = id;
        }
    }

    public class Customer : EntityBase
    {
        public string Name { get; set; }
        public string Tier { get; set; } = "Standard";

        public Customer(string name) : this(Guid.NewGuid(), name)
        {
        }

        public Customer(Guid id, string name) : base(id)
        {
            Name = name;
        }
    }

#### 9.3 结构体（`Structure`）声明与用法

* 现代 VB.NET（VB 11+）支持结构体带参数的 `Sub New(...)`，但和 C# 类似，**不能显式声明无参构造函数 `Public Sub New()`**。
* 结构体有自定义构造函数时，必须为所有实例字段赋值（或通过 `Me.New()` 委托初始化），否则编译会报错。
* 适合表示轻量级不可变数据（如坐标、金额区间、尺寸），字段过多或频繁装箱/拆箱时应改用 `Class`。

**VB.NET 结构体示例**

    Public Structure MoneyRange
        Public ReadOnly MinValue As Decimal
        Public ReadOnly MaxValue As Decimal

        Public Sub New(minVal As Decimal, maxVal As Decimal)
            If minVal > maxVal Then
                Throw New ArgumentException("MinValue 不能大于 MaxValue")
            End If
            MinValue = minVal
            MaxValue = maxVal
        End Sub

        Public Function Contains(value As Decimal) As Boolean
            Return value >= MinValue AndAlso value <= MaxValue
        End Function
    End Structure

    ' 使用处：
    Public Sub UseStruct()
        Dim r1 As New MoneyRange(10D, 100D)
        Dim r2 As MoneyRange ' 默认全零值初始化（MinValue = 0, MaxValue = 0）
        Dim ok = r1.Contains(50D)
    End Sub

#### 9.4 类与结构体常见坑点

1. **构造函数名固定为 `Sub New`**：重命名类名时不需要改构造函数名，但跨语言切换时容易写成与类名同名导致编译错误。
2. **`Structure` 无法定义无参 `Sub New()`**：默认无参构造由运行时提供，将所有字段置零/默认引用；若需默认初始化逻辑，通常提供静态工厂方法（如 `Shared Function CreateDefault() As ...`）。
3. **结构体属性/字段修改与拷贝语义**：结构体按值传递与赋值时会复制整个值；若通过接口或 `Object` 引用操作结构体，会触发装箱（Boxing），修改副本不会影响原值。

### 10. `My` 对象层次与快捷入口

在 VB.NET 中，**`My`** 是编译器与 `Microsoft.VisualBasic` 命名空间提供的一组**按项目类型动态生成的快捷辅助对象**。底层依然调用标准 .NET 类库（如 `System.IO`、`System.Environment`、`System.Configuration` 等），但在桌面/传统 VB.NET 项目中提供了顺手的快捷入口。

#### 10.1 `My` 的核心特点

1. **按项目类型动态适配**：WinForms 等桌面模板通常包含 `My.Application`、`My.Computer`、`My.User`、`My.Forms`、`My.Settings`、`My.Resources` 等；不同宿主模板下可用子对象有所差异。
2. **本质是标准 .NET 能力的快捷封装**：读老代码时不必当成黑盒，它只是把常见操作包装成了层级更扁平的调用。
3. **工程权衡**：维护旧项目或快速编写辅助逻辑时很方便；在核心业务层或现代可测试架构中，显式传参/依赖注入与标准 BCL API 通常更清晰、更易单测。

#### 10.2 常用 `My` 子对象及 C# 对照

| VB.NET `My` 用法 | 常见用途 | 对应的 C# / 标准 .NET 写法思路 |
| :--- | :--- | :--- |
| **`My.Application`** | 获取当前程序集信息、命令行参数、生命周期事件 | `Assembly.GetExecutingAssembly()`、`Environment.GetCommandLineArgs()` |
| **`My.Computer.FileSystem`** | 读写文本/字节、复制移动目录、组合路径 | `System.IO.File`、`System.IO.Directory`、`System.IO.Path` |
| **`My.Computer.Info`** | 操作系统信息、可用/总物理内存 | `Environment.OSVersion`、`RuntimeInformation.OSDescription` |
| **`My.Computer.Network`** | 检查网络可用性、快捷文件传输 | `NetworkInterface.GetIsNetworkAvailable()`、`HttpClient` |
| **`My.User`** | 当前用户主体、身份验证与角色信息 | `Thread.CurrentPrincipal`、`WindowsIdentity.GetCurrent()` |
| **`My.Settings`** | 读写强类型应用/用户配置 | `Properties.Settings.Default` 或 `IConfiguration` / `IOptions<T>` |
| **`My.Resources`** | 访问 `.resx` 中的字符串、图像等资源 | `Properties.Resources` 或 `ResourceManager` |
| **`My.Forms.Form1`** | 通过默认实例直接访问 WinForms 窗体 | 显式 `new Form1()` 或通过 DI / 窗体管理器创建实例 |

#### 10.3 代码示例与 `My.Forms` 坑点

**VB.NET 示例**

    Dim appDir = My.Application.Info.DirectoryPath
    Dim logPath = My.Computer.FileSystem.CombinePath(appDir, "app.log")

    My.Computer.FileSystem.WriteAllText(logPath, "Started" & Environment.NewLine, append:=True)

    Dim timeoutSec As Integer = My.Settings.RequestTimeoutSeconds

**C# 等价思路**

    var appDir = AppContext.BaseDirectory;
    var logPath = Path.Combine(appDir, "app.log");

    File.AppendAllText(logPath, "Started" + Environment.NewLine);

    var timeoutSec = Properties.Settings.Default.RequestTimeoutSeconds;

#### 10.4 常见坑点

1. **`My.Forms` 的默认实例（Default Instance）**：在 WinForms 中首次访问 `My.Forms.MainForm` 会按线程隐式创建实例；若窗体关闭后又被访问，可能再次新建实例，导致状态混乱或生命周期难控。新逻辑建议显式管理窗体实例。
2. **隐式环境耦合**：业务服务类直接调用 `My.Settings`、`My.Computer.FileSystem` 等会让类与宿主环境强绑定，降低单元测试隔离度。

### 11.0 VB.NET 内置常量（Intrinsic Constants）

VB.NET 在 `Microsoft.VisualBasic` 命名空间（主要是 `Constants` 模块及 `ControlChars` 类）中提供了一批**内置常量**，覆盖换行符、控制字符、消息框返回值/按钮样式、比较模式（`CompareMethod`）等常见场景。

从 C# 视角来看，它们大多对应 **`Environment.NewLine`**、**转义字符（`\r`、`\n`、`\t`）**或 **`System.Windows.Forms` / `Microsoft.VisualBasic` 的枚举值**。

#### 11.1 常用内置常量及 C# 对照

| 维度 | VB.NET 内置常量 | 含义 / 常见用途 | C# 等价写法 |
| :--- | :--- | :--- | :--- |
| **系统换行符** | `vbCrLf` | 回车 + 换行（`\r\n`，Windows 常见） | `Environment.NewLine` 或 `"\r\n"` |
| **回车 / 换行** | `vbCr` / `vbLf` | 回车（`\r`）/ 换行（`\n`） | `"\r"` / `"\n"` |
| **制表符 / 退格** | `vbTab` / `vbBack` | 水平制表符（`\t`）/ 退格（`\b`） | `"\t"` / `"\b"` |
| **空字符串** | `vbNullString` | 历史遗留空串常量（注意与 `Nothing` 区别） | `string.Empty` 或 `null` |
| **跨平台换行（`ControlChars`）** | `ControlChars.CrLf`、`ControlChars.NewLine` | 语义更清晰的 `Char` / `String` 形式控制字符 | `Environment.NewLine`、`'\r'`、`'\n'` |
| **比较方式** | `CompareMethod.Binary` / `CompareMethod.Text` | 二进制（区分大小写）或文本（不区分大小写）比较 | `StringComparison.Ordinal` / `StringComparison.OrdinalIgnoreCase` |
| **MsgBox 按钮/结果** | `MsgBoxStyle.YesNo`、`MsgBoxResult.Yes` | 传统 `MsgBox` 弹窗样式与用户点击结果 | `MessageBoxButtons.YesNo`、`DialogResult.Yes` |

#### 11.2 代码示例

**VB.NET 写法**

    Imports Microsoft.VisualBasic

    Public Module BuiltInConstantsDemo
        Public Function BuildReportLines(lines As IEnumerable(Of String)) As String
            ' 使用 vbCrLf 或 Environment.NewLine 拼接多行文本
            Return String.Join(Environment.NewLine, lines) & vbCrLf & "End" & vbTab & "OK"
        End Function

        Public Function ContainsIgnoreCase(source As String, target As String) As Boolean
            ' InStr 支持 CompareMethod.Text（不区分大小写）与 CompareMethod.Binary
            Return InStr(1, source, target, CompareMethod.Text) > 0
        End Function
    End Module

**C# 等价思路**

    using System;
    using System.Collections.Generic;

    public static class BuiltInConstantsDemo
    {
        public static string BuildReportLines(IEnumerable<string> lines)
        {
            return string.Join(Environment.NewLine, lines) + Environment.NewLine + "End\tOK";
        }

        public static bool ContainsIgnoreCase(string source, string target)
        {
            return source.Contains(target, StringComparison.OrdinalIgnoreCase);
        }
    }

#### 11.3 常见坑点与工程建议

1. **`vbCrLf` 与 `Environment.NewLine` 的选择**：`vbCrLf` 固定为 `\r\n`；若需随当前运行平台自适应，优先用 `Environment.NewLine`（跨平台更稳妥），或在明确要求 CRLF 的协议/文件格式中使用 `vbCrLf`。
2. **谨慎对待 `vbNullString`**：它是为兼容旧 VB 指针/字符串语义保留的特殊值（在 `Option Strict On` 下传入期望 `String` 的位置需注意类型与空值行为），新代码中更推荐使用 `String.Empty` 或 `Nothing`。
3. **新代码优先标准 .NET API**：像 `InStr`、`MsgBox` 这类 `Microsoft.VisualBasic` 传统函数与常量在旧代码中很常见，新写逻辑时用 `String.Contains(..., StringComparison.OrdinalIgnoreCase)`、`MessageBox.Show` 等标准 .NET API 更直观，也更便于跨语言团队协作。

### 12.0 VB.NET 循环语句与 C# 对照

VB.NET 的循环结构语义与 C# 高度对应，但关键字更偏自然语言，块级闭合明确（`Next`、`Loop`、`End While`），且在**闭区间上界**、**条件判断位置（前测/后测）**以及**提前退出/继续**上有几个容易踩坑的细节。

#### 12.1 循环类型与 C# 对照表

| 循环类型 | C# | VB.NET | 说明 / 坑点提示 |
| :--- | :--- | :--- | :--- |
| **计数循环（递增/递减）** | `for (int i = 0; i < 5; i++)`<br>`for (int i = 5; i > 0; i--)` | `For i As Integer = 0 To 4`<br>`For i As Integer = 5 To 1 Step -1` | **`To` 是闭区间**（包含上界）；步长默认 `1`，倒序或自定义步长用 `Step` |
| **集合遍历** | `foreach (var item in items)` | `For Each item In items` | 遍历 `IEnumerable` / 数组 / 集合，循环变量通常只读 |
| **前测条件循环（为真继续）** | `while (cond) { ... }` | `While cond`<br>`  ...`<br>`End While`<br>或 `Do While cond ... Loop` | 条件为 `True` 时执行；循环体可能一次都不执行 |
| **前测条件循环（为假继续）** | `while (!cond) { ... }` | `Do Until cond`<br>`  ...`<br>`Loop` | VB 特有的 `Until`：条件为 `False` 时继续，直到变为 `True` 停止 |
| **后测条件循环（至少执行一次）** | `do { ... } while (cond);` | `Do`<br>`  ...`<br>`Loop While cond` | 先执行一次循环体，再判断 `cond` 是否为 `True` |
| **后测条件循环（直到为真停止）** | `do { ... } while (!cond);` | `Do`<br>`  ...`<br>`Loop Until cond` | 先执行一次循环体，直到 `cond` 变为 `True` 停止 |
| **提前跳出循环** | `break;` | `Exit For` / `Exit Do` / `Exit While` | 按循环种类对应 `Exit ...` |
| **跳过本次迭代** | `continue;` | `Continue For` / `Continue Do` / `Continue While` | 按循环种类对应 `Continue ...` |

#### 12.2 代码示例与 C# 对照

**VB.NET 写法**

    Public Module LoopExamples
        Public Sub RunLoops(items As IList(Of String))
            ' 1. For ... To / Step（闭区间：0, 2, 4）
            For i As Integer = 0 To 4 Step 2
                Console.WriteLine($"Index: {i}")
            Next

            ' 2. For Each 与 Continue For / Exit For
            For Each item In items
                If String.IsNullOrWhiteSpace(item) Then
                    Continue For
                End If
                If item = "STOP" Then
                    Exit For
                End If
                Console.WriteLine(item)
            Next

            ' 3. Do While（前测）与 Do ... Loop Until（后测）
            Dim count As Integer = 0
            Do While count < 3
                count += 1
            Loop

            Do
                count -= 1
            Loop Until count <= 0
        End Sub
    End Module

**等价的 C# 写法**

    using System;
    using System.Collections.Generic;

    public static class LoopExamples
    {
        public static void RunLoops(IList<string> items)
        {
            for (int i = 0; i <= 4; i += 2)
            {
                Console.WriteLine($"Index: {i}");
            }

            foreach (var item in items)
            {
                if (string.IsNullOrWhiteSpace(item))
                {
                    continue;
                }
                if (item == "STOP")
                {
                    break;
                }
                Console.WriteLine(item);
            }

            int count = 0;
            while (count < 3)
            {
                count++;
            }

            do
            {
                count--;
            } while (count > 0);
        }
    }

#### 12.3 循环常见坑点

1. **`For ... To` 是闭区间，不是半开区间**
   * C# 习惯写 `for (int i = 0; i < list.Count; i++)`；VB 中若写成 `For i = 0 To list.Count`，最后一个下标会越界抛 `ArgumentOutOfRangeException`，正确写法是 `For i = 0 To list.Count - 1`。
2. **`Exit` 和 `Continue` 需匹配循环关键字**
   * 在 `For` 循环中写 `Continue For` / `Exit For`，在 `Do` 循环中写 `Continue Do` / `Exit Do`（嵌套循环时各自作用于最内层循环）。
3. **倒序循环必须显式指定 `Step -1`**
   * 写 `For i = 10 To 1` 时默认步长为 `+1`，循环体不会执行；从大到小遍历必须加上 `Step -1`。
4. **循环变量作用域与闭包捕获**
   * 在 `For i As Integer = ...` 中声明的 `i` 作用域仅限该 `For` 循环块；若在循环内创建 Lambda 捕获循环变量，注意与 C# 类似的变量捕获时机，必要时先拷贝到局部变量。

### 13.0 VB.NET 分支语句与 C# 对照

VB.NET 的分支结构主要有两类：**`If ... Then ... ElseIf ... Else ... End If`**（以及单行/三元式 `If(...)`）和 **`Select Case ... End Select`**。整体语义与 C# 接近，但关键字大小写、无 `break` 贯通规则以及 `Select Case` 的范围/关系匹配有一些实用特性和常见坑点。

#### 13.1 分支语法与 C# 对照表

| 分支类型 | C# | VB.NET | 说明 / 坑点提示 |
| :--- | :--- | :--- | :--- |
| **多分支 `if / else if / else`** | `if (a) { ... }`<br>`else if (b) { ... }`<br>`else { ... }` | `If a Then`<br>`  ...`<br>`ElseIf b Then`<br>`  ...`<br>`Else`<br>`  ...`<br>`End If` | 注意 VB 中是 **`ElseIf`**（连写，无空格）；块级写法必须带 `Then` 和 `End If` |
| **单行 `If` 语句** | `if (cond) DoA(); else DoB();` | `If cond Then DoA() Else DoB()` | 单行形式不需要 `End If`，适合极简语句；复杂逻辑建议拆成多行 |
| **条件表达式（三元）** | `var res = cond ? a : b;` | `Dim res = If(cond, a, b)` | 推荐用三参数函数 `If(cond, a, b)`（仅求值被选分支），避免用历史 `IIf(cond, a, b)`（两边都会求值） |
| **空合并表达式** | `var res = x ?? fallback;` | `Dim res = If(x, fallback)` | 双参数 `If(a, b)` 等价于 C# 的 `a ?? b` |
| **多路匹配 `switch` / `Select Case`** | `switch (x) {`<br>`  case 1: ... break;`<br>`  case 2: case 3: ... break;`<br>`  default: ... break;`<br>`}` | `Select Case x`<br>`  Case 1`<br>`    ...`<br>`  Case 2, 3`<br>`    ...`<br>`  Case Else`<br>`    ...`<br>`End Select` | **无需 `break`**：匹配某个 `Case` 后自动结束 `Select Case`，不会自然“掉入”下一个 `Case` |
| **范围与关系匹配** | `case >= 10 and <= 20:`（C# 9+）<br>`case > 100:` | `Case 10 To 20`<br>`Case Is > 100` | VB 的 `Select Case` 原生支持 `To` 闭区间和 `Is < / > / >= / <=` 关系判断 |

#### 13.2 代码示例与 C# 对照

**VB.NET 写法**

    Public Module BranchExamples
        Public Function ClassifyScore(score As Integer) As String
            If score < 0 OrElse score > 100 Then
                Return "Invalid"
            ElseIf score >= 90 Then
                Return "A"
            Else
                Return "Normal"
            End If
        End Function

        Public Function DescribeLevel(level As Integer) As String
            Select Case level
                Case Is <= 0
                    Return "Disabled"
                Case 1, 2
                    Return "Basic"
                Case 3 To 5
                    Return "Standard"
                Case Is > 5
                    Return "Enterprise"
                Case Else
                    Return "Unknown"
            End Select
        End Function
    End Module

**等价的 C# 写法**

    public static class BranchExamples
    {
        public static string ClassifyScore(int score)
        {
            if (score < 0 || score > 100)
            {
                return "Invalid";
            }
            else if (score >= 90)
            {
                return "A";
            }
            else
            {
                return "Normal";
            }
        }

        public static string DescribeLevel(int level)
        {
            return level switch
            {
                <= 0 => "Disabled",
                1 or 2 => "Basic",
                >= 3 and <= 5 => "Standard",
                > 5 => "Enterprise",
                _ => "Unknown"
            };
        }
    }

#### 13.3 分支常见坑点

1. **写法是 `ElseIf`，不是 `Else If`**
   * 在多行块中写成 `Else If` 会被编译器当作嵌套在 `Else` 块里的**新 `If` 语句**，需要额外配一个 `End If`，极易导致块层级错乱；标准写法是 `ElseIf`。
2. **`Select Case` 不会“贯穿（Fall-through）”**
   * C# `switch` 只有空 `case` 才允许贯穿，其他分支需 `break`；VB 的 `Select Case` 每个 `Case` 分支执行完就跳出整个 `Select Case`，多值匹配直接用逗号分隔（如 `Case 1, 2, 3`）。
