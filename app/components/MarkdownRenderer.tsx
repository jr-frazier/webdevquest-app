import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import {JSX} from "react";

interface MarkdownRendererProps {
  content: string;
}

function highlightCode(code: string, language: string): JSX.Element[] {
  const lines = code.split('\n');

  return lines.map((line, index) => {
    const tokens: JSX.Element[] = [];
    let remaining = line;
    let tokenIndex = 0;

    // Simple regex patterns for common syntax elements
    const patterns = [
      { regex: /(\/\/.*$)/, className: 'text-green-500' }, // Comments
      { regex: /(\/\*[\s\S]*?\*\/)/, className: 'text-green-500' }, // Block comments
      { regex: /(['"`].*?['"`])/, className: 'text-yellow-400' }, // Strings
      { regex: /\b(function|const|let|var|return|if|else|for|while|class|import|export|from|default|interface|type)\b/, className: 'text-purple-400' }, // Keywords
      { regex: /\b(\d+)\b/, className: 'text-blue-400' }, // Numbers
      { regex: /\b(true|false|null|undefined)\b/, className: 'text-orange-400' }, // Constants
    ];

    while (remaining.length > 0) {
      let matched = false;

      for (const { regex, className } of patterns) {
        const match = remaining.match(regex);
        if (match && match.index === 0) {
          tokens.push(
            <span key={tokenIndex++} className={className}>
              {match[0]}
            </span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        // No pattern matched, add the next character as plain text
        tokens.push(<span key={tokenIndex++}>{remaining[0]}</span>);
        remaining = remaining.slice(1);
      }
    }

    return (
      <pre key={index} data-prefix={index + 1}>
        <code>{tokens.length > 0 ? tokens : line}</code>
      </pre>
    );
  });
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const inline = !match;

          if (inline) {
            return (
              <code className="bg-base-300 text-base-content px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          }

          // Code block with syntax highlighting
          const code = String(children).replace(/\n$/, '');
          const language = match ? match[1] : '';

          return (
            <div className="mockup-code my-4">
              {highlightCode(code, language)}
            </div>
          );
        },
      } as Components}
    >
      {content}
    </ReactMarkdown>
  );
}
