# オブジェクト指向プログラミング（OOP）の三大要素（原則）

### カプセル化

Encapsulation カプセルカ

オブジェクトのデータ（状態）とそれに対する操作を1つにまとめ、外部から不要なアクセスを制限する仕組みです。内部の複雑な仕組みや重要なデータを隠すことで、外部から不正に書き換えられるリスクを防ぎます。

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>データ<rp>（</rp><rt>Data</rt><rp>）</rp></ruby>（１）（<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>）とそれに<ruby>対<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>する<ruby>操<rp>（</rp><rt>そう</rt><rp>）</rp></ruby><ruby>作<rp>（</rp><rt>さ</rt><rp>）</rp></ruby>（１）を1つにまとめ、<ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>（１）から<ruby>不<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>な<ruby>アクセス<rp>（</rp><rt>Access</rt><rp>）</rp></ruby>（１）を<ruby>制<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>限<rp>（</rp><rt>げん</rt><rp>）</rp></ruby>する<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>みです。<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>（１）の<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>雑<rp>（</rp><rt>ざつ</rt><rp>）</rp></ruby>な<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>みや<ruby>重<rp>（</rp><rt>じゅう</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>な<ruby>データ<rp>（</rp><rt>Data</rt><rp>）</rp></ruby>（１）を<ruby>隠<rp>（</rp><rt>かく</rt><rp>）</rp></ruby>すことで、<ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>（１）から<ruby>不<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby><ruby>正<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>に<ruby>書<rp>（</rp><rt>か</rt><rp>）</rp></ruby>き<ruby>換<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えられる<ruby>リスク<rp>（</rp><rt>Risk</rt><rp>）</rp></ruby>（１）を<ruby>防<rp>（</rp><rt>ふせ</rt><rp>）</rp></ruby>ぎます（３）。
<br>(是一种将对象的数据（状态）和对其进行的操作组合在一起，并限制来自外部的不必要访问的机制。通过隐藏内部复杂的机制或重要数据，来防止其被外部非法篡改的风险。)

例コード
```csharp
public class BankAccount
{
    // 外部からは読み取り専用（データプロテクション）
    public decimal Balance { get; private set; }

    // 正当な操作（メソッド）経由でのみ状態変更を許す
    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("金額が正しくありません");
        Balance += amount;
    }
}
```

### <ruby>継承<rp>（</rp><rt>けいしょう</rt><rp>）</rp></ruby>

Inheritance インヘリタンス

既存のオブジェクト（クラス）が持つ属性や仕組みを別のオブジェクトに引き継ぎ、共通部分を再利用する仕組みです。重複コードを減らし、共通の性質を持つオブジェクト同士の「親子関係」を表現します。

<ruby>既<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）（<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１））が<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>つ<ruby>属<rp>（</rp><rt>ぞく</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>や<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>みが<ruby>別<rp>（</rp><rt>べつ</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）に<ruby>引<rp>（</rp><rt>ひ</rt><rp>）</rp></ruby>き<ruby>継<rp>（</rp><rt>つ</rt><rp>）</rp></ruby>ぎ（４）、<ruby>共<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby><ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby>（１）を<ruby>再<rp>（</rp><rt>さい</rt><rp>）</rp></ruby><ruby>利<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>用<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>する<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>みです。<ruby>重<rp>（</rp><rt>じゅう</rt><rp>）</rp></ruby><ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>コード<rp>（</rp><rt>Code</rt><rp>）</rp></ruby>（１）を<ruby>減<rp>（</rp><rt>へ</rt><rp>）</rp></ruby>らし、<ruby>共<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby><ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby>の<ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>質<rp>（</rp><rt>しつ</rt><rp>）</rp></ruby>を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>つ（１）<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>同<rp>（</rp><rt>どう</rt><rp>）</rp></ruby><span>士</span>（１）の「<ruby>親<rp>（</rp><rt>おや</rt><rp>）</rp></ruby><ruby>子<rp>（</rp><rt>こ</rt><rp>）</rp></ruby>（１）<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>係<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>」を<ruby>表<rp>（</rp><rt>ひょう</rt><rp>）</rp></ruby><ruby>現<rp>（</rp><rt>げん</rt><rp>）</rp></ruby>します（３）。
<br>(这是一种将现有对象（类）所拥有的属性和机制继承给其他对象，从而实现共同部分再利用的机制。它不仅能减少重复代码，还能表现出具有共同性质的对象之间的“父子关系”。
)

