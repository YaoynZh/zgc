"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { availableScenarioCount, methodVideoCount, methods, type Method, type Scenario, type ThreatTag } from "../methods/method-data";

const threatTagClass: Record<ThreatTag, string> = {
  "对抗攻击": "tag-adversarial",
  "自然噪声": "tag-noise",
  "边缘场景": "tag-edge",
};

function ScenarioCard({ method, scenario }: { method: Method; scenario: Scenario }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = scenario.variants[selectedIndex];

  if (scenario.status === "planned") {
    return (
      <article className="scene-card scene-card-planned">
        <div className="scene-card-head"><span className="scene-id">{scenario.id}</span><span className="status planned">待补充</span></div>
        <div className="planned-visual" aria-hidden="true"><span>＋</span><i /><i /><i /></div>
        <h3>{scenario.name}</h3>
        <p className="english-name">{scenario.english}</p>
        <div className="risk-row">{scenario.risks.map((risk) => <span key={risk}>{risk}</span>)}</div>
        <p className="planned-note">目录已预留，后续生成结果可继续接入。</p>
      </article>
    );
  }

  return (
    <article className="scene-card">
      <div className="scene-card-head">
        <span className="scene-id">{scenario.id}</span>
        <span className="status ready">已接入 · {scenario.variants.length} 个视频</span>
      </div>
      <div className="video-frame">
        <video key={selected.path} controls preload="metadata" playsInline>
          <source src={selected.path} type="video/mp4" />
          当前浏览器不支持播放该视频。
        </video>
        <span className="method-mark">{method.short}</span>
      </div>
      <div className="scene-copy"><h3>{scenario.name}</h3><p className="english-name">{scenario.english}</p></div>
      {scenario.variants.length > 1 && (
        <div className="selector-row">
          <label htmlFor={`${method.slug}-${scenario.id}-variant`}>展示样例</label>
          <select id={`${method.slug}-${scenario.id}-variant`} value={selectedIndex} onChange={(event) => setSelectedIndex(Number(event.target.value))}>
            {scenario.variants.map((variant, index) => <option value={index} key={variant.path}>{variant.label}</option>)}
          </select>
        </div>
      )}
      <div className="meta-stack">
        <div className="tag-row">{selected.tags.map((tag) => <span className={`threat-tag ${threatTagClass[tag]}`} key={tag}>{tag}</span>)}</div>
        <div className="risk-row">{scenario.risks.map((risk) => <span key={risk}>{risk}</span>)}</div>
      </div>
      <p className="file-path" title={selected.path}>{selected.path}</p>
    </article>
  );
}

