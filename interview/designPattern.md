# GoF（Gang of Four）パターン

[日语面试 FAQ](../interview_qa.md)

### 生成に関するパターン

Creational Patterns クリエイショナル パターン

オブジェクトの生成メカニズムに関するパターンです。オブジェクトを直接インスタンス化（new）するのではなく、生成ロジックを隠蔽・カプセル化することで、システムの柔軟性と再利用性を高めます。

<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>メカニズム<rp>（</rp><rt>Mechanism</rt><rp>）</rp></ruby>（２）に<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby><ruby>する<ruby>パターン<rp>（</rp><rt>Pattern</rt><rp>）</rp></ruby>（１）です。<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）を<ruby>直<rp>（</rp><rt>ちょく</rt><rp>）</rp></ruby><ruby>接<rp>（</rp><rt>せつ</rt><rp>）</rp></ruby>（１）<ruby>インスタンス<rp>（</rp><rt>Instance</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>（new）するのではなく、<ruby>生<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>成<rp>（</rp><rt>せい</rt><rp>）</rp></ruby><ruby>ロジック<rp>（</rp><rt>Logic</rt><rp>）</rp></ruby>（１）を<ruby>隠<rp>（</rp><rt>いん</rt><rp>）</rp></ruby><ruby>蔽<rp>（</rp><rt>ぺい</rt><rp>）</rp></ruby>（３）・<ruby>カプセル<rp>（</rp><rt>Capsule</rt><rp>）</rp></ruby><ruby>化<rp>（</rp><rt>か</rt><rp>）</rp></ruby>（４）することで、<ruby>システム<rp>（</rp><rt>System</rt><rp>）</rp></ruby>（１）の<ruby>柔<rp>（</rp><rt>じゅう</rt><rp>）</rp></ruby><ruby>軟<rp>（</rp><rt>なん</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>（３）と<ruby>再<rp>（</rp><rt>さい</rt><rp>）</rp></ruby><ruby>利<rp>（</rp><rt>り</rt><rp>）</rp></ruby><ruby>用<rp>（</rp><rt>よう</rt><rp>）</rp></ruby><ruby>性<rp>（</rp><rt>せい</rt><rp>）</rp></ruby>（３）を<ruby>高<rp>（</rp><rt>たか</rt><rp>）</rp></ruby>めます。

#### 抽象的な工場①

Abstract Factory アブストラクト ファクトリー

互いに関連・依存する一連のオブジェクト群を、具体的なクラスを明示せずに生成するためのインターフェースを提供します。

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

Builder ビルダー

複雑なオブジェクトの作成手順を、その表現方法から分離します。同じ作成手順で、異なる表現のオブジェクトを生成できるようにします。

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

Factory Method ファクトリー メソッド

オブジェクトを生成するためのインターフェースを定義しますが、実際にどのクラスをインスタンス化するかは子クラスに決定させます。

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

Prototype プロトタイプ

既存のオブジェクト（原型）をコピー（クローン）することで、新しいオブジェクトを生成します。

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

Singleton シングルトン

あるクラスのインスタンスがシステム内に「絶対に1つ」しか存在しないことを保証し、それへのグローバルなアクセスポイントを提供します。

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

Structural Patterns ストラクチュラル パターン

クラスやオブジェクトの組み合わせに関するパターンです。異なるインターフェースを持つオブジェクト同士を繋いだり、大きな構造を効率的に構築したりします。

<ruby>クラス<rp>（</rp><rt>Class</rt><rp>）</rp></ruby>（１）や<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）の<ruby>組<rp>（</rp><rt>く</rt><rp>）</rp></ruby>み<ruby>合<rp>（</rp><rt>あ</rt><rp>）</rp></ruby>わせに<ruby>関<rp>（</rp><rt>かん</rt><rp>）</rp></ruby>するパターン（１）です。<ruby>異<rp>（</rp><rt>こと</rt><rp>）</rp></ruby>なる<ruby>インターフェース<rp>（</rp><rt>Interface</rt><rp>）</rp></ruby>（４）を<ruby>持<rp>（</rp><rt>も</rt><rp>）</rp></ruby>つ<ruby>オブジェクト<rp>（</rp><rt>Object</rt><rp>）</rp></ruby>（２）<ruby>同<rp>（</rp><rt>どう</rt><rp>）</rp></ruby>しを<ruby>繋<rp>（</rp><rt>つな</rt><rp>）</rp></ruby>いだり、<ruby>大<rp>（</rp><rt>おお</rt><rp>）</rp></ruby>きな<ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>造<rp>（</rp><rt>ぞう</rt><rp>）</rp></ruby>を<ruby>効<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>率<rp>（</rp><rt>りつ</rt><rp>）</rp></ruby><ruby>的<rp>（</rp><rt>てき</rt><rp>）</rp></ruby>に<ruby>構<rp>（</rp><rt>こう</rt><rp>）</rp></ruby><ruby>築<rp>（</rp><rt>ちく</rt><rp>）</rp></ruby>したりします。

