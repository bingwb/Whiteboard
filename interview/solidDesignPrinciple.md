# SOLID原則

[日语面试 FAQ](../interview_qa.md)

### <ruby>単一<rp>（</rp><rt>たんいつ</rt><rp>）</rp></ruby>責任の原則

Single Responsibility Principle シングル・レスポンシビリティ・プリンシプル

**1つ**のオブジェクト（クラス）は、ただ**1つの目的**（関心事）**のみに責任**を**持つべき**であるという原則です。複数の役割を1つに詰め込みすぎると、変更時の影響範囲が広がりバグの原因になります。
<br>(这是一个原则，指的是一个对象（类）应该只对唯一的一个目的（关注点）负责。如果在一个地方塞入过多的多重角色，在修改时影响范围就会扩大，从而成为引发Bug的原因。)

1つの<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<span>（<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１））</span>は、ただ1つの<ruby>目<rp>（</rp><rt>もく</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby><span>（<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>心<rp>（</rp><rt>しん</rt><rp>）</rp></ruby><ruby>事<rp>（</rp><rt>ごと</rt><rp>）</rp></ruby>）</span>のみに<ruby>責<rp>（</rp><rt>せき</rt><rp>）</rp></ruby><ruby>任<rp>（</rp><rt>にん</rt><rp>）</rp></ruby>を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>つべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>数<rp>（</rp><rt>すう</rt><rp>）</rp></ruby>の<ruby>役<rp>（</rp><rt>やく</rt><rp>）</rp></ruby><ruby>割<rp>（</rp><rt>わり</rt><rp>）</rp></ruby>（３）を1つに<ruby>詰<rp>（</rp><rt>つ</rt><rp>）</rp></ruby>め<ruby>込<rp>（</rp><rt>こ</rt><rp>）</rp></ruby>みすぎると、<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>時<rp>（</rp><rt>じ</rt><rp>）</rp></ruby>（３）の<ruby>影<rp>（</rp><rt>えい</rt><rp>）</rp></ruby><ruby>響<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby><ruby>範<rp>（</rp><rt>はん</rt><rp>）</rp></ruby><ruby>囲<rp>（</rp><rt>い</rt><rp>）</rp></ruby>（３）が<ruby>広<rp>（</rp><rt>ひろ</rt><rp>）</rp></ruby>がり<ruby>バグ<rp>（</rp><rt>Bug</rt><rp>）</rp></ruby>（１）の<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>因<rp>（</rp><rt>いん</rt><rp>）</rp></ruby>になります。

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

### <ruby>開放閉<rp>（</rp><rt>かいほうへい</rt><rp>）</rp></ruby><ruby>鎖<rp>（</rp><rt>さ</rt><rp>）</rp></ruby>の原則

Open-Closed Principle オープン・クローズド・プリンシプル

オブジェクトは**拡張**に対して**開いて**おり、**修正**に対して**閉じて**いるべきであるという原則です。新しい機能を追加するときに、既存の動いているコードを書き換えることなく、新しいオブジェクトの追加だけで対応できる設計を目指します。
<br>(这是一个原则，指的是对象应该对扩展开放，对修改封闭。它的目标是实现这样一种设计：在添加新功能时，无需重写现有运行中的代码，只需添加新的对象即可应对。)

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）は<ruby>拡<rp>（</rp><rt>かく</rt><rp>）</rp></ruby><ruby>張<rp>（</rp><rt>ちょう</rt><rp>）</rp></ruby>に<ruby>対<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>して<ruby>開<rp>（</rp><rt>ひら</rt><rp>）</rp></ruby>いており、<ruby>修<rp>（</rp><rt>しゅう</rt><rp>）</rp></ruby><ruby>正<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>に<ruby>対<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>して<ruby>閉<rp>（</rp><rt>と</rt><rp>）</rp></ruby>じているべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>新<rp>（</rp><rt>あたら</rt><rp>）</rp></ruby>しい<ruby>機<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>能<rp>（</rp><rt>のう</rt><rp>）</rp></ruby>（１）を<ruby>追<rp>（</rp><rt>つい</rt><rp>）</rp></ruby><ruby>加<rp>（</rp><rt>か</rt><rp>）</rp></ruby>するときに、<ruby>既<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>の<ruby>動<rp>（</rp><rt>うご</rt><rp>）</rp></ruby>いている<ruby>コード<rp>（</rp><rt>Code</rt><rp>）</rp></ruby>（１）を<ruby>書<rp>（</rp><rt>か</rt><rp>）</rp></ruby>き<ruby>換<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えることなく、<ruby>新<rp>（</rp><rt>あたら</rt><rp>）</rp></ruby>しい<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>追<rp>（</rp><rt>つい</rt><rp>）</rp></ruby><ruby>加<rp>（</rp><rt>か</rt><rp>）</rp></ruby>だけで<ruby>対<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>応<rp>（</rp><rt>おう</rt><rp>）</rp></ruby>できる<ruby>設<rp>（</rp><rt>せっ</rt><rp>）</rp></ruby><ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>を<ruby>目<rp>（</rp><rt>め</rt><rp>）</rp></ruby><ruby>指<rp>（</rp><rt>ざ</rt><rp>）</rp></ruby>します。

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
<br>(这是一个原则，指的是任何使用父类对象的地方，即使将其替换为继承了该父类的任何子类对象，程序也必须能够保持正确运行。子类绝不能破坏父类的前提条件。)

