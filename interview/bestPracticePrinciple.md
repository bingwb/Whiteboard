# オブジェクト指向プログラミング（OOP）のベスト実践の原則

[日语面试 FAQ](../interview_qa.md)

### デメテルの法則

Law of Demeter ロー オブ デメテル

オブジェクトは、直接の関係を持つ密接なオブジェクト以外の内部構造を知るべきではないという原則です。「最小知識の原則」とも呼ばれ、オブジェクト同士の結びつき（結合度）を弱くします。
<br>(迪米特法则：对象不应了解与之无直接关系对象的内部结构。也称最小知识原则，能弱化对象间的结成关系。)

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）は、<ruby>直<rp>（</rp><rt>ちょく</rt><rp>）</rp></ruby><ruby>接<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby>の<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>係<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>つ<ruby>密<rp>（</rp><rt>みっ</rt><rp>）</rp></ruby><ruby>接<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby>な<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>以<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby>の<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>を<ruby>知<rp>（</rp><rt>し</rt><rp>）</rp></ruby>るべきではないという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。「<ruby>最<rp>（</rp><rt>さい</rt><rp>）</rp></ruby><ruby>小<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby><ruby>知<rp>（</rp><rt>ち</rt><rp>）</rp></ruby><ruby>識<rp>（</rp><rt>しき</rt><rp>）</rp></ruby>の<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>」とも<ruby>呼<rp>（</rp><rt>よ</rt><rp>）</rp></ruby>ばれ、<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>同<rp>（</rp><rt>どう</rt><rp>）</rp></ruby><ruby>士<rp>（</rp><rt>し</rt><rp>）</rp></ruby>の<ruby>結<rp>（</rp><rt>むす</rt><rp>）</rp></ruby>びつき<span>（<ruby>結<rp>（</rp><rt>けつ</rt><rp>）</rp></ruby><ruby>合<rp>（</rp><rt>ごう</rt><rp>）</rp></ruby><ruby>度<rp>（</rp><rt>ど</rt><rp>）</rp></ruby>（３））</span>を<ruby>弱<rp>（</rp><rt>よわ</rt><rp>）</rp></ruby>くします。

```csharp
// ❌ 違反例：注文から顧客、財布、現金へと深くアクセスしている
var cash = order.GetCustomer().GetWallet().GetCash();

// ⭕ 改善例：注文オブジェクトに直接支払いを依頼する
order.ProcessPayment();
```

### 継承より委<ruby>譲<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby>を<ruby>好<rp>（</rp><rt>この</rt><rp>）</rp></ruby>む

Favor Composition over Inheritance フェイバー コンポジション オーバー インヘリタンス

クラスの機能を拡張する際、親クラスを継承するのではなく、他のクラスのオブジェクトをプライベートな部品として内部に持たせて処理を任せる（委譲する）べきであるという原則です。不必要な密結合を防ぎます。
<br>(组合优于继承：在扩展功能时，不应盲目继承父类，而应将其他类作为内部部件并把处理委派给它。)

クラスの<ruby>機<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>能<rp>（</rp><rt>のう</rt><rp>）</rp></ruby>（１）を<ruby>拡<rp>（</rp><rt>かく</rt><rp>）</rp></ruby><ruby>張<rp>（</rp><rt>ちょう</rt><rp>）</rp></ruby>する<ruby>際<rp>（</rp><rt>さい</rt><rp>）</rp></ruby>、<ruby>親<rp>（</rp><rt>おや</rt><rp>）</rp></ruby>クラスを<ruby>継<rp>（</rp><rt>けい</rt><rp>）</rp></ruby><ruby>承<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby>するのではなく、<ruby>他<rp>（</rp><rt>ほか</rt><rp>）</rp></ruby>のクラスの<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>プライベート<rp>（</rp><rt>Private</rt><rp>）</rp></ruby>（４）な<ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>品<rp>（</rp><rt>ひん</rt><rp>）</rp></ruby>として<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>に<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>たせて<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby>（１）を<ruby>任<rp>（</rp><rt>まか</rt><rp>）</rp></ruby>せる<span>（<ruby>委<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>譲<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby>する）</span>べきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>不<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby><ruby>必<rp>（</rp><rt>ひつ</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>（１）な<ruby>密<rp>（</rp><rt>みっ</rt><rp>）</rp></ruby><ruby>接<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby>な<ruby>結<rp>（</rp><rt>けつ</rt><rp>）</rp></ruby><ruby>合<rp>（</rp><rt>ごう</rt><rp>）</rp></ruby>を<ruby>防<rp>（</rp><rt>ふせ</rt><rp>）</rp></ruby>ぎます。

