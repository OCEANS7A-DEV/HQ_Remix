// server.js
const express = require('express');
const { createRequestHandler } = require('@remix-run/express');
const path = require('path');

const app = express();

// 必要な静的ファイルを提供
app.use(express.static(path.join(__dirname, 'public')));

// SSR用のハンドラを設定
app.all('*', (req, res) => {
  return createRequestHandler({
    getLoadContext() {
      // コンテキストが必要ならここで返す
    }
  })(req, res);
});

app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で動作しています');
});
