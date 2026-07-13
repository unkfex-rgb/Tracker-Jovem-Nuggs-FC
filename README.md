# ClubStats — Pro Clubs Analytics Platform

> **Not affiliated with EA Sports**

ClubStats é uma plataforma premium de estatísticas e análise avançada para clubes do modo Pro Clubs do EA FC. O projeto foi arquitetado para escalar de dados mockados para integrações reais com APIs externas (EA Sports, OurProClub, ProClubsTracker) sem alterações na camada de interface.

## Stack

| Tecnologia | Função |
|---|---|
| React 19 + TypeScript | Framework base com tipagem estática |
| Tailwind CSS 4 | Estilização utility-first com design tokens |
| Framer Motion | Microinterações e animações de entrada |
| Recharts | Gráficos de área, barras e linha temporal |
| Lucide Icons | Iconografia consistente |
| Shadcn/UI + CVA | Componentes reutilizáveis com variantes tipadas |
| Wouter | Roteamento client-side leve |

## Arquitetura

```
client/src/
├── components/     # Componentes UI reutilizáveis (GlassCard, Navigation, Skeletons, etc.)
├── contexts/       # React Contexts (ThemeProvider)
├── data/           # Dados mockados em JSON (club, players, matches, h2h, streaks)
├── hooks/          # Hooks customizados (useCountUp, useRecentSearches, etc.)
├── lib/            # Utilidades (cn, helpers)
├── pages/          # Páginas da aplicação (Home, Search, ClubProfile, Squad, H2H)
├── services/       # Camada de serviços — futura integração com APIs reais
├── types/          # Tipos de domínio compartilhados
└── index.css       # Design tokens, tema dark, aurora mesh, glassmorphism
```

### Camada de Serviços

Toda a aplicação consome dados através de `services/club.service.ts`. A substituição dos mocks por APIs reais exige apenas a modificação deste arquivo, sem impacto na interface:

```typescript
// Atual (mock):
const club = await clubService.getClub(id);

// Futuro (API real) — mesma interface, implementação diferente:
const club = await clubService.getClub(id);
```

## Funcionalidades

| Página | Rota | Descrição |
|---|---|---|
| Início | `/` | Hero, features e estatísticas globais |
| Buscar | `/search` | Busca por Club ID/nome, filtros de plataforma e divisão, sugestões automáticas, histórico de buscas recentes |
| Clube | `/club` | Perfil completo: header com skill rating animado (CountUp), 10 KPI cards, forma recente com 3 visualizações de gráfico alternáveis, streaks históricas |
| Elenco | `/squad` | Tabela profissional com ordenação por coluna, busca por nome, filtro por posição, paginação |
| H2H | `/h2h` | Comparação lado a lado entre dois clubes com barras animadas |

## Identidade Visual

- **Tema:** Dark mode com background `#0a0a0f` e aurora mesh animada (roxo neon, azul elétrico, verde cyber)
- **Cards:** Glassmorphism com `backdrop-blur-xl`, `bg-white/5`, `border-white/10`
- **Tipografia:** Space Grotesk para números e títulos, Inter para textos
- **Cor assinatura:** Roxo neon `#7c3aed`
- **Estados:** Verde (vitória), amarelo (empate), vermelho (derrota)

## Desenvolvimento

```bash
pnpm install
pnpm dev      # servidor de desenvolvimento
pnpm build    # build de produção
pnpm check    # verificação de tipos TypeScript
```

## Licença

MIT
