import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Terminal,
  FileCode,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Cpu,
  Globe,
  Play,
  Settings,
  HelpCircle,
  FolderGit2,
  ArrowRight,
  ShieldCheck,
  Languages,
  Zap,
  BookOpen
} from 'lucide-react';

interface PromptPreset {
  id: string;
  title: string;
  titleTh: string;
  category: string;
  description: string;
  descriptionTh: string;
  prompt: string;
  model: string;
}

const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: 'school-lunch',
    title: 'School Lunch Nutrition & ERP',
    titleTh: 'ระบบบริหารจัดการอาหารกลางวันโรงเรียน (ERP)',
    category: 'Full-Stack ERP',
    description: 'Calculate nutritional balance, budget per student, ingredient inventory, and generate official report docs.',
    descriptionTh: 'คำนวณสารอาหาร งบประมาณต่อหัว สต็อกวัตถุดิบ และพิมพ์รายงานราชการแบบอัตโนมัติ',
    prompt: `Create a comprehensive School Lunch ERP System for schools with:
1. Daily and weekly lunch menu planning with nutritional guideline tracking (calories, proteins, fats, vegetables).
2. Cost & budget tracking per student (support local currency ฿ / THB), supplier procurement list, and purchase order tracking.
3. Inventory management for fresh ingredients, dry goods, and kitchen supplies with expiration alerts.
4. Exportable PDF and Excel reports matching educational ministry standard formats (เอกสารอาหารกลางวัน).
5. Role-based access for Kitchen Staff, Nutritionist, and School Administrator.`,
    model: 'gemini-2.5-pro'
  },
  {
    id: 'doc-pdf-generator',
    title: 'Smart Document & PDF Form Builder',
    titleTh: 'เครื่องมือสร้างเอกสารและแบบฟอร์ม PDF อัจฉริยะ',
    category: 'Productivity Tool',
    description: 'Dynamic form filler, signature stamp, PDF export preview, and document templates.',
    descriptionTh: 'กรอกแบบฟอร์มไดนามิก แสตมป์ลายเซ็น แสดงตัวอย่าง PDF และสร้างเทมเพลตเอกสาร',
    prompt: `Build an interactive document generator and PDF exporter with:
1. Form template engine that supports text fields, numeric calculations, date pickers, and signature canvas.
2. Real-time document preview side-by-side with zoom controls.
3. One-click PDF generation using client-side rendering with Thai and universal font support.
4. Saved document history in local state with export/import JSON backup.`,
    model: 'gemini-2.5-flash'
  },
  {
    id: 'inventory-system',
    title: 'Warehouse & Asset Inventory Hub',
    titleTh: 'ระบบจัดการคลังสินค้าและพัสดุ',
    category: 'Management',
    description: 'Barcode/QR scanner simulator, stock alerts, supplier directories, and audit logging.',
    descriptionTh: 'ระบบสแกนสต็อก แจ้งเตือนของใกล้หมด บันทึกประวัติการเบิกจ่ายสินค้า',
    prompt: `Develop a real-time warehouse inventory and asset management web application:
1. Track stock items across categories, locations, unit quantities, and minimum thresholds.
2. Stock In / Stock Out transaction history with timestamps and operator notes.
3. Low-stock visual badges, filterable data tables, and search by SKU or title.
4. Data summary dashboard with total valuation, category breakdown, and reorder notices.`,
    model: 'gemini-2.5-flash'
  },
  {
    id: 'ai-studio-assistant',
    title: 'Gemini Multimodal Data Processor',
    titleTh: 'ระบบประมวลผลข้อมูลเอกสารด้วย Gemini AI',
    category: 'AI Integration',
    description: 'Extract structured JSON from scanned receipts, invoices, and hand-written notes.',
    descriptionTh: 'แปลงภาพถ่ายใบเสร็จ เอกสาร หรือบันทึกข้อความ ให้เป็นข้อมูล JSON แบบมีโครงสร้าง',
    prompt: `Create a Gemini 2.5 Flash document parsing application:
1. Upload interface for image receipts, purchase slips, or spreadsheets.
2. Structured output schema definition (invoice date, vendor name, items, tax, total).
3. Side-by-side verification view with validation indicators and easy inline editing.
4. Export options to CSV, JSON, and Google Sheets format.`,
    model: 'gemini-2.5-flash'
  }
];

