### A:

如何取得一个文本文件的大小和行数？

### Q:

在 PowerShell 中，取得文件的属性和内容信息非常直观。由于 PowerShell 处理的是**对象**，你可以通过不同的方式获取这些数据。

以下是实现这一任务的几种标准方案：

---

### 1. 最快方式：使用 `Get-Item` 和 `Measure-Object`

这是最推荐的组合。`Get-Item` 用于获取文件的元数据（大小），而 `Measure-Object` 用于统计文本内容（行数）。

#### 获取文件大小

```powershell
(Get-Item "test.txt").Length

```

* **单位：** 默认输出单位是 **字节 (Bytes)**。
* **技巧：** 如果想看更直观的单位，可以进行数学转换：
* $MB = (Get-Item "test.txt").Length / 1MB$



#### 获取行数

```powershell
(Get-Content "test.txt" | Measure-Object -Line).Lines

```

* 这会读取文件并统计行数。如果文件非常巨大（GB 级别），这种方式可能会消耗较多内存。

---

### 2. 综合查询（一个脚本块搞定）

如果你想一次性列出详细信息，可以使用以下脚本：

```powershell
$file = Get-Item "C:\path\to\yourfile.txt"
$lineCount = (Get-Content $file.FullName | Measure-Object).Count

[PSCustomObject]@{
    文件名 = $file.Name
    大小_KB = [Math]::Round($file.Length / 1KB, 2)
    总行数 = $lineCount
}

```

---

### 3. 处理超大文件的“极速”方案

如果你处理的是数 GB 的日志文件，`Get-Content` 会因为把文件读入内存而变得很慢。这时可以使用 .NET 的底层方法：

* **极速统计行数：**
```powershell
[System.IO.File]::ReadAllLines("C:\path\to\yourfile.txt").Count
# 或者更省内存的流式处理：
[System.IO.File]::ReadLines("C:\path\to\yourfile.txt") | Measure-Object | Select-Object -ExpandProperty Count

```



---

### 常用命令对比表

| 目标 | PowerShell 命令 | 对应 Linux 命令 (Alias) |
| --- | --- | --- |
| **大小** | `(Get-Item $path).Length` | `ls -l` 或 `du` |
| **行数** | `Get-Content $path | Measure-Object -Line` |
| **前 N 行** | `Get-Content $path -TotalCount 10` | `head -n 10` |
| **后 N 行** | `Get-Content $path -Tail 10` | `tail -n 10` |

---

> **注意：** PowerShell 中的文件大小属性 `Length` 始终以 **Bytes** 为基准。在显示给用户看时，利用 PowerShell 预定义的常量（`$1KB`, `$1MB`, `$1GB`）进行转换会非常方便。

需要我帮你写一个能批量统计文件夹下所有 `.txt` 文件大小和行数的脚本吗？

### A:

文件大小如何转换成 Mib 或 Kib？

### Q:

在 PowerShell 中，将文件大小转换为 **KiB** 或 **MiB**（基于 1024 的二进制单位）非常简单，因为 PowerShell 内置了处理这些单位的**行政常量**（Administrative Constants）。

你可以直接使用 `$1KB`, `$1MB`, `$1GB`, `$1TB` 甚至 `$1PB` 进行数学运算。

---

### 1. 基础转换公式

PowerShell 的 `Length` 属性返回的是**字节 (Bytes)**。要转换单位，只需将长度除以相应的常量：

* **转换为 KiB:** `$file.Length / 1KB`
* **转换为 MiB:** `$file.Length / 1MB`

#### 示例代码：

```powershell
$file = Get-Item "C:\yourfile.txt"

# 转换为 MiB 并保留两位小数
$sizeMiB = $file.Length / 1MB
[Math]::Round($sizeMiB, 2)

```

---

### 2. 使用“格式化字符串”美化输出

如果你想让结果看起来更专业（例如带上单位后缀），可以使用 PowerShell 的 `-f` 格式化操作符：

```powershell
$file = Get-Item "C:\Windows\explorer.exe"

# "{0:N2} MiB" 表示：取第0个参数，数值格式(N)，保留2位小数
"{0:N2} MiB" -f ($file.Length / 1MB)
"{0:N2} KiB" -f ($file.Length / 1KB)

```

---

### 3. 批量转换文件夹内所有文件

如果你想查看某个目录下所有文件的大小并自动转换，可以结合 `Select-Object` 和**计算属性**（Calculated Properties）：

```powershell
Get-ChildItem "C:\YourFolder" -File | Select-Object Name,
    @{Name="大小(MiB)"; Expression={"{0:N2}" -f ($_.Length / 1MB)}},
    @{Name="大小(KiB)"; Expression={"{0:N2}" -f ($_.Length / 1KB)}} | Format-Table

```

---