```csharp
// ⭕ 改善例：Engineクラスを継承するのではなく、部品として内部に持たせる（委譲）
public class Car
{
    private readonly Engine _engine; // 内部の部品として持つ

    public Car()
    {
        _engine = new Engine();
    }

    public void Start()
    {
        _engine.Move(); // 処理を任せる
    }
}
```

### 同じ記述を繰り返さない（重複の<ruby>排除<rp>（</rp><rt>はいじょ</rt><rp>）</rp></ruby>）DRY (Don't Repeat Yourself)

Don't Repeat Yourself ドント リピート ユアセルフ

システム内において、特定の知識やロジックはただ一つの明確で信頼できる表現（記述）を持たなければならないという原則です。同じロジックのコピー＆ペーストを排除することで、仕様変更時の修正漏れやエンバグを防止します。
<br>(不要重复自己：系统内的特定知识或逻辑必须拥有唯一且明确可靠的表达。通过消除相同逻辑的复制粘贴，可以防止需求变更时漏掉修改并避免引发新Bug。)

システム<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby>において、<ruby>特<rp>（</rp><rt>とく</rt><rp>）</rp></ruby><ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby>の<ruby>知<rp>（</rp><rt>ち</rt><rp>）</rp></ruby><ruby>識<rp>（</rp><rt>しき</rt><rp>）</rp></ruby>や<ruby>ロジック<rp>（</rp><rt>Logic</rt><rp>）</rp></ruby>（１）はただ<ruby>一<rp>（</rp><rt>ひと</rt><rp>）</rp></ruby>つの<ruby>明<rp>（</rp><rt>めい</rt><rp>）</rp></ruby><ruby>確<rp>（</rp><rt>かく</rt><rp>）</rp></ruby>で<ruby>信<rp>（</rp><rt>しん</rt><rp>）</rp></ruby><ruby>頼<rp>（</rp><rt>らい</rt><rp>）</rp></ruby>できる<ruby>表<rp>（</rp><rt>ひょう</rt><rp>）</rp></ruby><ruby>現<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><span>（<ruby>記<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>述<rp>（</rp><rt>じゅつ</rt><rp>）</rp></ruby>）</span>を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>たなければならないという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>同<rp>（</rp><rt>おな</rt><rp>）</rp></ruby>じ<ruby>ロジック<rp>（</rp><rt>Logic</rt><rp>）</rp></ruby>（１）のコピー＆ペーストを<ruby>排<rp>（</rp><rt>はい</rt><rp>）</rp></ruby><ruby>除<rp>（</rp><rt>じょ</rt><rp>）</rp></ruby>（１）することで、<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>様<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>時<rp>（</rp><rt>じ</rt><rp>）</rp></ruby>（３）の<ruby>修<rp>（</rp><rt>しゅう</rt><rp>）</rp></ruby><ruby>正<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>漏れやエンバグを<ruby>防<rp>（</rp><rt>ぼう</rt><rp>）</rp></ruby><ruby>止<rp>（</rp><rt>し</rt><rp>）</rp></ruby>します。

```csharp
// ❌ 違反例：消費税の計算ロジックが、複数のメソッド内で重複して記述されている
public decimal GetPhonePrice(decimal basePrice) => basePrice * 1.10m;
public decimal GetLaptopPrice(decimal basePrice) => basePrice * 1.10m; // 重複

// ⭕ 改善例：税率計算の知識を一箇所に集約し、それを再利用する
private decimal ApplyTax(decimal price) => price * 1.10m;
public decimal GetPhonePrice(decimal basePrice) => ApplyTax(basePrice);
public decimal GetLaptopPrice(decimal basePrice) => ApplyTax(basePrice);
```

