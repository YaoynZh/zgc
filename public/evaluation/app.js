
(() => {
  const clean = document.getElementById('clean-video');
  const threat = document.getElementById('threat-video');
  const syncToggle = document.getElementById('sync-toggle');
  if (clean && threat && syncToggle) {
    let lock = false;
    const align = (source, target) => {
      if (lock || Math.abs(source.currentTime - target.currentTime) < 0.08) return;
      lock = true;
      target.currentTime = source.currentTime;
      lock = false;
    };
    clean.addEventListener('seeked', () => align(clean, threat));
    threat.addEventListener('seeked', () => align(threat, clean));
    syncToggle.addEventListener('click', async () => {
      if (!clean.paused || !threat.paused) {
        clean.pause();
        threat.pause();
        syncToggle.textContent = '同步播放';
        return;
      }
      const time = Math.min(clean.currentTime, threat.currentTime);
      clean.currentTime = time;
      threat.currentTime = time;
      await Promise.allSettled([clean.play(), threat.play()]);
      syncToggle.textContent = '同步暂停';
    });
    [clean, threat].forEach(video => video.addEventListener('ended', () => {
      clean.pause();
      threat.pause();
      syncToggle.textContent = '同步播放';
    }));
  }

  const tabs = [...document.querySelectorAll('[role="tab"][data-tab]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"][data-panel]')];
  if (!tabs.length) return;
  const activate = (tabId, updateHash = true) => {
    if (!tabs.some(tab => tab.dataset.tab === tabId)) tabId = tabs[0].dataset.tab;
    tabs.forEach(tab => {
      const selected = tab.dataset.tab === tabId;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== tabId; });
    if (updateHash) history.replaceState(null, '', `#${tabId}`);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(tabs[next].dataset.tab);
      tabs[next].focus();
    });
  });
  const requested = location.hash.slice(1);
  activate(requested || 'overview', false);
})();