### ⚠️ 重要概念纠正：MB vs MiB

在 PowerShell 中，虽然常量写作 `$1MB`，但它实际上代表的是 $1024 \times 1024$ 字节。

| 术语 | 工业标准定义 | PowerShell `$1MB` 的行为 |
| --- | --- | --- |
| **MB** (Megabyte) | $10^6 = 1,000,000$ 字节 | ❌ 不常用 |
| **MiB** (Mebibyte) | $2^{20} = 1,048,576$ 字节 | ✅ **这就是 PowerShell 常量的实际值** |

因此，当你直接除以 `$1MB` 时，你得到的就是技术意义上的 **MiB**。

---

### 4. 进阶：自动适配单位

如果你希望脚本能根据文件大小自动选择最合适的单位（小的显示 KB，大的显示 GB），可以写一个简单的逻辑：

```powershell
function Get-FriendlySize {
    param([long]$Bytes)
    if ($Bytes -gt 1GB) { "{0:N2} GB" -f ($Bytes / 1GB) }
    elseif ($Bytes -gt 1MB) { "{0:N2} MB" -f ($Bytes / 1MB) }
    elseif ($Bytes -gt 1KB) { "{0:N2} KB" -f ($Bytes / 1KB) }
    else { "$Bytes Bytes" }
}

# 调用示例
Get-FriendlySize (Get-Item "C:\Windows\System32\notepad.exe").Length

```

需要我帮你把这个功能整合到一个可以直接搜索特定大文件的脚本中吗？

### A:

KiB 是以 1024 为单位的？

### A:

是的，**KiB (Kibibyte)** 严格遵循 $1024$ ($2^{10}$) 的二进制进位。

长期以来，计算机领域对 “KB” 的定义存在混乱。为了解决这个问题，国际电工委员会 (IEC) 在 1998 年制定了新标准，将**十进制**和**二进制**单位明确区分开来。

---

### 1. 核心区别：KiB vs. KB

| 单位名称 | 缩写 | 进位基数 | 字节数 (Bytes) | 常用领域 |
| --- | --- | --- | --- | --- |
| **Kilobyte** | **KB** | $10^3 = 1,000$ | $1,000$ | 硬盘厂商标称容量、网络带宽 |
| **Kibibyte** | **KiB** | $2^{10} = 1,024$ | **$1,024$** | **操作系统（Windows/Linux）**、内存、PowerShell |

---

### 2. 为什么会有这种混乱？

* **硬盘厂商的“套路”：** 当你买一个 500GB 的硬盘，厂商是按 $1,000$ 进位算的（即 $500,000,000,000$ 字节）。
* **操作系统的“诚实”：** 当你把这个硬盘插进电脑，Windows 实际上是按 $1,024$ 进位转换的。
* 计算：$500 \times (1000^3) / (1024^3) \approx 465.6$ **GiB**。
* 这就是为什么你的 500GB 硬盘在电脑里显示只有 **465GB** 的原因——其实数据没丢，只是单位不同。



---

### 3. PowerShell 中的特殊情况

虽然 PowerShell 的常量写成 `$1KB`、`$1MB`，但它**在底层完全采用二进制计算**（即 1024 进位）。

在 PowerShell 控制台输入以下命令验证：

```powershell
# 看看 1KB 到底是多少字节
1KB
# 输出: 1024

# 看看 1MB 到底是多少字节
1MB
# 输出: 1048576 (即 1024 * 1024)

```

**结论：** 在 PowerShell 中，虽然简写为 KB/MB，但它们对应的物理意义其实就是 **KiB/MiB**。

---

### 4. 常见的二进制单位表

| 缩写 | 全称 | 字节 (Bytes) |
| --- | --- | --- |
| **KiB** | Kibibyte | $1,024$ |
| **MiB** | Mebibyte | $1,024^2$ ($1,048,576$) |
| **GiB** | Gibibyte | $1,024^3$ |
| **TiB** | Tebibyte | $1,024^4$ |

---

**想试试在 PowerShell 里写个小工具，把硬盘厂商的“标称容量”转换成电脑显示的“实际容量”吗？**

### A:

如何将一个大整数三位分割，分割符用 -

在 PowerShell 中，将大整数进行三位分割（通常称为千分位分隔符）最优雅的方式是使用 **.NET 的格式化字符串**。

虽然默认的标准是逗号（`,`），但我们可以通过简单的替换操作将其改为横杠（`-`）。

### 1. 最推荐的方法：使用 `-f` 格式化操作符

这是最符合 PowerShell 习惯的方法。我们先利用数字格式 `N0`（表示带分隔符且保留 0 位小数）生成字符串，然后将逗号替换为横杠。

```powershell
$number = 1234567890
# "{0:N0}" 会生成 1,234,567,890
$result = "{0:N0}" -f $number -replace ",", "-"

$result
# 输出: 1-234-567-890

```

