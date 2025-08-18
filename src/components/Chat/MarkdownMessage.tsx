import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

interface MarkdownMessageProps {
  text: string;
}

interface MarkdownCodeBlockProps {
  lang: string;
  codeString: string;
  copied: boolean;
  handleCopy: () => void;
  props: any;
}

const MarkdownCodeBlock: React.FC<MarkdownCodeBlockProps> = ({ lang, codeString, copied, handleCopy, props }) => (
  <div className="relative my-3">
    <div className="flex items-center justify-between px-4 pt-2 rounded-t-xl bg-[#fafafa]">
      <span className="text-xs text-gray-400 font-mono">{lang || "code"}</span>
      <span
        className="text-xs text-gray-500 hover:text-black cursor-pointer flex items-center ml-2 select-none"
        onClick={handleCopy}
        role="button"
        tabIndex={0}
      >
        {copied ? (
          <Check className="w-4 h-4 mr-1 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 mr-1" />
        )}
        {copied ? "Copied!" : "Copy Code"}
      </span>
    </div>
    <SyntaxHighlighter
      language={lang}
      style={oneLight}
      customStyle={{
        borderRadius: "0 0 0.75rem 0.75rem",
        margin: 0,
        padding: "1em",
        fontSize: "0.95em",
        backgroundColor: "#fafafa",
      }}
      PreTag="div"
      {...props}
    >
      {codeString}
    </SyntaxHighlighter>
  </div>
);

const MarkdownInlineCode: React.FC<any> = ({ children, ...props }) => (
  <code className="bg-gray-200 px-1 rounded" {...props}>{children}</code>
);

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ text }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const lang = match ? match[1] : "";
          const codeString = String(children).replace(/\n$/, "");
          const [copied, setCopied] = useState(false);
          const handleCopy = () => {
            navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          };

          if (!inline) {
            return (
              <MarkdownCodeBlock
                lang={lang}
                codeString={codeString}
                copied={copied}
                handleCopy={handleCopy}
                props={props}
              />
            );
          } else {
            return <MarkdownInlineCode {...props}>{children}</MarkdownInlineCode>;
          }
        }
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default MarkdownMessage;
