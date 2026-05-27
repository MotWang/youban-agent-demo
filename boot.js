/**
 * Sequential JSX loader for static hosting (GitHub Pages).
 * External type="text/babel" src=… is unreliable; fetch + transform + run instead.
 */
(async function bootYouBanDemo() {
  const fallback = document.getElementById('boot-fallback');
  const show = (msg) => {
    if (fallback) {
      fallback.style.display = 'block';
      fallback.textContent = msg;
    }
  };

  if (!window.React || !window.ReactDOM) {
    show('React 未加载，请检查网络后刷新。');
    return;
  }
  if (!window.Babel) {
    show('Babel 未加载，请检查网络后刷新。');
    return;
  }
  if (!window.YOUBAN_DATA) {
    show('演示数据未加载。');
    return;
  }

  const modules = ['ios-frame.jsx', 'app-v2.jsx', 'screens-v2.jsx'];

  try {
    for (const file of modules) {
      const res = await fetch(file, { cache: 'no-store' });
      if (!res.ok) throw new Error(`${file} (${res.status})`);
      const source = await res.text();
      const compiled = Babel.transform(source, { presets: ['react'] }).code;
      const tag = document.createElement('script');
      tag.text = compiled;
      document.body.appendChild(tag);
    }

    if (!window.V2?.V2App || !window.SCREENS) {
      throw new Error('应用组件未就绪');
    }

    if (fallback) fallback.style.display = 'none';
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(window.V2.V2App));
  } catch (err) {
    console.error('[YouBan boot]', err);
    show(`演示加载失败：${err.message || err}`);
  }
})();