### シンプルにしておけ、この間抜け KISS (Keep It Simple, Stupid)

Keep It Simple, Stupid キープ イット シンプル ストゥーピッド

必要以上に複雑な設計や、将来使うかもしれないという予測による過剰な実装を避け、常に最も単純（シンプル）な状態を維持すべきであるという原則です。複雑なコードはバグを生みやすく、メンテナンスを困難にします。
<br>(保持简单：避免过度复杂的设计或因预测未来需求而提前编写过剩代码，应始终保持最简单的状态。复杂的代码极易滋生Bug，并导致后续维护困难。)

<ruby>必<rp>（</rp><rt>ひつ</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>以<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>上<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby>に<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>雑<rp>（</rp><rt>ざつ</rt><rp>）</rp></ruby>な<ruby>設<rp>（</rp><rt>せっ</rt><rp>）</rp></ruby><ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>や、<ruby>将<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby><ruby>来<rp>（</rp><rt>らい</rt><rp>）</rp></ruby>（１）<ruby>使<rp>（</rp><rt>つか</rt><rp>）</rp></ruby>うかもしれないという<ruby>予<rp>（</rp><rt>よ</rt><rp>）</rp></ruby><ruby>測<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>による<ruby>過<rp>（</rp><rt>か</rt><rp>）</rp></ruby><ruby>剰<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby>な<ruby>実<rp>（</rp><rt>じっ</rt><rp>）</rp></ruby><ruby>装<rp>（</rp><rt>そう</rt><rp>）</rp></ruby>を<ruby>避<rp>（</rp><rt>さ</rt><rp>）</rp></ruby>け（２）、<ruby>常<rp>（</rp><rt>つね</rt><rp>）</rp></ruby><ruby>に<rp>（</rp><rt>に</rt><rp>）</rp></ruby><ruby>最<rp>（</rp><rt>もっと</rt><rp>）</rp></ruby>も<ruby>単<rp>（</rp><rt>たん</rt><rp>）</rp></ruby><ruby>純<rp>（</rp><rt>じゅん</rt><rp>）</rp></ruby><span>（<ruby>シンプル<rp>（</rp><rt>Simple</rt><rp>）</rp></ruby>（１））</span>な<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>を<ruby>維<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>持<rp>（</rp><rt>じ</rt><rp>）</rp></ruby>すべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>雑<rp>（</rp><rt>ざつ</rt><rp>）</rp></ruby>な<ruby>コード<rp>（</rp><rt>Code</rt><rp>）</rp></ruby>（１）は<ruby>バグ<rp>（</rp><rt>Bug</rt><rp>）</rp></ruby>（１）を<ruby>生<rp>（</rp><rt>う</rt><rp>）</rp></ruby><ruby>みやすく、メンテナンスを<ruby>困<rp>（</rp><rt>こん</rt><rp>）</rp></ruby><ruby>難<rp>（</rp><rt>なん</rt><rp>）</rp></ruby>にします。

```csharp
// ❌ 違反例：単純な文字列結合に対して、過剰に抽象化されたオブジェクトやファクトリを導入してしまう
public class MessageFactory { public string Create() => "Hello " + "World"; }
public class Greeter { public void Greet() => Console.WriteLine(new MessageFactory().Create()); }

// ⭕ 改善例：ただ愚直に、最もシンプルな1行で完結させる
Console.WriteLine("Hello World");
```

### それはきっと必要にならない　YAGNI (You Aren't Gonna Need It)

You Aren't Gonna (going to) Need It ユー アーント ゴナ ニード イット

