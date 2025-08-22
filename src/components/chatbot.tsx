import { useEffect, useMemo, useRef, useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { IoClose, IoSend } from 'react-icons/io5';
import { PiSparkleBold } from 'react-icons/pi';
import { generateFromGemini } from '../lib/gemini';
import { productKB } from '../lib/kb/products';
import { SYSTEM_PROMPT } from '../lib/knowledge';
import { members } from '../sections/members.section';
import { projects } from '../sections/projects.section';

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    {
      role: 'bot',
      text:
        "Hi! I'm NexaBot. Ask me about NexaTech Rwanda — our mission, products, values, or where to find things on this site.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAskRef = useRef<number>(0);

  const system = useMemo(() => {
    const memberLines = members.map((m) => `- ${m.name} — ${m.role}`).join('\n');
    const projectLines = projects.map((p) => `- ${p.title} (#projects-${p.id}) — ${p.desc}`).join('\n');
    const productLines = productKB.map((p) => `- ${p.title} — ${p.details}`).join('\n');
    const siteContacts = `Email: nexatech317@gmail.com | WhatsApp: +250 723374650`;
    return `${SYSTEM_PROMPT}\n\nAdditional Site Data:\nMembers:\n${memberLines}\n\nProjects:\n${projectLines}\n\nProducts:\n${productLines}\n\nContacts:\n${siteContacts}\n\nConstraints: Answer in max 100 words. If unrelated to NexaTech, decline politely.`;
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function rateLimited(): string | null {
    const now = Date.now();
    const diff = now - lastAskRef.current;
    const windowMs = 5000; // 5s
    if (diff < windowMs) {
      const wait = Math.ceil((windowMs - diff) / 1000);
      return `Please wait ${wait}s before sending another message.`;
    }
    lastAskRef.current = now;
    return null;
  }

  async function ask() {
    const question = input.trim();
    if (!question) return;
    // prevent concurrent requests
    if (loading) {
      setMessages((m) => [...m, { role: 'bot', text: 'I\'m finishing your previous answer. Please wait a moment.' }]);
      return;
    }
    // enforce 100-word max for user question
    const words = question.split(/\s+/).filter(Boolean);
    if (words.length > 100) {
      setMessages((m) => [...m, { role: 'bot', text: 'Please keep your question within 100 words.' }]);
      return;
    }
    const rl = rateLimited();
    if (rl) {
      setMessages((m) => [...m, { role: 'bot', text: rl }]);
      return;
    }
    setInput('');
    const userMsg = { role: 'user' as const, text: question };
    // Start a fresh turn: clear any previous Q&A and show only this question
    setMessages([userMsg]);
    setLoading(true);
    try {
      const answer = await generateFromGemini(system, question);
      const safe = (answer || '').trim() ||
        "I'm not able to answer that. I only answer questions related to NexaTech Rwanda and this portfolio. Try asking about our mission, products, or values.";
      // remove the user's question bubble once answered successfully
      setMessages((m) => {
        const idx = m.lastIndexOf(userMsg);
        if (idx >= 0) {
          const copy = [...m];
          copy.splice(idx, 1);
          return [...copy, { role: 'bot' as const, text: safe }];
        }
        return [...m, { role: 'bot' as const, text: safe }];
      });
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text:
            'Sorry, I could not reach the AI service. Please try again later or use the Contact section.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        aria-label={open ? 'Close NexaBot' : 'Open NexaBot'}
        className={`chatbot-toggle ${open ? 'open' : ''}`}
        title='NexaTech AI Assistant'
        onClick={() => {
          if (open) {
            // clearing state when closing
            setLoading(false);
            setInput('');
            setWordCount(0);
            setMessages([
              {
                role: 'bot',
                text:
                  "Hi! I'm NexaBot. Ask me about NexaTech Rwanda — our mission, products, values, or where to find things on this site.",
              },
            ]);
          }
          setOpen((o) => !o);
        }}
      >
        {!open && <span className='tooltip' role='tooltip'>NexaTech AI Assistant</span>}
        {open ? (
          <IoClose size={22} />
        ) : (
          <span className='ai-avatar' aria-hidden>
            <FaRobot size={30} />
            <PiSparkleBold className='sparkle' size={14} />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className='chatbot-panel' role='dialog' aria-label='NexaBot Chatbot'>
          <div className='chatbot-header'>
            <div className='title'>NexaBot</div>
            <button className='icon' aria-label='Close' onClick={() => setOpen(false)}>
              <IoClose />
            </button>
          </div>
          <div className='chatbot-messages'>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}> {m.text} </div>
            ))}
            {loading && (
              <div className='msg bot skeleton'>
                <div className='bar w60' />
                <div className='bar w90' />
                <div className='bar w40' />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className='chatbot-quicklinks'>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>See Projects</button>
            <button onClick={() => document.getElementById('members')?.scrollIntoView({ behavior: 'smooth' })}>See Members</button>
            <button onClick={() => document.getElementById('vision-mission')?.scrollIntoView({ behavior: 'smooth' })}>Mission & Vision</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button>
          </div>
          <div className='chatbot-input'>
            <textarea
              value={input}
              onChange={(e) => {
                const v = e.target.value;
                setInput(v);
                const c = v.trim() ? v.trim().split(/\s+/).length : 0;
                setWordCount(c);
              }}
              onKeyDown={onKeyDown}
              placeholder='Ask about NexaTech, our mission, products, or where to find something...'
              rows={2}
              disabled={loading}
            />
            <div className={`word-counter ${wordCount > 100 ? 'over' : ''}`}>{wordCount}/100</div>
            <button onClick={ask} disabled={loading || !input.trim() || wordCount > 100} className='send'>
              <IoSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