<ruby>親<rp>（</rp><rt>おや</rt><rp>）</rp></ruby>クラスの<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>使<rp>（</rp><rt>つか</rt><rp>）</rp></ruby>っている<ruby>場<rp>（</rp><rt>ば</rt><rp>）</rp></ruby><ruby>所<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby>は、それを<ruby>継<rp>（</rp><rt>けい</rt><rp>）</rp></ruby><ruby>承<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby>したどの子クラスの<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）に<ruby>置<rp>（</rp><rt>お</rt><rp>）</rp></ruby>き<ruby>換<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えても、<ruby>プログラム<rp>（</rp><rt>Program</rt><rp>）</rp></ruby>（２）が<ruby>正<rp>（</rp><rt>ただ</rt><rp>）</rp></ruby>しく<ruby>動<rp>（</rp><rt>うご</rt><rp>）</rp></ruby>き<ruby>続<rp>（</rp><rt>つづ</rt><rp>）</rp></ruby>けなければならないという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。子クラスで<ruby>親<rp>（</rp><rt>おや</rt><rp>）</rp></ruby>クラスの<ruby>前<rp>（</rp><rt>ぜん</rt><rp>）</rp></ruby><ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>条<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>件<rp>（</rp><rt>けん</rt><rp>）</rp></ruby>（３）を<ruby>壊<rp>（</rp><rt>こわ</rt><rp>）</rp></ruby>してはいけません。

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
<br>(调用方（AreaCalculator）是带着“如果是 Rectangle 的对象，即使改变宽度，高度也绝不会自己发生改变”这一前提（期待）来编写代码的。 然而，子类 Square 却擅自重写了这一前提。像这样，“如果把父类（长方形）替换为子类（正方形）就会引发Bug”的状态，就被称为违反了里氏替换原则。)

<ruby>使<rp>（</rp><rt>つか</rt><rp>）</rp></ruby>う<ruby>側<rp>（</rp><rt>がわ</rt><rp>）</rp></ruby>（AreaCalculator）は、「 Rectangle の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）なら、<ruby>横<rp>（</rp><rt>よこ</rt><rp>）</rp></ruby><ruby>幅<rp>（</rp><rt>はば</rt><rp>）</rp></ruby>を<ruby>変<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えても<ruby>高<rp>（</rp><rt>たか</rt><rp>）</rp></ruby>さは<ruby>勝<rp>（</rp><rt>かっ</rt><rp>）</rp></ruby><ruby>手<rp>（</rp><rt>て</rt><rp>）</rp></ruby>に<ruby>変<rp>（</rp><rt>か</rt><rp>）</rp></ruby>わらないはずだ」という<ruby>前<rp>（</rp><rt>ぜん</rt><rp>）</rp></ruby><ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><span>（<ruby>期<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>待<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>）</span>を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>って<ruby>コード<rp>（</rp><rt>Code</rt><rp>）</rp></ruby>（１）を<ruby>書<rp>（</rp><rt>か</rt><rp>）</rp></ruby>いています。 しかし、子クラスの Square はその<ruby>前<rp>（</rp><rt>ぜん</rt><rp>）</rp></ruby><ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby>を<ruby>勝<rp>（</rp><rt>かっ</rt><rp>）</rp></ruby><ruby>手<rp>（</rp><rt>て</rt><rp>）</rp></ruby>に<ruby>書<rp>（</rp><rt>か</rt><rp>）</rp></ruby>き<ruby>換<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えてしまっています。このように、「<ruby>親<rp>（</rp><rt>おや</rt><rp>）</rp></ruby>クラス<span>（<ruby>長<rp>（</rp><rt>ちょう</rt><rp>）</rp></ruby><ruby>方<rp>（</rp><rt>ほう</rt><rp>）</rp></ruby><ruby>形<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>）</span>を子クラス<span>（<ruby>正<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>方<rp>（</rp><rt>ほう</rt><rp>）</rp></ruby><ruby>形<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>）</span>に<ruby>置<rp>（</rp><rt>お</rt><rp>）</rp></ruby>き<ruby>換<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えたら<ruby>バグ<rp>（</rp><rt>Bug</rt><rp>）</rp></ruby>（１）が<ruby>起<rp>（</rp><rt>お</rt><rp>）</rp></ruby>きる」<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>を、リスコフの<ruby>置<rp>（</rp><rt>ち</rt><rp>）</rp></ruby><ruby>換<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>の<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>に<ruby>違<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>反<rp>（</rp><rt>はん</rt><rp>）</rp></ruby>していると<ruby>言<rp>（</rp><rt>い</rt><rp>）</rp></ruby>います。

