# ClubStats — Brainstorm de Design

## Abordagem Escolhida: "Aurora Command Center"

**Design Movement:** Dark-mode SaaS dashboard com glassmorphism e aurora mesh, inspirado em Stripe Dashboard, Linear, Vercel e Raycast.

**Core Principles:**
1. Profundidade visual através de camadas translúcidas e gradientes orgânicos
2. Dados em primeiro plano — a UI serve a informação, não compete com ela
3. Microinterações precisas e responsivas, nunca decorativas
4. Consistência sistemática em spacing, tipografia e cor

**Color Philosophy:**
- Base: `#0a0a0f` (quase-preto com leve tom azulado)
- Aurora mesh: roxo neon (`#7c3aed`), azul elétrico (`#2563eb`), verde cyber (`#10b981`)
- Foreground: branco com opacidade controlada para hierarquia
- Estados: verde (vitória), amarelo (empate), vermelho (derrota)
- A cor assinatura da marca é o roxo neon `#7c3aed` — usado em CTAs, foco e destaques

**Layout Paradigm:**
- Sidebar fixa em desktop com navegação contextual
- Área principal com grid assimétrico de cards glassmorphism
- Mobile: navegação inferior + empilhamento vertical
- Sem layouts centralizados genéricos — preferir grids dinâmicos

**Signature Elements:**
1. Aurora mesh animada sutilmente no background
2. Cards glassmorphism com borda `border-white/10` e `backdrop-blur-xl`
3. Números grandes em Space Grotesk com animação CountUp

**Interaction Philosophy:**
- Hover scale 1.02 com glow dinâmico
- Fade-in progressivo com stagger
- Spring animations em transições de estado
- Transições suaves entre visualizações de gráfico

**Animation Guidelines:**
- Durações: hover 150ms, transições de página 250ms, modais 300ms
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` para entradas
- Stagger de 50ms entre items em listas
- Respeitar `prefers-reduced-motion`

**Typography System:**
- Display/Números: Space Grotesk (500-700) — KPIs, skill rating, recordes
- Body/UI: Inter (400-600) — textos, labels, navegação
- Hierarquia: 48px → 32px → 24px → 18px → 16px → 14px → 12px

**Brand Essence:**
- Posicionamento: o dashboard de estatísticas mais bonito do ecossistema Pro Clubs
- Personalidade: premium, preciso, competitivo
- Adjetivos: sofisticado, confiável, competitivo

**Brand Voice:**
- Headlines diretas e orientadas a dados
- CTAs orientados a ação
- Exemplos: "Analyze any club. Track every match." / "Search by Club ID or name"

**Wordmark & Logo:**
- Logotipo: símbolo geométrico abstrato (escudo estilizado com traço neon) em roxo/azul
- Wordmark: "ClubStats" em Space Grotesk com peso 700

**Signature Brand Color:** `#7c3aed` (roxo neon)