export function MethodShowcase({ method }: { method: Method }) {
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "planned">("all");
  const hasPlanned = method.scenarios.some((scenario) => scenario.status === "planned");
  const availableCount = availableScenarioCount(method);
  const videoCount = methodVideoCount(method);
  const filteredScenarios = useMemo(
    () => statusFilter === "all" ? method.scenarios : method.scenarios.filter((scenario) => statusFilter === "planned" ? scenario.status === "planned" : scenario.status !== "planned"),
    [method.scenarios, statusFilter],
  );

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="返回项目首页">
          <span className="brand-symbol"><i /><i /><i /></span>
          <span><b>复杂威胁场景展示平台</b><small>LOCAL DEMONSTRATION</small></span>
        </Link>
        <nav aria-label="页面导航"><Link href="/">项目总览</Link><Link href="/#methods">切换方法</Link><a href="#scenarios">{method.short} 成果</a><a href="/evaluation/index.html">指标评估</a></nav>
        <span className="local-chip"><i /> 本地演示</span>
      </header>

      <section className="hero method-hero" id="overview">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span>GENERATION METHOD {method.id}</span> / 场景生成方法</p>
          <h1>{method.short}<br /><em>{method.title}</em></h1>
          <p className="hero-description"><b>{method.english}</b><br />{method.description}</p>
          <div className="hero-scope"><span>{availableCount} 类已有场景</span><i /><span>{videoCount} 个视频样例</span><i /><span>{method.tags.join(" · ")}</span></div>
          {method.slug === "threatrange" && <a className="hero-audit-link" href="/evaluation/index.html">查看浓雾威胁指标评估 <b>→</b></a>}
        </div>
        <div className="radar" aria-hidden="true">
          <div className="radar-ring ring-1" /><div className="radar-ring ring-2" /><div className="radar-ring ring-3" /><div className="radar-sweep" />
          <span className="radar-dot dot-1" /><span className="radar-dot dot-2" /><span className="radar-dot dot-3" />
          <b>{method.accent}<br />METHOD {method.id}</b>
        </div>
      </section>

      <section className="kpis" aria-label={`${method.short} 方法统计`}>
        <div><span>已有场景</span><strong>{String(availableCount).padStart(2, "0")}</strong><small>当前已接入类别</small></div>
        <div><span>视频样例</span><strong>{String(videoCount).padStart(2, "0")}</strong><small>均可在本地播放</small></div>
        <div><span>要素标签</span><strong>{String(method.tags.length).padStart(2, "0")}</strong><small>{method.tags.join(" / ")}</small></div>
        <div><span>方法编号</span><strong>M{method.id}</strong><small>独立素材与展示页</small></div>
      </section>

      <section className="section method-overview-section" id="methods">
        <div className="section-heading"><div><p className="section-kicker">METHOD NAVIGATION</p><h2>四种生成方法</h2></div><p>每种方法使用独立素材目录与展示页，可在此直接切换。</p></div>
        <div className="method-grid method-switcher-grid">
          {methods.map((item) => (
            <Link className={`method-card method-link-card ${item.slug === method.slug ? "active" : ""}`} href={`/methods/${item.slug}`} key={item.id}>
              <span className="method-number">M{item.id}</span><span className="method-state">已接入</span><strong>{item.short}</strong><small>{item.title}</small>
              <span className="method-footer"><span>{availableScenarioCount(item)} 类场景 · {methodVideoCount(item)} 个视频</span></span>
              <span className="method-enter">{item.slug === method.slug ? "当前方法" : "切换方法"}<b>→</b></span>
            </Link>
          ))}
        </div>
        <div className="coverage-panel">
          <div className="coverage-copy"><p className="section-kicker">INDICATOR MAPPING</p><h3>{method.short} 指标映射</h3><p>当前成果按项目统一的三类典型要素与风险类型标记。</p></div>
          <div className="factor-list">
            <div className={method.tags.includes("对抗攻击") ? "" : "factor-muted"}><span className="factor-icon adversarial">A</span><b>对抗攻击</b><small>Adversarial Attack</small></div>
            <div className={method.tags.includes("自然噪声") ? "" : "factor-muted"}><span className="factor-icon noise">N</span><b>自然噪声</b><small>Natural Noise</small></div>
            <div className={method.tags.includes("边缘场景") ? "" : "factor-muted"}><span className="factor-icon edge">E</span><b>边缘场景</b><small>Edge Case</small></div>
          </div>
          <div className="risk-list"><p>风险类型</p><span>主机动作失控</span><span>环境感知失准</span><span>目标物行为干扰</span></div>
        </div>
      </section>

      <section className="section scene-section" id="scenarios">
        <div className="section-heading scene-heading">
          <div><p className="section-kicker">{method.accent} SCENARIO GALLERY</p><h2>{method.short} 生成场景成果</h2></div>
          {hasPlanned && <div className="filter-group" aria-label="场景状态筛选"><button className={statusFilter === "all" ? "active" : ""} onClick={() => setStatusFilter("all")}>全部 {method.scenarios.length}</button><button className={statusFilter === "available" ? "active" : ""} onClick={() => setStatusFilter("available")}>已有视频 {availableCount}</button><button className={statusFilter === "planned" ? "active" : ""} onClick={() => setStatusFilter("planned")}>待补充 {method.scenarios.length - availableCount}</button></div>}
        </div>
        <div className="scene-grid">{filteredScenarios.map((scenario) => <ScenarioCard method={method} scenario={scenario} key={scenario.id} />)}</div>
      </section>

      <footer><div><b>{method.short} 场景成果</b><span>生成方法 {method.id} · 独立展示页</span></div><p><Link className="footer-link" href="/">← 返回项目总览</Link></p></footer>
    </main>
  );
}
