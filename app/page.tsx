'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  Code, 
  Download, 
  ExternalLink,
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  ChevronDown,
  Menu,
  X,
  Terminal,
  Database,
  Server,
  Globe,
  Zap,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

const skills = [
  { name: 'JavaScript (ES6+)', level: 98, icon: '🟨' },
  { name: 'TypeScript', level: 95, icon: '🔷' },
  { name: 'React.js', level: 98, icon: '⚛️' },
  { name: 'Next.js', level: 95, icon: '▲' },
  { name: 'Node.js', level: 98, icon: '🟢' },
  { name: 'Express.js', level: 95, icon: '🚀' },
  { name: 'NestJS', level: 90, icon: '🐱' },
  { name: 'MongoDB', level: 95, icon: '🍃' },
  { name: 'PostgreSQL', level: 92, icon: '🐘' },
  { name: 'GraphQL', level: 90, icon: '🔗' },
  { name: 'AWS', level: 88, icon: '☁️' },
  { name: 'Docker', level: 90, icon: '🐳' }
];

const experiences = [
  {
    title: 'Senior Full Stack Engineer',
    company: 'Keyhole (Remote)',
    period: 'Dec 2021 - Present',
    description: 'Keyhole is a matchmaking platform for high-performance global talent.',
    achievements: [
      'Lead development of the social media analytics platform, powering real‑time insights across Instagram, Twitter/X, Facebook, TikTok, YouTube, blogs, and forums.',
      'Designed backend services and dashboards using CakePHP for robust content, tracker and campaign management systems.',
      'Developed microservices and RESTful APIs in Node.js—leveraging Express.js and NestJS frameworks—to aggregate, filter, and serve live metadata.',
      'Front‑end driven by React, delivering interactive charts (reach, engagement, sentiment, share‑of‑voice), post streams, and media walls.',
      'Actively participating in client meetings to understand requirements and provide technical insights, strengthening client relationships.',
      'Coordinated inter‑service communication via Node.js services and CakePHP modules (e.g. real‑time event flows using web sockets or server push logic).'
    ],
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: 'Senior Software Engineer',
    company: 'PwC (Remote)',
    period: 'Apr 2020 - Oct 2021',
    description: 'PwC is a robust Hiring solution, enhancing enterprise experiences',
    achievements: [
      'Led development of core platform features used by Fortune 500 companies',
      'Implemented advanced performance optimizations reducing load times by 50%',
      'Collaborated with product teams to deliver solutions aligned with business objectives',
      'Established automated testing frameworks improving code quality and reliability',
      'Mentored team members on best practices and modern development methodologies'
    ],
    icon: <Server className="w-6 h-6" />
  },
  {
    title: 'Software Engineer',
    company: 'innRoad (Remote)',
    period: 'Sep 2018 - Sept 2020',
    description: 'Technology & Digital solutions provider connecting businesses with software development expertise',
    achievements: [
      'Developed scalable web applications serving thousands of concurrent users',
      'Built efficient data processing systems with automated workflows',
      'Created robust database architectures for high-performance data management',
      'Implemented RESTful APIs with comprehensive documentation and testing',
      'Delivered projects on time while maintaining high code quality standards'
    ],
    icon: <Code className="w-6 h-6" />
  }
];

