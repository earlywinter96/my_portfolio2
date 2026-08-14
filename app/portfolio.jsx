'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Database, Code2, Terminal, Brain, Cpu, Zap, Download, Globe, TrendingUp, GitBranch, Menu, X, Quote, ChevronRight, Play, Circle, MessageCircle, Send } from 'lucide-react';

const InteractivePortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [terminalState, setTerminalState] = useState('idle');
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('python');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const [botOpen, setBotOpen] = useState(false);
  const [botInput, setBotInput] = useState('');
  const [botThinking, setBotThinking] = useState(false);
  const [botMessages, setBotMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi, I am Hemant.ai. Ask me about Hemant, Reliance AI & Data, projects, skills, or LipiTranslate.in.'
    }
  ]);
  const canvasRef = useRef(null);
  const hexCanvasRef = useRef(null);
  const terminalRef = useRef(null);
  const botRef = useRef(null);

  const languages = {
    python: {
      name: 'Python',
      icon: '🐍',
      color: 'cyan',
      prompt: '>>>',
      code: [
        { text: "# Initializing portfolio...", delay: 100 },
        { text: ">>> import developer", delay: 800 },
        { text: ">>> from expertise import DataAnalysis, AI, Automation", delay: 1000 },
        { text: ">>> ", delay: 200 },
        { text: ">>> hemant = Developer(", delay: 600 },
        { text: "...     name='Hemant Solanki',", delay: 400 },
        { text: "...     role='Asst. Manager – AI & Data | Reliance Group',", delay: 400 },
        { text: "...     experience_years='6+',", delay: 400 },
        { text: "...     location='Mumbai, India',", delay: 400 },
        { text: "...     status='Open to Work'", delay: 400 },
        { text: "... )", delay: 600 },
        { text: ">>> ", delay: 200 },
        { text: ">>> hemant.skills = {", delay: 600 },
        { text: "...     'data': ['SQL', 'Python', 'R', 'Pandas', 'NumPy'],", delay: 400 },
        { text: "...     'ai': ['Agentic AI', 'OpenClaw', 'Claude', 'Gemini API', 'NLP'],", delay: 400 },
        { text: "...     'viz': ['Tableau', 'Power BI', 'Matplotlib'],", delay: 400 },
        { text: "...     'automation': ['Flask', 'REST APIs', 'ETL', 'LLM Pipelines']", delay: 400 },
        { text: "...     'startup': ['LipiTranslate.in', 'Indic AI', 'PDF Translation']", delay: 400 },
        { text: "... }", delay: 600 },
        { text: ">>> ", delay: 200 },
        { text: ">>> hemant.showcase_impact()", delay: 800 },
        { text: "🚀 Building Agentic AI solutions at enterprise scale", delay: 1000 },
        { text: "✨ Deploying intelligent agents for real-world business use cases", delay: 1000 },
        { text: "🌐 Building LipiTranslate.in for Indic PDF translation", delay: 1000 },
        { text: "💡 Turning data chaos into strategic clarity with AI", delay: 1000 },
        { text: ">>> ", delay: 200 },
        { text: ">>> print('Ready to collaborate on impactful projects!')", delay: 1000 },
        { text: "Ready to collaborate on impactful projects!", delay: 800 },
        { text: ">>> ", delay: 200 },
        { text: "# Press 'R' to restart or scroll to explore ↓", delay: 1500, final: true }
      ]
    },
  };

  const getLanguageColor = (lang) => {
    const colors = {
      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-400', text: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-400', text: 'text-yellow-400', glow: 'shadow-yellow-500/50' },
      green: { bg: 'bg-green-500/20', border: 'border-green-400', text: 'text-green-400', glow: 'shadow-green-500/50' },
      purple: { bg: 'bg-purple-500/20', border: 'border-purple-400', text: 'text-purple-400', glow: 'shadow-purple-500/50' },
      orange: { bg: 'bg-orange-500/20', border: 'border-orange-400', text: 'text-orange-400', glow: 'shadow-orange-500/50' }
    };
    return colors[lang] || colors.cyan;
  };

  const runTerminal = useCallback(() => {
    setTerminalState('running');
    setTerminalLines([]);
    
    const codeLines = languages[currentLanguage].code;
    let lineIndex = 0;

    const addLine = () => {
      if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];
        setTerminalLines(prev => [...prev, currentLine.text]);
        if (currentLine.final) setTerminalState('complete');
        lineIndex++;
        setTimeout(addLine, currentLine.delay);
      }
    };

    addLine();
  }, [currentLanguage]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key.toLowerCase() === 'r' || e.key === ' ') && terminalState !== 'running') {
        e.preventDefault();
        runTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [terminalState, runTerminal]);

  useEffect(() => {
    if (terminalRef.current && terminalState === 'running') {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines, terminalState]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setScrollY(scrollPosition);
    setIsScrolled(scrollPosition > 50);
    
    const sections = ['hero', 'about', 'experience', 'projects', 'startup', 'skills', 'testimonials', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      }
      return false;
    });
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    if (botRef.current) {
      botRef.current.scrollTop = botRef.current.scrollHeight;
    }
  }, [botMessages, botOpen]);

  const getBotAnswer = (question) => {
    const lower = question.toLowerCase();
    if (lower.includes('lipi') || lower.includes('translate') || lower.includes('startup')) {
      return 'LipiTranslate.in is Hemant Solanki’s founder-led Indic AI product. It focuses on translating full PDFs into Indian languages, helping students, teams, and knowledge workers understand documents without depending only on English. The roadmap is to grow from PDF translation into broader document intelligence.';
    }
    if (lower.includes('reliance') || lower.includes('job') || lower.includes('role')) {
      return 'Hemant joined Reliance Group in Feb 2026 as Assistant Manager - AI & Data. His current focus is applied AI systems, agentic workflows, LLM pipelines, analytics automation, and enterprise data use cases.';
    }
    if (lower.includes('project')) {
      return 'Key projects include LipiTranslate.in, AI Resume & Job Match Analyzer, NIA Voice Translator, StackIt 2.0, and NIA AI Voice Assistant. Together they show applied AI, NLP, document workflows, voice interfaces, and production-style web applications.';
    }
    if (lower.includes('skill') || lower.includes('tech')) {
      return 'Hemant’s core skills include Python, SQL, R, Tableau, Power BI, Flask, REST APIs, Gemini API, Claude, OpenClaw, LLM pipelines, workflow automation, and data quality systems.';
    }
    if (lower.includes('contact') || lower.includes('email')) {
      return 'You can reach Hemant at hemantsolanki333@gmail.com, connect on LinkedIn, or explore his GitHub at github.com/earlywinter96.';
    }
    return 'Hemant Solanki is an AI and data professional based in Mumbai. He works as Assistant Manager - AI & Data at Reliance Group, joined in Feb 2026, and builds practical AI products including LipiTranslate.in for Indic PDF translation.';
  };

  const getLiveBotAnswer = async (message) => {
    const response = await fetch('/api/portfolio-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'AI request failed.');
    return payload.answer;
  };

  const sendBotMessage = async (message = botInput) => {
    const clean = message.trim();
    if (!clean || botThinking) return;
    setBotOpen(true);
    setBotInput('');
    setBotThinking(true);
    setBotMessages(prev => [
      ...prev,
      { role: 'user', text: clean },
      { role: 'assistant', text: 'Thinking with live portfolio AI...', pending: true }
    ]);

    try {
      const answer = await getLiveBotAnswer(clean);
      setBotMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', text: answer || getBotAnswer(clean) }
      ]);
    } catch (error) {
      setBotMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', text: getBotAnswer(clean) }
      ]);
    } finally {
      setBotThinking(false);
    }
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Circuit Board Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    updateCanvasSize();

    class CircuitNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const nodes = Array.from({ length: 50 }, () => new CircuitNode());
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(node => { node.update(); node.draw(); });
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach(node2 => {
          const dx = node1.x - node2.x;
          const dy = node1.y - node2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => updateCanvasSize();
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', handleResize); };
  }, []);

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = hexCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    let animationId;
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 8, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => updateCanvasSize();
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', handleResize); };
  }, []);

  const projects = [
    {
      title: "LipiTranslate.in - Indic AI PDF Translator",
      description: "Founder-led AI product that translates full PDFs into Indian languages, designed for students, teams, and knowledge workers who need document access beyond English.",
      tech: ["Indic AI", "PDF Translation", "Sarvam AI", "Document Intelligence"],
      link: "https://lipitranslate.in/",
      github: "https://github.com/earlywinter96",
      icon: <Globe className="text-yellow-400" size={32} />,
    },
    {
      title: "AI Resume & Job Match Analyzer",
      description: "ATS-powered system analyzing resumes with AI-driven insights, skill gap detection, and career recommendations using advanced NLP.",
      tech: ["Python", "Gemini API", "Flask", "PostgreSQL", "NLP"],
      link: "https://ai-resume-job-analyzer.onrender.com/",
      github: "https://github.com/earlywinter96/ai-resume-job-analyzer",
      icon: <Brain className="text-cyan-400" size={32} />,
    },
    {
      title: "NIA Voice Translator",
      description: "Real-time AI voice translator supporting 100+ languages with speech recognition, translation, and text-to-speech using Gemini API and Google Cloud.",
      tech: ["Python", "Gemini API", "Google Cloud TTS", "SpeechRecognition"],
      link: "https://niaa-voice-translator.onrender.com/",
      github: "https://github.com/earlywinter96/niaa-voice-translator-",
      icon: <Globe className="text-purple-400" size={32} />,
    },
    {
      title: "StackIt 2.0 - AI Q&A Platform",
      description: "Stack Overflow-inspired forum enhanced with Gemini Pro for contextual AI answers, role-based auth, and async response generation.",
      tech: ["Flask", "Gemini Pro", "SQLite", "REST API"],
      link: "https://stackit2-0.onrender.com/",
      github: "https://github.com/earlywinter96/stackit2.0",
      icon: <Code2 className="text-green-400" size={32} />,
    },
    {
      title: "NIA - AI Voice Assistant",
      description: "Voice-controlled AI agent using Gemini API with speech recognition, natural language processing, and automated task execution.",
      tech: ["Python", "Gemini API", "SpeechRecognition", "pyttsx3"],
      github: "https://github.com/earlywinter96/AI-Agent-NIA-",
      icon: <Cpu className="text-yellow-400" size={32} />,
    }
  ];

  const navItems = ['About', 'Experience', 'Projects', 'Startup', 'Skills', 'Testimonials', 'Contact'];
  const langColor = getLanguageColor(languages[currentLanguage].color);

  return (
    <div className="relative min-h-screen bg-[#020817] text-white overflow-x-hidden font-mono">
      <canvas ref={hexCanvasRef} className="fixed inset-0 z-0 opacity-10" aria-hidden="true" />
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true" />
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] animate-float-slower"></div>
        <div className="absolute bottom-1/4 left-1/2 w-[350px] h-[350px] bg-green-500/15 rounded-full blur-[120px] animate-float-slowest"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl">
        <div className={`relative transition-all duration-500 ${isScrolled ? 'glass-nav-scrolled' : 'glass-nav'}`}>
          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 shadow-2xl backdrop-blur-xl bg-[#020817]/60">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="relative px-4 md:px-6">
              <div className="flex items-center justify-between h-14 md:h-16">
                <a href="#hero" className="flex items-center gap-2 group">
                  <Terminal className="text-cyan-400 w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
                  <div className="hidden sm:block">
                    <span className="text-sm md:text-base font-bold text-cyan-400">hemant</span>
                    <span className="text-gray-400/80 text-sm">@dev</span>
                  </div>
                </a>
                <div className="hidden lg:flex items-center gap-1">
                  {navItems.map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`}
                      className={`px-2.5 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 ${
                        activeSection === item.toLowerCase()
                          ? 'text-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20 border border-cyan-500/30'
                          : 'text-gray-300/90 hover:text-cyan-300 hover:bg-white/5'
                      }`}
                    >{item}</a>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://drive.google.com/file/d/1PVD5m85SBka0tVvd0ilvzdS_zNmI69mg/view?usp=sharing"
                    target="_blank" rel="noopener noreferrer"
                    className="hidden lg:flex items-center gap-2 whitespace-nowrap px-3 lg:px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300 rounded-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all text-xs lg:text-sm font-semibold">
                    <Download size={14} /> Download Resume
                  </a>
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-cyan-400 hover:bg-white/10 rounded-lg transition-all">
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden backdrop-blur-xl bg-[#020817]/60 animate-slideDown">
              <div className="flex flex-col py-3 px-3 space-y-1">
                {navItems.map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-all text-sm ${
                      activeSection === item.toLowerCase()
                        ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400'
                        : 'text-gray-300 hover:bg-white/5 border-l-2 border-transparent'
                    }`}
                  >{item}</a>
                ))}
                <a href="https://drive.google.com/file/d/1PVD5m85SBka0tVvd0ilvzdS_zNmI69mg/view?usp=sharing"
                  target="_blank" rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 px-4 py-3 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 transition-all text-sm font-semibold">
                  <Download size={16} /> Download Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-32 md:pt-40 pb-32">
          <div className="text-center z-10 max-w-6xl w-full">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-gray-100">
              Hemant Solanki
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-2xl md:text-3xl lg:text-4xl text-cyan-400 mb-4">
              <Code2 className="w-6 h-6 md:w-8 md:h-8" />
              <span className="font-bold">Asst. Manager – AI & Data | Reliance Group</span>
            </div>
            <p className="text-sm text-cyan-400 mb-8 animate-pulse-soft">
              <Circle className="inline-block w-2 h-2 fill-current mr-2" />
              status: open to work
            </p>

            {/* Interactive Terminal */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className={`relative p-6 md:p-8 bg-[#0a0f1e]/95 backdrop-blur-xl border-2 ${langColor.border} rounded-2xl shadow-2xl overflow-hidden`}>
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,217,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                <div className="relative flex items-center justify-between mb-4 pb-3 border-b border-cyan-500/30">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-cyan-400">
                      <Terminal size={16} />
                      <span className="text-xs font-mono">~/portfolio</span>
                    </div>
                  </div>
                  <span className={`text-sm ${langColor.text} font-bold flex items-center gap-2 px-3 py-1 rounded-lg ${langColor.bg} border ${langColor.border}`}>
                    <span className="text-lg">{languages[currentLanguage].icon}</span>
                    <span className="hidden sm:inline">{languages[currentLanguage].name}</span>
                    <span className="sm:hidden">Py</span>
                  </span>
                </div>

                <div ref={terminalRef} className="text-left font-mono text-sm md:text-base overflow-y-auto max-h-[400px] terminal-scroll">
                  {terminalState === 'idle' && (
                    <div className="space-y-4">
                      <p className="text-cyan-400 font-mono flex items-center gap-2">
                        {languages[currentLanguage].prompt} <span className="text-gray-500">// Python Interactive Portfolio</span>
                      </p>
                      <div className={`p-5 ${langColor.bg} border-2 ${langColor.border} rounded-xl shadow-lg`}>
                        <p className={`${langColor.text} font-bold mb-3 flex items-center gap-2 text-lg`}>
                          <Play size={20} className="animate-pulse" /> Ready to Execute
                        </p>
                        <p className="text-gray-200 mb-4 leading-relaxed">
                          Press <kbd className={`px-3 py-1.5 ${langColor.bg} border-2 ${langColor.border} rounded-lg text-sm font-bold mx-1 shadow-md`}>SPACE</kbd> or click the
                          <button onClick={runTerminal} className={`ml-2 px-4 py-2 ${langColor.bg} border-2 ${langColor.border} ${langColor.text} rounded-lg hover:scale-105 transition-all inline-flex items-center gap-2 font-bold shadow-lg`}>
                            <Play size={14} /> RUN
                          </button>
                          {' '}button to see my profile execute in real-time
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-cyan-500/20 pt-3 mt-3">
                          <Terminal size={14} />
                          <span>Watch the code execute line by line with realistic timing</span>
                        </div>
                      </div>
                      <p className={`${langColor.text} font-mono`}>{languages[currentLanguage].prompt} <span className="animate-blink">█</span></p>
                    </div>
                  )}
                  {(terminalState === 'running' || terminalState === 'complete') && (
                    <div className="space-y-1">
                      {terminalLines.map((line, idx) => <div key={idx} className="text-white">{line}</div>)}
                      {terminalState === 'running' && <span className={`${langColor.text} animate-blink`}>█</span>}
                    </div>
                  )}
                </div>

                {terminalState !== 'running' && (
                  <div className="relative mt-6 pt-4 border-t border-cyan-500/30 flex items-center justify-between">
                    <button onClick={runTerminal}
                      className={`px-8 py-4 ${langColor.bg} border-2 ${langColor.border} ${langColor.text} rounded-xl hover:scale-105 transition-all font-bold flex items-center gap-3 shadow-xl text-base`}>
                      <Play size={20} />
                      {terminalState === 'complete' ? 'Run Again' : 'Execute Portfolio'}
                    </button>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-gray-400 text-xs flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-xs">R</kbd> to restart
                      </span>
                      <span className="text-gray-500 text-xs">or scroll to explore ↓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
              <span className="text-gray-400">//</span> <span className="text-cyan-400">About Me</span>
            </h2>
            <div className="flex flex-wrap gap-6 justify-center mb-16">
              <a href="mailto:hemantsolanki333@gmail.com" className="p-5 bg-cyan-500/10 border border-cyan-400/30 rounded-xl hover:bg-cyan-500/20 transition-all hover:scale-110 shadow-lg">
                <Mail className="text-cyan-400" size={24} />
              </a>
              <a href="https://www.linkedin.com/in/hemant-solanki-366462199/" target="_blank" rel="noopener noreferrer" className="p-5 bg-green-500/10 border border-green-400/30 rounded-xl hover:bg-green-500/20 transition-all hover:scale-110 shadow-lg">
                <Linkedin className="text-green-400" size={24} />
              </a>
              <a href="https://github.com/earlywinter96" target="_blank" rel="noopener noreferrer" className="p-5 bg-purple-500/10 border border-purple-400/30 rounded-xl hover:bg-purple-500/20 transition-all hover:scale-110 shadow-lg">
                <Github className="text-purple-400" size={24} />
              </a>
              <a href="https://medium.com/@hemantsolanki333/about" target="_blank" rel="noopener noreferrer" className="p-5 bg-yellow-500/10 border border-yellow-400/30 rounded-xl hover:bg-yellow-500/20 transition-all hover:scale-110 shadow-lg">
                <Globe className="text-yellow-400" size={24} />
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-all hover:scale-105 shadow-xl">
                <Database className="text-cyan-400 mb-4" size={36} />
                <h3 className="text-2xl font-bold mb-4 text-cyan-300"># Data Analytics</h3>
                <p className="text-gray-200 leading-relaxed mb-4">Expert in SQL, Python, and R for extracting actionable insights from complex datasets. Building robust pipelines and statistical models.</p>
                <a href="https://drive.google.com/file/d/1aiBva-p3G0whtUi42LtZoApMwnMEKM6o/view" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all text-cyan-400 font-bold">
                  🎓 IIM Certified <ExternalLink size={16} />
                </a>
              </div>
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-green-500/30 rounded-xl hover:border-green-400 transition-all hover:scale-105 shadow-xl">
                <TrendingUp className="text-green-400 mb-4" size={36} />
                <h3 className="text-2xl font-bold mb-4 text-green-300"># Analytics & BI</h3>
                <p className="text-gray-200 leading-relaxed mb-4">Designing Tableau and Power BI dashboards that drive strategic decisions. Statistical modeling and A/B testing.</p>
                <a href="https://drive.google.com/file/d/1aiBva-p3G0whtUi42LtZoApMwnMEKM6o/view" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400 rounded-lg hover:bg-green-500/30 transition-all text-green-400 font-bold">
                  🎓 IIM Certified <ExternalLink size={16} />
                </a>
              </div>
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-purple-500/30 rounded-xl hover:border-purple-400 transition-all hover:scale-105 shadow-xl">
                <Brain className="text-purple-400 mb-4" size={36} />
                <h3 className="text-2xl font-bold mb-4 text-purple-300"># AI Development</h3>
                <p className="text-gray-200 leading-relaxed mb-4">Building Agentic AI solutions and intelligent agents using OpenClaw and Claude. Deploying Gen AI into analytics pipelines for real-world business impact.</p>
                <div className="flex flex-col gap-2">
                  <a href="https://drive.google.com/file/d/1D-mqEOAd-ASTHAd9NXrs7tigRFwaFXdS/view" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400 rounded-lg hover:bg-purple-500/30 transition-all text-purple-400 font-bold">
                    🎓 Gen AI Certified <ExternalLink size={16} />
                  </a>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://www.credly.com/badges/8a2ada39-462a-40ee-b2ce-1b3f344cbf6a" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 border border-yellow-400 rounded-md hover:bg-yellow-500/30 transition-all text-xs text-yellow-400 font-semibold">
                      🏆 Vertex AI
                    </a>
                    <a href="https://www.credly.com/org/google-cloud/badge/explore-generative-ai-with-the-vertex-ai-gemini-api" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 border border-cyan-400 rounded-md hover:bg-cyan-500/30 transition-all text-xs text-cyan-400 font-semibold">
                      🏆 Gemini API
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-10 bg-[#0f172a]/70 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl">
              <div className="flex items-start gap-4">
                <Terminal className="text-cyan-400 mt-1 w-8 h-8 animate-pulse-glow" />
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-cyan-300">$ whoami</h3>
                  <p className="text-white leading-relaxed text-lg">
                    I'm an Assistant Manager – AI & Data at Reliance Group with 6+ years of experience turning raw data into clear, actionable insights.
                    I build and deploy Agentic AI solutions, develop intelligent agents using OpenClaw and Claude for workflow automation, and integrate Generative AI into analytics pipelines.
                    I am also building LipiTranslate.in, an Indic AI product focused on full PDF translation into Indian languages.
                    Currently working at the intersection of enterprise data and cutting-edge AI — designing scalable systems that reduce manual effort and drive real business impact.
                    Open to work and excited to collaborate on impactful data and AI projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="relative py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
              <span className="text-gray-400">//</span> <span className="text-cyan-400">Experience</span>
            </h2>
            
            <div className="space-y-8">

              {/* ── Reliance Group ── */}
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-yellow-500/30 rounded-xl hover:border-yellow-400 transition-all shadow-xl">
                <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="text-yellow-400" size={20} />
                      <h3 className="text-3xl font-bold text-yellow-300">Assistant Manager – AI & Data</h3>
                    </div>
                    <p className="text-2xl text-white font-bold">Reliance Group</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold font-mono text-lg">Feb 2026 - Present</p>
                    <p className="text-gray-300">Mumbai</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Building and deploying Agentic AI solutions for real-world business use cases at enterprise scale',
                    'Developing intelligent AI agents using OpenClaw and Claude for workflow automation and decision support',
                    'Integrating Generative AI into analytics pipelines to enhance reporting and insights generation',
                    'Designing scalable data + AI systems to improve operational efficiency and reduce manual effort',
                    'Collaborating with cross-functional teams to identify AI opportunities and implement impactful solutions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-100">
                      <Zap className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['OpenClaw', 'Claude AI', 'Agentic AI', 'Generative AI', 'Python', 'LLM Pipelines', 'Workflow Automation'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded text-sm text-yellow-300 font-bold">{tag}</span>
                  ))}
                </div>
              </div>

              {/* ── Independent Consultant ── */}
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-all shadow-xl">
                <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="text-cyan-400" size={20} />
                      <h3 className="text-3xl font-bold text-cyan-300">Independent Consultant</h3>
                    </div>
                    <p className="text-2xl text-white font-bold">Freelance Developer / Data Analyst</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-bold font-mono text-lg">Jan 2025 - Jan 2026</p>
                    <p className="text-gray-300">Mumbai</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Built AI-powered applications using Python, Flask, and Gemini API for enterprise clients',
                    'Designed data pipelines processing 1M+ records with R (dplyr) and Python (pandas)',
                    'Created automation scripts reducing reporting time by 60% through intelligent workflows',
                    'Delivered end-to-end ML projects from data extraction to production deployment',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-100">
                      <Zap className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Senior Data Analyst ── */}
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-green-500/30 rounded-xl hover:border-green-400 transition-all shadow-xl">
                <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="text-green-400" size={20} />
                      <h3 className="text-3xl font-bold text-green-300">Senior Data Analyst</h3>
                    </div>
                    <p className="text-2xl text-white font-bold">Fuel Intelligence Pvt Ltd</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold font-mono text-lg">Aug 2021 - Jan 2025</p>
                    <p className="text-gray-300">Mumbai</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Architected SQL & R pipelines driving 25% increase in user engagement metrics',
                    'Built 15+ production Tableau dashboards serving 200+ stakeholders daily',
                    'Implemented A/B testing framework improving conversion rates by 18%',
                    'Improved data accuracy by 30% through validation scripts and quality checks',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-100">
                      <Zap className="text-green-400 mt-1 flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── BD Data Executive ── */}
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-purple-500/30 rounded-xl hover:border-purple-400 transition-all shadow-xl">
                <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="text-purple-400" size={20} />
                      <h3 className="text-3xl font-bold text-purple-300">BD Data Executive</h3>
                    </div>
                    <p className="text-2xl text-white font-bold">Data Bridge Market Research</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-bold font-mono text-lg">Nov 2019 - July 2021</p>
                    <p className="text-gray-300">Pune</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Conducted market research across APAC, Europe, and USA generating strategic insights',
                    'Built data collection pipelines using web scraping and LinkedIn automation',
                    'Developed comprehensive reports supporting $2M+ business growth initiatives',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-100">
                      <Zap className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
              <span className="text-gray-400">//</span> <span className="text-cyan-400">Featured Projects</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="group relative p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-all hover:scale-[1.02] shadow-xl overflow-hidden">
                  <div className="relative z-10">
                    <div className="mb-6">{project.icon}</div>
                    <h3 className="text-3xl font-bold mb-4 text-cyan-300">{project.title}</h3>
                    <p className="text-gray-100 mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-sm text-cyan-300 font-bold">{tech}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-5 py-3 bg-cyan-500/30 border border-cyan-400 text-white rounded-lg hover:bg-cyan-500/40 transition-all font-bold">
                          <ExternalLink size={16} /> Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-5 py-3 bg-green-500/30 border border-green-400 text-white rounded-lg hover:bg-green-500/40 transition-all font-bold">
                          <Github size={16} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Startup */}
        <section id="startup" className="relative py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
              <span className="text-gray-400">//</span> <span className="text-cyan-400">Startup</span>
            </h2>
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
              <div className="p-8 md:p-10 bg-[#0f172a]/70 backdrop-blur-xl border border-yellow-500/30 rounded-xl shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <Globe className="text-yellow-400" size={28} />
                  <p className="text-yellow-400 font-mono font-bold">founder_build.launch()</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-5">LipiTranslate.in</h3>
                <p className="text-gray-100 leading-relaxed text-lg mb-6">
                  LipiTranslate.in is Hemant's founder-led Indic AI product for translating full PDFs into Indian languages.
                  It is built for students, professionals, and teams who need easier access to knowledge locked inside English documents.
                </p>
                <p className="text-gray-200 leading-relaxed mb-8">
                  The product direction starts with accurate PDF translation and moves toward a broader document intelligence layer:
                  upload a document, understand it in your preferred Indian language, and work with the content faster.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://lipitranslate.in/" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-500/25 border border-yellow-400 text-white rounded-lg hover:bg-yellow-500/35 transition-all font-bold">
                    <ExternalLink size={16} /> Visit LipiTranslate.in
                  </a>
                  <button onClick={() => sendBotMessage('Explain LipiTranslate.in as a startup pitch.')}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500/25 border border-cyan-400 text-white rounded-lg hover:bg-cyan-500/35 transition-all font-bold">
                    <MessageCircle size={16} /> Ask Bot
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  ['Problem', 'Important PDFs are often hard to use when readers need Indian language access.'],
                  ['Product', 'Translate complete PDFs while preserving the document workflow for real users.'],
                  ['AI Layer', 'Indic language translation, document parsing, and future intelligence features.'],
                  ['Users', 'Students, teams, researchers, and knowledge workers across India.']
                ].map(([title, detail], idx) => (
                  <div key={idx} className="p-5 bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-xl">
                    <p className="text-cyan-400 font-mono font-bold mb-2">{title}</p>
                    <p className="text-gray-100 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="relative py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center">
              <span className="text-gray-400">{'<'}</span>
              <span className="text-cyan-400">skills</span>
              <span className="text-gray-400">{' />'}</span>
            </h2>
            <div className="mb-12 p-6 bg-[#0f172a]/70 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-xl max-w-4xl mx-auto">
              <code className="text-white text-base block font-mono">
                <span className="text-purple-400">const</span> <span className="text-yellow-300">focus</span> = <span className="text-green-300">"accuracy, scalability, decision impact"</span>;
              </code>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-all shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-cyan-300"><span className="text-gray-400">{'// '}</span>Data Operations & Quality</h3>
                <ul className="space-y-2 text-gray-200">
                  {['Data validation, audits & reconciliation', 'Product & entity mapping', 'Manual + automated data tagging'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><ChevronRight className="text-cyan-400 mt-1" size={16} /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-cyan-400 font-bold">Impact: Enhanced data reliability</p>
              </div>
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-green-500/30 rounded-xl hover:border-green-400 transition-all shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-green-300"><span className="text-gray-400">{'// '}</span>Programming & Automation</h3>
                <ul className="space-y-2 text-gray-200">
                  {['Python (Pandas, NumPy, scripting)', 'SQL (joins, transformations, validations)', 'R (analytics & processing)'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><ChevronRight className="text-green-400 mt-1" size={16} /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-green-400 font-bold">Impact: Reduced manual effort</p>
              </div>
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-purple-500/30 rounded-xl hover:border-purple-400 transition-all shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-purple-300"><span className="text-gray-400">{'// '}</span>Analytics & Visualization</h3>
                <ul className="space-y-2 text-gray-200">
                  {['Tableau & Power BI dashboards', 'Executive-ready reporting', 'Trend & anomaly detection'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><ChevronRight className="text-purple-400 mt-1" size={16} /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-purple-400 font-bold">Impact: Increased adoption</p>
              </div>
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-yellow-500/30 rounded-xl hover:border-yellow-400 transition-all shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-yellow-300"><span className="text-gray-400">{'// '}</span>AI & Applied Intelligence</h3>
                <ul className="space-y-2 text-gray-200">
                  {['Agentic AI & LLM pipeline development', 'OpenClaw, Claude & Gemini API integration', 'Workflow automation & decision support systems'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><ChevronRight className="text-yellow-400 mt-1" size={16} /><span>{item}</span></li>
                  ))}
                </ul>
                <p className="mt-4 text-yellow-400 font-bold">Focus: Practical AI adoption</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="relative py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
              <span className="text-gray-400">{'<'}</span>
              <span className="text-cyan-400">recommendations</span>
              <span className="text-gray-400">{' />'}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-all shadow-xl">
                <Quote className="text-cyan-400 mb-4" size={24} />
                <h3 className="text-2xl font-bold text-cyan-300 mb-2">Ajay Landge</h3>
                <p className="text-gray-300 font-semibold mb-1">Colleague</p>
                <p className="text-gray-400 text-sm mb-4">Fuel Intelligence • worked together 2+ years</p>
                <div className="p-4 bg-black/30 rounded-lg border-l-4 border-cyan-500/50 mb-4">
                  <p className="text-gray-100 italic leading-relaxed">
                    "We have been working together for more than 2+ years. And if there is anything to describe you as a person I would say Go-getter and Good listener.
                    Professionally, I utterly appreciate you for shouldering responsibility and putting the company interests ahead of your own as a great team player. You are amazing!"
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Positive', 'Curious', 'Team Player'].map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-sm text-cyan-300 font-bold">{t}</span>
                  ))}
                </div>
              </div>
              <div className="group p-8 bg-[#0f172a]/60 backdrop-blur-xl border border-green-500/30 rounded-xl hover:border-green-400 transition-all shadow-xl">
                <Quote className="text-green-400 mb-4" size={24} />
                <h3 className="text-2xl font-bold text-green-300 mb-2">Mayank Shukla</h3>
                <p className="text-gray-300 font-semibold mb-1">VP and Trainer, Operations</p>
                <p className="text-gray-400 text-sm mb-4">Fuel Intelligence • managed directly</p>
                <div className="p-4 bg-black/30 rounded-lg border-l-4 border-green-500/50 mb-4">
                  <p className="text-gray-100 italic leading-relaxed">
                    "Hemant is an employee who does not give up no matter what happens. He has a will made of iron and has a lot of potential which he uses for the betterment of himself and for the company.
                    Everywhere he is, people will be lucky to have him."
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Iron Will', 'High Potential', 'Dedicated'].map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-sm text-green-300 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 p-8 bg-[#0f172a]/70 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-xl text-center">
              <a href="https://www.linkedin.com/in/hemant-solanki-366462199/" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/30 border border-cyan-400 text-white rounded-lg hover:bg-cyan-500/40 transition-all font-bold">
                <Linkedin size={20} /> View All Recommendations on LinkedIn <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-gray-400">//</span> <span className="text-cyan-400">Get In Touch</span>
            </h2>
            <div className="mb-12 p-8 bg-[#0f172a]/70 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl">
              <code className="text-white text-lg">
                <span className="text-cyan-400">function</span>{' '}
                <span className="text-yellow-300">collaborate</span>() {'{'}<br />
                &nbsp;&nbsp;<span className="text-purple-300">return</span>{' '}
                <span className="text-green-300">"Data, AI, and automation — built for real-world impact. Open to work."</span>;<br />
                {'}'}
              </code>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a href="mailto:hemantsolanki333@gmail.com"
                 className="flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-cyan-500/30 to-green-500/30 border border-cyan-400 text-white rounded-xl hover:bg-cyan-500/40 transition-all text-lg font-bold hover:scale-105 shadow-xl">
                <Mail size={20} /> hemantsolanki333@gmail.com
              </a>
              <a href="tel:+918698834490"
                 className="flex items-center justify-center gap-3 px-8 py-5 bg-[#0f172a]/70 backdrop-blur-xl border border-green-500/50 text-white rounded-xl hover:bg-green-500/30 transition-all text-lg font-bold hover:scale-105 shadow-xl">
                📞 +91 86988 34490
              </a>
            </div>
            <div className="flex gap-6 justify-center">
              <a href="https://www.linkedin.com/in/hemant-solanki-366462199/" target="_blank" rel="noopener noreferrer"
                 className="p-5 bg-cyan-500/10 border border-cyan-400/30 rounded-xl hover:bg-cyan-500/20 transition-all hover:scale-110 shadow-lg">
                <Linkedin size={28} className="text-cyan-400" />
              </a>
              <a href="https://github.com/earlywinter96" target="_blank" rel="noopener noreferrer"
                 className="p-5 bg-green-500/10 border border-green-400/30 rounded-xl hover:bg-green-500/20 transition-all hover:scale-110 shadow-lg">
                <Github size={28} className="text-green-400" />
              </a>
              <a href="https://medium.com/@hemantsolanki333/about" target="_blank" rel="noopener noreferrer"
                 className="p-5 bg-purple-500/10 border border-purple-400/30 rounded-xl hover:bg-purple-500/20 transition-all hover:scale-110 shadow-lg">
                <Globe size={28} className="text-purple-400" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Portfolio Bot */}
      <button
        onClick={() => setBotOpen(true)}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-4 bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 rounded-2xl backdrop-blur-xl shadow-2xl hover:bg-cyan-500/30 transition-all font-bold ${botOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'}`}
        aria-label="Open Hemant AI bot"
      >
        <MessageCircle size={22} />
        <span className="hidden sm:inline">Ask Hemant.ai</span>
      </button>

      {botOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-md overflow-hidden rounded-2xl border border-cyan-400/40 bg-[#020817]/95 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center justify-between gap-3 p-4 border-b border-cyan-500/30 bg-cyan-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <MessageCircle className="text-cyan-300" size={20} />
              </div>
              <div>
                <p className="text-cyan-300 font-bold">Hemant.ai</p>
                <p className="text-xs text-gray-400">Portfolio bot</p>
              </div>
            </div>
            <button onClick={() => setBotOpen(false)} className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all" aria-label="Close Hemant AI bot">
              <X size={18} />
            </button>
          </div>

          <div ref={botRef} className="h-80 overflow-y-auto terminal-scroll p-4 space-y-3">
            {botMessages.map((message, idx) => (
              <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                  message.role === 'user'
                    ? 'bg-cyan-500/25 border-cyan-400/40 text-white'
                    : `bg-[#0f172a]/80 border-white/10 text-gray-100 ${message.pending ? 'animate-pulse' : ''}`
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 px-4 pb-3">
            {['Tell me about Reliance', 'Pitch LipiTranslate', 'Best projects', 'Core skills'].map((prompt) => (
              <button key={prompt} onClick={() => sendBotMessage(prompt)} disabled={botThinking}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200 hover:bg-cyan-500/15 hover:border-cyan-400/40 transition-all">
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); sendBotMessage(); }} className="flex gap-2 p-4 border-t border-cyan-500/30">
            <input
              value={botInput}
              onChange={(event) => setBotInput(event.target.value)}
              placeholder="Ask about Hemant..."
              disabled={botThinking}
              className="min-w-0 flex-1 rounded-xl bg-black/30 border border-cyan-500/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
            <button type="submit" disabled={botThinking} className="px-4 py-3 rounded-xl bg-cyan-500/25 border border-cyan-400 text-white hover:bg-cyan-500/35 transition-all disabled:opacity-60" aria-label="Send bot message">
              {botThinking ? <Circle size={18} className="animate-pulse fill-current" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}

      <footer className="relative py-12 px-4 md:px-6 border-t border-cyan-500/30 backdrop-blur-xl bg-[#0f172a]/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-200 font-mono mb-2 text-lg">
            <span className="text-cyan-400">$</span> Built with React, Tailwind & passion for clean code
          </p>
          <p className="text-gray-300 text-sm font-mono">
            © 2025 Hemant Solanki • Mumbai, India • hemant@portfolio:~$
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s infinite; }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 30px); }
        }
        @keyframes float-slowest {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -40px); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 25s ease-in-out infinite; }
        .animate-float-slowest { animation: float-slowest 30s ease-in-out infinite; }
        kbd { font-family: 'Fira Code', monospace; font-weight: 600; }
        .terminal-scroll::-webkit-scrollbar { width: 6px; }
        .terminal-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.4); }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00d9ff 0%, #0088cc 100%);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default InteractivePortfolio;