---

### 2. 使用 `.ToString()` 方法

如果你更倾向于使用 .NET 方法，可以直接对数字变量调用 `ToString()`，逻辑是一样的：

```powershell
$number = 9876543210
$number.ToString("N0") -replace ",", "-"
# 输出: 9-876-543-210

```

---

### 3. 处理“本地化”问题的万全之策

**注意：** 在某些国家（如德国、法国），系统默认的千分位分隔符是点（`.`）而不是逗号（`,`）。为了让你的脚本在任何电脑上都运行一致，建议显式指定“固定区域性”（Invariant Culture）：

```powershell
$number = 1234567
$culture = [System.Globalization.CultureInfo]::InvariantCulture
$number.ToString("N0", $culture).Replace(",", "-")

```

---

### 4. 为什么要用 `N0`？

在格式化字符串中：

* **`N`** 代表 Number（数字格式），它会自动根据系统设置添加分隔符。
* **`0`** 代表小数点后的位数。如果你写 `N2`，结果就会变成 `1-234-567.89`。

---

### 💡 进阶：如果是为了显示文件大小

结合你之前问的文件大小转换，你可以把它们组合起来：

```powershell
$file = Get-Item "C:\Windows\explorer.exe"
$sizeStr = "{0:N0}" -f $file.Length -replace ",", "-"
Write-Host "该文件大小为: $sizeStr Bytes"

```

你想把这个分割逻辑应用在特定的自动化报告中吗？还是有其他特殊格式的需求？

### A:

[System.IO.File]::ReadLines("C:\path\to\yourfile.txt") | Measure-Object | Select-Object -ExpandProperty Count
为什么省内存

### Q:

这是一个非常棒的技术细节问题。简单来说，这涉及到了计算机科学中**“贪婪加载” (Eager Loading)** 与 **“迭代器/流式处理” (Streaming/Lazy Evaluation)** 的本质区别。

我们可以通过对比 `ReadAllLines` 和 `ReadLines` 的工作机制来拆解原因：

---

### 1. `ReadAllLines`：贪婪加载（耗内存）

当你调用 `[System.IO.File]::ReadAllLines()` 时，程序的逻辑是：

1. **打开**文件。
2. **一次性**读取文件中的**每一行**。
3. 将所有行放入内存中的一个巨大**数组 (Array)**。
4. **关闭**文件。
5. 返回这个数组。

**后果：** 如果你的文件有 2GB，你的内存会瞬间被占用至少 2GB（甚至更多，因为 .NET 字符串对象有额外开销）。如果内存不够，程序就会直接崩溃（OutOfMemoryException）。

---

### 2. `ReadLines`：流式处理（省内存）

当你调用 `[System.IO.File]::ReadLines()` 时，它返回的是一个 **`IEnumerable<string>`**（可枚举对象）。它的逻辑是：

1. **准备**打开文件。
2. **并不立即读取全部内容**。
3. 每当管道（Pipeline）向它“要”一行数据时，它才从磁盘读一行，传给下一个命令，然后**丢弃**当前行的内存占用，再去读下一行。

**后果：** 无论文件是 1MB 还是 100GB，内存中几乎只保留**当前正在处理的那一行**。

---

### 3. 配合管道 (`|`) 的威力

在你的命令中：
`ReadLines(...) | Measure-Object`

* `ReadLines` 像一个**水龙头**，一点一点滴出数据。
* `|` 管道像一根**水管**。
* `Measure-Object` 像一个**计数器**，每流过一滴水（一行），计数器就 $+1$。

在这个过程中，**水（数据）是流动的，而不是积存在池子里（内存）的**。

---

### 4. 性能与内存的对比表

| 特性 | `ReadAllLines` | `ReadLines` |
| --- | --- | --- |
| **内存占用** | 随文件大小线性增长 (High) | **恒定且极低 (Low)** |
| **开始处理速度** | 慢（必须等全读完） | **极快（读到第一行就开始）** |
| **总体执行时间** | 处理小文件稍快 | 处理大文件优势明显 |
| **适用场景** | 需要反复随机访问每一行 | **统计、搜索、大文件过滤** |

---

### 💡 深度小知识

其实 PowerShell 自带的 `Get-Content` 默认也是流式处理的。但为什么我之前推荐 .NET 的 `ReadLines` 呢？

* `Get-Content`: 每次读取一行时，会给该行封装很多“额外信息”（如文件名、行号等），这会导致处理速度变慢。
* `[System.IO.File]::ReadLines`: 纯净的 .NET 字符串流，**速度比 `Get-Content` 快数倍**，同时保持极低的内存占用。

你想看看如何利用这个流式特性，在不打开大文件的情况下搜索其中的特定关键词吗？
