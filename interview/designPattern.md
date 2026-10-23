# GoF（Gang of Four）パターン

[日语面试 FAQ](../interview_qa.md)

## <span id="toc">目次</span>
- [生成に関するパターン](#生成に関するパターン)
  - [抽象的な工場①](#抽象的な工場)
  - [建築者（けんちくしゃ）②](#建築者けんちくしゃ)
  - [工場メソッド③](#工場メソッド)
  - [原型（げんけい）④](#原型げんけい)
  - [単一（いつ）構造（こうぞう）体⑤](#単一いつ構造こうぞう体)
- [構造に関するパターン](#構造に関するパターン)
  - [適合（てきごう）者⑥](#適合てきごう者)
  - [架け橋（かけはし）⑦](#架け橋かけはし)
  - [合成物（ごうせいぶつ）⑧](#合成物ごうせいぶつ)
  - [装飾者（そうしょくしゃ）⑨](#装飾者そうしょくしゃ)
  - [正面・窓口⑩](#正面窓口)
  - [フライ級・軽量（けいりょう）⑪](#フライ級軽量けいりょう)
  - [代理人⑫](#代理人)
- [振る舞いに関するパターン](#振る舞いに関するパターン)
  - [責任の連鎖⑬](#責任の連鎖)
  - [命令⑭](#命令)
- [通訳者⑮](#通訳者)
  - [反復子⑯](#反復子)
  - [調停者⑰](#調停者)
  - [形見・記憶⑱](#形見記憶)
  - [観察者⑲](#観察者)
  - [状態⑳](#状態)
  - [戦略㉑](#戦略)
  - [雛形（ひながた）メソッド㉒](#雛形ひながたメソッド)
  - [訪問者㉓](#訪問者)
- [付録](#付録)

### 生成に関するパターン

**Creational** Patterns クリエイショナル パターン

**オブジェクトの生成メカニズム**に関するパターンです。オブジェクトを直接インスタンス化（new）するのではなく、生成ロジックを隠蔽・カプセル化することで、システムの柔軟性と再利用性を高めます。
<br>（这是一种关于对象创建机制的模式。它不是直接实例化（new）对象，而是通过隐藏和封装创建逻辑，来提高系统的灵活性和可重用性。）

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>メカニズム<rp>（</rp><rt>Mechanism</rt><rp>）</rp></ruby>（２）に<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>する<ruby>パターン<rp>（</rp><rt>Pattern</rt><rp>）</rp></ruby>（１）です。<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>直<rp>（</rp><rt>ちょく</rt><rp>）</rp></ruby><ruby>接<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby>（１）<ruby>インスタンス<rp>（</rp><rt>Instance</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>（new）するのではなく、<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>ロジック<rp>（</rp><rt>Logic</rt><rp>）</rp></ruby>（１）を<ruby>隠<rp>（</rp><rt>いん</rt><rp>）</rp></ruby><ruby>蔽<rp>（</rp><rt>ぺい</rt><rp>）</rp></ruby>（３）・<ruby>カプセル<rp>（</rp><rt>Capsule</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>（４）することで、<ruby>システム<rp>（</rp><rt>System</rt><rp>）</rp></ruby>（１）の<ruby>柔<rp>（</rp><rt>じゅう</rt><rp>）</rp></ruby><ruby>軟<rp>（</rp><rt>なん</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>（３）と<ruby>再<rp>（</rp><rt>さい</rt><rp>）</rp></ruby><ruby>利<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>用<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>（３）を<ruby>高<rp>（</rp><rt>たか</rt><rp>）</rp></ruby>めます。

#### 抽象的な工場①
[目次へ](#toc)

**Abstract Factory** アブストラクト ファクトリー

互いに関連・依存する一連のオブジェクト群を、具体的なクラスを明示せずに生成するためのインターフェースを提供します。
<br>（提供一个用于创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。）

<ruby>互<rp>（</rp><rt>たが</rt><rp>）</rp></ruby>いに<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>連<rp>（</rp><rt>れん</rt><rp>）</rp></ruby>・<ruby>依<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>する<ruby>一<rp>（</rp><rt>いっ</rt><rp>）</rp></ruby><ruby>連<rp>（</rp><rt>れん</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>群<rp>（</rp><rt>ぐん</rt><rp>）</rp></ruby>を、<ruby>具<rp>（</rp><rt>ぐ</rt><rp>）</rp></ruby><ruby>体<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>な<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）を<ruby>明<rp>（</rp><rt>めい</rt><rp>）</rp></ruby><ruby>示<rp>（</rp><rt>じ</rt><rp>）</rp></ruby>（１）せずに<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>するための<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４）を<ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>供<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby>します。

コード例

```csharp
// 抽象的なパーツ
public interface IButton { void Render(); }
public interface ICheckbox { void Toggle(); }

// 抽象的な工場
public interface IGUIFactory {
    IButton CreateButton();
    ICheckbox CreateCheckbox();
}

// 具体的な実装（Windows用）
public class WinButton : IButton { public void Render() => Console.WriteLine("Windows風ボタン"); }
public class WinCheckbox : ICheckbox { public void Toggle() => Console.WriteLine("Windows風チェックボックス"); }
public class WinFactory : IGUIFactory {
    public IButton CreateButton() => new WinButton();
    public ICheckbox CreateCheckbox() => new WinCheckbox();
}

// 利用側
public class Application {
    private readonly IButton _button;
    public Application(IGUIFactory factory) {
        _button = factory.CreateButton(); // 具体的なクラス名を知る必要がない
    }
    public void Draw() => _button.Render();
}
```

#### <ruby>建築者<rp>（</rp><rt>けんちくしゃ</rt><rp>）</rp></ruby>②
[目次へ](#toc)

**Builder** ビルダー

複雑なオブジェクトの作成手順を、その表現方法から分離します。同じ作成手順で、異なる表現のオブジェクトを生成できるようにします。
<br>（将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。）

<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>雑<rp>（</rp><rt>ざつ</rt><rp>）</rp></ruby>な<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>作<rp>（</rp><rt>さく</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>手<rp>（</rp><rt>て</rt><rp>）</rp></ruby><ruby>順<rp>（</rp><rt>じゅん</rt><rp>）</rp></ruby>（２）を、その<ruby>表<rp>（</rp><rt>ひょう</rt><rp>）</rp></ruby><ruby>現<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>方<rp>（</rp><rt>ほう</rt><rp>）</rp></ruby><ruby>法<rp>（</rp><rt>ほう</rt><rp>）</rp></ruby>（３）から<ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby><ruby>離<rp>（</rp><rt>り</rt><rp>）</rp></ruby>（１）します。<ruby>同<rp>（</rp><rt>おな</rt><rp>）</rp></ruby>じ<ruby>作<rp>（</rp><rt>さく</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>手<rp>（</rp><rt>て</rt><rp>）</rp></ruby><ruby>順<rp>（</rp><rt>じゅん</rt><rp>）</rp></ruby>（２）で、<ruby>異<rp>（</rp><rt>こと</rt><rp>）</rp></ruby>なる<ruby>表<rp>（</rp><rt>ひょう</rt><rp>）</rp></ruby><ruby>現<rp>（</rp><rt>げん</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>できるようにします。

```csharp
public class Computer {
    public string CPU { get; set; } = string.Empty;
    public string RAM { get; set; } = string.Empty;
}

// 構築のステップを定義
public class ComputerBuilder {
    private readonly Computer _computer = new();
    public ComputerBuilder SetCPU(string cpu) { _computer.CPU = cpu; return this; }
    public ComputerBuilder SetRAM(string ram) { _computer.RAM = ram; return this; }
    public Computer Build() => _computer;
}

// 利用側
var myPC = new ComputerBuilder().SetCPU("Intel i9").SetRAM("32GB").Build();
```

#### 工場メソッド③
[目次へ](#toc)

**Factory Method** ファクトリー メソッド

オブジェクトを生成するためのインターフェースを定義しますが、実際にどのクラスをインスタンス化するかは子クラスに決定させます。
<br>（定义一个用于创建对象的接口，让子类决定实例化哪一个类。）

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>するための<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４）を<ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>義<rp>（</rp><rt>ぎ</rt><rp>）</rp></ruby>（１）しますが、<ruby>実<rp>（</rp><rt>じっ</rt><rp>）</rp></ruby><ruby>際<rp>（</rp><rt>さい</rt><rp>）</rp></ruby>にどの<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）を<ruby>インスタンス<rp>（</rp><rt>Instance</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>するかは<ruby>子<rp>（</rp><rt>こ</rt><rp>）</rp></ruby><ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）に<ruby>決<rp>（</rp><rt>けっ</rt><rp>）</rp></ruby><ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby>させます。

コード例
```csharp
public interface IDocument { void Open(); }
public class TextDocument : IDocument { public void Open() => Console.WriteLine("テキストを開く"); }

// 工場の土台
public abstract class Creator {
    public abstract IDocument CreateDocument(); // Factory Method
    public void OpenDocument() => CreateDocument().Open();
}

// 具体的な工場
public class TextCreator : Creator {
    public override IDocument CreateDocument() => new TextDocument();
}
```

#### <ruby>原型<rp>（</rp><rt>げんけい</rt><rp>）</rp></ruby>④
[目次へ](#toc)

**Prototype** プロトタイプ

既存のオブジェクト（原型）をコピー（クローン）することで、新しいオブジェクトを生成します。
<br>（通过复制（克隆）现有的对象（原型）来创建新的对象。）

<ruby>既<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>そん</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）（<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>型<rp>（</rp><rt>けい</rt><rp>）</rp></ruby>）を<ruby>コピー<rp>（</rp><rt>Copy</rt><rp>）</rp></ruby>（１）（<ruby>クローン<rp>（</rp><rt>Clone</rt><rp>）</rp></ruby>（１））することで、<ruby>新<rp>（</rp><rt>あたら</rt><rp>）</rp></ruby>しい<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>します。

コード例
```csharp
public abstract class Monster {
    public abstract Monster Clone();
}

public class Zombie : Monster {
    public int HP { get; set; }
    public override Monster Clone() => (Monster)this.MemberwiseClone(); // 浅いコピー
}
```

#### 単<ruby>一<rp>（</rp><rt>いつ</rt><rp>）</rp></ruby><ruby>構造<rp>（</rp><rt>こうぞう</rt><rp>）</rp></ruby>体⑤
[目次へ](#toc)

**Singleton** シングルトン

あるクラスのインスタンスがシステム内に「絶対に1つ」しか存在しないことを保証し、それへのグローバルなアクセスポイントを提供します。
<br>（保证一个类仅有一个实例，并提供一个访问它的全局访问点。）

ある<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）の<ruby>インスタンス<rp>（</rp><rt>Instance</rt><rp>）</rp></ruby>が<ruby>システム<rp>（</rp><rt>System</rt><rp>）</rp></ruby>（１）<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby>に「<ruby>絶<rp>（</rp><rt>ぜっ</rt><rp>）</rp></ruby><ruby>対<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>に1つ」しか<ruby>存<rp>（</rp><rt>そん</rt><rp>）</rp></ruby><ruby>在<rp>（</rp><rt>ざい</rt><rp>）</rp></ruby>しないことを<ruby>保<rp>（</rp><rt>ほ</rt><rp>）</rp></ruby><ruby>証<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby>し、それへの<ruby>グローバル<rp>（</rp><rt>Global</rp></ruby>（１）な<ruby>アクセスポイント<rp>（</rp><rt>Access Point</rt><rp>）</rp></ruby>（５）を<ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>供<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby>します。

コード例
```csharp
public class DatabaseConnection {
    private static DatabaseConnection? _instance;
    private DatabaseConnection() { } // 外部からの new を禁止

    public static DatabaseConnection Instance {
        get {
            _instance ??= new DatabaseConnection();
            return _instance;
        }
    }
}
```

### 構造に関するパターン

**Structural** Patterns ストラクチュラル パターン

クラスやオブジェクトの組み合わせに関するパターンです。異なるインターフェースを持つオブジェクト同士を繋いだり、大きな構造を効率的に構築したりします。
<br>（这是一种关于类和对象组合的模式。它将具有不同接口的对象连接起来，或者高效地构建大型结构。）

<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）や<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>み<ruby>合<rp>（</rp><rt>あ</rt><rp>）</rp></ruby>わせに<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>するパターン（１）です。<ruby>異<rp>（</rp><rt>こと</rt><rp>）</rp></ruby>なる<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４）を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>つ<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>同<rp>（</rp><rt>どう</rt><rp>）</rp></ruby>しを<ruby>繋<rp>（</rp><rt>つな</rt><rp>）</rp></ruby>いだり、<ruby>大<rp>（</rp><rt>おお</rt><rp>）</rp></ruby>きな<ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>を<ruby>効<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>率<rp>（</rp><rt>りつ</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>に<ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>築<rp>（</rp><rt>ちく</rt><rp>）</rp></ruby>したりします。

#### <ruby>適合<rp>（</rp><rt>てきごう</rt><rp>）</rp></ruby>者⑥
[目次へ](#toc)

**Adapter** アダプター

互換性のないインターフェースを持つクラス同士を、繋ぎ合わせる（変換する）ことで一緒に働かせます。
<br>（将一个类的接口转换成客户希望的另一个接口，使原本由于接口不兼容而不能一起工作的那些类可以一起工作。）

<ruby>互<rp>（</rp><rt>ご</rt><rp>）</rp></ruby><ruby>換<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>のない<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４）を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>つ<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）<ruby>同<rp>（</rp><rt>どう</rt><rp>）</rp></ruby>しを、<ruby>繋<rp>（</rp><rt>つな</rt><rp>）</rp></ruby>ぎ<ruby>合<rp>（</rp><rt>あ</rt><rp>）</rp></ruby>わせる（<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>換<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>する）ことで<ruby>一<rp>（</rp><rt>いっ</rt><rp>）</rp></ruby><ruby>緒<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby>に<ruby>働<rp>（</rp><rt>はたら</rt><rp>）</rp></ruby>かせます。

コード例
```csharp
// 既存の古いシステム（変更できない）
public class LegacyCalculator {
    public int CalculateSum(int a, int b) => a + b;
}

// 新しい共通ターゲット
public interface ITarget { int Add(int a, int b); }

// 仲介役（Adapter）
public class CalculatorAdapter : ITarget {
    private readonly LegacyCalculator _legacy = new();
    public int Add(int a, int b) => _legacy.CalculateSum(a, b);
}
```

#### <ruby>架け橋<rp>（</rp><rt>かけはし</rt><rp>）</rp></ruby>⑦
[目次へ](#toc)

**Bridge** ブリッジ

「機能の階層」と「実装の階層」の2つを独立したクラス階層に分離し、それらの間に橋（参照）を架けて柔軟に組み合わせられるようにします。
<br>（将抽象部分与它的实现部分分离，使它们都可以独立地变化。）

「<ruby>機<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>能<rp>（</rp><rt>のう</rt><rp>）</rp></ruby>の<ruby>階<rp>（</rp><rt>かい</rt><rp>）</rp></ruby><ruby>層<rp>（</rp><rt>そう</rt><rp>）</rp></ruby>」と「<ruby>実<rp>（</rp><rt>じっ</rt><rp>）</rp></ruby><ruby>装<rp>（</rp><rt>そう</rt><rp>）</rp></ruby>の<ruby>階<rp>（</rp><rt>かい</rt><rp>）</rp></ruby><ruby>層<rp>（</rp><rt>そう</rt><rp>）</rp></ruby>」の2つを<ruby>独<rp>（</rp><rt>どく</rt><rp>）</rp></ruby><ruby>立<rp>（</rp><rt>りつ</rt><rp>）</rp></ruby>した<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）<ruby>階<rp>（</rp><rt>かい</rt><rp>）</rp></ruby><ruby>層<rp>（</rp><rt>そう</rt><rp>）</rp></ruby>に<ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby><ruby>離<rp>（</rp><rt>り</rt><rp>）</rp></ruby>（１）し、それらの<ruby>間<rp>（</rp><rt>あいだ</rt><rp>）</rp></ruby>に<ruby>橋<rp>（</rp><rt>はし</rt><rp>）</rp></ruby>（２）（<ruby>参<rp>（</rp><rt>さん</rt><rp>）</rp></ruby><ruby>照<rp>（</rp><rt>しょう</rt><rp>）</rp></ruby>）を<ruby>架<rp>（</rp><rt>か</rt><rp>）</rp></ruby>けて<ruby>柔<rp>（</rp><rt>じゅう</rt><rp>）</rp></ruby><ruby>軟<rp>（</rp><rt>なん</rt><rp>）</rp></ruby>に<ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>み<ruby>合<rp>（</rp><rt>あ</rt><rp>）</rp></ruby>わせられるようにします。

コード例
```csharp
// 実装の階層（色）
public interface IColor { string GetColor(); }
public class Red : IColor { public string GetColor() => "赤"; }

// 機能の階層（形）
public abstract class Shape {
    protected IColor color;
    protected Shape(IColor color) => this.color = color;
    public abstract void Draw();
}

public class Circle : Shape {
    public Circle(IColor color) : base(color) { }
    public override void Draw() => Console.WriteLine($"{color.GetColor()}い円を描く");
}
```

#### <ruby>合成物<rp>（</rp><rt>ごうせいぶつ</rt><rp>）</rp></ruby>⑧
[目次へ](#toc)

**Composite** コンポジット

オブジェクトを木構造（ツリー構造）に組み立てて、「単一のオブジェクト」と「オブジェクトの集合（コンテナ）」を全く同じように扱えるようにします。
<br>（将对象组合成树形结构以表示“部分-整体”的层次结构，使得用户对单个对象和组合对象的使用具有一致性。）

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>木<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>（<ruby>ツリー<rp>（</rp><rt>Tree</rt><rp>）</rp></ruby><ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>）に<ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>み<ruby>立<rp>（</rp><rt>た</rt><rp>）</rp></ruby>てて、「<ruby>単<rp>（</rp><rt>たん</rt><rp>）</rp></ruby><ruby>一<rp>（</rp><rt>いつ</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）」と「<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>集<rp>（</rp><rt>しゅう</rt><rp>）</rp></ruby><ruby>合<rp>（</rp><rt>ごう</rt><rp>）</rp></ruby>（<ruby>コンテナ<rp>（</rp><rt>Container</rt><rp>）</rp></ruby>（１））」を<ruby>全<rp>（</rp><rt>まった</rt><rp>）</rp></ruby>く<ruby>同<rp>（</rp><rt>おな</rt><rp>）</rp></ruby>じように<ruby>扱<rp>（</rp><rt>あつか</rt><rp>）</rp></ruby>えるようにします。

コード例
```csharp
public interface IFileSystemItem { void PrintName(); }

// ファイル（単一）
public class FileItem : IFileSystemItem {
    public void PrintName() => Console.WriteLine("ファイル名");
}

// フォルダ（集合）
public class FolderItem : IFileSystemItem {
    private readonly List<IFileSystemItem> _items = new();
    public void Add(IFileSystemItem item) => _items.Add(item);
    public void PrintName() {
        foreach (var item in _items) item.PrintName(); // 中身を一括処理
    }
}
```

#### <ruby>装飾者<rp>（</rp><rt>そうしょくしゃ</rt><rp>）</rp></ruby>⑨
[目次へ](#toc)

**Decorator** デコレーター

既存のオブジェクトを変更することなく、動的に新しい機能や振る舞い（装飾）を外側から追加します。
<br>（动态地给一个对象添加一些额外的职责。就增加功能来说，相比生成子类更为灵活。）

<ruby>既<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>そん</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby>することなく、<ruby>動<rp>（</rp><rt>どう</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>に<ruby>新<rp>（</rp><rt>あたら</rt><rp>）</rp></ruby>しい<ruby>機<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>能<rp>（</rp><rt>のう</rt><rp>）</rp></ruby>や<ruby>振<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby>る<ruby>舞<rp>（</rp><rt>ま</rt><rp>）</rp></ruby>い（<ruby>装<rp>（</rp><rt>そう</rt><rp>）</rp></ruby><ruby>飾<rp>（</rp><rt>しょく</rt><rp>）</rp></ruby>）を<ruby>外<rp>（</rp><rt>そと</rt><rp>）</rp></ruby><ruby>側<rp>（</rp><rt>がわ</rt><rp>）</rp></ruby>から<ruby>追<rp>（</rp><rt>つい</rt><rp>）</rp></ruby><ruby>加<rp>（</rp><rt>か</rt><rp>）</rp></ruby>します。

コード例
```csharp
public interface ICoffee { double GetCost(); }
public class SimpleCoffee : ICoffee { public double GetCost() => 300; }

// 装飾のベース
public abstract class CoffeeDecorator : ICoffee {
    protected ICoffee coffee;
    protected CoffeeDecorator(ICoffee coffee) => this.coffee = coffee;
    public virtual double GetCost() => coffee.GetCost();
}

// 具体的な装飾（ミルク追加）
public class MilkDecorator : CoffeeDecorator {
    public MilkDecorator(ICoffee coffee) : base(coffee) { }
    public override double GetCost() => base.GetCost() + 50; // 300 + 50 = 350
}
```

#### 正面・窓口⑩
[目次へ](#toc)

**Facade** ファサード

複雑なサブシステム群（多数のクラス群）に対して、それらをシンプルに利用するための「一元化された一つの窓口（インターフェース）」を提供します。
<br>（为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。）

<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>雑<rp>（</rp><rt>ざつ</rt><rp>）</rp></ruby>な<ruby>サブシステム<rp>（</rp><rt>Subsystem</rt><rp>）</rp></ruby>（４）<ruby>群<rp>（</rp><rt>ぐん</rt><rp>）</rp></ruby>（<ruby>多<rp>（</rp><rt>た</rt><rp>）</rp></ruby><ruby>数<rp>（</rp><rt>すう</rt><rp>）</rp></ruby>の<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）<ruby>群<rp>（</rp><rt>ぐん</rt><rp>）</rp></ruby>）に<ruby>対<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>して、それらを<ruby>シンプル<rp>（</rp><rt>Simple</rt><rp>）</rp></ruby>（１）に<ruby>利<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>用<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>するための「<ruby>一<rp>（</rp><rt>いち</rt><rp>）</rp></ruby><ruby>元<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>された一つの<ruby>窓<rp>（</rp><rt>まど</rt><rp>）</rp></ruby><ruby>口<rp>（</rp><rt>ぐち</rt><rp>）</rp></ruby>（<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４））」を<ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>供<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby>します。

コード例
```csharp
public class SubSystemAmplifier { public void On() { } }
public class SubSystemDvdPlayer { public void Play() { } }

// 窓口クラス（Facade）
public class HomeTheaterFacade {
    private readonly SubSystemAmplifier _amp = new();
    private readonly SubSystemDvdPlayer _dvd = new();

    public void WatchMovie() {
        _amp.On();
        _dvd.Play(); // 複雑な手順を一言で実行
    }
}
```

#### フライ級・<ruby>軽量<rp>（</rp><rt>けいりょう</rt><rp>）</rp></ruby>⑪
[目次へ](#toc)

**Flyweight** フライウェイト

大量の細かなオブジェクトを生成する際、共通して使える内部データを共有（使い回し）することで、メモリ使用量を節約します。
<br>（运用共享技术有效地支持大量细粒度的对象，从而节省内存使用量。）

<ruby>大<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>量<rp>（</rp><rt>りょう</rt><rp>）</rp></ruby>の<ruby>細<rp>（</rp><rt>こま</rt><rp>）</rp></ruby>かな<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>する<ruby>際<rp>（</rp><rt>さい</rt><rp>）</rp></ruby>（１）<ruby>共<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby><ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby>して<ruby>使<rp>（</rp><rt>つか</rt><rp>）</rp></ruby>える<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>データ（１）を<ruby>共<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby><ruby>有<rp>（</rp><rt>ゆう</rt><rp>）</rp></ruby>（<ruby>使<rp>（</rp><rt>つか</rt><rp>）</rp></ruby>い<ruby>回<rp>（</rp><rt>まわ</rt><rp>）</rp></ruby>し）することで、メモリ（１）<ruby>使<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>用<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>量<rp>（</rp><rt>りょう</rt><rp>）</rp></ruby>（３）を<ruby>節<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby><ruby>約<rp>（</rp><rt>やく</rt><rp>）</rp></ruby>します。

コード例
```csharp
// 共有される軽量データ
public class TreeType {
    public string Name { get; set; } = "マツ";
    public string Texture { get; set; } = "マツのテクスチャデータ（重い）";
}

// 工場で使い回す
public class TreeFactory {
    private static readonly Dictionary<string, TreeType> _types = new();
    public static TreeType GetTreeType(string name) {
        if (!_types.ContainsKey(name)) _types[name] = new TreeType { Name = name };
        return _types[name];
    }
}
```

#### 代理人⑫
[目次へ](#toc)

**Proxy** プロキシ

本物のオブジェクトへのアクセスを制御するために、その「身代わり（代理オブジェクト）」を配置します。遅延初期化、アクセス制限、ログ出力などに使われます。
<br>（为其他对象提供一种代理以控制对这个对象的访问。常用于延迟初始化、访问控制、日志记录等。）

<ruby>本<rp>（</rp><rt>ほん</rt><rp>）</rp></ruby><ruby>物<rp>（</rp><rt>もの</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>への<ruby>アクセス<rp>（</rp><rt>Access</rt><rp>）</rp></ruby>を<ruby>制<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>御<rp>（</rp><rt>ぎょ</rt><rp>）</rp></ruby>するために、その「<ruby>身<rp>（</rp><rt>み</rt><rp>）</rp></ruby><ruby>代<rp>（</rp><rt>が</rt><rp>）</rp></ruby>わり（<ruby>代<rp>（</rp><rt>だい</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>）」を<ruby>配<rp>（</rp><rt>はい</rt><rp>）</rp></ruby><ruby>置<rp>（</rp><rt>ち</rt><rp>）</rp></ruby>します。<ruby>遅<rp>（</rp><rt>ち</rt><rp>）</rp></ruby><ruby>延<rp>（</rp><rt>えん</rt><rp>）</rp></ruby><ruby>初<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>期<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>、<ruby>アクセス<rp>（</rp><rt>Access</rt><rp>）</rp></ruby><ruby>制<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>限<rp>（</rp><rt>げん</rt><rp>）</rp></ruby>、<ruby>ログ<rp>（</rp><rt>Log</rt><rp>）</rp></ruby>（１）<ruby>出<rp>（</rp><rt>しゅつ</rt><rp>）</rp></ruby><ruby>力<rp>（</rp><rt>りょく</rt><rp>）</rp></ruby>などに<ruby>使<rp>（</rp><rt>つか</rt><rp>）</rp></ruby>われます。

コード例
```csharp
public interface IImage { void Display(); }
public class RealImage : IImage {
    public RealImage() => LoadFromDisk(); // 重い処理
    private void LoadFromDisk() { }
    public void Display() => Console.WriteLine("表示");
}

// 代理人（必要になるまで本物を作らない「遅延評価」）
public class ProxyImage : IImage {
    private RealImage? _realImage;
    public void Display() {
        _realImage ??= new RealImage(); // 初めて呼ばれた時に生成
        _realImage.Display();
    }
}
```

### 振る舞いに関するパターン

**Behavioral** Patterns ビヘイビアル パターン

オブジェクト間の通信や責任の分散に関するパターンです。アルゴリズムや割り当てられた役割をオブジェクト間でどのようにやり取りするかを整理します。
<br>（这是一种关于对象间通信和职责分配的模式。它整理了算法和分配的角色在对象之间是如何进行交互的。）

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby><ruby>間<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>（２）の<ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby><ruby>信<rp>（</rp><rt>しん</rt><rp>）</rp></ruby>や<ruby>責<rp>（</rp><rt>せき</rt><rp>）</rp></ruby><ruby>任<rp>（</rp><rt>にん</rt><rp>）</rp></ruby>の<ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby><ruby>散<rp>（</rp><rt>さん</rt><rp>）</rp></ruby>に<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>する<ruby>パターン<rp>（</rp><rt>Pattern</rt><rp>）</rp></ruby>（１）です。<ruby>アルゴリズム<rp>（</rp><rt>Algorithm</rt><rp>）</rp></ruby>（４）や<ruby>割<rp>（</rp><rt>わ</rt><rp>）</rp></ruby>り<ruby>当<rp>（</rp><rt>あ</rt><rp>）</rp></ruby>てられた<ruby>役<rp>（</rp><rt>やく</rt><rp>）</rp></ruby><ruby>割<rp>（</rp><rt>わり</rt><rp>）</rp></ruby>を<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby><ruby>間<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>（２）でどのようにやり<ruby>取<rp>（</rp><rt>と</rt><rp>）</rp></ruby>りするかを<ruby>整<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby>します。

#### 責任の連鎖⑬
[目次へ](#toc)

**Chain of Responsibility** チェイン オブ レスポンシビリティ

リクエストを処理する複数のオブジェクトをチェーン（数珠つなぎ）状に繋ぎ、自分の担当外であれば次のオブジェクトへリクエストを順々に回していきます。
<br>（将能够处理同一请求的对象连成一条链，并沿着这条链传递该请求，如果不是自己负责的范围，就顺次传递给下一个对象。）

<ruby>リクエスト<rp>（</rp><rt>Request</rt><rp>）</rp></ruby>（３）を<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby>する<ruby>複<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>数<rp>（</rp><rt>すう</rt><rp>）</rp></ruby>（３）の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>を<ruby>チェーン<rp>（</rp><rt>Chain</rt><rp>）</rp></ruby>（１）（<ruby>数珠<rp>（</rp><rt>じゅず</rt><rp>）</rp></ruby>つなぎ）<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby>に<ruby>繋<rp>（</rp><rt>つな</rt><rp>）</rp></ruby>ぎ、<ruby>自<rp>（</rp><rt>じ</rt><rp>）</rp></ruby><ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby>の<ruby>担<rp>（</rp><rt>たん</rt><rp>）</rp></ruby><ruby>当<rp>（</rp><rt>とう</rt><rp>）</rp></ruby><ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby>（３）であれば<ruby>次<rp>（</rp><rt>つぎ</rt><rp>）</rp></ruby>の<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>へ<ruby>リクエスト<rp>（</rp><rt>Request</rt><rp>）</rp></ruby>（３）を<ruby>順<rp>（</rp><rt>じゅん</rt><rp>）</rp></ruby>々（３）に<ruby>回<rp>（</rp><rt>まわ</rt><rp>）</rp></ruby>していきます。

コード例
```csharp
public abstract class Approver {
    protected Approver? nextApprover;
    public void SetNext(Approver next) => nextApprover = next;
    public abstract void ProcessRequest(int amount);
}

public class Manager : Approver {
    public override void ProcessRequest(int amount) {
        if (amount <= 1000) Console.WriteLine("課長が承認しました");
        else nextApprover?.ProcessRequest(amount); // 次の人へ丸投げ
    }
}
```

#### 命令⑭
[目次へ](#toc)

**Command** コマンド

「要求や処理」そのものを一つの独立したオブジェクトとしてカプセル化します。これにより、処理のキュー登録、ログ記録、アンドゥ（取り消し）などが可能になります。
<br>（将一个请求或处理封装为一个独立的对象，从而使您可以用不同的请求对客户进行参数化，对请求排队或记录请求日志，以及支持可撤销（Undo）的操作。）

「<ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>求<rp>（</rp><rt>きゅう</rt><rp>）</rp></ruby>や<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby>」そのものを<ruby>一<rp>（</rp><rt>ひと</rt><rp>）</rp></ruby>つの<ruby>独<rp>（</rp><rt>どく</rt><rp>）</rp></ruby><ruby>立<rp>（</rp><rt>りつ</rt><rp>）</rp></ruby>（２）した<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>として<ruby>カプセル<rp>（</rp><rt>Capsule</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>します。これにより、<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby>の<ruby>キュー<rp>（</rp><rt>Queue</rt><rp>）</rp></ruby>（１）<ruby>登<rp>（</rp><rt>とう</rt><rp>）</rp></ruby><ruby>録<rp>（</rp><rt>ろく</rt><rp>）</rp></ruby>、<ruby>ログ<rp>（</rp><rt>Log</rt><rp>）</rp></ruby>（１）<ruby>記<rp>（</rp><rt>き</rt><rp>）</rp></ruby><ruby>録<rp>（</rp><rt>ろく</rt><rp>）</rp></ruby>、<ruby>アンドゥ<rp>（</rp><rt>Undo</rt><rp>）</rp></ruby>（<ruby>取<rp>（</rp><rt>と</rt><rp>）</rp></ruby>り<ruby>消<rp>（</rp><rt>け</rt><rp>）</rp></ruby>し）などが<ruby>可<rp>（</rp><rt>か</rt><rp>）</rp></ruby><ruby>能<rp>（</rp><rt>のう</rt><rp>）</rp></ruby>になります。

コード例
```csharp
public interface ICommand { void Execute(); }

// 具体的な命令
public class LightOnCommand : ICommand {
    private readonly Light _light;
    public LightOnCommand(Light light) => _light = light;
    public void Execute() => _light.TurnOn();
}

// リモコン（実行側）
public class RemoteControl {
    private ICommand? _slot;
    public void SetCommand(ICommand command) => _slot = command;
    public void PressButton() => _slot?.Execute();
}
public class Light { public void TurnOn() { } }
```

### 通訳者⑮
[目次へ](#toc)

**Interpreter** インタプリタ

特定の言語やルールに沿った「構文（文法）」を定義し、それを評価（解析・実行）するための表現方法を提供します。
<br>（定义一个特定语言或规则的“语法”，并提供一种用于评估（解析和执行）它的表示方法。）

<ruby>特<rp>（</rp><rt>とく</rt><rp>）</rp></ruby><ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby>の<ruby>言<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>語<rp>（</rp><rt>ご</rt><rp>）</rp></ruby>（１）や<ruby>ルール<rp>（</rp><rt>Rule</rt><rp>）</rp></ruby>（１）に<ruby>沿<rp>（</rp><rt>そ</rt><rp>）</rp></ruby>った「<ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>文<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby>（１）（<ruby>文<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby><ruby>法<rp>（</rp><rt>ぽう</rt><rp>）</rp></ruby>）」を<ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>義<rp>（</rp><rt>ぎ</rt><rp>）</rp></ruby>し、それを<ruby>評<rp>（</rp><rt>ひょう</rt><rp>）</rp></ruby><ruby>価<rp>（</rp><rt>か</rt><rp>）</rp></ruby>（１）（<ruby>解<rp>（</rp><rt>かい</rt><rp>）</rp></ruby><ruby>析<rp>（</rp><rt>せき</rt><rp>）</rp></ruby>・<ruby>実<rp>（</rp><rt>じっ</rt><rp>）</rp></ruby><ruby>行<rp>（</rp><rt>こう</rt><rp>）</rp></ruby>）するための<ruby>表<rp>（</rp><rt>ひょう</rt><rp>）</rp></ruby><ruby>現<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>方<rp>（</rp><rt>ほう</rt><rp>）</rp></ruby><ruby>法<rp>（</rp><rt>ほう</rt><rp>）</rp></ruby>（４）を<ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>供<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby>します。

コード例
```csharp
public interface IExpression { bool Interpret(string context); }

// ルール：指定した単語が含まれているか
public class TerminalExpression : IExpression {
    private readonly string _data;
    public TerminalExpression(string data) => _data = data;
    public bool Interpret(string context) => context.Contains(_data);
}
```

#### 反復子⑯
[目次へ](#toc)

**Iterator** イテレーター

集合オブジェクト（リストなど）の内部構造（配列なのかツリーなのか）を外部にさらすことなく、その要素に順番にアクセスする手段を提供します。
<br>（提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部结构。）

<ruby>集<rp>（</rp><rt>しゅう</rt><rp>）</rp></ruby><ruby>合<rp>（</rp><rt>ごう</rt><rp>）</rp></ruby><ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（<ruby>リスト<rp>（</rp><rt>List</rt><rp>）</rp></ruby>（１）など）の<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>（<ruby>配<rp>（</rp><rt>はい</rt><rp>）</rp></ruby><ruby>列<rp>（</rp><rt>れつ</rt><rp>）</rp></ruby>なのか<ruby>ツリー<rp>（</rp><rt>Tree</rt><rp>）</rp></ruby>（２）なのか）を<ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>（１）にさらすことなく、その<ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>素<rp>（</rp><rt>そ</rt><rp>）</rp></ruby>（１）に<ruby>順<rp>（</rp><rt>じゅん</rt><rp>）</rp></ruby><ruby>番<rp>（</rp><rt>ばん</rt><rp>）</rp></ruby>に<ruby>アクセス<rp>（</rp><rt>Access</rt><rp>）</rp></ruby>（１）する<ruby>手<rp>（</rp><rt>しゅ</rt><rp>）</rp></ruby><ruby>段<rp>（</rp><rt>だん</rt><rp>）</rp></ruby>（１）を<ruby>提<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>供<rp>（</rp><rt>きょう</rt><rp>）</rp></ruby>します。

コード例
```csharp
// C#では組み込みの IEnumerable / IEnumerator がこのパターンそのものです
public class MyCollection {
    private readonly string[] _items = { "A", "B", "C" };
    // 反復子の提供
    public IEnumerator<string> GetEnumerator() {
        foreach (var item in _items) yield return item;
    }
}
```

#### 調停者⑰
[目次へ](#toc)

**Mediator** メディエーター

オブジェクト同士が直接お互いを知る（通信する）のを禁止し、中裁役（Mediator）を介してのみ通信させることで、オブジェクト間の結合度を下げます。
<br>（用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。）

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby><ruby>同<rp>（</rp><rt>どう</rt><rp>）</rp></ruby>しが<ruby>直<rp>（</rp><rt>ちょく</rt><rp>）</rp></ruby><ruby>接<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby>お<ruby>互<rp>（</rp><rt>たが</rt><rp>）</rp></ruby>いを<ruby>知<rp>（</rp><rt>し</rt><rp>）</rp></ruby>る（<ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby><ruby>信<rp>（</rp><rt>しん</rt><rp>）</rp></ruby>する）のを<ruby>禁<rp>（</rp><rt>きん</rt><rp>）</rp></ruby><ruby>止<rp>（</rp><rt>し</rt><rp>）</rp></ruby>し、<ruby>中<rp>（</rp><rt>ちゅう</rt><rp>）</rp></ruby><ruby>裁<rp>（</rp><rt>さい</rt><rp>）</rp></ruby><ruby>役<rp>（</rp><rt>やく</rt><rp>）</rp></ruby>（<ruby>メディエーター<rp>（</rp><rt>Mediator</rt><rp>）</rp></ruby>（４））を<ruby>介<rp>（</rp><rt>かい</rt><rp>）</rp></ruby>してのみ<ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby><ruby>信<rp>（</rp><rt>しん</rt><rp>）</rp></ruby>させることで、<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby><ruby>間<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>（２）の<ruby>結<rp>（</rp><rt>けつ</rt><rp>）</rp></ruby><ruby>合<rp>（</rp><rt>ごう</rt><rp>）</rp></ruby><ruby>度<rp>（</rp><rt>ど</rt><rp>）</rp></ruby>（１）を<ruby>下<rp>（</rp><rt>さ</rt><rp>）</rp></ruby>げます。

コード例
```csharp
public class ChatRoom { // 調停者
    public void ShowMessage(User user, string message) =>
        Console.WriteLine($"[{user.Name}]: {message}");
}

public class User {
    public string Name { get; }
    private readonly ChatRoom _chatRoom;
    public User(string name, ChatRoom chatRoom) { Name = name; _chatRoom = chatRoom; }
    public void Send(string message) => _chatRoom.ShowMessage(this, message); // 直接他人に送らない
}
```

#### 形見・記憶⑱
[目次へ](#toc)

**Memento** メメント

オブジェクトのカプセル化を壊すことなく、その時の「内部状態」を保存し、後から全く同じ状態に復元（ロールバック）できるようにします。
<br>（在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后当需要时可将该对象恢复到原先保存的状态。）

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>の<ruby>カプセル<rp>（</rp><rt>Capsule</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>を<ruby>壊<rp>（</rp><rt>こわ</rt><rp>）</rp></ruby>すことなく、その<ruby>時<rp>（</rp><rt>とき</rt><rp>）</rp></ruby>の「<ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby><ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>」を<ruby>保<rp>（</rp><rt>ほ</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>し、<ruby>後<rp>（</rp><rt>あと</rt><rp>）</rp></ruby>（１）から<ruby>全<rp>（</rp><rt>まった</rt><rp>）</rp></ruby>く<ruby>同<rp>（</rp><rt>おな</rt><rp>）</rp></ruby>じ<ruby>状<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>に<ruby>復<rp>（</rp><rt>ふく</rt><rp>）</rp></ruby><ruby>元<rp>（</rp><rt>げん</rt><rp>）</rp></ruby>（<ruby>ロールバック<rp>（</rp><rt>Rollback</rt><rp>）</rp></ruby>（４））できるようにします。

コード例
```csharp
// 状態を保持する「形見」
public class Memento {
    public string State { get; }
    public Memento(string state) => State = state;
}

public class Originator {
    public string State { get; set; } = string.Empty;
    public Memento Save() => new(State); // 保存
    public void Restore(Memento memento) => State = memento.State; // 復元
}
```

#### 観察者⑲
[目次へ](#toc)

**Observer** オブザーバー

あるオブジェクトの状態が変化したとき、それに依存しているすべてのオブジェクト（観察者）に自動的に通知がいき、中身が更新される仕組みを作ります。（パブリッシュ/サブスクライブ形式）
<br>（当一个对象的状态发生改变时，所有依赖于它的对象（观察者）都会得到自动通知并更新，建立这样一种机制。（发布/订阅模式））

ある<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>の<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>が<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>したとき、それに<ruby>依<rp>（</rp><rt>い</rt><rp>）</rp></ruby><ruby>存<rp>（</rp><rt>ぞん</rt><rp>）</rp></ruby>しているすべての<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（<ruby>観<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>察<rp>（</rp><rt>さつ</rt><rp>）</rp></ruby><ruby>者<rp>（</rp><rt>しゃ</rt><rp>）</rp></ruby>）に<ruby>自<rp>（</rp><rt>じ</rt><rp>）</rp></ruby><ruby>動<rp>（</rp><rt>どう</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>に<ruby>通<rp>（</rp><rt>つう</rt><rp>）</rp></ruby><ruby>知<rp>（</rp><rt>しん</rt><rp>）</rp></ruby>がいき、<ruby>中<rp>（</rp><rt>なか</rt><rp>）</rp></ruby><ruby>身<rp>（</rp><rt>み</rt><rp>）</rp></ruby>が<ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>新<rp>（</rp><rt>しん</rt><rp>）</rp></ruby>される<ruby>仕<rp>（</rp><rt>し</rt><rp>）</rp></ruby><ruby>組<rp>（</rp><rt>くみ</rt><rp>）</rp></ruby>を<ruby>作<rp>（</rp><rt>つく</rt><rp>）</rp></ruby>ります。（<ruby>パブリッシュ<rp>（</rp><rt>Publish</rt><rp>）</rp></ruby>（４）/<ruby>サブスクライブ<rp>（</rp><rt>Subscribe</rt><rp>）</rp></ruby>（４）<ruby>形<rp>（</rp><rt>けい</rt><rp>）</rp></ruby><ruby>式<rp>（</rp><rt>しき</rt><rp>）</rp></ruby>）

コード例
```csharp
public class NewsAgency { // 配信元
    private readonly List<Action<string>> _observers = new();
    public void Attach(Action<string> observer) => _observers.Add(observer);
    public void Broadcast(string news) => _observers.ForEach(o => o(news)); // 一斉通知
}
```

#### 状態⑳
[目次へ](#toc)

**State** ステート

オブジェクトの「現在の状態」をクラスとして独立させます。状態が変わると、オブジェクト自身の振る舞い（メソッドの結果）がクラスごと切り替わります。
<br>（将对象的“当前状态”独立为一个类。当状态发生改变时，对象自身的行为（方法的结果）会随着类的切换而改变。）

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>の「<ruby>現<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>在<rp>（</rp><rt>ざい</rt><rp>）</rp></ruby>の<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>」を<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）として<ruby>独<rp>（</rp><rt>どく</rt><rp>）</rp></ruby><ruby>立<rp>（</rp><rt>りつ</rt><rp>）</rp></ruby>（２）させます。<ruby>状<rp>（</rp><rt>じょう</rt><rp>）</rp></ruby><ruby>態<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>が<ruby>変<rp>（</rp><rt>か</rt><rp>）</rp></ruby>わると、<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby><ruby>自<rp>（</rp><rt>じ</rt><rp>）</rp></ruby><ruby>身<rp>（</rp><rt>しん</rt><rp>）</rp></ruby>（１）の<ruby>振<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby>る<ruby>舞<rp>（</rp><rt>ま</rt><rp>）</rp></ruby>い（<ruby>メソッド<rp>（</rp><rt>Method</rt><rp>）</rp></ruby>（１）の<ruby>結<rp>（</rp><rt>けっ</rt><rp>）</rp></ruby><ruby>果<rp>（</rp><rt>か</rt><rp>）</rp></ruby>）が<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）ごと<ruby>切<rp>（</rp><rt>き</rt><rp>）</rp></ruby>り<ruby>替<rp>（</rp><rt>か</rt><rp>）</rp></ruby>わります。

コード例
```csharp
public interface IState { void Handle(Context context); }

public class StateA : IState {
    public void Handle(Context context) => context.SetState(new StateB()); // 状態Bへ遷移
}
public class StateB : IState {
    public void Handle(Context context) { /* 別のアクション */ }
}

public class Context {
    private IState _state;
    public Context(IState state) => _state = state;
    public void SetState(IState state) => _state = state;
    public void Request() => _state.Handle(this); // 現在の状態に丸投げ
}
```

#### 戦略㉑
[目次へ](#toc)

**Strategy** ストラテジー

一連のアルゴリズム（計算ロジックや戦略）をそれぞれ別クラスとしてカプセル化し、それらを動的に（実行時に）入れ替えられるようにします。
<br>（将一系列算法（计算逻辑或策略）分别封装到独立的类中，并使它们可以动态地（在运行时）相互替换。）

<ruby>一<rp>（</rp><rt>いち</rt><rp>）</rp></ruby><ruby>連<rp>（</rp><rt>れん</rt><rp>）</rp></ruby>の<ruby>アルゴリズム<rp>（</rp><rt>Algorithm</rt><rp>）</rp></ruby>（４）（<ruby>計<rp>（</rp><rt>けい</rt><rp>）</rp></ruby><ruby>算<rp>（</rp><rt>さん</rt><rp>）</rp></ruby><ruby>ロジック<rp>（</rp><rt>Logic</rt><rp>）</rp></ruby>（１）や<ruby>戦<rp>（</rp><rt>せん</rt><rp>）</rp></ruby><ruby>略<rp>（</rp><rt>りゃく</rt><rp>）</rp></ruby>）をそれぞれ<ruby>別<rp>（</rp><rt>べつ</rt><rp>）</rp></ruby>（０は平板のため排除）<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）として<ruby>カプセル<rp>（</rp><rt>Capsule</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>し、それらを<ruby>動<rp>（</rp><rt>どう</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>に（<ruby>実<rp>（</rp><rt>じっ</rt><rp>）</rp></ruby><ruby>行<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>時<rp>（</rp><rt>じ</rt><rp>）</rp></ruby>に）<ruby>入<rp>（</rp><rt>い</rt><rp>）</rp></ruby>れ<ruby>替<rp>（</rp><rt>か</rt><rp>）</rp></ruby>えられるようにします。

コード例
```csharp
public interface IPaymentStrategy { void Pay(int amount); }

public class CreditCardPay : IPaymentStrategy { public void Pay(int amount) => Console.WriteLine("カード決済"); }
public class PayPalPay : IPaymentStrategy { public void Pay(int amount) => Console.WriteLine("PayPal決済"); }

public class ShoppingCart {
    private IPaymentStrategy _strategy;
    public ShoppingCart(IPaymentStrategy strategy) => _strategy = strategy;
    public void Checkout(int total) => _strategy.Pay(total); // 戦略を自由に差し替え可能
}
```

#### <ruby>雛形<rp>（</rp><rt>ひながた</rt><rp>）</rp></ruby>メソッド㉒
[目次へ](#toc)

**Template Method** テンプレート メソッド

親クラスでアルゴリズムの「大枠の手順（骨組み）」をメソッドとして定義し、具体的な一部のステップの処理内容は、子クラスにオーバーライドさせて肉付けさせます。
<br>（在父类中定义一个算法的“大框架步骤（骨架）”作为方法，而将一些具体步骤的实现留给子类通过重写来加以充实。）

<ruby>親<rp>（</rp><rt>おや</rt><rp>）</rp></ruby><ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（４）で<ruby>アルゴリズム<rp>（</rp><rt>Algorithm</rt><rp>）</rp></ruby>（４）の「<ruby>大<rp>（</rp><rt>おお</rt><rp>）</rp></ruby><ruby>枠<rp>（</rp><rt>わく</rt><rp>）</rp></ruby>の<ruby>手<rp>（</rp><rt>て</rt><rp>）</rp></ruby><ruby>順<rp>（</rp><rt>じゅん</rt><rp>）</rp></ruby>（<ruby>骨<rp>（</rp><rt>ほね</rt><rp>）</rp></ruby><ruby>組<rp>（</rp><rt>ぐ</rp><rp>）</rp></ruby>み（２））」を<ruby>メソッド<rp>（</rp><rt>Method</rt><rp>）</rp></ruby>（１）として<ruby>定<rp>（</rp><rt>てい</rt><rp>）</rp></ruby><ruby>義<rp>（</rp><rt>ぎ</rt><rp>）</rp></ruby>し、<ruby>具<rp>（</rp><rt>ぐ</rt><rp>）</rp></ruby><ruby>体<rp>（</rp><rt>たい</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>な<ruby>一<rp>（</rp><rt>いっ</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>（２）の<ruby>ステップ<rp>（</rp><rt>Step</rt><rp>）</rp></ruby>（１）の<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>容<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>（４）は、<ruby>子<rp>（</rp><rt>こ</rt><rp>）</rp></ruby><ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（４）に<ruby>オーバーライド<rp>（</rp><rt>Override</rt><rp>）</rp></ruby>（４）させて<ruby>肉<rp>（</rp><rt>にく</rt><rp>）</rp></ruby><ruby>付<rp>（</rp><rt>づ</rt><rp>）</rp></ruby>けさせます。

コード例
```csharp
public abstract class DataMiner {
    // 雛形メソッド (全体の流れを固定)
    public void Mine() {
        OpenFile();
        ExtractData();
        CloseFile();
    }
    protected abstract void ExtractData(); // ここだけ子クラスに変えさせる
    private void OpenFile() { }
    private void CloseFile() { }
}

public class PdfDataMiner : DataMiner {
    protected override void ExtractData() => Console.WriteLine("PDFからデータを抽出");
}
```

#### 訪問者㉓
[目次へ](#toc)

**Visitor** ビジター

データ構造（要素クラス群）を変更することなく、そのデータ構造に対して「新しい操作（処理内容）」を外部から追加できるようにします。データ構造と処理を完全に分離します。
<br>（在不改变数据结构（元素类群）的前提下，能够从外部向该数据结构添加“新的操作（处理内容）”。将数据结构与处理内容完全分离。）

<ruby>データ<rp>（</rp><rt>Data</rt><rp>）</rp></ruby><ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>（（<ruby>要<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>素<rp>（</rp><rt>そ</rt><rp>）</rp></ruby>（１）<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）<ruby>群<rp>（</rp><rt>ぐん</rt><rp>）</rp></ruby>）を<ruby>変<rp>（</rp><rt>へん</rt><rp>）</rp></ruby><ruby>更<rp>（</rp><rt>こう</rt><rp>）</rp></ruby>することなく、その<ruby>データ<rp>（</rp><rt>Data</rt><rp>）</rp></ruby><ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>に<ruby>対<rp>（</rp><rt>たい</rt><rp>）</rp></ruby>して「<ruby>新<rp>（</rp><rt>あたら</rt><rp>）</rp></ruby>しい<ruby>操<rp>（</rp><rt>そう</rt><rp>）</rp></ruby><ruby>作<rp>（</rp><rt>さ</rt><rp>）</rp></ruby>（<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>内<rp>（</rp><rt>ない</rt><rp>）</rp></ruby><ruby>容<rp>（</rp><rt>よう</rt><rp>）</rp></ruby>（４）」を<ruby>外<rp>（</rp><rt>がい</rt><rp>）</rp></ruby><ruby>部<rp>（</rp><rt>ぶ</rt><rp>）</rp></ruby>（１）から<ruby>追<rp>（</rp><rt>つい</rt><rp>）</rp></ruby><ruby>加<rp>（</rp><rt>か</rt><rp>）</rp></ruby>できるようにします。<ruby>データ<rp>（</rp><rt>Data</rt><rp>）</rp></ruby><ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>と<ruby>処<rp>（</rp><rt>しょ</rt><rp>）</rp></ruby><ruby>理<rp>（</rp><rt>り</rt><rp>）</rp></ruby>を<ruby>完<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>全<rp>（</rp><rt>ぜん</rt><rp>）</rp></ruby>に<ruby>分<rp>（</rp><rt>ぶん</rt><rp>）</rp></ruby><ruby>離<rp>（</rp><rt>り</rt><rp>）</rp></ruby>します。

コード例
```csharp
public interface IElement { void Accept(IVisitor visitor); }
public interface IVisitor { void Visit(ConcreteElement element); }

public class ConcreteElement : IElement {
    public void Accept(IVisitor visitor) => visitor.Visit(this); // 訪問者を受け入れる
}

public class ConcreteVisitor : IVisitor {
    public void Visit(ConcreteElement element) => Console.WriteLine("要素に対する新しい処理");
}
```

### 付録
- [Refactoring.Guru](https://refactoring.guru/)
