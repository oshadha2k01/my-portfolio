"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub, FaJava, FaStar, FaBook, FaUsers, FaCodeBranch,
  FaExclamationCircle, FaExternalLinkAlt, FaHistory,
} from 'react-icons/fa';
import {
  SiJavascript, SiReact, SiRedux, SiNodedotjs, SiHtml5, SiCss3, SiMongodb,
  SiMysql, SiTailwindcss, SiPhp, SiBootstrap, SiFigma, SiTypescript,
  SiNextdotjs, SiPostman, SiGit, SiGithubactions, SiAmazonwebservices, SiPython,
} from "react-icons/si";

const GITHUB_USER = 'oshadha2k01';

const LANG_COLORS = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', HTML: '#E34F26',
  CSS: '#1572B6', Java: '#007396', PHP: '#777BB4', Python: '#3776AB',
  'C++': '#f34b7d', C: '#555555', 'C#': '#178600', Shell: '#89e051',
  Dart: '#00B4AB', Kotlin: '#A97BFF', Swift: '#F05138', Go: '#00ADD8',
  Rust: '#dea584', Ruby: '#701516', SCSS: '#c6538c', Vue: '#41b883',
};

const CIRCUMFERENCE = 2 * Math.PI * 15.9;

function calcGrade(stars, prs, issues, repos, followers) {
  const raw   = stars * 4 + prs * 3 + issues + repos * 0.5 + followers * 1.5;
  const score = Math.min(100, raw / 1.8);
  if (score >= 90) return { grade: 'S',  pct: 96 };
  if (score >= 75) return { grade: 'A+', pct: 85 };
  if (score >= 60) return { grade: 'A',  pct: 74 };
  if (score >= 45) return { grade: 'B+', pct: 62 };
  if (score >= 30) return { grade: 'B',  pct: 50 };
  if (score >= 15) return { grade: 'C+', pct: 37 };
  return { grade: 'C', pct: 22 };
}

