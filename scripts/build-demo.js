#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const root = path.join(__dirname, '..');
const modules = [
  { in: 'ios-frame.jsx', out: 'ios-frame.js', prelude: '' },
  { in: 'app-v2.jsx', out: 'app-v2.js', prelude: 'const IOSDevice = window.IOSDevice;\n' },
  { in: 'screens-v2.jsx', out: 'screens-v2.js', prelude: '' },
];

for (const mod of modules) {
  const srcPath = path.join(root, mod.in);
  const source = fs.readFileSync(srcPath, 'utf8');
  const { code } = babel.transformSync(source, {
    presets: ['@babel/preset-react'],
    filename: mod.in,
  });
  const wrapped = `(function () {\n'use strict';\n${mod.prelude}${code}\n})();\n`;
  const outPath = path.join(root, mod.out);
  fs.writeFileSync(outPath, wrapped, 'utf8');
  console.log('built', mod.out);
}