#### <ruby>適合<rp>（</rp><rt>てきごう</rt><rp>）</rp></ruby>者⑥

Adapter アダプター

互換性のないインターフェースを持つクラス同士を、繋ぎ合わせる（変換する）ことで一緒に働かせます。

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

Bridge ブリッジ

「機能の階層」と「実装の階層」の2つを独立したクラス階層に分離し、それらの間に橋（参照）を架けて柔軟に組み合わせられるようにします。

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

Composite コンポジット

オブジェクトを木構造（ツリー構造）に組み立てて、「単一のオブジェクト」と「オブジェクトの集合（コンテナ）」を全く同じように扱えるようにします。

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

Decorator デコレーター

既存のオブジェクトを変更することなく、動的に新しい機能や振る舞い（装飾）を外側から追加します。

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

Facade ファサード

複雑なサブシステム群（多数のクラス群）に対して、それらをシンプルに利用するための「一元化された一つの窓口（インターフェース）」を提供します。

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


Flyweight フライウェイト

大量の細かなオブジェクトを生成する際、共通して使える内部データを共有（使い回し）することで、メモリ使用量を節約します。

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

Proxy プロキシ

本物のオブジェクトへのアクセスを制御するために、その「身代わり（代理オブジェクト）」を配置します。遅延初期化、アクセス制限、ログ出力などに使われます。

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

Behavioral Patterns ビヘイビアル パターン

オブジェクト間の通信や責任の分散に関するパターンです。アルゴリズムや割り当てられた役割をオブジェクト間でどのようにやり取りするかを整理します。

#### 責任の連鎖⑬

Chain of Responsibility チェイン オブ レスポンシビリティ

リクエストを処理する複数のオブジェクトをチェーン（数珠つなぎ）状に繋ぎ、自分の担当外であれば次のオブジェクトへリクエストを順々に回していきます。

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

Command コマンド

「要求や処理」そのものを一つの独立したオブジェクトとしてカプセル化します。これにより、処理のキュー登録、ログ記録、アンドゥ（取り消し）などが可能になります。

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

Interpreter インタプリタ

特定の言語やルールに沿った「構文（文法）」を定義し、それを評価（解析・実行）するための表現方法を提供します。

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

Iterator イテレーター

集合オブジェクト（リストなど）の内部構造（配列なのかツリーなのか）を外部にさらすことなく、その要素に順番にアクセスする手段を提供します。

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

Mediator メディエーター

オブジェクト同士が直接お互いを知る（通信する）のを禁止し、中裁役（Mediator）を介してのみ通信させることで、オブジェクト間の結合度を下げます。

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

Memento　メメント

オブジェクトのカプセル化を壊すことなく、その時の「内部状態」を保存し、後から全く同じ状態に復元（ロールバック）できるようにします。

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

Observer オブザーバー

あるオブジェクトの状態が変化したとき、それに依存しているすべてのオブジェクト（観察者）に自動的に通知がいき、中身が更新される仕組みを作ります。（パブリッシュ/サブスクライブ形式）

コード例
```csharp
public class NewsAgency { // 配信元
    private readonly List<Action<string>> _observers = new();
    public void Attach(Action<string> observer) => _observers.Add(observer);
    public void Broadcast(string news) => _observers.ForEach(o => o(news)); // 一斉通知
}
```

#### 状態⑳

State　ステート

オブジェクトの「現在の状態」をクラスとして独立させます。状態が変わると、オブジェクト自身の振る舞い（メソッドの結果）がクラスごと切り替わります。

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

Strategy ストラテジー

一連のアルゴリズム（計算ロジックや戦略）をそれぞれ別クラスとしてカプセル化し、それらを動的に（実行時に）入れ替えられるようにします。

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

#### 雛形メソッド㉒

Template Method テンプレート メソッド

親クラスでアルゴリズムの「大枠の手順（骨組み）」をメソッドとして定義し、具体的な一部のステップの処理内容は、子クラスにオーバーライドさせて肉付けさせます。

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

#### 訪問者

Visitor ビジター㉓

データ構造（要素クラス群）を変更することなく、そのデータ構造に対して「新しい操作（処理内容）」を外部から追加できるようにします。データ構造と処理を完全に分離します。

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
