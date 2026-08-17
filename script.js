  const langButtons = document.querySelectorAll('.lang-toggle button');
  function setLang(lang){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n-en]').forEach(el=>{
      el.textContent = lang === 'en' ? el.dataset.i18nEn : el.dataset.i18nId;
    });
    langButtons.forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  }
  langButtons.forEach(b=>b.addEventListener('click', ()=>setLang(b.dataset.lang)));

  // ---------- circuit trace scroll signature ----------
  const nodes = document.querySelectorAll('.circuit .node');
  const segs = document.querySelectorAll('.circuit .seg');
  const sections = ['hero','projects','skills','stats','contact'].map(id=>{
    const el = id==='hero' ? document.querySelector('.hero') : document.getElementById(id);
    return {id, el};
  });
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const idx = sections.findIndex(s=>s.el===entry.target);
        nodes.forEach((n,i)=>n.classList.toggle('active', i<=idx));
        segs.forEach((s,i)=>s.classList.toggle('active', i<idx));
      }
    });
  }, {threshold:0.4});
  sections.forEach(s=> s.el && io.observe(s.el));

  // ---------- generative ambient music (Web Audio API, no external files) ----------
  let ctx, masterGain, playing = false, filterNode, lfo;
  const musicBtn = document.getElementById('musicBtn');

  function initAudio(){
    ctx = new (window.AudioContext||window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 900;
    filterNode.Q.value = 0.7;
    filterNode.connect(masterGain);
    masterGain.connect(ctx.destination);

    // slow LFO sweeping the filter for an ambient "breathing" pad
    lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.06;
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);
    lfo.start();

    // chord pad — a few detuned sine/triangle oscillators
    const chord = [130.81, 164.81, 196.00, 261.63]; // Cmin-ish pad
    chord.forEach((freq, i)=>{
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0.05;
      osc.connect(g);
      g.connect(filterNode);
      osc.start();
    });

    // soft arpeggio pluck, gently tied to scroll position
    const arpNotes = [523.25, 659.25, 783.99, 987.77];
    let arpIndex = 0;
    setInterval(()=>{
      if(!playing) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = arpNotes[arpIndex % arpNotes.length];
      arpIndex++;
      g.gain.value = 0;
      osc.connect(g);
      g.connect(filterNode);
      const now = ctx.currentTime;
      g.gain.linearRampToValueAtTime(0.035, now + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      osc.start(now);
      osc.stop(now + 1.7);
    }, 1400);
  }

  window.addEventListener('scroll', ()=>{
    if(!playing || !filterNode) return;
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    filterNode.frequency.setTargetAtTime(700 + pct*1400, ctx.currentTime, 0.4);
  });

  musicBtn.addEventListener('click', ()=>{
    if(!ctx) initAudio();
    if(ctx.state === 'suspended') ctx.resume();
    playing = !playing;
    masterGain.gain.setTargetAtTime(playing ? 0.55 : 0, ctx.currentTime, 0.6);
    musicBtn.classList.toggle('playing', playing);
  });

  // ---------- GitHub language stats (live, from api.github.com) ----------
  const GH_USER = 'syifarizkaangeli';
  const LANG_COLORS = {
    'PHP':'#7c5cff','JavaScript':'#f5c242','CSS':'#34d6c4','Python':'#5b8def',
    'HTML':'#ff6b81','TypeScript':'#3ecf8e','Java':'#e8813a','C++':'#c974e8',
    'Kotlin':'#a97bff','Blade':'#f97fb0', 'Jupyter Notebook':'#f0955e'
  };
  const FALLBACK_COLORS = ['#7c5cff','#34d6c4','#f5c242','#ff6b81','#5b8def','#a97bff'];

  async function loadGithubStats(){
    const legendEl = document.getElementById('langLegend');
    const ringEl = document.getElementById('donutRing');
    const repoCountEl = document.getElementById('statRepoCount');
    const topLangBig = document.getElementById('statTopLang');
    const donutTopPct = document.getElementById('donutTopPct');
    const donutTopLang = document.getElementById('donutTopLang');

    try{
      const repoRes = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100`);
      if(!repoRes.ok) throw new Error('repo fetch failed');
      const repos = await repoRes.json();
      const realRepos = repos.filter(r => !r.fork);
      repoCountEl.textContent = realRepos.length;

      const langResults = await Promise.all(
        realRepos.map(r =>
          fetch(r.languages_url).then(res => res.ok ? res.json() : {}).catch(()=>({}))
        )
      );

      const totals = {};
      langResults.forEach(langs=>{
        Object.entries(langs).forEach(([lang, bytes])=>{
          totals[lang] = (totals[lang]||0) + bytes;
        });
      });

      const totalBytes = Object.values(totals).reduce((a,b)=>a+b,0);
      if(totalBytes === 0) throw new Error('no language data');

      let sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
      const top = sorted.slice(0,6);
      const rest = sorted.slice(6).reduce((sum,[,v])=>sum+v,0);
      if(rest > 0) top.push(['Other', rest]);

      const segments = top.map(([lang, bytes], i)=>({
        lang, pct: (bytes/totalBytes*100),
        color: LANG_COLORS[lang] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]
      }));

      // build conic-gradient string
      let cursor = 0;
      const stops = segments.map(seg=>{
        const start = cursor;
        cursor += seg.pct;
        return `${seg.color} ${start}% ${cursor}%`;
      }).join(', ');
      ringEl.style.background = `conic-gradient(${stops})`;

      // legend
      legendEl.innerHTML = segments.map(seg=>`
        <div class="lang-row">
          <span class="dot" style="background:${seg.color}"></span>
          <span class="name">${seg.lang}</span>
          <span class="pct">${seg.pct.toFixed(1)}%</span>
        </div>
      `).join('');

      // center + side stat cards
      const topSeg = segments[0];
      donutTopPct.textContent = topSeg.pct.toFixed(0) + '%';
      donutTopLang.textContent = topSeg.lang;
      topLangBig.textContent = topSeg.lang;

    }catch(err){
      legendEl.innerHTML = `<div class="lang-loading" data-i18n-en="Couldn't load GitHub data right now — try refreshing." data-i18n-id="Data GitHub belum bisa dimuat — coba refresh halaman.">Data GitHub belum bisa dimuat — coba refresh halaman.</div>`;
      donutTopLang.textContent = 'N/A';
    }
  }
  loadGithubStats();