const projects = [
  {
    title: '3 Lane Marketing',
    url: 'https://www.3lanemarketing.com/',
    description: 'A premium marketing agency excelling in branding, strategy, design, and tech expertise.',
    tech: ['Next.js', 'WordPress', 'Apollo Client', 'GraphQL'],
    achievement: 'Achieved 95+ PageSpeed score by integrating Next.js with headless WordPress',
    icon: <Globe className="w-8 h-8" />
  },
  {
    title: 'Keyhole',
    url: 'https://keyhole.co/',
    description: 'Social media insights platform empowering brands and agencies to monitor online presence.',
    tech: ['React.js', 'Node.js', 'Express.js', 'CakePHP', 'NestJS', 'MySQL'],
    achievement: 'Built comprehensive analytics platform processing millions of social media data points',
    icon: <Database className="w-8 h-8" />
  },
  {
    title: 'Talkspresso',
    url: 'https://talkspresso.com/',
    description: 'Platform letting providers create unique handles and profiles with AI-powered service generation.',
    tech: ['React.js', 'Node.js', 'AI Integration', 'PostgreSQL'],
    achievement: 'Developed AI-powered booking platform with real-time service generation capabilities',
    icon: <Terminal className="w-8 h-8" />
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white'
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900';

  const cardClasses = isDarkMode
    ? 'bg-white/5 backdrop-blur-xl border-white/10'
    : 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-lg';

  const textClasses = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const headingClasses = isDarkMode ? 'text-white' : 'text-gray-900';

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/nabeel-full-stack-cv.pdf'; 
    link.download = 'Nabeel_Amjad_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 transform-gpu z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-xl ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'} border-b z-40`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Nabeel Ahmad
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center space-x-8"
            >
              {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors hover:text-emerald-400 ${
                    activeSection === item.toLowerCase() ? 'text-emerald-400' : textClasses
                  }`}
                >
                  {item}
                </motion.button>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-yellow-400' 
                    : 'bg-gray-200/50 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <motion.button 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadCV}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2 rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/25 text-white"
              >
                <Download size={16} />
                Download CV
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-yellow-400' 
                    : 'bg-gray-200/50 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 hover:text-emerald-400 transition-colors"
                >
                  {item}
                </motion.button>
              ))}
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={downloadCV}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2 rounded-full w-full flex items-center justify-center gap-2 text-white"
              >
                <Download size={16} />
                Download CV
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            {...floatingAnimation}
            className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            {...floatingAnimation}
            transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 flex justify-center"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl backdrop-blur-sm border border-emerald-500/20"
              >
                <Terminal className="w-12 h-12 text-emerald-400" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Nabeel Ahmad
              </span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`text-2xl md:text-3xl font-light mb-4 ${textClasses}`}
            >
              Senior Full Stack Engineer
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-emerald-400"
              >
                <Layers className="w-4 h-4" />
                <span className="text-sm font-medium">6+ Years Experience</span>
              </motion.div>
              <span className={`${textClasses} opacity-50`}>•</span>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-cyan-400"
              >
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Senior MERN Expert</span>
              </motion.div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className={`text-lg md:text-xl ${textClasses} mb-12 max-w-4xl mx-auto leading-relaxed`}
            >
              Senior full-stack engineer with extensive expertise in architecting and developing enterprise-scale web applications. 
              Specialized in MERN stack with a proven track record of leading teams and delivering high-performance solutions 
              that drive business growth and enhance user experiences across multiple industries.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.button
                {...scaleOnHover}
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 text-white"
              >
                View My Work
              </motion.button>
              <motion.button
                {...scaleOnHover}
                onClick={() => scrollToSection('contact')}
                className={`border border-emerald-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-400/10 transition-all duration-300 backdrop-blur-sm ${headingClasses}`}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Arrow Down Button */}
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer hover:text-emerald-400 transition-colors mb-8"
        >
          <ChevronDown size={32} className={textClasses} />
        </motion.button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <motion.h2 
              {...fadeInUp}
              className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className={`${cardClasses} rounded-2xl p-8 border shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500`}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  {...fadeInLeft}
                  transition={{ delay: 0.4 }}
                >
                  <p className={`text-lg ${textClasses} leading-relaxed mb-6`}>
                    As a Senior Full Stack Engineer with 6+ years of experience, I have a proven history of architecting, 
                    developing, and deploying enterprise-scale web applications. I excel in leading development teams, 
                    mentoring junior developers, and delivering solutions that serve hundreds of thousands of users.
                  </p>
                  <p className={`text-lg ${textClasses} leading-relaxed`}>
                    Expert in both enterprise and startup environments, I bring innovative problem-solving skills and 
                    technical leadership to deliver high-quality solutions. Committed to staying ahead in the tech landscape, 
                    I am dedicated to creating impactful user experiences and scalable architectures.
                  </p>
                </motion.div>
                <motion.div 
                  {...fadeInRight}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  {[
                    { icon: Award, text: "6+ Years Senior Experience", color: "emerald" },
                    { icon: Building, text: "Enterprise & Startup Leader", color: "cyan" },
                    { icon: GraduationCap, text: "Computer Science Graduate", color: "blue" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex items-center gap-3 p-3 bg-${item.color}-500/10 rounded-lg border border-${item.color}-500/20 cursor-pointer`}
                    >
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                      <span className={textClasses}>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Professional Experience
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${cardClasses} rounded-2xl p-8 border hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-emerald-500/10`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl"
                    >
                      {exp.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-400 mb-2">{exp.title}</h3>
                      <div className={`flex items-center ${textClasses} mb-2`}>
                        <Building size={16} className="mr-2" />
                        {exp.company}
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center ${textClasses} ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/80'} px-4 py-2 rounded-full`}
                  >
                    <Calendar size={16} className="mr-2" />
                    {exp.period}
                  </motion.div>
                </div>
                
                <p className={`${textClasses} mb-6 italic`}>{exp.description}</p>
                
                <motion.ul 
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  {exp.achievements.map((achievement, i) => (
                    <motion.li 
                      key={i}
                      variants={fadeInLeft}
                      whileHover={{ x: 5 }}
                      className={`flex items-start ${textClasses}`}
                    >
                      <span className="text-emerald-400 mr-3 mt-1 text-lg">▸</span>
                      {achievement}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${cardClasses} rounded-xl p-6 border hover:border-emerald-400/30 transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.span 
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl"
                    >
                      {skill.icon}
                    </motion.span>
                    <span className={`text-lg font-semibold ${headingClasses}`}>{skill.name}</span>
                  </div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-emerald-400 font-bold"
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'} rounded-full h-3 overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full shadow-lg shadow-emerald-500/50"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`${cardClasses} rounded-2xl p-6 border hover:border-emerald-400/30 transition-all duration-300 group shadow-xl hover:shadow-emerald-500/10 cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl"
                  >
                    {project.icon}
                  </motion.div>
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${textClasses} hover:text-emerald-400 transition-colors p-2 hover:bg-emerald-400/10 rounded-lg`}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
                
                <h3 className="text-xl font-bold text-emerald-400 mb-3">{project.title}</h3>
                <p className={`${textClasses} mb-4 text-sm leading-relaxed`}>{project.description}</p>
                
                <motion.div 
                  variants={staggerContainer}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        isDarkMode 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                      }`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                
                <p className={`text-xs ${textClasses} italic`}>{project.achievement}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 
              {...fadeInUp}
              className="text-4xl font-bold mb-12 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Let's Work Together
            </motion.h2>
            
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className={`${cardClasses} rounded-2xl p-8 border shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500`}
            >
              <p className={`text-lg ${textClasses} mb-8`}>
                Ready to bring your next project to life? Let's discuss how we can create something amazing together.
              </p>
              
              <motion.div 
                variants={staggerContainer}
                whileInView="animate"
                initial="initial"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                {[
                  { icon: Phone, text: "+923558374017", color: "emerald", href: "tel:+923558374017" },
                  { icon: Mail, text: "nabeel.dev.eng@gmail.com", color: "cyan", href: "mailto:nabeel.dev.eng@gmail.com" },
                  { icon: MapPin, text: "Lahore, Pakistan", color: "blue", href: "#" }
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`flex items-center justify-center space-x-3 ${textClasses} p-4 bg-${contact.color}-500/10 rounded-xl border border-${contact.color}-500/20 hover:bg-${contact.color}-500/20 transition-all duration-300 cursor-pointer`}
                  >
                    <contact.icon size={20} className={`text-${contact.color}-400`} />
                    <span>{contact.text}</span>
                  </motion.a>
                ))}
              </motion.div>
              
              <motion.div 
                variants={staggerContainer}
                whileInView="animate"
                initial="initial"
                viewport={{ once: true }}
                className="flex justify-center space-x-6"
              >
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/nabeelamjaddev/", color: "from-blue-600 to-blue-700", hoverColor: "hover:from-blue-700 hover:to-blue-800" },
                  { icon: Mail, href: "mailto:nabeel.dev.eng@gmail.com", color: "from-emerald-600 to-emerald-700", hoverColor: "hover:from-emerald-700 hover:to-emerald-800" },
                  { icon: Phone, href: "tel:+923558374017", color: "from-cyan-600 to-cyan-700", hoverColor: "hover:from-cyan-700 hover:to-cyan-800" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${social.color} p-4 rounded-full ${social.hoverColor} transition-all duration-300 shadow-lg`}
                  >
                    <social.icon size={24} className="text-white" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`${isDarkMode ? 'bg-black/20 border-white/10' : 'bg-gray-100/50 border-gray-200/50'} border-t py-8 px-6`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={textClasses}
          >
            © 2025 Nabeel Ahmad. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}