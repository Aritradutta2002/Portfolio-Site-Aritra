import type { CSSProperties } from "react";

type VisualKind =
  | "architecture"
  | "sorting"
  | "huffman"
  | "heatmap"
  | "chat"
  | "editor";

const VISUALS: Record<string, VisualKind> = {
  "microservices-modernization": "architecture",
  "algorithm-visualizer": "sorting",
  huffzip: "huffman",
  "leetcode-vault": "heatmap",
  "chatgpt-studio": "chat",
};

const BAR_HEIGHTS = [38, 62, 45, 78, 55, 90, 48, 70, 35, 84, 60, 95, 52, 72, 42];
const HEAT_LEVELS = [
  0, 1, 0, 2, 3, 1, 0, 1, 2, 4, 1, 0, 2, 1, 3, 0,
  1, 2, 3, 1, 0, 2, 4, 3, 1, 0, 1, 2, 2, 3, 1, 0,
  0, 1, 2, 4, 3, 2, 1, 0, 1, 2, 0, 1, 3, 4, 2, 1,
  2, 3, 1, 0, 2, 1, 3, 2, 4, 1, 0, 2, 1, 0, 2, 3,
  1, 0, 2, 3, 4, 2, 1, 0, 1, 2, 3, 1, 0, 2, 4, 1,
  0, 2, 1, 3, 2, 0, 1, 4, 2, 1, 0, 2, 3, 1, 0, 1,
  2, 1, 3, 0, 1, 2, 4, 2, 1, 0, 2, 1, 3, 0, 1, 2,
];

function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 320 190" className="zro-vis-svg" role="presentation">
      <g className="zro-vis-lines" fill="none">
        <path d="M160 38 L68 82" />
        <path d="M160 38 L252 82" />
        <path d="M68 82 L104 142" />
        <path d="M68 82 L216 142" />
        <path d="M252 82 L216 142" />
        <path d="M252 82 L104 142" className="zro-vis-line-dash" />
      </g>
      <g className="zro-vis-nodes">
        <g transform="translate(160 32)">
          <rect x="-27" y="-11" width="54" height="22" />
          <text y="3.5">API</text>
        </g>
        <g transform="translate(68 82)">
          <rect x="-30" y="-11" width="60" height="22" />
          <text y="3.5">AUTH</text>
        </g>
        <g transform="translate(252 82)">
          <rect x="-30" y="-11" width="60" height="22" />
          <text y="3.5">AZURE</text>
        </g>
        <g transform="translate(104 146)">
          <rect x="-31" y="-11" width="62" height="22" />
          <text y="3.5">FLEET</text>
        </g>
        <g transform="translate(216 146)">
          <rect x="-31" y="-11" width="62" height="22" />
          <text y="3.5">REPORT</text>
        </g>
      </g>
      <circle className="zro-vis-packet" r="2.4">
        <animateMotion dur="4.2s" repeatCount="indefinite" path="M160 38 L68 82 L104 142" />
      </circle>
      <circle className="zro-vis-packet zro-vis-packet--slow" r="2.2">
        <animateMotion dur="5.4s" repeatCount="indefinite" path="M252 82 L216 142" />
      </circle>
    </svg>
  );
}

function SortingVisual() {
  return (
    <div className="zro-vis-bars">
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={`${height}-${index}`}
          style={
            {
              "--bar-h": `${height}%`,
              "--bar-i": index,
            } as CSSProperties
          }
        />
      ))}
      <span className="zro-vis-scan" />
    </div>
  );
}

