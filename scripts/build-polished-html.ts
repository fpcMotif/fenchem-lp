import * as fs from "node:fs";
import * as path from "node:path";

const siteDir = path.resolve("docs/workstation-capture/site");
const htmlPath = path.join(siteDir, "index.html");

const polishedHTML = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="./favicon.png" type="image/x-icon" />
    <link rel="icon" href="./favicon-dark.png" type="image/png" media="(prefers-color-scheme: dark)" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>首页 - FENCHEM 泛成 | 全球优质原料与定制化解决方案</title>
    <meta name="title" content="FENCHEM 泛成 - 全球功能性原料领跑者" />
    <meta name="description" content="南京泛成国际控股有限公司（FENCHEM）三十余年专注于营养健康、食品原料、个人护理与宠物营养，拥有遍布全球的16家分支机构与现代化研发生产基地。" />

    <!-- Google Fonts & Tailwind CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

    <!-- Base stylesheet + Studio Polish Stylesheet -->
    <link rel="stylesheet" crossorigin href="./assets/index-2Fe_LgyB.css" />
    <link rel="stylesheet" crossorigin href="./assets/home-page-CZ462Oxv.css" />
    <link rel="stylesheet" href="./assets/polish.css" />
  </head>
  <body class="bg-[#F8FAFC] text-[#0B1320] antialiased">
    <!-- 1. Header & Navigation -->
    <header class="polish-nav fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div class="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-6 px-6 lg:px-8">
        <a class="flex shrink-0 items-center gap-3" href="/">
          <img alt="FENCHEM" class="h-10 w-auto" src="./AppUpload/Image/ca8375bebf1a4d6ab634a64e6dcdd68e.png" />
        </a>

        <nav class="hidden md:flex items-center gap-1 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
          <a class="nav-link px-4 py-1.5 rounded-full active-pill" href="#hero">首页</a>
          <a class="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-blue-700" href="#about">关于我们</a>
          <a class="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-blue-700" href="#why-choose">核心优势</a>
          <a class="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-blue-700" href="#products">产品与应用</a>
          <a class="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-blue-700" href="#global">全球网络</a>
          <a class="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-blue-700" href="#exhibitions">新闻动态</a>
        </nav>

        <div class="flex items-center gap-3">
          <div class="search-pill hidden sm:flex items-center gap-2 bg-white/95 border border-slate-300 px-3.5 py-1.5 rounded-full cursor-pointer shadow-xs text-sm text-slate-700">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <span>AI 智能搜索</span>
            <span class="kbd-shortcut">⌘Q</span>
          </div>
          <a href="#cta" class="btn-primary text-xs sm:text-sm px-5 py-2 rounded-full font-semibold">联系我们</a>
        </div>
      </div>
    </header>

    <main>
      <!-- 2. Hero Section -->
      <section id="hero" class="polish-hero relative flex items-center min-h-[800px] pt-24 pb-16 overflow-hidden" style="background-image: url('./AppUpload/Image/6aae5e7bd5b94f72afc259896bac7776.png'); background-size: cover; background-position: center right;">
        <div class="hero-overlay"></div>
        <div class="relative z-10 mx-auto w-full max-w-[1240px] px-6 lg:px-8 py-16">
          <div class="max-w-3xl">
            <div class="flex items-center gap-3 mb-6">
              <div class="hero-badge mb-0">
                <span class="w-2 h-2 rounded-full bg-[#0743AE] animate-pulse"></span>
                <span>FENCHEM 泛成 · 始于 1995</span>
              </div>
              <span class="hidden sm:inline hero-coord-tag">[ N 32.06° / E 118.79° · NANJING HQ ]</span>
            </div>
            
            <h1 class="hero-title" style="text-wrap: balance;">
              链接全球优质原料<br />
              打造创新解决方案
            </h1>
            
            <p class="hero-desc" style="text-wrap: pretty;">
              依托全球化原料整合能力、前沿研发中心与覆盖全球的仓储交付网络，持续为人类营养、功能性食品、个人护理与宠物健康行业提供稳定可靠的高品质原料支持。
            </p>

            <div class="flex flex-wrap items-center gap-4">
              <a href="#products" class="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium rounded-lg">
                探索产品方案
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#about" class="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium rounded-lg">
                了解泛成实力
              </a>
            </div>

            <!-- Key metrics row (Specimen Rigor & Tabular Numerals) -->
            <div class="hero-stats-grid">
              <div class="stat-item">
                <div class="stat-num">1995<span class="text-sm font-sans font-normal text-slate-600 ms-1">年</span></div>
                <div class="stat-label">深耕行业 30 余载</div>
              </div>
              <div class="stat-item">
                <div class="stat-num">100<span class="text-lg font-normal">+</span></div>
                <div class="stat-label">服务国家与地区</div>
              </div>
              <div class="stat-item">
                <div class="stat-num">16<span class="text-sm font-sans font-normal text-slate-600 ms-1">处</span></div>
                <div class="stat-label">全球本土分支体系</div>
              </div>
              <div class="stat-item">
                <div class="stat-num">35,000<span class="text-sm font-sans font-normal text-slate-600 ms-1">m²</span></div>
                <div class="stat-label">现代制造研发基地</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2.5 Compliance Ticker Proof Bar (Main Project Design Law: Argue with specifications, not adjectives) -->
      <section class="compliance-ticker-bar">
        <div class="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2 text-xs font-mono font-bold text-slate-800">
              <span class="w-2 h-2 rounded-full bg-[#64A733]"></span>
              <span>GLOBAL AUDITED STANDARDS</span>
            </div>
            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <span class="cert-pill">ISO 9001:2015</span>
              <span class="cert-pill">FSSC 22000</span>
              <span class="cert-pill">cGMP AUDITED</span>
              <span class="cert-pill">HACCP COMPLIANT</span>
              <span class="cert-pill">HALAL (MUI)</span>
              <span class="cert-pill">KOSHER (OU)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. About Section -->
      <section id="about" class="polish-about relative py-20 md:py-28 overflow-hidden" style="background-image: url('./AppUpload/Image/337e2bdc61a944d7a4de9677b9892ac8.png'); background-size: cover; background-position: center;">
        <div class="absolute inset-0 bg-[#0B1320]/88 backdrop-blur-[2px]"></div>
        
        <div class="relative z-10 mx-auto w-full max-w-[1240px] px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-6">
              <span class="font-mono text-xs uppercase tracking-widest text-[#9FE870] font-bold">ABOUT FENCHEM</span>
              <h2 class="text-3xl md:text-4xl font-bold text-white mt-3 mb-6" style="text-wrap: balance;">
                三十年专研，做全球品牌信赖的原料基石
              </h2>
              <p class="text-slate-300 text-base leading-relaxed mb-6" style="text-wrap: pretty;">
                南京泛成国际控股有限公司是行业内领先的专业原料解决方案提供商。凭借现代化生产制造基地、应用研发实验室以及遍布全球五大洲的本土仓储分公司网络，泛成为客户提供从原料甄选、配方研发、技术支持到准时交付的全链路服务。
              </p>
              <p class="text-slate-400 text-sm leading-relaxed mb-8" style="text-wrap: pretty;">
                我们以严苛的全球质量认证体系（ISO 9001 / FSSC 22000 / GMP / HALAL / KOSHER）为基准，助力客户缩短新品开发周期，打造兼具商业竞争力与健康价值的标杆产品。
              </p>
              <div class="flex flex-wrap items-center gap-6">
                <a href="#why-choose" class="btn-primary px-6 py-3 rounded-lg text-sm font-medium">深入了解竞争壁垒</a>
                <span class="text-xs text-slate-300 font-mono">GMP & ISO 9001 权威双重保障</span>
              </div>
            </div>

            <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/15">
                <div class="text-[#9FE870] font-mono text-xl font-bold mb-2">01 / 全球布局</div>
                <h3 class="text-white text-base font-semibold mb-2">本地仓储与合规支持</h3>
                <p class="text-slate-300 text-sm leading-relaxed">在北美、欧洲、拉美与亚太设立常驻办事处与专属仓库，实现门对门快速通关与敏捷交付。</p>
              </div>
              <div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/15">
                <div class="text-[#9FE870] font-mono text-xl font-bold mb-2">02 / 应用研发</div>
                <h3 class="text-white text-base font-semibold mb-2">配方开发与稳定性测试</h3>
                <p class="text-slate-300 text-sm leading-relaxed">独立应用实验室支持感官评测、热稳定性、协同复配实验，协同品牌客户攻克配方瓶颈。</p>
              </div>
              <div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/15 sm:col-span-2">
                <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <span class="text-white font-semibold">品质质量与认证集群</span>
                  <span class="text-xs font-mono text-[#9FE870]">100% 批次留样检测 · COA 随货同附</span>
                </div>
                <div class="grid grid-cols-4 gap-2 text-center text-xs font-mono text-slate-200">
                  <div class="bg-white/5 py-2 rounded">ISO 9001</div>
                  <div class="bg-white/5 py-2 rounded">FSSC 22000</div>
                  <div class="bg-white/5 py-2 rounded">KOSHER</div>
                  <div class="bg-white/5 py-2 rounded">HALAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Why Choose Fenchem (Hairline Specimen Grid) -->
      <section id="why-choose" class="py-20 md:py-28 bg-white">
        <div class="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div class="max-w-2xl mx-auto text-center mb-16">
            <span class="font-mono text-xs font-bold tracking-widest text-[#0743AE] uppercase">CORE ADVANTAGES</span>
            <h2 class="text-3xl md:text-4xl font-bold text-[#0B1320] mt-3 mb-4" style="text-wrap: balance;">
              为什么全球头部客户选择泛成
            </h2>
            <p class="text-slate-600 text-base" style="text-wrap: pretty;">
              从上游原料整合到下游配方赋能，泛成构筑稳定、合规、创新的全链路护城河。
            </p>
          </div>

          <!-- Main Project Design Law: Hairline structure beats card shadows -->
          <div class="hairline-specimen-grid">
            <!-- Pillar 1 -->
            <div class="pillar-specimen-cell">
              <div>
                <div class="flex items-center justify-between mb-6">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">01 / 04</span>
                  <div class="w-9 h-9 rounded-full bg-blue-50/80 flex items-center justify-center text-[#0743AE]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
                </div>
                <h3 class="text-lg font-bold text-[#0B1320] mb-2">全球资源整合</h3>
                <p class="text-slate-600 text-sm leading-relaxed mb-6">
                  精选全球优质原料核心产区，严苛把控种植、萃取到提纯标准，保障源头可追溯性。
                </p>
              </div>
              <div class="pillar-spec-tag">
                [ ORIGIN TRACEABILITY · 优中选优 ]
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="pillar-specimen-cell">
              <div>
                <div class="flex items-center justify-between mb-6">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">02 / 04</span>
                  <div class="w-9 h-9 rounded-full bg-blue-50/80 flex items-center justify-center text-[#0743AE]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                </div>
                <h3 class="text-lg font-bold text-[#0B1320] mb-2">稳定供应保障</h3>
                <p class="text-slate-600 text-sm leading-relaxed mb-6">
                  全球分公司常备现货库存，完善的安全库存预警与多港口调度策略，抵御跨国物流中断风险。
                </p>
              </div>
              <div class="pillar-spec-tag">
                [ SAFETY STOCK · 快速响应 ]
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="pillar-specimen-cell">
              <div>
                <div class="flex items-center justify-between mb-6">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">03 / 04</span>
                  <div class="w-9 h-9 rounded-full bg-blue-50/80 flex items-center justify-center text-[#0743AE]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                </div>
                <h3 class="text-lg font-bold text-[#0B1320] mb-2">解决方案创新</h3>
                <p class="text-slate-600 text-sm leading-relaxed mb-6">
                  以市场趋势与循证证据为导向，协同品牌伙伴共同开发前瞻性复配方案与应用技术。
                </p>
              </div>
              <div class="pillar-spec-tag">
                [ R&D FORMULATION · 联合攻关 ]
              </div>
            </div>

            <!-- Pillar 4 -->
            <div class="pillar-specimen-cell">
              <div>
                <div class="flex items-center justify-between mb-6">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">04 / 04</span>
                  <div class="w-9 h-9 rounded-full bg-blue-50/80 flex items-center justify-center text-[#0743AE]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                </div>
                <h3 class="text-lg font-bold text-[#0B1320] mb-2">长期战略伙伴</h3>
                <p class="text-slate-600 text-sm leading-relaxed mb-6">
                  专注打造超越原料买卖的长期信任，以定制化规格标准与全球法规情报赋能客户差异化竞争。
                </p>
              </div>
              <div class="pillar-spec-tag">
                [ STRATEGIC TRUST · 共同成长 ]
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Products & Applications (4 Divisions with Main Project Paper Chip + Spec Code) -->
      <section id="products" class="py-20 md:py-28 bg-[#F1F5F9]/70 border-y border-slate-200/70">
        <div class="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span class="font-mono text-xs font-bold tracking-widest text-[#0743AE] uppercase">PRODUCT DIVISIONS</span>
              <h2 class="text-3xl md:text-4xl font-bold text-[#0B1320] mt-2" style="text-wrap: balance;">
                核心业务板块与应用方案
              </h2>
              <p class="text-slate-600 text-base max-w-2xl mt-3" style="text-wrap: pretty;">
                针对四大关键产业领域，泛成提供高纯度、高稳定性的活性成分与功能基料。
              </p>
            </div>
            <a href="#cta" class="btn-primary self-start md:self-auto px-6 py-2.5 rounded-lg text-sm font-medium">索取原料规格书 (COA)</a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Sector 1: 人类营养健康 (Nutrition) -->
            <div class="product-card">
              <div class="relative h-60 overflow-hidden bg-slate-100">
                <img src="./AppUpload/Image/d8b476aaddeb4d93af3d3bb9d5de32f6.png" alt="Human nutrition and health" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div class="absolute top-3.5 left-3.5">
                  <div class="division-chip">
                    <span class="division-dot dot-nutrition"></span>
                    <span class="division-chip-text">人类营养健康</span>
                  </div>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="product-spec-code">FN-014 · ACTIVE</span>
                    <span class="text-xs font-mono text-slate-500">HPLC ≥ 95%</span>
                  </div>
                  <h3 class="text-lg font-bold text-[#0B1320] mb-2">基于循证证据的营养成分</h3>
                  <p class="text-slate-600 text-xs mb-4">满足精准营养与全生命周期健康诉求</p>
                  <div class="flex flex-wrap gap-1.5 mb-6">
                    <span class="product-tag-pill">肠道微生态</span>
                    <span class="product-tag-pill">女性活力</span>
                    <span class="product-tag-pill">情绪认知</span>
                    <span class="product-tag-pill">体重管理</span>
                  </div>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>姜黄素 · 辅酶Q10 · 益生菌</span>
                </div>
              </div>
            </div>

            <!-- Sector 2: 功能性食品 (Food) -->
            <div class="product-card">
              <div class="relative h-60 overflow-hidden bg-slate-100">
                <img src="./AppUpload/Image/3ef0ce2695d843ff9476399c75207f4b.png" alt="Functional food" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div class="absolute top-3.5 left-3.5">
                  <div class="division-chip">
                    <span class="division-dot dot-food"></span>
                    <span class="division-chip-text">功能性食品</span>
                  </div>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="product-spec-code">FN-052 · CLEAN</span>
                    <span class="text-xs font-mono text-slate-500">THERMAL 140°C</span>
                  </div>
                  <h3 class="text-lg font-bold text-[#0B1320] mb-2">现代清洁标签功能原料</h3>
                  <p class="text-slate-600 text-xs mb-4">兼顾风味质构、加工耐受与天然营养</p>
                  <div class="flex flex-wrap gap-1.5 mb-6">
                    <span class="product-tag-pill">膳食纤维</span>
                    <span class="product-tag-pill">植物胶体</span>
                    <span class="product-tag-pill">萃取天然色</span>
                    <span class="product-tag-pill">减糖替代基料</span>
                  </div>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>耐酸耐热高适配性体系</span>
                </div>
              </div>
            </div>

            <!-- Sector 3: 个人护理 (Cosmetics) -->
            <div class="product-card">
              <div class="relative h-60 overflow-hidden bg-slate-100">
                <img src="./AppUpload/Image/14c79e1e972644a2964af724eb9249ee.png" alt="Personal care" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div class="absolute top-3.5 left-3.5">
                  <div class="division-chip">
                    <span class="division-dot dot-cosmetics"></span>
                    <span class="division-chip-text">个人护理</span>
                  </div>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="product-spec-code">FN-068 · BIO-FERM</span>
                    <span class="text-xs font-mono text-slate-500">PURITY ≥ 98%</span>
                  </div>
                  <h3 class="text-lg font-bold text-[#0B1320] mb-2">天然来源护肤与彩妆活性物</h3>
                  <p class="text-slate-600 text-xs mb-4">经体外渗透验证的修护抗氧方案</p>
                  <div class="flex flex-wrap gap-1.5 mb-6">
                    <span class="product-tag-pill">多重透明质酸</span>
                    <span class="product-tag-pill">天然红没药醇</span>
                    <span class="product-tag-pill">特种植物油</span>
                    <span class="product-tag-pill">光防护因子</span>
                  </div>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>高经皮吸收率与低刺激性</span>
                </div>
              </div>
            </div>

            <!-- Sector 4: 宠物健康 (Pet Nutrition) -->
            <div class="product-card">
              <div class="relative h-60 overflow-hidden bg-slate-100">
                <img src="./AppUpload/Image/614078814e8f4ac5a502f02664dd2f03.png" alt="Pet health" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div class="absolute top-3.5 left-3.5">
                  <div class="division-chip">
                    <span class="division-dot dot-feed"></span>
                    <span class="division-chip-text">宠物营养</span>
                  </div>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="product-spec-code">FN-091 · ANIMAL</span>
                    <span class="text-xs font-mono text-slate-500">AAFCO / FEDIAF</span>
                  </div>
                  <h3 class="text-lg font-bold text-[#0B1320] mb-2">全周期伴侣动物关爱配方</h3>
                  <p class="text-slate-600 text-xs mb-4">专注皮毛光泽、肠胃调理与关节机能</p>
                  <div class="flex flex-wrap gap-1.5 mb-6">
                    <span class="product-tag-pill">美毛胜肽</span>
                    <span class="product-tag-pill">硫酸软骨素</span>
                    <span class="product-tag-pill">免疫球蛋白</span>
                    <span class="product-tag-pill">复合益生元</span>
                  </div>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>符合欧美严格饲料级规范</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Global Presence (The Globe is the Centerpiece Proof) -->
      <section id="global" class="polish-global py-20 md:py-28">
        <div class="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div class="lg:col-span-5">
              <span class="font-mono text-xs font-bold tracking-widest text-[#9FE870] uppercase">GLOBAL NETWORK</span>
              <h2 class="text-3xl md:text-4xl font-bold text-white mt-2 mb-4" style="text-wrap: balance;">
                全球 16 处办事机构与仓储网络
              </h2>
              <p class="text-slate-300 text-base leading-relaxed mb-6" style="text-wrap: pretty;">
                无论您的生产基地设在亚洲、欧洲、美洲还是非洲，泛成覆盖各大洲的本地化仓储体系都能确保原料快速交付与本土币种无缝结算。
              </p>
              
              <!-- Interactive continent selector tabs (12px clearance) -->
              <div class="flex flex-wrap gap-3">
                <button class="continent-tab active" data-region="all">全部大洲 (16)</button>
                <button class="continent-tab" data-region="asia">亚洲 (6)</button>
                <button class="continent-tab" data-region="europe">欧洲 (4)</button>
                <button class="continent-tab" data-region="north-america">北美洲 (3)</button>
                <button class="continent-tab" data-region="south-america">南美洲 (2)</button>
                <button class="continent-tab" data-region="africa">非洲 (1)</button>
              </div>
            </div>

            <div class="lg:col-span-7 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div class="flex items-center justify-between text-xs font-mono text-slate-300 mb-3 pb-2 border-b border-white/10">
                <span>[ MAP PROJECTION · GLOBAL SUPPLY NODES ]</span>
                <span class="text-[#9FE870]">ORIGIN: NANJING (N 32.06° / E 118.79°)</span>
              </div>
              <img alt="Map of Fenchem's global offices" class="w-full h-auto object-contain rounded-lg" src="./AppUpload/Image/d23d17a965454ad9acfcba73cb9b6089.png" />
            </div>
          </div>

          <!-- Region cards grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="region-panel hub-card" data-region="asia">
              <div class="text-xs font-mono font-bold text-[#9FE870] mb-2 uppercase">Asia Pacific</div>
              <h3 class="text-lg font-bold text-white mb-3">亚洲核心总部与枢纽</h3>
              <ul class="space-y-2 text-sm text-slate-300">
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>南京（全球运营总部）</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>东京，日本（东亚仓储）</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>曼谷，泰国</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>吉隆坡，马来西亚</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>孟买，印度</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>雅加达，印度尼西亚</li>
              </ul>
            </div>

            <div class="region-panel hub-card" data-region="europe">
              <div class="text-xs font-mono font-bold text-[#9FE870] mb-2 uppercase">Europe</div>
              <h3 class="text-lg font-bold text-white mb-3">欧洲运营中心</h3>
              <ul class="space-y-2 text-sm text-slate-300">
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>科隆，德国（欧洲主仓）</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>曼彻斯特，英国</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>克拉科夫，波兰</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>斯特拉瓦，捷克</li>
              </ul>
            </div>

            <div class="region-panel hub-card" data-region="north-america">
              <div class="text-xs font-mono font-bold text-[#9FE870] mb-2 uppercase">North America</div>
              <h3 class="text-lg font-bold text-white mb-3">北美物流与分销</h3>
              <ul class="space-y-2 text-sm text-slate-300">
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>奇诺，加利福尼亚州 (CA)</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>格莱姆斯，爱荷华州 (IA)</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>劳雷尔山，新泽西州 (NJ)</li>
              </ul>
            </div>

            <div class="region-panel hub-card" data-region="south-america">
              <div class="text-xs font-mono font-bold text-[#9FE870] mb-2 uppercase">South America & Africa</div>
              <h3 class="text-lg font-bold text-white mb-3">南美与非洲网络</h3>
              <ul class="space-y-2 text-sm text-slate-300">
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>圣保罗，巴西</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>库里蒂巴，巴西</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>约翰内斯堡，南非</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. News & Exhibitions Accordion (Safe Dynamic Height & En-dash) -->
      <section id="exhibitions" class="py-20 md:py-28 bg-white">
        <div class="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span class="font-mono text-xs font-bold tracking-widest text-[#0743AE] uppercase">NEWS & EVENTS</span>
              <h2 class="text-3xl md:text-4xl font-bold text-[#0B1320] mt-2" style="text-wrap: balance;">
                展会动态与最新资讯
              </h2>
            </div>
            <span class="text-sm text-slate-500 font-mono">2026 年度全球展会日程</span>
          </div>

          <div class="space-y-3 max-w-4xl">
            <!-- Event 1 -->
            <div class="accordion-item open">
              <button class="accordion-btn">
                <div class="flex items-center gap-4">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">01</span>
                  <span class="text-base md:text-lg font-semibold text-[#0B1320]">In-cosmetics® 拉丁美洲展（圣保罗）</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="hidden sm:inline font-mono text-xs text-slate-400">2026.09.23–09.24</span>
                  <span class="text-xl font-mono text-slate-500 icon-rotate">+</span>
                </div>
              </button>
              <div class="accordion-body">
                <p class="text-sm text-slate-600 leading-relaxed" style="text-wrap: pretty;">
                  泛成团队将于 2026 年 9 月 23 – 24 日亮相巴西圣保罗 Expo Center Norte。展出重点包括新型生物发酵透明质酸、植物来源红没药醇以及绿色防腐解决方案，欢迎全球伙伴莅临展台交流洽谈！
                </p>
              </div>
            </div>

            <!-- Event 2 -->
            <div class="accordion-item">
              <button class="accordion-btn">
                <div class="flex items-center gap-4">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">02</span>
                  <span class="text-base md:text-lg font-semibold text-[#0B1320]">IFSCC 大会 2026 (International Federation of Societies of Cosmetic Chemists)</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="hidden sm:inline font-mono text-xs text-slate-400">2026 学术年会</span>
                  <span class="text-xl font-mono text-slate-500 icon-rotate">+</span>
                </div>
              </button>
              <div class="accordion-body">
                <p class="text-sm text-slate-600 leading-relaxed" style="text-wrap: pretty;">
                  泛成研发工程师将发布针对敏感肌屏障修复及微生态调控的前沿学术海报，分享天然活性物在化妆品配方体系中的体外渗透评估最新研究成果。
                </p>
              </div>
            </div>

            <!-- Event 3 -->
            <div class="accordion-item">
              <button class="accordion-btn">
                <div class="flex items-center gap-4">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">03</span>
                  <span class="text-base md:text-lg font-semibold text-[#0B1320]">Naturally Kiawah 行业学术研讨会 2026</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="hidden sm:inline font-mono text-xs text-slate-400">北美高端原料论坛</span>
                  <span class="text-xl font-mono text-slate-500 icon-rotate">+</span>
                </div>
              </button>
              <div class="accordion-body">
                <p class="text-sm text-slate-600 leading-relaxed" style="text-wrap: pretty;">
                  汇聚北美顶尖配方师与品牌研发总监，探讨纯净美妆（Clean Beauty）与可持续天然原料标准的最新法规演进。
                </p>
              </div>
            </div>

            <!-- Event 4 -->
            <div class="accordion-item">
              <button class="accordion-btn">
                <div class="flex items-center gap-4">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">04</span>
                  <span class="text-base md:text-lg font-semibold text-[#0B1320]">In-cosmetics® Global 欧洲全球展</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="hidden sm:inline font-mono text-xs text-slate-400">欧洲旗舰展会</span>
                  <span class="text-xl font-mono text-slate-500 icon-rotate">+</span>
                </div>
              </button>
              <div class="accordion-body">
                <p class="text-sm text-slate-600 leading-relaxed" style="text-wrap: pretty;">
                  泛成德国科隆团队与南京总部研发代表联合参展，现场演示多款水相/油相高稳定性前瞻概念配方。
                </p>
              </div>
            </div>

            <!-- Event 5 -->
            <div class="accordion-item">
              <button class="accordion-btn">
                <div class="flex items-center gap-4">
                  <span class="font-mono text-sm font-bold text-[#0743AE] bg-blue-50 px-2.5 py-1 rounded">05</span>
                  <span class="text-base md:text-lg font-semibold text-[#0B1320]">PCHi 2026 中国国际个人护理用品原料展览会</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="hidden sm:inline font-mono text-xs text-slate-400">亚太旗舰峰会</span>
                  <span class="text-xl font-mono text-slate-500 icon-rotate">+</span>
                </div>
              </button>
              <div class="accordion-body">
                <p class="text-sm text-slate-600 leading-relaxed" style="text-wrap: pretty;">
                  展示专为亚洲肌肤定制的舒缓修护生物活性肽与植物多糖组合，提供从原料样品试用至大生产放大的全程技术档案。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Upgraded High-End CTA Section -->
      <section id="cta" class="cta-polished py-20 md:py-24">
        <div class="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-8 text-center">
          <span class="font-mono text-xs uppercase tracking-widest cta-eyebrow font-bold">READY TO FORMULATE</span>
          <h2 class="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-6" style="text-wrap: balance;">
            开启更具竞争力的产品创新
          </h2>
          <p class="text-white/85 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style="text-wrap: pretty;">
            不论您需要获取最新批次规格书（COA）、申请实验室样品，还是寻求定制化复配研发支持，泛成资深技术团队将在 24 小时内为您响应。
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:info@fenchem.com" class="cta-btn-primary-white px-8 py-3.5 text-base font-bold rounded-lg transition-all">
              索取样品与报价单
            </a>
            <a href="tel:+862584218888" class="cta-btn-outline px-8 py-3.5 text-base font-semibold rounded-lg transition-all">
              致电总部顾问 (+86 25 8421 8888)
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- 9. Footer (Consistent Heading Hierarchy & High-Contrast Typography) -->
    <footer class="polish-footer py-16 text-slate-300 text-sm">
      <div class="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div class="lg:col-span-2">
            <img alt="FENCHEM" class="h-10 w-auto brightness-0 invert mb-6" src="./AppUpload/Image/ca8375bebf1a4d6ab634a64e6dcdd68e.png" />
            <p class="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              南京泛成国际控股有限公司 · 三十余年专注于高品质功能性原料的研发、生产与全球分销。
            </p>
            <div class="font-mono text-xs text-slate-400 space-y-1">
              <p>地址：中国·江苏省南京市建邺区江东中路 359 号</p>
              <p>电话：+86 (25) 8421 8888</p>
              <p>邮箱：info@fenchem.com</p>
            </div>
          </div>

          <div>
            <h3 class="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">关于企业</h3>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li><a href="#about" class="hover:text-white transition-colors">集团简介</a></li>
              <li><a href="#why-choose" class="hover:text-white transition-colors">核心优势</a></li>
              <li><a href="#global" class="hover:text-white transition-colors">全球分支</a></li>
              <li><a href="#" class="hover:text-white transition-colors">研发基地与质量管理</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">核心业务</h3>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li><a href="#products" class="hover:text-white transition-colors">人类营养健康</a></li>
              <li><a href="#products" class="hover:text-white transition-colors">功能性食品配料</a></li>
              <li><a href="#products" class="hover:text-white transition-colors">个人护理活性物</a></li>
              <li><a href="#products" class="hover:text-white transition-colors">伴侣动物营养</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">合规与支持</h3>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li><a href="#exhibitions" class="hover:text-white transition-colors">展会动态</a></li>
              <li><a href="#" class="hover:text-white transition-colors">资质认证文件</a></li>
              <li><a href="#" class="hover:text-white transition-colors">隐私声明 (Privacy Statement)</a></li>
              <li><a href="#" class="hover:text-white transition-colors">服务条款 (Terms of Service)</a></li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>© 1995–2026 FENCHEM 泛成国际. All rights reserved.</div>
          <div class="flex items-center gap-6">
            <span>ISO 9001 · FSSC 22000 · cGMP Certified</span>
            <span>苏ICP备05008888号</span>
          </div>
        </div>
      </div>
    </footer>

    <script src="./assets/polish.js"></script>
  </body>
</html>
`;

fs.writeFileSync(htmlPath, polishedHTML, "utf-8");
console.log("✓ Successfully built upgraded studio-grade polished HTML at:", htmlPath);