例コード
```csharp
// 親クラス（ベースオブジェクト）：共通の性質を定義
public class Animal
{
    public string Name { get; set; }
    public void Eat() => Console.WriteLine($"{Name}がご飯を食べています。");
}

// 子クラス（派生オブジェクト）：親の性質を「継承」して再利用
public class Dog : Animal
{
    public void Bark() => Console.WriteLine("ワンワン！");
}
```

### <ruby>多<rp>（</rp><rt>た</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>

Polymorphism ポリモーフィズム

同じメッセージ（メソッド呼び出し）を送っても、受け取るオブジェクトによってそれぞれ異なる振る舞いをする仕組みです。呼び出し側は相手の具体的な種類を意識せずに、共通のインターフェースで多様なオブジェクトを扱えます。

<ruby>同<rp>（</rp><rt>おな</rt><rp>）</rp></ruby>じ<ruby>メッセージ<rp>（</rp><rt>Message</rt><rp>）</rp></ruby>（１）（<ruby>メソッド<rp>（</rp><rt>Method</rt><rp>）</rp></ruby><ruby>呼<rp>（</rp><rt>よ</rt><rp>）</rp></ruby>び<ruby>出<rp>（</rp><rt>だ</rt><rp>）</rp></ruby>し）を<ruby>送<rp>（</rp><rt>おく</rt><rp>）</rp></ruby>っても、<ruby>受<rp>（</rp><rt>う</rt><rp>）</rp></ruby>け<ruby>取<rp>（</rp><rt>と</rt><rp>）</rp></ruby>る<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）によってそれぞれ<ruby>異<rp>（</rp><rt>こと</rt><rp>）</rp></ruby>なる<ruby>振<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby>る<ruby>舞<rp>（</rp><rt>ま</rt><rp>）</rp></ruby>いをする<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>みです。<ruby>呼<rp>（</rp><rt>よ</rt><rp>）</rp></ruby>び<ruby>出<rp>（</rp><rt>だ</rt><rp>）</rp></ruby>し<ruby>側<rp>（</rp><rt>がわ</rt><rp>）</rp></ruby>は<ruby>相<rp>（</rp><rt>あい</rt><rp>）</rp></ruby><ruby>手<rp>（</rp><rt>て</rt><rp>）</rp></ruby>の<ruby>具<rp>（</rp><rt>ぐ</rt><rp>）</rp></ruby><ruby>体<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>な<ruby>種<rp>（</rp><rt>しゅ</rt><rp>）</rp></ruby><ruby>類<rp>（</rp><rt>るい</rt><rp>）</rp></ruby>を<ruby>意<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>識<rp>（</rp><rt>しき</rt><rp>）</rp></ruby>せずに、<ruby>共<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby><ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby>の<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４）で<ruby>多<rp>（</rp><rt>た</rt><rp>）</rp></ruby><ruby>様<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>な<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>扱<rp>（</rp><rt>あつか</rt><rp>）</rp></ruby>えます。
<br>(即使发送相同的消息（方法调用），根据接收该消息的对象不同，其行为表现也各不相同。这种机制使得调用方无需关注对方的具体类型，便能通过统一的接口来处理各种不同的对象。
)

例コード
```csharp
public interface IShape
{
    void Draw(); // 共通の操作方法を定義
}

public class Circle : IShape
{
    public void Draw() => Console.WriteLine("○ を描きます。");
}

public class Square : IShape
{
    public void Draw() => Console.WriteLine("□ を描きます。");
}
```

[日语面试 FAQ](../interview_qa.md)