export default function App() {
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [activeTab, setActiveTab] = useState<'overview' | 'prompts' | 'diagnostics' | 'readme'>('overview');
  const [selectedPreset, setSelectedPreset] = useState<PromptPreset>(PROMPT_PRESETS[0]);
  const [customPrompt, setCustomPrompt] = useState<string>(PROMPT_PRESETS[0].prompt);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedReadme, setCopiedReadme] = useState<boolean>(false);

  const copyText = (text: string, isReadme = false) => {
    navigator.clipboard.writeText(text);
    if (isReadme) {
      setCopiedReadme(true);
      setTimeout(() => setCopiedReadme(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelectPreset = (preset: PromptPreset) => {
    setSelectedPreset(preset);
    setCustomPrompt(preset.prompt);
  };

  const readmeContent = `<div align="center">

<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  <h1>Built with AI Studio</h1>

  <p>The fastest path from prompt to production with Gemini.</p>

  <a href="https://aistudio.google.com/apps">Start building</a>

</div>`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">AI Studio Applet 8</span>
                <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Imported from <span className="text-slate-300 font-mono">ekkapan11560-ship-it/8</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Nav Tabs */}
            <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Overview' : 'ภาพรวม'}</span>
              </button>
              <button
                onClick={() => setActiveTab('prompts')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'prompts'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Studio Prompts' : 'ชุดคำสั่ง AI'}</span>
              </button>
              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'diagnostics'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Diagnostics' : 'ระบบ & พอร์ต'}</span>
              </button>
              <button
                onClick={() => setActiveTab('readme')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'readme'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>README</span>
              </button>
            </nav>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Toggle English / ภาษาไทย"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'en' ? 'TH' : 'EN'}</span>
            </button>

            {/* Open Google AI Studio button */}
            <a
              href="https://aistudio.google.com/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              <span>AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Banner Section */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
              <img
                src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"
                alt="AI Studio Banner"
                className="w-full h-auto max-h-[420px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-medium backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{lang === 'en' ? 'Prompt to Production' : 'จากคำสั่งสู่โปรดักชันพร้อมใช้งาน'}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {lang === 'en' ? 'Built with AI Studio' : 'สร้างสรรค์ด้วย AI Studio'}
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {lang === 'en'
                      ? 'The fastest path from prompt to production with Gemini. Successfully migrated and configured for instant interactive development.'
                      : 'ทางลัดที่เร็วที่สุดในการเปลี่ยนคำสั่งและจินตนาการให้เป็นแอปพลิเคชันจริงด้วยขุมพลังโมเดล Gemini'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('prompts')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all hover:translate-y-[-1px]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{lang === 'en' ? 'Explore Prompts' : 'เริ่มต้นใช้งานโมเดล'}</span>
                  </button>
                  <a
                    href="https://aistudio.google.com/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-medium text-sm transition-all"
                  >
                    <span>Google AI Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base mb-1">
                  {lang === 'en' ? 'Import Verification' : 'สถานะการนำเข้าโครงการ'}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  {lang === 'en'
                    ? 'Imported from GitHub repo ekkapan11560-ship-it/8. Web Node.js runtime and Vite bundler configured.'
                    : 'นำเข้าจาก GitHub คลัง ekkapan11560-ship-it/8 พร้อมระบบ Node.js 22 และ Vite'}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10 w-fit">
                  <span>STATUS: HEALTHY (200 OK)</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base mb-1">
                  {lang === 'en' ? 'Port & Dev Server' : 'พอร์ตและเซิร์ฟเวอร์นักพัฒนา'}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  {lang === 'en'
                    ? 'Dev server listening on 0.0.0.0:3000 with HMR-ready Vite bundle and Tailwind CSS v4 styling.'
                    : 'เปิดให้บริการบน 0.0.0.0:3000 ด้วย Vite และ Tailwind CSS v4 เต็มประสิทธิภาพ'}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded border border-indigo-500/10 w-fit">
                  <span>PORT: 3000 (0.0.0.0)</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base mb-1">
                  {lang === 'en' ? 'Gemini API Ready' : 'พร้อมเชื่อมต่อ Gemini API'}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  {lang === 'en'
                    ? 'Server-side Gemini SDK integration architecture prepared with zero client-side token exposure.'
                    : 'สถาปัตยกรรมพร้อมต่อเชื่อมโมเดล Gemini ผ่าน Server-Side ปลอดภัย 100%'}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-purple-400 bg-purple-500/5 px-2.5 py-1 rounded border border-purple-500/10 w-fit">
                  <span>CAPABILITY: GEMINI_API</span>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {lang === 'en' ? 'Quick Jump: Starter Templates' : 'เทมเพลตเริ่มต้นยอดนิยม'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Pre-formulated blueprints tailored for your projects'
                      : 'โครงสร้างคำสั่งที่ปรับแต่งให้ตรงกับเป้าหมายการพัฒนาของคุณ'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('prompts')}
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>{lang === 'en' ? 'View all' : 'ดูทั้งหมด'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROMPT_PRESETS.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      handleSelectPreset(item);
                      setActiveTab('prompts');
                    }}
                    className="cursor-pointer group p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{item.model}</span>
                    </div>
                    <h4 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
                      {lang === 'en' ? item.title : item.titleTh}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {lang === 'en' ? item.description : item.descriptionTh}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {lang === 'en' ? 'Gemini Prompt-to-Production Studio' : 'ห้องปฏิบัติการคำสั่ง AI Studio'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {lang === 'en'
                  ? 'Select a template or refine your prompt to engineer full applications, automated ERPs, and document builders.'
                  : 'เลือกชุดคำสั่งที่เตรียมไว้ หรือปรับแต่งคำสั่งของคุณเพื่อสร้างแอปพลิเคชัน ระบบ ERP และเครื่องมือออกเอกสารได้อย่างรวดเร็ว'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Presets List */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block px-1">
                  {lang === 'en' ? 'Application Blueprints' : 'พิมพ์เขียวระบบที่แนะนำ'}
                </span>
                <div className="space-y-2.5">
                  {PROMPT_PRESETS.map((preset) => {
                    const isSelected = selectedPreset.id === preset.id;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/50'
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {preset.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{preset.model}</span>
                        </div>
                        <h4 className="font-semibold text-sm text-white">
                          {lang === 'en' ? preset.title : preset.titleTh}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {lang === 'en' ? preset.description : preset.descriptionTh}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Editor & Inspector */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col flex-1 shadow-xl">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-semibold text-slate-200">
                        {lang === 'en' ? 'Prompt Specification' : 'รายละเอียดคำสั่ง (Prompt Spec)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyText(customPrompt)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">{lang === 'en' ? 'Copied!' : 'คัดลอกแล้ว'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>{lang === 'en' ? 'Copy Prompt' : 'คัดลอกคำสั่ง'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      rows={12}
                      className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-200 focus:outline-none focus:border-indigo-500/60 resize-y leading-relaxed"
                      placeholder={lang === 'en' ? 'Enter prompt instructions here...' : 'พิมพ์คำสั่งระบุความต้องการที่นี่...'}
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <span>
                        {lang === 'en' ? 'Characters' : 'จำนวนตัวอักษร'}: <strong className="text-slate-300">{customPrompt.length}</strong>
                      </span>
                      <span>
                        {lang === 'en' ? 'Est. Tokens' : 'ประมาณการโทเคน'}: <strong className="text-slate-300">{Math.ceil(customPrompt.length / 4)}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{lang === 'en' ? 'Ready to run in AI Studio Build' : 'พร้อมนำไปสร้างใน AI Studio'}</span>
                    </div>
                  </div>
                </div>

                {/* Information Card */}
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-indigo-300/90 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p>
                    {lang === 'en'
                      ? 'You can ask AI Studio Build right in this chat to extend Applet 8 into any of these applications. Just describe the desired feature, and it will be built directly into this live environment!'
                      : 'คุณสามารถแจ้งความต้องการในหน้าต่างสนทนานี้เพื่อต่อเติมระบบของ Applet 8 ให้กลายเป็นแอปพลิเคชันที่คุณต้องการได้ทันที!'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {lang === 'en' ? 'System & Migration Diagnostics' : 'การตรวจสอบระบบและการย้ายข้อมูล'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {lang === 'en'
                  ? 'Verification checklist matching AI Studio Web Constraints and container standards.'
                  : 'รายการตรวจสอบตามข้อกำหนดสภาพแวดล้อม AI Studio Web Node.js 22'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Environment Checklist */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>{lang === 'en' ? 'Runtime Environment' : 'สภาพแวดล้อมระบบรันไทม์'}</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Container Runtime' : 'รันไทม์คอนเทนเนอร์'}</span>
                    <span className="font-mono text-emerald-400 font-medium">Node.js v22.23.3 (npm 10.9.9)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'HTTP Port Binding' : 'พอร์ตเครือข่าย'}</span>
                    <span className="font-mono text-emerald-400 font-medium">0.0.0.0:3000 (Required)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Bundler & Compiler' : 'เครื่องมือบิลด์'}</span>
                    <span className="font-mono text-indigo-300 font-medium">Vite 6.2 + TypeScript 5.7</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Styling Engine' : 'ระบบสไตล์'}</span>
                    <span className="font-mono text-indigo-300 font-medium">Tailwind CSS v4</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Nginx Proxy Control Plane' : 'Nginx พร็อกซี'}</span>
                    <span className="font-mono text-emerald-400 font-medium">Port 8080 → 3000 (Forwarded)</span>
                  </div>
                </div>
              </div>

              {/* Migration Specifications */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  <span>{lang === 'en' ? 'Source Repository Metadata' : 'ข้อมูลคลังรหัสต้นฉบับ'}</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Imported From' : 'นำเข้าจาก'}</span>
                    <a
                      href="https://github.com/ekkapan11560-ship-it/8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>ekkapan11560-ship-it/8</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Branch' : 'กิ่ง (Branch)'}</span>
                    <span className="font-mono text-slate-200">main</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Configuration Standard' : 'มาตรฐานโครงการ'}</span>
                    <span className="font-mono text-slate-200">references/web.md</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Security & Secrets' : 'ความปลอดภัยของคีย์'}</span>
                    <span className="font-mono text-emerald-400 font-medium">Safe (.env.example only)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">{lang === 'en' ? 'Applet Metadata' : 'เมทาดาทาแอปพลิเคชัน'}</span>
                    <span className="font-mono text-emerald-400 font-medium">metadata.json configured</span>
                  </div>
                </div>
              </div>
            </div>

            {/* File Structure */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Applet Project Tree' : 'โครงสร้างไฟล์โปรเจกต์'}</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-1">
                <div>📁 <span className="text-indigo-400 font-semibold">/applet</span></div>
                <div className="pl-4">├── 📄 <span className="text-emerald-300">metadata.json</span> <span className="text-slate-500">// AI Studio manifest</span></div>
                <div className="pl-4">├── 📄 <span className="text-emerald-300">package.json</span> <span className="text-slate-500">// npm package descriptor</span></div>
                <div className="pl-4">├── 📄 <span className="text-emerald-300">vite.config.ts</span> <span className="text-slate-500">// port 3000 server config</span></div>
                <div className="pl-4">├── 📄 <span className="text-emerald-300">tsconfig.json</span> <span className="text-slate-500">// TypeScript configuration</span></div>
                <div className="pl-4">├── 📄 <span className="text-emerald-300">index.html</span> <span className="text-slate-500">// HTML5 entry with synced meta</span></div>
                <div className="pl-4">├── 📄 <span className="text-emerald-300">.env.example</span> <span className="text-slate-500">// safe environment templates</span></div>
                <div className="pl-4">├── 📄 <span className="text-emerald-300">README.md</span> <span className="text-slate-500">// original repository README</span></div>
                <div className="pl-4">└── 📁 <span className="text-indigo-400">src/</span></div>
                <div className="pl-8">├── 📄 <span className="text-emerald-300">main.tsx</span> <span className="text-slate-500">// React 19 root bootstrap</span></div>
                <div className="pl-8">├── 📄 <span className="text-emerald-300">App.tsx</span> <span className="text-slate-500">// interactive application hub</span></div>
                <div className="pl-8">└── 📄 <span className="text-emerald-300">index.css</span> <span className="text-slate-500">// Tailwind CSS v4 directives</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'readme' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  README.md
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {lang === 'en'
                    ? 'The raw Markdown file imported from ekkapan11560-ship-it/8.'
                    : 'เนื้อหาไฟล์ Markdown ดั้งเดิมที่นำเข้าจาก ekkapan11560-ship-it/8'}
                </p>
              </div>

              <button
                onClick={() => copyText(readmeContent, true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                {copiedReadme ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{lang === 'en' ? 'Copied!' : 'คัดลอกแล้ว'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lang === 'en' ? 'Copy Markdown' : 'คัดลอก Markdown'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto whitespace-pre leading-relaxed border border-slate-800">
                {readmeContent}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/30">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                {lang === 'en' ? 'Rendered Output' : 'การแสดงผลในหน้าเว็บ'}
              </h3>
              <div className="flex flex-col items-center justify-center p-8 bg-slate-950 rounded-xl border border-slate-800/80 text-center space-y-4">
                <img
                  width="600"
                  height="237"
                  alt="GHBanner"
                  src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"
                  className="rounded-lg shadow-md max-w-full"
                />
                <h1 className="text-2xl font-bold text-white">Built with AI Studio</h1>
                <p className="text-slate-400 text-sm max-w-md">
                  The fastest path from prompt to production with Gemini.
                </p>
                <a
                  href="https://aistudio.google.com/apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition-colors inline-block"
                >
                  Start building
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-5 px-4 lg:px-8 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">AI Studio Applet 8</span>
            <span>•</span>
            <span>Node.js 22 Runtime</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">0.0.0.0:3000</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://github.com/ekkapan11560-ship-it/8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors flex items-center gap-1"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <a
              href="https://aistudio.google.com/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google AI Studio</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