export default function About() {
  const [githubStats, setGithubStats] = useState(null);
  const [topLanguages, setTopLanguages] = useState([]);
  const [loadingGH, setLoadingGH]       = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchGitHub() {
      /* ── Step 1: user profile (critical) ── */
      let user;
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal });
        if (!res.ok) throw new Error('user');
        user = await res.json();
      } catch {
        if (!signal.aborted) setLoadingGH(false);
        return;
      }

      /* ── Step 2: repos — stars + languages (non-fatal) ── */
      let stars = 0;
      let sortedLangs = [];
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
          { signal }
        );
        if (res.ok) {
          const repos = await res.json();
          if (Array.isArray(repos)) {
            stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
            const langCount = {};
            repos.forEach(r => {
              if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
            });
            sortedLangs = Object.entries(langCount)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([k]) => k);
          }
        }
      } catch { /* keep defaults */ }

      /* ── Step 3: show core stats immediately ── */
      if (!signal.aborted) {
        setGithubStats({
          repos:     user.public_repos ?? 0,
          followers: user.followers    ?? 0,
          stars,
          prs:     null,
          issues:  null,
          commits: null,
        });
        setTopLanguages(sortedLangs);
        setLoadingGH(false);
      }

      /* ── Step 4: PRs + issues via Search API (may be rate-limited) ── */
      try {
        const [prsRes, issuesRes] = await Promise.all([
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USER}+type:pr&per_page=1`, { signal }),
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USER}+type:issue&per_page=1`, { signal }),
        ]);
        const prsData   = prsRes.ok    ? await prsRes.json()    : {};
        const issueData = issuesRes.ok ? await issuesRes.json() : {};
        if (!signal.aborted) {
          setGithubStats(prev => prev && ({
            ...prev,
            prs:    prsData.total_count   ?? 'N/A',
            issues: issueData.total_count ?? 'N/A',
          }));
        }
      } catch { /* prs / issues stay null */ }

      /* ── Step 5: recent commits via Events API ── */
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`,
          { signal }
        );
        if (res.ok) {
          const events = await res.json();
          const commitCount = Array.isArray(events)
            ? events
                .filter(e => e.type === 'PushEvent')
                .reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0)
            : 0;
          if (!signal.aborted) {
            setGithubStats(prev => prev && ({ ...prev, commits: commitCount }));
          }
        }
      } catch { /* commits stays null */ }
    }

    fetchGitHub();
    return () => controller.abort();
  }, []);

  /* ── helpers ── */
  const fmt = val => (val === null || val === undefined) ? '…' : val;

  const { grade, pct } = githubStats
    ? calcGrade(
        githubStats.stars   || 0,
        typeof githubStats.prs    === 'number' ? githubStats.prs    : 0,
        typeof githubStats.issues === 'number' ? githubStats.issues : 0,
        githubStats.repos   || 0,
        githubStats.followers || 0,
      )
    : { grade: '—', pct: 0 };

  const dashOffset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  const statRows = githubStats ? [
    { icon: FaHistory,            label: 'Recent Commits',     value: fmt(githubStats.commits)   },
    { icon: FaStar,               label: 'Total Stars Earned', value: fmt(githubStats.stars)     },
    { icon: FaCodeBranch,         label: 'Total PRs',          value: fmt(githubStats.prs)       },
    { icon: FaExclamationCircle,  label: 'Total Issues',       value: fmt(githubStats.issues)    },
    { icon: FaBook,               label: 'Repositories',       value: fmt(githubStats.repos)     },
    { icon: FaUsers,              label: 'Followers',          value: fmt(githubStats.followers) },
  ] : [];

  /* ── skill categories ── */
  const skillCategories = [
    {
      label: 'Frontend', color: 'text-white',
      skills: [
        { name: 'HTML5',        icon: SiHtml5,       color: '#E34F26' },
        { name: 'CSS3',         icon: SiCss3,        color: '#1572B6' },
        { name: 'JavaScript',   icon: SiJavascript,  color: '#F7DF1E' },
        { name: 'TypeScript',   icon: SiTypescript,  color: '#3178C6' },
        { name: 'React',        icon: SiReact,       color: '#61DAFB' },
        { name: 'Redux',        icon: SiRedux,       color: '#764ABC' },
        { name: 'Next.js',      icon: SiNextdotjs,   color: '#a3a3a3' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Bootstrap',    icon: SiBootstrap,   color: '#7952B3' },
      ],
    },
    {
      label: 'Backend', color: 'text-white',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'PHP',     icon: SiPhp,       color: '#777BB4' },
        { name: 'Java',    icon: FaJava,      color: '#007396' },
      ],
    },
    {
      label: 'Database', color: 'text-white',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'MySQL',   icon: SiMysql,   color: '#4479A1' },
      ],
    },
    {
      label: 'DevOps & Cloud', color: 'text-white',
      skills: [
        { name: 'Git',    icon: SiGit,               color: '#F05032' },
        { name: 'CI/CD',  icon: SiGithubactions,      color: '#2088FF' },
        { name: 'AWS',    icon: SiAmazonwebservices,  color: '#FF9900' },
        { name: 'Python', icon: SiPython,             color: '#3776AB' },
      ],
    },
    {
      label: 'Tools', color: 'text-white',
      skills: [
        { name: 'Figma',   icon: SiFigma,   color: '#F24E1E' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      ],
    },
  ];

  return (
    <section className="py-14 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-blue-400">Me</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-10 mb-8">

          {/* Who I Am */}
          <motion.div
            className="bg-gray-800 rounded-xl p-6 shadow-lg lg:w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="text-base text-gray-300 leading-relaxed">
              <span className="font-semibold text-white">Motivated Final Year Undergraduate</span> with{' '}
              <span className="font-semibold text-white">internship experience</span> designing and
              developing robust applications using{' '}
              <span className="text-blue-300 font-medium">full-stack web technologies</span>,{' '}
              <span className="text-blue-300 font-medium">cloud computing</span>, and{' '}
              <span className="text-blue-300 font-medium">scalable architecture</span>. Passionate
              about solving complex problems through clean, maintainable code, and eager to drive
              projects as a{' '}
              <span className="font-semibold text-white">Software Engineer</span>.
            </p>
          </motion.div>

          {/* My Skills */}
          <motion.div
            className="bg-gray-800 rounded-xl p-6 shadow-lg lg:w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-5">My Skills</h3>
            <div className="space-y-4">
              {skillCategories.map((cat) => (
                <div key={cat.label}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-px flex-1 bg-gray-700/60" />
                    <span className={`text-xs font-semibold uppercase tracking-widest ${cat.color}`}>
                      {cat.label}
                    </span>
                    <span className="h-px flex-1 bg-gray-700/60" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg px-3 py-2.5 border border-gray-600/30 transition-colors cursor-default"
                      >
                        <skill.icon size={17} color={skill.color} />
                        <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GitHub Stats */}
        <motion.div
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Card header */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 mb-5">
            <div className="flex items-center gap-2">
              <FaGithub className="text-xl text-gray-300" />
              <h3 className="text-xl sm:text-2xl font-semibold">
                <span className="text-blue-400">Oshadha&rsquo;s</span> GitHub Stats
              </h3>
            </div>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Profile <FaExternalLinkAlt size={11} />
            </a>
          </div>

          {loadingGH ? (
            <div className="flex justify-center py-8">
              <div role="status" aria-label="Loading GitHub stats" className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : githubStats ? (
            <>
              <div className="flex flex-col sm:flex-row gap-6 items-center">

                {/* Stats list */}
                <div className="flex-1 w-full space-y-2.5">
                  {statRows.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 bg-gray-700/40 rounded-lg px-4 py-2.5 border border-gray-600/30"
                    >
                      <Icon className="text-gray-400 flex-shrink-0" size={14} aria-hidden="true" />
                      <span className="text-sm text-gray-300">{label}</span>
                      <span className="text-sm font-bold text-white ml-auto tabular-nums">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Grade badge */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="relative w-28 h-28">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90" role="img" aria-label={`GitHub rank: ${grade}`}>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#374151" strokeWidth="2.8" />
                      <circle
                        cx="18" cy="18" r="15.9"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={dashOffset}
                        style={{ transition: 'stroke-dashoffset 1.2s ease' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white leading-none">{grade}</span>
                      <span className="text-xs text-gray-400 mt-1">Rank</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 text-center">Based on public activity</span>
                </div>
              </div>

              {/* Top Languages */}
              {topLanguages.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-px flex-1 bg-gray-700/60" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Top Languages
                    </span>
                    <span className="h-px flex-1 bg-gray-700/60" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topLanguages.map(lang => (
                      <span
                        key={lang}
                        className="flex items-center gap-1.5 bg-gray-700/60 rounded-md px-2.5 py-1.5 text-xs text-gray-300 border border-gray-600/40"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: LANG_COLORS[lang] || '#6b7280' }}
                        />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">Could not load GitHub stats.</p>
          )}
        </motion.div>

      </div>
    </section>
  );
}