将来使うかもしれないという予測だけで先回りして不要なオブジェクトや機能を作らず、今まさに必要な最小限の実装だけに集中すべきであるという原則です。先回りの過剰設計は、システムを無駄に複雑にし、バグを増やす原因になります。
<br>(你不需要它：切忌为了虚无缥缈的未来需求而提前编写现在用不到的代码。先期的过度设计只会让系统无谓地复杂化，并增加Bug滋生的风险。)
<br>[1] (https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it),
<br>[2] (https://www.geeksforgeeks.org/software-engineering/what-is-yagni-principle-you-arent-gonna-need-it/),
<br>[3] (https://www.linkedin.com/pulse/understanding-yagni-principle-software-development-rakesh-bisht-oroqc),
<br>[4] (https://www.youtube.com/watch?v=dw-ITfOi2KM&t=70)

<ruby>将<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby><ruby>来<rp>（</rp><rt>らい</rt><rp>）</rp></ruby>（１）<ruby>使<rp>（</rp><rt>つか</rt><rp>）</rp></ruby>うかもしれないという<ruby>予<rp>（</rp><rt>よ</rt><rp>）</rp></ruby><ruby>測<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>だけで<ruby>先<rp>（</rp><rt>さき</rt><rp>）</rp></ruby><ruby>回<rp>（</rp><rt>まわ</rt><rp>）</rp></ruby>りして<ruby>不<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>（１）な<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）や<ruby>機<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>能<rp>（</rp><rt>のう</rt><rp>）</rp></ruby>（１）を<ruby>作<rp>（</rp><rt>つく</rt><rp>）</rp></ruby>らず、<ruby>今<rp>（</rp><rt>いま</rt><rp>）</rp></ruby>（１）まさに<ruby>必<rp>（</rp><rt>ひつ</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>な<ruby>最<rp>（</rp><rt>さい</rt><rp>）</rp></ruby><ruby>小<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby><ruby>限<rp>（</rp><rt>げん</rt><rp>）</rp></ruby>（３）の<ruby>実<rp>（</rp><rt>じっ</rt><rp>）</rp></ruby><ruby>装<rp>（</rp><rt>そう</rt><rp>）</rp></ruby>だけに<ruby>集<rp>（</rp><rt>しゅう</rt><rp>）</rp></ruby><ruby>中<rp>（</rp><rt>ちゅう</rt><rp>）</rp></ruby>すべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>先<rp>（</rp><rt>さき</rt><rp>）</rp></ruby><ruby>回<rp>（</rp><rt>まわ</rt><rp>）</rp></ruby>りの<ruby>過<rp>（</rp><rt>か</rt><rp>）</rp></ruby><ruby>剰<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby>な<ruby>設<rp>（</rp><rt>せっ</rt><rp>）</rp></ruby><ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>は、システムを<ruby>無<rp>（</rp><rt>む</rt><rp>）</rp></ruby><ruby>駄<rp>（</rp><rt>だ</rt><rp>）</rp></ruby>に<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>雑<rp>（</rp><rt>ざつ</rt><rp>）</rp></ruby>にし、<ruby>バグ<rp>（</rp><rt>Bug</rt><rp>）</rp></ruby>（１）を<ruby>増<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby>やす<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>因<rp>（</rp><rt>いん</rt><rp>）</rp></ruby>になります。

```csharp
// ❌ 違反例：現在はローカル保存しか使わないのに、将来を見越してクラウド用などの巨大なインターフェースや複数のクラスを先回りで作ってしまう
public interface IStorage { void SaveLocal(); void SaveS3(); void SaveAzure(); }

// ⭕ 改善例：今必要なのは「ローカル保存」だけなので、具象クラスに最小限の処理だけを書く（必要になったらその時拡張する）
public class LocalStorage
{
    public void Save(string data) => File.WriteAllText("data.txt", data);
}
```

### 暗黙的な依存より明示的な依存

Explicitly Dependency Over Implicitly Dependency エクスプリシットリー デペンデンシー オーバー インプリシットリー デペンデンシー

クラスが必要とする外部コンポーネントは、内部で隠れて取得（暗黙的な依存）するのではなく、コンストラクタなどを通じて外部から明示的に注入（明示的な依存）されるべきであるという原則です。これにより、コードの依存関係が透明になり、テストや部品の交換が容易になります。
<br>(显式依存优于隐式依存：类所需要的外部组件不应在内部悄悄获取（隐式依存），而应通过构造函数等途径从外部显式注入（显式依存）。这能让代码的依存关系变得透明，更易于测试和部件更换。)

クラスが<ruby>必<rp>（</rp><rt>ひつ</rt><rp>）</rp></ruby><ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>とする<ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>コンポーネント<rp>（</rp><rt>Component</rt><rp>）</rp></ruby>（３）は、<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>で<ruby>隠<rp>（</rp><rt>かく</rt><rp>）</rp></ruby>れて<ruby>取<rp>（</rp><rt>しゅ</rt><rp>）</rp></ruby><ruby>得<rp>（</rp><rt>とく</rt><rp>）</rp></ruby><span>（<ruby>暗<rp>（</rp><rt>あん</rt><rp>）</rp></ruby><ruby>黙<rp>（</rp><rt>もく</rt><rp>）</rp></ruby><ruby>得<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>な<ruby>依<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>）</span>するのではなく、コンストラクタなどを<ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby>じて<ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>から<ruby>明<rp>（</rp><rt>めい</rt><rp>）</rp></ruby><ruby>示<rp>（</rp><rt>じ</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>に<ruby>注<rp>（</rp><rt>ちゅう</rt><rp>）</rp></ruby><ruby>入<rp>（</rp><rt>にゅう</rt><rp>）</rp></ruby><span>（<ruby>明<rp>（</rp><rt>めい</rt><rp>）</rp></ruby><ruby>示<rp>（</rp><rt>じ</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>な<ruby>依<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>）</span>されるべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。これにより、コードの<ruby>依<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby><ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>係<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>が<ruby>透<rp>（</rp><rt>とう</rt><rp>）</rp></ruby><ruby>明<rp>（</rp><rt>めい</rt><rp>）</rp></ruby>になり、<ruby>テ<rp>（</rp><rt>て</rt><rp>）</rp></ruby><ruby>ス<rp>（</rp><rt>す</rt><rp>）</rp></ruby><ruby>ト<rp>（</rp><rt>と</rt><rp>）</rp></ruby>（１）や<ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>品<rp>（</rp><rt>ひん</rt><rp>）</rp></ruby>の<ruby>交<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>換<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>が<ruby>容<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>易<rp>（</rp><rt>い</rt><rp>）</rp></ruby>になります。

```csharp
// ❌ 違反例：メソッドの内部で静的クラスやサービスロケーターを呼び出し、依存関係が外から見えない（暗黙的）
public class OrderService
{
    public void CreateOrder()
    {
        var database = ServiceLocator.Get<IDatabase>(); // 隠れた依存
        database.Save();
    }
}

// ⭕ 改善例：コンストラクタを通じて必要な依存オブジェクトを要求する（明示的）
public class OrderService
{
    private readonly IDatabase _database;

    public OrderService(IDatabase database) // 外部から注入してもらう
    {
        _database = database;
    }

    public void CreateOrder() => _database.Save();
}
```

### ハリウッドの原則

Hollywood Principle ハリウッド プリンシパル

「こちらから連絡するので、あなたから連絡しないでください」という原則です。低レベルのコンポーネントが、高レベルのシステムの処理を勝手に呼び出すのではなく、高レベル側（フレームワークなど）から呼び出されるのを待つように設計します。
<br>(好莱坞原则：不要联系我们，我们会联系你。低层组件不应擅自调用高层系统，而应等待高层系统适时调用。)

「こちらから<ruby>連<rp>（</rp><rt>れん</rt><rp>）</rp></ruby><ruby>絡<rp>（</rp><rt>らく</rt><rp>）</rp></ruby>するので、あなたから<ruby>連<rp>（</rp><rt>れん</rt><rp>）</rp></ruby><ruby>絡<rp>（</rp><rt>らく</rt><rp>）</rp></ruby>しないでください」という<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。低<ruby>レベル<rp>（</rp><rt>Level</rt><rp>）</rp></ruby>（１）の<ruby>コンポーネント<rp>（</rp><rt>Component</rt><rp>）</rp></ruby>（３）が、高<ruby>レベル<rp>（</rp><rt>Level</rt><rp>）</rp></ruby>（１）の<ruby>システム<rp>（</rp><rt>System</rt><rp>）</rp></ruby>の<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby>（１）を<ruby>勝<rp>（</rp><rt>かっ</rt><rp>）</rp></ruby><ruby>手<rp>（</rp><rt>て</rt><rp>）</rp></ruby>に<ruby>呼<rp>（</rp><rt>よ</rt><rp>）</rp></ruby>び<ruby>出<rp>（</rp><rt>だ</rt><rp>）</rp></ruby>すのではなく、高<ruby>レベル<rp>（</rp><rt>Level</rt><rp>）</rp></ruby>（１）<ruby>側<rp>（</rp><rt>がわ</rt><rp>）</rp></ruby>（<ruby>フレームワーク<rp>（</rp><rt>Framework</rt><rp>）</rp></ruby>など）から<ruby>呼<rp>（</rp><rt>よ</rt><rp>）</rp></ruby>び<ruby>出<rp>（</rp><rt>だ</rt><rp>）</rp></ruby>されるのを<ruby>待<rp>（</rp><rt>ま</rt><rp>）</rp></ruby>つように<ruby>設<rp>（</rp><rt>せっ</rt><rp>）</rp></ruby><ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>します。

```csharp
// ⭕ 改善例：コンポーネントは枠組みに登録され、適切なタイミングで呼び出されるのを待つ
public class MyButton
{
    public void OnClick()
    {
        Console.WriteLine("Clicked");
    }
}

// 呼び出しはフレームワーク（高レベル）側に委ねる
framework.RegisterListener(new MyButton());
```

### 不変性の原則

Immutability Principle イミュータビリティ プリンシパル

オブジェクトが一度作成されたら、その内部状態（プロパティの値など）を変更できないように設計すべきであるという原則です。意図しない状態の書き換えによるバグを防ぎ、スレッド安全なコードになります。
<br>(不可变原则：对象一旦创建，其内部状态就不能再改变。以此防范意外改写，并确保线程安全。)

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）が<ruby>一<rp>（</rp><rt>いち</rt><rp>）</rp></ruby><ruby>度<rp>（</rp><rt>ど</rt><rp>）</rp></ruby>（１）<ruby>作<rp>（</rp><rt>さく</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>されたら、その<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><span>（<ruby>プロパティ<rp>（</rp><rt>Property</rt><rp>）</rp></ruby>（２）の<ruby>値<rp>（</rp><rt>あたい</rt><rp>）</rp></ruby>など）</span>を<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby>できないように<ruby>設<rp>（</rp><rt>せっ</rt><rp>）</rp></ruby><ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>すべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>意<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>図<rp>（</rp><rt>ず</rt><rp>）</rp></ruby>（１）しない<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>の<ruby>書<rp>（</rp><rt>か</rt><rp>）</rp></ruby>き<ruby>換<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えによる<ruby>バグ<rp>（</rp><rt>Bug</rt><rp>）</rp></ruby>（１）を<ruby>防<rp>（</rp><rt>ふせ</rt><rp>）</rp></ruby>ぎ、<ruby>スレッド<rp>（</rp><rt>Thread</rt><rp>）</rp></ruby><ruby>安<rp>（</rp><rt>あん</rt><rp>）</rp></ruby><ruby>全<rp>（</rp><rt>ぜん</rt><rp>）</rp></ruby>な<ruby>コード<rp>（</rp><rt>Code</rt><rp>）</rp></ruby>（１）になります。

```csharp
// ⭕ 改善例：値を変更する際は、自身を書き換えず新しいオブジェクトを返す
public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }

    public Point Move(int dx, int dy)
    {
        return new Point(X + dx, Y + dy); // 新しいオブジェクトを生成して返す
    }
}
```

### 清潔で務実的な設計の維持 Keep it Clean and Pragmatic (GRASP & Core Rules)

「Keep it Clean and Pragmatic」 キープ イット クリーン アンド プラグマティック
オブジェクト指向設計の理論（GRASPなど）に盲従するのではなく、現実の複雑さや保守性とのバランスを取り、常にクリーンで実用的な状態を維持すべきであるという原則です。過度な抽象化を避け、チームが理解しやすいシンプルな設計を重視します。
<br>(保持洁净与务实：不要盲从面向对象设计理论（如GRASP），要在现实复杂性与可维护性之间取得平衡，始终保持代码洁净且实用。避免过度抽象，重视团队易于理解的简单设计。)

「Keep it Clean and Pragmatic」 <ruby>キープ<rp>（</rp><rt>Keep</rt><rp>）</rp></ruby> <ruby>イット<rp>（</rp><rt>It</rt><rp>）</rp></ruby> <ruby>クリーン<rp>（</rp><rt>Clean</rt><rp>）</rp></ruby> <ruby>アンド<rp>（</rp><rt>And</rp><rp>）</rp></ruby> <ruby>プラグマティック<rp>（</rp><rt>Pragmatic</rt><rp>）</rp></ruby> <ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>指<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>向<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>設<rp>（</rp><rt>せっ</rt><rp>）</rp></ruby><ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>の<ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>論<rp>（</rp><rt>ろん</rt><rp>）</rp></ruby><span>（GRASP<span>（<ruby>グラスプ<rp>（</rp><rt>General Responsibility Assignment Software Patterns</rt><rp>）</rp></ruby>）</span>など）</span>に<ruby>盲<rp>（</rp><rt>もう</rt><rp>）</rp></ruby><ruby>従<rp>（</rp><rt>じゅう</rt><rp>）</rp></ruby>（１）するのではなく、<ruby>現<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>実<rp>（</rp><rt>じつ</rt><rp>）</rp></ruby>の<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>雑<rp>（</rp><rt>ざつ</rt><rp>）</rp></ruby>さや<ruby>保<rp>（</rp><rt>ほ</rt><rp>）</rp></ruby><ruby>守<rp>（</rp><rt>しゅ</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>との<ruby>バランス<rp>（</rp><rt>Balance</rt><rp>）</rp></ruby>を<ruby>取<rp>（</rp><rt>と</rt><rp>）</rp></ruby>り、<ruby>常<rp>（</rp><rt>つね</rt><rp>）</rp></ruby>に<ruby>クリーン<rp>（</rp><rt>Clean</rt><rp>）</rp></ruby>で<ruby>実<rp>（</rp><rt>じっ</rt><rp>）</rp></ruby><ruby>用<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>な<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>を<ruby>維<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>持<rp>（</rp><rt>じ</rt><rp>）</rp></ruby>すべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。<ruby>過<rp>（</rp><rt>か</rt><rp>）</rp></ruby><ruby>度<rp>（</rp><rt>ど</rt><rp>）</rp></ruby>（１）な<ruby>抽<rp>（</rp><rt>ちゅう</rt><rp>）</rp></ruby><ruby>象<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>を<ruby>避<rp>（</rp><rt>さ</rt><rp>）</rp></ruby>け（２）、<ruby>チーム<rp>（</rp><rt>Team</rt><rp>）</rp></ruby>（１）が<ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>解<rp>（</rp><rt>かい</rt><rp>）</rp></ruby>しやすい<ruby>シンプル<rp>（</rp><rt>Simple</rt><rp>）</rp></ruby>（１）な<ruby>設<rp>（</rp><rt>せっ</rt><rp>）</rp></ruby><ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>を<ruby>重<rp>（</rp><rt>じゅう</rt><rp>）</rp></ruby><ruby>視<rp>（</rp><rt>し</rt><rp>）</rp></ruby>（１）します。

```csharp
// ❌ 違反例：将来の拡張を過剰に意識し、1つの単純な処理に大量のインターフェースや階層を作ってしまう
public interface IDataProcessor { void Process(); }
public class PragmaticProcessor : IDataProcessor
{
    public void Process() => Console.WriteLine("Simple logic."); // やりすぎ（過剰設計）
}

// ⭕ 改善例：まずは具象クラスでシンプルに実装し、本当に必要になった時に初めてリファクタリングする
public class SimpleProcessor
{
    public void Process() => Console.WriteLine("Simple logic.");
}
```

#### GRASP原則やオブジェクト指向設計について

- [GRASP（General Responsibility Assignment Software Patterns）— オブジェクトに責務を割り当てる9つの原則](https://qiita.com/kkkkkou/items/813d3d7003d4ddc736a4)
- [GRASPパターンのまとめ](https://qiita.com/Kudo_panda/items/9610b9b99bec4a375ff3)
- [GRASP Design Principles in OOAD](https://www.geeksforgeeks.org/system-design/grasp-design-principles-in-ooad/)


### 変化する部分のカプセル化（変化の分離）

Encapsulate What Varies エンカプセレート ワット バリーズ

システムの中で「頻繁に変更される部分（変化する職務やロジック）」を特定し、それを変化しない部分から切り離してカプセル化（独立）させるべきであるという原則です。これにより、将来新しい仕様や変更が発生した際も、他の安定したコードに影響を与えずにそのカプセル化した部分だけを拡張・変更できます。
<br>(封装变化：找出系统中“频繁变动的部分（变化的职责或逻辑）”，将其从不变的部分中分离并进行封装（独立）。这样一来，未来发生新需求或变更时，就能在不影响其他稳定代码的前提下，仅对封装的部分进行扩展与修改。)

システム（System）の<ruby>中<rp>（</rp><rt>なか</rt><rp>）</rp></ruby>で「<ruby>頻<rp>（</rp><rt>ひん</rt><rp>）</rp></ruby><ruby>繁<rp>（</rp><rt>ぱん</rt><rp>）</rp></ruby>に<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby>される<ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby><span>（<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>する<ruby>職<rp>（</rp><rt>しょく</rt><rp>）</rp></ruby><ruby>務<rp>（</rp><rt>む</rt><rp>）</rp></ruby>やロジック（Logic）（１））</span>」を<ruby>特<rp>（</rp><rt>とく</rt><rp>）</rp></ruby><ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby>し、それを<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>しない<ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby>から<ruby>切<rp>（</rp><rt>き</rt><rp>）</rp></ruby>り<ruby>離<rp>（</rp><rt>はな</rt><rp>）</rp></ruby>してカプセル<ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby><span>（<ruby>独<rp>（</rp><rt>どく</rt><rp>）</rp></ruby><ruby>立<rp>（</rp><rt>りつ</rt><rp>）</rp></ruby>）</span>させるべきであるという<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>則<rp>（</rp><rt>そく</rt><rp>）</rp></ruby>です。これにより、<ruby>将<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby><ruby>来<rp>（</rp><rt>らい</rt><rp>）</rp></ruby>（１）<ruby>新<rp>（</rp><rt>あたら</rt><rp>）</rp></ruby>しい<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>様<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>や<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby>が<ruby>発<rp>（</rp><rt>はっ</rt><rp>）</rp></ruby><ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>した<ruby>際<rp>（</rp><rt>さい</rt><rp>）</rp></ruby>も、<ruby>他<rp>（</rp><rt>ほか</rt><rp>）</rp></ruby>の<ruby>安<rp>（</rp><rt>あん</rt><rp>）</rp></ruby><ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby>したコード（Code）（１）に<ruby>影<rp>（</rp><rt>えい</rt><rp>）</rp></ruby><ruby>響<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby>を<ruby>与<rp>（</rp><rt>あた</rt><rp>）</rp></ruby>えずにそのカプセル<ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>した<ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby>だけを<ruby>拡<rp>（</rp><rt>かく</rt><rp>）</rp></ruby><ruby>張<rp>（</rp><rt>ちょう</rt><rp>）</rp></ruby>・<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby>できます。

```csharp
// ⭕ 改善例：税金計算ロジック（国や時期で変化する部分）をインターフェースとしてカプセル化する
public interface ITaxStrategy
{
    decimal CalculateTax(decimal price);
}

public class OrderCalculator
{
    private readonly ITaxStrategy _taxStrategy;

    public OrderCalculator(ITaxStrategy taxStrategy)
    {
        _taxStrategy = taxStrategy; // 変化する部分を外から受け取る
    }

    public decimal GetTotal(decimal price) => price + _taxStrategy.CalculateTax(price);
}
```

### 参照
- [Good Principles](https://deviq.com/principles/)
