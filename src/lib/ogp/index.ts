import { loadDefaultJapaneseParser } from 'budoux';
import * as fs from 'fs';
import { initialize, svg2png } from 'svg2png-wasm';
const parser = loadDefaultJapaneseParser();

type Word = { text: string; width: number };

/**
 * 文字列の幅を計測する
 */
const measure = (text: string) => {
  return [...text]
    .map((c) => {
      // 半角文字(英数字など)
      if (c.match(/[\u0020-\u00ff]/)) return 0.75;
      // 半角カタカナ
      if (c.match(/[\uFF61-\uFF9F]/)) return 0.75;
      // その他の全角文字
      return 1;
    })
    .reduce((a, b) => a + b, 0);
};
const calcWrappableWords = (text: string): Word[] => {
  return parser.parse(text).map((word) => {
    return { text: word, width: measure(word) };
  });
};
/**
 * 文字列を指定した幅で折り返す
 */
const wrap = (words: Word[], width: number) => {
  const lines = [];
  const state = { line: '', lineWidth: 0 };
  for (const word of words) {
    if (state.lineWidth + word.width > width) {
      lines.push(state.line);
      state.line = '';
      state.lineWidth = 0;
    }
    state.line += word.text;
    state.lineWidth += word.width;
  }
  return [...lines, state.line].filter((ln) => ln !== '');
};

const escape = (text: string) => {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
};

export const makeOgpImage = async (title: string) => {
  const wasm = fs.readFileSync(
    './node_modules/svg2png-wasm/svg2png_wasm_bg.wasm',
  );
  const font = fs.readFileSync('./src/lib/ogp/BIZUDPMincho-Bold.ttf');
  await initialize(wasm).catch(() => undefined);
  const width = 1200;
  const height = 630;
  const xPadding = width / 20;
  const yPadding = height / 5;
  const words = calcWrappableWords(title);
  let i = 15;
  let fontSize = width / i;
  let lines = wrap(words, (width - xPadding * 2) / fontSize);
  while ((lines.length + 1) * fontSize > height - yPadding * 2) {
    i++;
    fontSize = width / i;
    lines = wrap(words, (width - xPadding * 2) / fontSize);
  }
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="Gradient2" x1="0" x2="1" y1="0" y2="0.5">
          <stop offset="0%" stop-color="#efefe5" />
          <stop offset="100%" stop-color="#e5e5e0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#Gradient2)" />
      ${lines
        .map((ln, i) => {
          return `<text
            x="${xPadding}"
            y="${yPadding + fontSize * 1.1 * (i + 1)}"
            font-size="${fontSize}"
          >${escape(ln)}</text>`;
        })
        .join('')}
    </svg>
  `;
  const pngBuffer = await svg2png(svg, {
    fonts: [font],
  });
  return pngBuffer;
};
