import Link from "next/link";
import { availableScenarioCount, methodVideoCount, methods, type ThreatTag } from "./methods/method-data";

const totalVideos = methods.reduce((total, method) => total + methodVideoCount(method), 0);
const totalScenarios = methods.reduce((total, method) => total + availableScenarioCount(method), 0);

const threatTagClass: Record<ThreatTag, string> = {
  对抗攻击: "tag-adversarial",
  自然噪声: "tag-noise",
  边缘场景: "tag-edge",
};

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#overview" aria-label="返回概览">
          <span className="brand-symbol"><i /><i /><i /></span>
          <span><b>复杂威胁场景展示平台</b><small>LOCAL DEMONSTRATION</small></span>
        </a>
        <nav aria-label="页面导航">
          <a href="#overview">项目概览</a>
          <a href="#methods">生成方法</a>
          <Link href="/methods/scenge">场景成果</Link>
          <a href="/evaluation/index.html">指标评估</a>
        </nav>
        <span className="local-chip"><i /> 本地演示</span>
      </header>

      <section className="hero" id="overview">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span>MODEL-LEVEL SECURITY</span> / 模型层安全</p>
          <h1>无人驾驶模型层复杂威胁<br /><em>演化预测与自适应防护</em>关键技术</h1>
          <p className="hero-description">
            面向对抗攻击、自然噪声与边缘场景的复杂威胁生成成果展示，覆盖数字域与物理域高风险场景。
            从下方选择一种生成方法，进入该方法独立的成果展示页面。
          </p>
          <div className="hero-scope">
            <span>4 种生成方法</span><i />
            <span>3 类典型要素</span><i />
            <span>{totalScenarios} 组已有场景</span>
          </div>
        </div>
        <div className="radar" aria-hidden="true">
          <div className="radar-ring ring-1" />
          <div className="radar-ring ring-2" />
          <div className="radar-ring ring-3" />
          <div className="radar-sweep" />
          <span className="radar-dot dot-1" /><span className="radar-dot dot-2" /><span className="radar-dot dot-3" />
          <b>SCENE<br />EVOLUTION</b>
        </div>
      </section>

      <section className="kpis" aria-label="项目关键指标">
        <div><span>生成方法</span><strong>04</strong><small>4 种方法均已接入</small></div>
        <div><span>典型要素</span><strong>03</strong><small>指标标签严格限定</small></div>
        <div><span>场景成果</span><strong>{totalScenarios}</strong><small>按方法独立归类</small></div>
        <div><span>视频样例</span><strong>{totalVideos}</strong><small>全部接入本地展示</small></div>
      </section>

      <section className="section home-method-section" id="methods">
        <div className="section-heading">
          <div><p className="section-kicker">GENERATION METHODS</p><h2>选择场景生成方法</h2></div>
          <p>每种方法使用独立展示页面和独立素材目录，点击卡片查看对应成果。</p>
        </div>
        <div className="method-grid">
          {methods.map((method, index) => (
            <Link
              className={`method-card method-link-card ${index === 0 ? "active" : ""}`}
              href={`/methods/${method.slug}`}
              key={method.id}
            >
              <span className="method-number">M{method.id}</span>
              <span className="method-state">已接入</span>
              <strong>{method.short}</strong>
              <small>{method.title}</small>
              <span className="method-footer">
                <span>{availableScenarioCount(method)} 类场景 · {methodVideoCount(method)} 个视频</span>
                <span className="mini-tags">
                  {method.tags.map((tag) => <i className={threatTagClass[tag]} key={tag}>{tag}</i>)}
                </span>
              </span>
              <span className="method-enter">进入方法页面 <b>→</b></span>
            </Link>
          ))}
        </div>

        <div className="coverage-panel">
          <div className="coverage-copy">
            <p className="section-kicker">INDICATOR MAPPING</p>
            <h3>统一指标体系</h3>
            <p>四个方法按同一套典型要素标签和风险类型展示，便于横向浏览与对比。</p>
          </div>
          <div className="factor-list">
            <div><span className="factor-icon adversarial">A</span><b>对抗攻击</b><small>Adversarial Attack</small></div>
            <div><span className="factor-icon noise">N</span><b>自然噪声</b><small>Natural Noise</small></div>
            <div><span className="factor-icon edge">E</span><b>边缘场景</b><small>Edge Case</small></div>
          </div>
          <div className="risk-list">
            <p>风险类型</p>
            <span>主机动作失控</span><span>环境感知失准</span><span>目标物行为干扰</span>
          </div>
        </div>
      </section>

      <section className="evaluation-section" id="evaluation">
        <div className="evaluation-banner">
          <div className="evaluation-copy">
            <p className="section-kicker">THREAT EVALUATION CENTER</p>
            <h2>威胁场景指标评估</h2>
            <p>
              已接入 ThreatRange 浓雾配对实验，从视频质量、威胁实现度到 UniAD 决策影响，
              提供完整实验报告、指标词典与可追溯原始数据。
            </p>
            <div className="evaluation-actions">
              <a className="evaluation-primary" href="/evaluation/index.html">进入评估报告 <b>→</b></a>
              <a href="/evaluation/metrics.html">查看指标词典</a>
            </div>
          </div>
          <div className="evaluation-metrics" aria-label="ThreatRange 浓雾实验关键结果">
            <div><span>视觉威胁强度</span><strong>33.5</strong><small>/ 100</small></div>
            <div><span>AD 决策影响率</span><strong>81.0<em>%</em></strong><small>17 / 21 帧</small></div>
            <div><span>平均速度下降</span><strong>1.366</strong><small>m/s</small></div>
          </div>
        </div>
      </section>

      <section className="navigation-explain">
        <span>展示结构</span>
        <div><b>项目总览</b><i>→</i><b>生成方法与场景</b><i>→</i><b>指标评估与审计</b></div>
      </section>

      <footer>
        <div><b>复杂威胁场景展示平台</b><span>本地静态成果展示原型</span></div>
        <p>首页总览 · 方法独立页面 · public/media 相对路径</p>
      </footer>
    </main>
  );
}