### インターフェース分離の原則

Interface Segregation Principle インターフェース・セグレゲーション・プリンシプル

利用しない不要なメソッドが含まれた巨大なインターフェースをオブジェクトに強制するのではなく、目的ごとに細かく分離されたインターフェースを用意すべきであるという原則です。
<br>(这是一个原则，指的是不应该向对象强制施加包含不需要的、不使用的多余方法的庞大接口，而是应该根据各自的目的，准备拆分得更细致的接口。)

<ruby>利<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>用<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>しない<ruby>不<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>（１）なメソッドが<ruby>含<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby>まれた<ruby>巨<rp>（</rp><rt>きょ</rt><rp>）</rp></ruby><ruby>大<rp>（</rp><rt>だい</rt><rp>）</rp></ruby>（１）な<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４）を<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）に<ruby>強<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby><ruby>制<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>するのではなく、<ruby>目<rp>（</rp><rt>もく</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>ごとに<ruby>細<rp>（</rp><rt>こま</rt><rp>）</rp></ruby>かく<ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby><ruby>離<rp>（</rp><rt>り</rt><rp>）</rp></ruby>された<ruby>インターフェース<rp>（</rp><rp>）</rp></ruby>（４）を<ruby>用<rp>（</rp><rt>よ</rt><rp>）</rp></ruby><ruby>意<rp>（</rp><rt>い</rt><rp>）</rp></ruby>すべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。

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

### 依存関係<ruby>逆<rp>（</rp><rt>ぎゃく</rt><rp>）</rp></ruby>転の原則

Dependency Inversion Principle ディペエンシー・インバージョン・プリンシプル

具体的なオブジェクト（下位レベル）に直接依存するのではなく、抽象（インターフェースなど）に依存すべきであるという原則です。これにより、オブジェクト同士の結びつきが弱くなり、パーツの交換が容易になります。
<br>(这是一个原则，指的是不应该直接依赖于具体的对象（低层级），而是应该依赖于抽象（如接口等）。通过这种方式，对象之间的耦合度会降低，部件的更换也会变得更加容易。)

<ruby>具<rp>（</rp><rt>ぐ</rt><rp>）</rp></ruby><ruby>体<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>な<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<span>（<ruby>下<rp>（</rp><rt>か</rt><rp>）</rp></ruby><ruby>位<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>レベル<rp>（</rp><rt>Level</rt><rp>）</rp></ruby>（１））</span>に<ruby>直<rp>（</rp><rt>ちょく</rt><rp>）</rp></ruby><ruby>接<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby><ruby>依<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>するのではなく、<ruby>抽<rp>（</rp><rt>ちゅう</rt><rp>）</rp></ruby><ruby>象<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby><span>（<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>など（４））</span>に<ruby>依<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>すべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。これにより、<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>同<rp>（</rp><rt>どう</rt><rp>）</rp></ruby><ruby>士<rp>（</rp><rt>し</rt><rp>）</rp></ruby>の<ruby>結<rp>（</rp><rt>むす</rt><rp>）</rp></ruby>びつきが<ruby>弱<rp>（</rp><rt>よわ</rt><rp>）</rp></ruby>くなり、<ruby>パーツ<rp>（</rp><rt>Parts</rt><rp>）</rp></ruby>の<ruby>交<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>換<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>が<ruby>容<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>易<rp>（</rp><rt>い</rt><rp>）</rp></ruby>になります。

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