function HuffmanVisual() {
  return (
    <svg viewBox="0 0 320 190" className="zro-vis-svg" role="presentation">
      <g className="zro-vis-tree-lines" fill="none">
        <path d="M160 28 L94 78" />
        <path d="M160 28 L226 78" />
        <path d="M94 78 L56 132" />
        <path d="M94 78 L132 132" />
        <path d="M226 78 L194 132" />
        <path d="M226 78 L264 132" />
      </g>
      <g className="zro-vis-tree">
        <g transform="translate(160 28)">
          <circle r="15" />
          <text y="3.5">15</text>
        </g>
        <g transform="translate(94 78)">
          <circle r="14" />
          <text y="3.5">9</text>
        </g>
        <g transform="translate(226 78)">
          <circle r="14" />
          <text y="3.5">6</text>
        </g>
        <g transform="translate(56 132)">
          <circle r="12" />
          <text y="3.5">4</text>
        </g>
        <g transform="translate(132 132)">
          <circle r="12" />
          <text y="3.5">5</text>
        </g>
        <g transform="translate(194 132)">
          <circle r="12" />
          <text y="3.5">3</text>
        </g>
        <g transform="translate(264 132)">
          <circle r="12" />
          <text y="3.5">3</text>
        </g>
      </g>
      <g className="zro-vis-bits">
        <text x="90" y="62">0</text>
        <text x="220" y="62">1</text>
        <text x="50" y="114">00</text>
        <text x="126" y="114">01</text>
        <text x="188" y="114">10</text>
        <text x="258" y="114">11</text>
      </g>
    </svg>
  );
}

function HeatmapVisual() {
  return (
    <div className="zro-vis-heat-wrap">
      <div className="zro-vis-heat" role="presentation">
        {HEAT_LEVELS.map((level, index) => (
          <span
            key={index}
            data-level={level}
            style={{ "--cell-i": index } as CSSProperties}
          />
        ))}
      </div>
      <div className="zro-vis-heat-meta">
        <span>
          <strong>700+</strong> solved
        </span>
        <span>
          <strong>1672</strong> LeetCode
        </span>
        <span>
          <strong>3★</strong> CodeChef
        </span>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="zro-vis-chat">
      <div className="zro-vis-bubble zro-vis-bubble--user">
        Explain the time complexity of merge sort.
      </div>
      <div className="zro-vis-bubble zro-vis-bubble--ai">
        <span className="zro-vis-ai-label">GPT-4</span>
        Merge sort runs in <strong>O(n log n)</strong> time — the merge step
        dominates at each level.
        <span className="zro-vis-typing" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="zro-vis-sliders" aria-hidden="true">
        <span>
          <i style={{ width: "64%" }} />
        </span>
        <span>
          <i style={{ width: "38%" }} />
        </span>
      </div>
    </div>
  );
}

function EditorVisual() {
  const lines = [
    { indent: 0, widths: [42, 68, 34] },
    { indent: 1, widths: [58, 26] },
    { indent: 2, widths: [30, 74, 20] },
    { indent: 1, widths: [48, 36] },
    { indent: 0, widths: [22] },
  ];
  return (
    <div className="zro-vis-editor">
      {lines.map((line, index) => (
        <div key={index} className="zro-vis-code-line" style={{ paddingLeft: `${line.indent * 14}px` }}>
          <span className="zro-vis-code-num">{index + 1}</span>
          {line.widths.map((width, tokenIndex) => (
            <i
              key={tokenIndex}
              data-token={(index + tokenIndex) % 4}
              style={{ width: `${width}px` }}
            />
          ))}
        </div>
      ))}
      <span className="zro-vis-caret" />
    </div>
  );
}

const LABELS: Record<VisualKind, string> = {
  architecture: "Service topology",
  sorting: "60 fps canvas",
  huffman: "O(N log N)",
  heatmap: "700+ solutions",
  chat: "GPT-4 API",
  editor: "Production code",
};

export function ProjectVisual({ id }: { id: string }) {
  const kind = VISUALS[id] ?? "editor";

  return (
    <div className="zro-vis" data-kind={kind} aria-hidden="true">
      <span className="zro-vis-grid" />
      <span className="zro-vis-badge zro-metric">{LABELS[kind]}</span>
      <div className="zro-vis-stage">
        {kind === "architecture" && <ArchitectureVisual />}
        {kind === "sorting" && <SortingVisual />}
        {kind === "huffman" && <HuffmanVisual />}
        {kind === "heatmap" && <HeatmapVisual />}
        {kind === "chat" && <ChatVisual />}
        {kind === "editor" && <EditorVisual />}
      </div>
    </div>
  );
}
