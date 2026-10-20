# SOLID原則

[日语面试 FAQ](../interview_qa.md)

### 単一責任の原則

Single Responsibility Principle シングル・レスポンシビリティ・プリンシプル

1つのオブジェクト（クラス）は、ただ1つの目的（関心事）のみに責任を持つべきであるという原則です。複数の役割を1つに詰め込みすぎると、変更時の影響範囲が広がりバグの原因になります。

例コード
```csharp
// 注文処理とログ出力を別々のオブジェクトに分離する
public class Logger
{
    public void Log(string message) => Console.WriteLine(message);
}

public class OrderProcessor
{
    private readonly Logger _logger = new Logger();

    public void Process(Order order)
    {
        // 注文処理のロジック
        _logger.Log($"Order {order.Id} processed."); // ログの責任はLoggerに移譲
    }
}
```

### 開放閉鎖の原則

Open-Closed Principle オープン・クローズド・プリンシプル

オブジェクトは拡張に対して開いており、修正に対して閉じているべきであるという原則です。新しい機能を追加するときに、既存の動いているコードを書き換えることなく、新しいオブジェクトの追加だけで対応できる設計を目指します。

例コード
```csharp
public interface IPaymentMethod
{
    void Pay();
}

public class CreditCardPayment : IPaymentMethod
{
    public void Pay() => Console.WriteLine("Paid with Credit Card");
}

// 決済処理クラスは固定（修正に対して閉じている）。新しい決済手段はオブジェクトを「追加」するだけ
public class PaymentProcessor
{
    public void Process(IPaymentMethod paymentMethod)
    {
        paymentMethod.Pay();
    }
}
```

### リスコフの置換原則

Liskov Substitution Principle リスコフ・サブスティチューション・プリンシプル

親クラスのオブジェクトを使っている場所は、それを継承したどの子クラスのオブジェクトに置き換えても、プログラムが正しく動き続けなければならないという原則です。子クラスで親クラスの前提条件を壊してはいけません。

例コード

リスコフの置換原則（LSP）の説明で最も有名な「正方形と長方形の矛盾（Square-Rectangle Problem）」を、ご提示いただいたシンプルなフォーマットに合わせてまとめました。
なぜ「数学的には正方形は長方形の一種」なのに、オブジェクト指向（プログラム）の世界では「正方形は長方形を継承してはいけない」と言われるのかがよく分かる例です。

```csharp
// 親クラス：長方形（Rectangle）
public class Rectangle
{
    public virtual int Width { get; set; }
    public virtual int Height { get; set; }

    public int GetArea() => Width * Height; // 面積を計算
}

// 子クラス：正方形（Square）
// 「正方形は縦と横が常に同じ」というルールを保つため、片方を変更するともう片方も連動させる
public class Square : Rectangle
{
    public override int Width
    {
        get => base.Width;
        set { base.Width = value; base.Height = value; } // 横を変えると縦も変わる
    }

    public override int Height
    {
        get => base.Height;
        set { base.Width = value; base.Height = value; } // 縦を変えると横も変わる
    }
}

// --- 使う側のコード（ここで問題が発生する） ---
public class AreaCalculator
{
    public void VerifyArea(Rectangle rect)
    {
        rect.Width = 5;
        rect.Height = 4;

        // 使う側は「長方形」だと思っているので、面積は 5 * 4 = 20 になることを期待している
        if (rect.GetArea() != 20)
        {
            // もし引数に「Square（正方形）」が渡されると、縦を4にした時点で横も4になってしまい、
            // 4 * 4 = 16 となり、この例外が発生してプログラムが壊れます。
            throw new Exception("長方形の面積計算が正しくありません！");
        }
    }
}
```

💡 なぜ違反しているのか？

使う側（`AreaCalculator`）は、**「** `Rectangle`  のオブジェクトなら、横幅を変えても高さは勝手に変わらないはずだ」という前提（期待）を持ってコードを書いています。
しかし、子クラスの `Square` はその前提を勝手に書き換えてしまっています。このように、「親クラス（長方形）を子クラス（正方形）に置き換えたらバグが起きる」状態を、リスコフの置換原則に違反していると言います。

### インターフェース分離の原則

Interface Segregation Principle インターフェース・セグレゲーション・プリンシプル

利用しない不要なメソッドが含まれた巨大なインターフェースをオブジェクトに強制するのではなく、目的ごとに細かく分離されたインターフェースを用意すべきであるという原則です。

例コード
```csharp
// 巨大なインターフェースを避けて、役割ごとに細かく分ける
public interface IWorkable
{
    void Work();
}

public interface IEatable
{
    void Eat();
}

// ロボットは働く（Work）だけで、食べる（Eat）を実装する必要がなくなる
public class Robot : IWorkable
{
    public void Work() => Console.WriteLine("ロボットが働いています");
}
```

### 依存関係逆転の原則

Dependency Inversion Principle ディペエンシー・インバージョン・プリンシプル

具体的なオブジェクト（下位レベル）に直接依存するのではなく、抽象（インターフェースなど）に依存すべきであるという原則です。これにより、オブジェクト同士の結びつきが弱くなり、パーツの交換が容易になります。

例コード
```csharp
public interface IMessageService
{
    void Send(string message);
}

// 具体的なサービス（Email）
public class EmailService : IMessageService
{
    public void Send(string message) => Console.WriteLine($"Email: {message}");
}

// 呼び出し側は具体的なEmailServiceではなく、抽象（IMessageService）に依存する
public class Notification
{
    private readonly IMessageService _service;
    public Notification(IMessageService service) => _service = service;

    public void Notify(string text) => _service.Send(text);
}
```
