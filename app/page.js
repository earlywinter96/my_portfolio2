'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Database, Code2, Terminal, Brain, Cpu, Zap, Download, Globe, TrendingUp, GitBranch, Menu, X } from 'lucide-react';

const CodePortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [terminalText, setTerminalText] = useState('');
  const [nameText, setNameText] = useState('Hemant Solanki');
  const [codeLines, setCodeLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);
  const fullText = ">>> import analytics, ai, automation";
  const nameReveal = "Hemant Solanki";
  const [showFallback, setShowFallback] = useState(false);
  
  const terminalCode = [
    ">>> name = 'Hemant Solanki'",
    ">>> role = 'Senior Data Analyst | AI Developer'",
    ">>> experience = 4.5  # years",
    ">>> skills = [",
    "...     'Data Accuracy & Quality',",
    "...     'Business Intelligence',",
    "...     'Python & SQL Automation',",
    "...     'AI-powered Applications'",
    "... ]",
    ">>> impact = {",
    "...     'efficiency': 'optimized',",
    "...     'data_accuracy': 'enhanced',",
    "...     'adoption': 'increased'",
    "... }",
    ">>> print(\"Let's build something impactful...\")",
  ];

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  useEffect(() => {
    if (currentLine < terminalCode.length) {
      const line = terminalCode[currentLine];
      
      if (currentChar < line.length) {
        const timer = setTimeout(() => {
          setCodeLines(prev => {
            const newLines = [...prev];
            newLines[currentLine] = line.substring(0, currentChar + 1);
            return newLines;
          });
          setCurrentChar(currentChar + 1);
        }, 30);
        
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }, 200);
        
        return () => clearTimeout(timer);
      }
    }
  }, [currentLine, currentChar, terminalCode]);

  useEffect(() => {
    const chars = "!@#$%^&*(){}[]<>/|\\~`?;:+-=_";
    const glitchChars = "アイウエオカキクケコ01ハヒフヘホ";
    let frame = 0;
    const maxFrames = 40;
    
    const glitch = setInterval(() => {
      if (frame < maxFrames) {
        let result = '';
        for (let i = 0; i < nameReveal.length; i++) {
          if (frame > i * 2) {
            result += nameReveal[i];
          } else {
            const randomChar = Math.random() > 0.5 
              ? chars[Math.floor(Math.random() * chars.length)]
              : glitchChars[Math.floor(Math.random() * glitchChars.length)];
            result += randomChar;
          }
        }
        setNameText(result);
        frame++;
      } else {
        setNameText(nameReveal);
        clearInterval(glitch);
      }
    }, 80);
    
    // Fallback in case animation fails
    setTimeout(() => {
      setNameText(nameReveal);
      setShowFallback(true);
    }, 5000);
    
    return () => clearInterval(glitch);
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId;
    let lastFrame = 0;
    const fps = 30;
    const frameDelay = 1000 / fps;

    const draw = (timestamp) => {
      if (timestamp - lastFrame < frameDelay) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;

      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff9f';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', updateCanvasSize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const projects = [
    {
      title: "AI Resume & Job Match Analyzer",
      description: "ATS-powered system analyzing resumes with AI-driven insights, skill gap detection, and career recommendations using advanced NLP.",
      tech: ["Python", "Gemini API", "Flask", "PostgreSQL", "NLP"],
      link: "https://ai-resume-job-analyzer.onrender.com/",
      github: "https://github.com/earlywinter96/ai-resume-job-analyzer",
      icon: <Brain className="text-cyan-400" size={32} aria-hidden="true" />
    },
    {
      title: "NIA Voice Translator",
      description: "Real-time AI voice translator supporting 100+ languages with speech recognition, translation, and text-to-speech using Gemini API and Google Cloud.",
      tech: ["Python", "Gemini API", "Google Cloud TTS", "SpeechRecognition"],
      link: "https://niaa-voice-translator.onrender.com/",
      github: "https://github.com/earlywinter96/niaa-voice-translator-",
      icon: <Globe className="text-purple-400" size={32} aria-hidden="true" />
    },
    {
      title: "StackIt 2.0 - AI Q&A Platform",
      description: "Stack Overflow-inspired forum enhanced with Gemini Pro for contextual AI answers, role-based auth, and async response generation.",
      tech: ["Flask", "Gemini Pro", "SQLite", "REST API"],
      link: "https://stackit2-0.onrender.com/",
      github: "https://github.com/earlywinter96/stackit2.0",
      icon: <Code2 className="text-green-400" size={32} aria-hidden="true" />
    },
    {
      title: "NIA - AI Voice Assistant",
      description: "Voice-controlled AI agent using Gemini API with speech recognition, natural language processing, and automated task execution.",
      tech: ["Python", "Gemini API", "SpeechRecognition", "pyttsx3"],
      github: "https://github.com/earlywinter96/AI-Agent-NIA-",
      icon: <Cpu className="text-yellow-400" size={32} aria-hidden="true" />
    }
  ];

  const skillsData = [
    {
      title: "Data Operations & Quality",
      summary: "Ensuring data is trustworthy before it reaches stakeholders.",
      items: [
        "Data validation, audits & reconciliation",
        "Product & entity mapping",
        "Manual + automated data tagging",
        "Quality SOPs & checks"
      ],
      impact: "Impact: Enhanced data reliability",
      color: "cyan"
    },
    {
      title: "Programming & Automation",
      summary: null,
      items: [
        "Python (Pandas, NumPy, scripting)",
        "SQL (joins, transformations, validations)",
        "R (analytics & processing)"
      ],
      impact: "Impact: Reduced manual effort",
      color: "green"
    },
    {
      title: "Analytics & Visualization",
      summary: null,
      items: [
        "Tableau & Power BI dashboards",
        "Executive-ready reporting",
        "Trend & anomaly detection"
      ],
      impact: "Impact: Increased adoption",
      color: "purple"
    },
    {
      title: "AI & Applied Intelligence",
      summary: null,
      items: [
        "Google Gemini API",
        "AI resume & job analysis systems",
        "Automation + AI pipelines"
      ],
      impact: "Focus: Practical AI adoption, not experiments",
      color: "yellow"
    }
  ];

  const experience = [
    {
      company: "Freelance Developer / Data Analyst",
      role: "Independent Consultant",
      period: "Jan 2025 - Present",
      location: "Mumbai",
      highlights: [
        "Built AI-powered applications using Python, Flask, and Gemini API for enterprise clients",
        "Designed data pipelines processing 1M+ records with R (dplyr) and Python (pandas)",
        "Created automation scripts reducing reporting time by 60% through intelligent workflows",
        "Delivered end-to-end ML projects from data extraction to production deployment"
      ]
    },
    {
      company: "Fuel Intelligence Pvt Ltd",
      role: "Senior Data Analyst",
      period: "Aug 2021 - Jan 2025",
      location: "Mumbai",
      highlights: [
        "Architected SQL & R pipelines driving 25% increase in user engagement metrics",
        "Built 15+ production Tableau dashboards serving 200+ stakeholders daily",
        "Implemented A/B testing framework improving conversion rates by 18%",
        "Improved data accuracy by 30% through validation scripts and quality checks"
      ]
    },
    {
      company: "Data Bridge Market Research",
      role: "BD Data Executive",
      period: "Nov 2019 - July 2021",
      location: "Pune",
      highlights: [
        "Conducted market research across APAC, Europe, and USA generating strategic insights",
        "Built data collection pipelines using web scraping and LinkedIn automation",
        "Developed comprehensive reports supporting $2M+ business growth initiatives"
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        border: "border-cyan-500/40",
        hoverBorder: "hover:border-cyan-400",
        text: "text-cyan-300",
        impact: "text-cyan-400"
      },
      green: {
        border: "border-green-500/40",
        hoverBorder: "hover:border-green-400",
        text: "text-green-300",
        impact: "text-green-400"
      },
      purple: {
        border: "border-purple-500/40",
        hoverBorder: "hover:border-purple-400",
        text: "text-purple-300",
        impact: "text-purple-400"
      },
      yellow: {
        border: "border-yellow-500/40",
        hoverBorder: "hover:border-yellow-400",
        text: "text-yellow-300",
        impact: "text-yellow-400"
      }
    };
    return colors[color] || colors.cyan;
  };

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <div className="relative min-h-screen bg-[#0a0e27] text-white overflow-x-hidden font-mono">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded">
        Skip to main content
      </a>

      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10" aria-hidden="true" />
      
      <div className="fixed inset-0 z-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#00ff9f 1px, transparent 1px), linear-gradient(90deg, #00ff9f 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} aria-hidden="true" />

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0e27]/95 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="text-cyan-400" size={20} aria-hidden="true" />
            <span className="text-sm md:text-xl font-bold text-cyan-400">hemant@portfolio:~$</span>
          </div>
          
          <div className="hidden md:flex gap-8">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-all duration-300 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0e27] rounded px-2 py-1 ${
                  activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
                }`}
              >
                {`<${item.toLowerCase()} />`}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-cyan-400 hover:bg-cyan-500/20 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a
            href="https://drive.google.com/file/d/1PVD5m85SBka0tVvd0ilvzdS_zNmI69mg/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyan-500/30 border border-cyan-400 text-white rounded-lg hover:bg-cyan-500/40 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Download size={16} aria-hidden="true" />
            Resume
          </a>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-500/30 bg-[#0a0e27]/98 backdrop-blur-xl">
            <div className="flex flex-col py-4 px-4 space-y-2">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all hover:bg-cyan-500/20 ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-300'
                  }`}
                >
                  {`<${item.toLowerCase()} />`}
                </a>
              ))}
              <a
                href="https://drive.google.com/file/d/1WaJt8LlNR_RKCZrDGsXHhqCVWHy2I16s/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/30 border border-cyan-400 text-white rounded-lg hover:bg-cyan-500/40 transition-all font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={16} aria-hidden="true" />
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content">
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 pb-32">
          <div className="text-center z-10 max-w-5xl w-full" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
            <div className="mb-8 inline-block">
              <div className="text-cyan-400 text-sm md:text-lg mb-6 font-mono bg-black/40 px-4 md:px-6 py-2 md:py-3 rounded-lg border border-cyan-500/30">
                $ <span className="animate-pulse">{terminalText}</span>
                <span className="animate-blink" aria-hidden="true">█</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-6 text-white drop-shadow-[0_0_30px_rgba(0,255,159,0.5)] font-mono px-4">
                {nameText || nameReveal}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cyan-400 mb-4 drop-shadow-lg px-4">
                <Code2 size={24} className="md:w-8 md:h-8" aria-hidden="true" />
                <span className="font-bold">Senior Data Analyst</span>
                <GitBranch size={24} className="md:w-8 md:h-8" aria-hidden="true" />
              </div>
              <div className="text-base sm:text-xl md:text-2xl text-gray-200 mb-8 font-semibold px-4">
                AI Developer • Data Analyst • Analytics Architect
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto mb-8 p-4 md:p-6 lg:p-8 bg-black/60 backdrop-blur border-2 border-cyan-500/40 rounded-lg shadow-2xl max-h-[400px] overflow-y-auto">
              <code className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed block font-mono">
                {codeLines.length === 0 ? (
                  <div className="text-gray-400">Loading terminal...</div>
                ) : (
                  codeLines.map((line, idx) => (
                    <div key={idx} className="mb-1">
                      {line.startsWith('>>>') ? (
                        <>
                          <span className="text-cyan-400">{line.substring(0, 3)}</span>
                          <span className="text-white">{line.substring(3)}</span>
                        </>
                      ) : line.startsWith('...') ? (
                        <>
                          <span className="text-yellow-400">{line.substring(0, 3)}</span>
                          <span className="text-white">{line.substring(3)}</span>
                        </>
                      ) : (
                        <span className="text-white">{line}</span>
                      )}
                      {idx === currentLine && currentChar === line.length && (
                        <span className="animate-blink text-cyan-400" aria-hidden="true">█</span>
                      )}
                    </div>
                  ))
                )}
                {currentLine === codeLines.length && codeLines.length > 0 && (
                  <span className="animate-blink text-cyan-400" aria-hidden="true">█</span>
                )}
              </code>
            </div>
          </div>
        </section>

        <section id="about" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center text-white drop-shadow-lg">
              <span className="text-gray-400">//</span>{' '}
              <span className="text-cyan-400">About Me</span>
            </h2>

            <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 justify-center mb-12 md:mb-16">
              <a 
                href="mailto:hemantsolanki333@gmail.com" 
                className="p-4 md:p-5 bg-cyan-500/20 backdrop-blur border-2 border-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Email Hemant Solanki"
              >
                <Mail className="text-cyan-400" size={24} aria-hidden="true" />
              </a>
              <a 
                href="https://www.linkedin.com/in/hemant-solanki-366462199/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 md:p-5 bg-green-500/20 backdrop-blur border-2 border-green-400 rounded-lg hover:bg-green-500/30 transition-all hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="text-green-400" size={24} aria-hidden="true" />
              </a>
              <a 
                href="https://github.com/earlywinter96" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 md:p-5 bg-purple-500/20 backdrop-blur border-2 border-purple-400 rounded-lg hover:bg-purple-500/30 transition-all hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="GitHub profile"
              >
                <Github className="text-purple-400" size={24} aria-hidden="true" />
              </a>
              <a 
                href="https://medium.com/@hemantsolanki333/about" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 md:p-5 bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Medium blog"
              >
                <Globe className="text-yellow-400" size={24} aria-hidden="true" />
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="group p-6 md:p-8 bg-black/40 backdrop-blur border-2 border-cyan-500/40 rounded-lg hover:border-cyan-400 transition-all hover:scale-105 shadow-xl">
                <Database className="text-cyan-400 mb-4" size={36} aria-hidden="true" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-cyan-300"># Data Analytics</h3>
                <p className="text-gray-200 leading-relaxed text-sm md:text-base lg:text-lg mb-4">
                  Expert in SQL, Python, and R for extracting actionable insights from complex datasets. 
                  Building robust pipelines, statistical models, and data validation frameworks that drive business decisions.
                </p>
                <a 
                  href="https://drive.google.com/file/d/1aiBva-p3G0whtUi42LtZoApMwnMEKM6o/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all text-sm md:text-base text-cyan-400 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <span aria-hidden="true">🎓</span>
                  <span>IIM Certified</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="group p-6 md:p-8 bg-black/40 backdrop-blur border-2 border-green-500/40 rounded-lg hover:border-green-400 transition-all hover:scale-105 shadow-xl">
                <TrendingUp className="text-green-400 mb-4" size={36} aria-hidden="true" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-300"># Analytics & BI</h3>
                <p className="text-gray-200 leading-relaxed text-sm md:text-base lg:text-lg mb-4">
                  Designing Tableau and Power BI dashboards that drive strategic decisions. 
                  Statistical modeling, A/B testing, and predictive analytics.
                </p>
                <a 
                  href="https://drive.google.com/file/d/1aiBva-p3G0whtUi42LtZoApMwnMEKM6o/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400 rounded-lg hover:bg-green-500/30 transition-all text-sm md:text-base text-green-400 font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <span aria-hidden="true">🎓</span>
                  <span>IIM Certified</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="group p-6 md:p-8 bg-black/40 backdrop-blur border-2 border-purple-500/40 rounded-lg hover:border-purple-400 transition-all hover:scale-105 shadow-xl">
                <Brain className="text-purple-400 mb-4" size={36} aria-hidden="true" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-purple-300"># AI Development</h3>
                <p className="text-gray-200 leading-relaxed text-sm md:text-base lg:text-lg mb-4">
                  Building AI-powered applications with Gemini API. Creating intelligent agents for 
                  automation, NLP tasks, and decision support systems.
                </p>
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://drive.google.com/file/d/1D-mqEOAd-ASTHAd9NXrs7tigRFwaFXdS/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400 rounded-lg hover:bg-purple-500/30 transition-all text-sm md:text-base text-purple-400 font-bold focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <span aria-hidden="true">🎓</span>
                    <span>Gen AI Certified</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href="https://www.credly.com/badges/8a2ada39-462a-40ee-b2ce-1b3f344cbf6a/linked_in_profile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 border border-yellow-400 rounded-md hover:bg-yellow-500/30 transition-all text-xs md:text-sm text-yellow-400 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <span aria-hidden="true">🏆</span>
                      <span>Vertex AI Badge</span>
                    </a>
                    <a 
                      href="https://www.credly.com/org/google-cloud/badge/explore-generative-ai-with-the-vertex-ai-gemini-api" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 border border-cyan-400 rounded-md hover:bg-cyan-500/30 transition-all text-xs md:text-sm text-cyan-400 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <span aria-hidden="true">🏆</span>
                      <span>Gemini API Badge</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 p-6 md:p-8 lg:p-10 bg-black/50 backdrop-blur border-2 border-cyan-500/40 rounded-lg shadow-2xl">
              <div className="flex items-start gap-3 md:gap-4">
                <Terminal className="text-cyan-400 mt-1 flex-shrink-0 w-6 h-6 md:w-9 md:h-9" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-cyan-300">$ whoami</h3>
                  <p className="text-white leading-relaxed text-sm md:text-base lg:text-xl">
                    I'm a <span className="text-cyan-400 font-bold">Senior Data Analyst</span> and <span className="text-purple-400 font-bold">AI Developer</span> with 
                    4.5 years of turning raw data into strategic gold. I don't just crunch numbers—I architect intelligence. From building AI-powered applications 
                    that think and learn, to designing dashboards that tell compelling stories, I bridge the gap between data chaos and business clarity. 
                    My superpower? Taking a SQL query, a Python script, and some caffeine, and transforming them into solutions that drive 
                    real impact: <span className="text-green-400 font-bold">+25% engagement</span>, <span className="text-orange-400 font-bold">+60% automation</span>, 
                    and <span className="text-cyan-400 font-bold">+30% data accuracy</span>. Currently exploring the bleeding edge where analytics meets artificial intelligence, 
                    one algorithm at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center text-white drop-shadow-lg">
              <span className="text-gray-400">//</span>{' '}
              <span className="text-cyan-400">Experience</span>
            </h2>
            
            <div className="space-y-6 md:space-y-8">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="group p-6 md:p-8 bg-black/40 backdrop-blur border-2 border-cyan-500/40 rounded-lg hover:border-cyan-400 transition-all shadow-xl"
                >
                  <div className="flex flex-wrap justify-between items-start mb-4 md:mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <GitBranch className="text-cyan-400" size={20} aria-hidden="true" />
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300">{exp.role}</h3>
                      </div>
                      <p className="text-lg sm:text-xl md:text-2xl text-white font-bold">{exp.company}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-green-400 font-bold font-mono text-sm md:text-base lg:text-lg">{exp.period}</p>
                      <p className="text-gray-300 text-sm md:text-base lg:text-lg">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3 text-gray-100 text-sm md:text-base lg:text-lg">
                        <Zap className="text-cyan-400 mt-1 flex-shrink-0" size={16} aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center text-white drop-shadow-lg">
              <span className="text-gray-400">//</span>{' '}
              <span className="text-cyan-400">Featured Projects</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 md:p-8 bg-black/40 backdrop-blur border-2 border-cyan-500/40 rounded-lg hover:border-cyan-400 transition-all hover:scale-[1.02] shadow-xl"
                >
                  <div className="mb-4 md:mb-6">
                    {project.icon}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-cyan-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-100 mb-4 md:mb-6 leading-relaxed text-sm md:text-base lg:text-lg">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 md:px-4 py-1 md:py-2 bg-cyan-500/20 border-2 border-cyan-500/50 rounded text-xs md:text-sm lg:text-base text-cyan-300 font-bold font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 bg-cyan-500/30 border-2 border-cyan-400 text-white rounded-lg hover:bg-cyan-500/40 transition-all font-bold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 bg-green-500/30 border-2 border-green-400 text-white rounded-lg hover:bg-green-500/40 transition-all font-bold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        <Github size={16} aria-hidden="true" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center text-white drop-shadow-lg">
              <span className="text-gray-400">{'<'}</span>
              <span className="text-cyan-400">skills</span>
              <span className="text-gray-400">{' />'}</span>
            </h2>

            <div className="mb-12 p-6 bg-black/50 backdrop-blur border-2 border-cyan-500/40 rounded-lg shadow-xl max-w-4xl mx-auto">
              <code className="text-white text-sm md:text-base block font-mono">
                <span className="text-purple-400">const</span> <span className="text-yellow-300">technicalStack</span> = {'{'}<br />
                &nbsp;&nbsp;<span className="text-cyan-300">focus</span>: <span className="text-green-300">"accuracy, scalability, decision impact"</span>,<br />
                &nbsp;&nbsp;<span className="text-cyan-300">approach</span>: <span className="text-green-300">"not just tools, but consistent value delivery"</span><br />
                {'};'}
              </code>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {skillsData.map((skill, idx) => {
                const colorClasses = getColorClasses(skill.color);
                return (
                  <div
                    key={idx}
                    className={`group p-6 md:p-8 bg-black/40 backdrop-blur border-2 ${colorClasses.border} rounded-lg ${colorClasses.hoverBorder} transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Terminal className={colorClasses.impact} size={24} aria-hidden="true" />
                      <h3 className={`text-xl md:text-2xl font-bold font-mono ${colorClasses.text}`}>
                        <span className="text-gray-400">{'// '}</span>{skill.title}
                      </h3>
                    </div>
                    
                    {skill.summary && (
                      <div className="mb-4 p-3 bg-black/30 rounded border-l-4 border-cyan-500/50">
                        <code className="text-gray-200 text-sm md:text-base">
                          <span className="text-purple-400">"""</span> {skill.summary} <span className="text-purple-400">"""</span>
                        </code>
                      </div>
                    )}
                    
                    <div className="mb-4 p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                      <code className="text-white text-sm md:text-base block font-mono">
                        <span className="text-yellow-300">skills</span> = [<br />
                        {skill.items.map((item, i) => (
                          <span key={i}>
                            &nbsp;&nbsp;<span className="text-green-300">"{item}"</span>
                            {i < skill.items.length - 1 ? ',' : ''}<br />
                          </span>
                        ))}
                        ]
                      </code>
                    </div>
                    
                    <div className={`mt-4 p-3 bg-black/30 rounded-lg border border-${skill.color}-500/30`}>
                      <code className={`${colorClasses.impact} font-bold text-sm md:text-base font-mono`}>
                        <span className="text-gray-400"># </span>{skill.impact}
                      </code>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-6 md:p-8 bg-black/50 backdrop-blur border-2 border-cyan-500/40 rounded-lg shadow-xl">
              <code className="text-white text-sm md:text-base lg:text-lg block font-mono">
                <span className="text-cyan-400">def</span> <span className="text-yellow-300">deliver_value</span>():<br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-300">"Clean code + Sharp insights + Measurable impact"</span>
              </code>
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg">
              <span className="text-gray-400">//</span>{' '}
              <span className="text-cyan-400">Get In Touch</span>
            </h2>
            
            <div className="mb-8 md:mb-12 p-6 md:p-8 bg-black/50 backdrop-blur border-2 border-cyan-500/40 rounded-lg shadow-2xl">
              <code className="text-white text-sm sm:text-base md:text-lg lg:text-xl">
                <span className="text-cyan-400">function</span>{' '}
                <span className="text-yellow-300">collaborate</span>() {'{'}<br />
                &nbsp;&nbsp;<span className="text-purple-300">return</span>{' '}
                <span className="text-green-300">"From data pipelines to GenAI apps — I build systems that think."</span>;<br />
                {'}'}
              </code>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center mb-8 md:mb-12">
              <a
                href="mailto:hemantsolanki333@gmail.com"
                className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-cyan-500/30 to-green-500/30 border-2 border-cyan-400 text-white rounded-lg hover:bg-cyan-500/40 transition-all text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono hover:scale-105 shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Mail size={20} aria-hidden="true" />
                <span className="break-all">hemantsolanki333@gmail.com</span>
              </a>
              <a
                href="tel:+918698834490"
                className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-4 md:py-5 bg-black/50 backdrop-blur border-2 border-green-500/50 text-white rounded-lg hover:bg-green-500/30 transition-all text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono hover:scale-105 shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <span aria-hidden="true">📞</span>
                +91 86988 34490
              </a>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <a 
                href="https://www.linkedin.com/in/hemant-solanki-366462199/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 md:p-5 bg-cyan-500/20 backdrop-blur border-2 border-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={28} className="text-cyan-400" aria-hidden="true" />
              </a>
              <a 
                href="https://github.com/earlywinter96" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 md:p-5 bg-green-500/20 backdrop-blur border-2 border-green-400 rounded-lg hover:bg-green-500/30 transition-all hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="GitHub profile"
              >
                <Github size={28} className="text-green-400" aria-hidden="true" />
              </a>
              <a 
                href="https://medium.com/@hemantsolanki333/about" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 md:p-5 bg-purple-500/20 backdrop-blur border-2 border-purple-400 rounded-lg hover:bg-purple-500/30 transition-all hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Medium blog"
              >
                <Globe size={28} className="text-purple-400" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative py-8 md:py-12 px-4 md:px-6 border-t-2 border-cyan-500/40 backdrop-blur bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-200 font-mono mb-2 text-sm md:text-base lg:text-lg">
            <span className="text-cyan-400">$</span> Built with React, Tailwind & passion for clean code
          </p>
          <p className="text-gray-300 text-xs md:text-sm lg:text-base font-mono">
            © 2025 Hemant Solanki • Mumbai, India • hemant@portfolio:~$
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .focus\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
    </div>
  );
};

export default CodePortfolio;