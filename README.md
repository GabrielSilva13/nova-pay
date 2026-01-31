![CI](https://github.com/GabrielSilva13/<SEU_REPO>/actions/workflows/ci.yml/badge.svg)

# Bank Dashboard (Frontend Demo)

Aplicação frontend que simula um dashboard bancário moderno: visualização de saldo, histórico de transações com filtros e fluxo de transferência com feedback de sucesso/erro.  
Projeto demonstrativo para portfólio: **sem backend real**, com **API mockada** (latência/erros) e foco em arquitetura limpa, DX, acessibilidade e testes.

## Objetivos
- Demonstrar Next.js App Router + React com padrões profissionais
- Arquitetura por features + design system próprio (headless apenas para comportamento)
- Tema light/dark com tokens (sem hardcode de cores)
- Formulários robustos com validação (zod) e UX resiliente
- Qualidade: TypeScript strict, Biome, Vitest, CI

## Stack
- Next.js (App Router) + TypeScript strict (`strict: true`)
- Tailwind CSS v4
- Headless UI: `@base-ui/react` (somente comportamento quando necessário)
- Variantes: `tailwind-variants`
- Merge classes: `tailwind-merge`
- Forms: `react-hook-form` + `zod`
- Server state: TanStack Query
- Testes: Vitest + Testing Library
- Lint/format: Biome (único)
- CI: GitHub Actions (`biome → test → build`)
- Package manager: pnpm

## Decisões técnicas (trade-offs)
- **TanStack Query** mesmo com mock: simula mundo real (cache/loading/retry/invalidate) e reduz estado global.
- **Mock API tipada** (client + endpoints): separa transporte simulado do contrato de domínio sem overengineering.
- **Tokens via CSS variables**: proíbe hardcode de cores em componentes e facilita tema.
- **Filtros client-side**: ótimo para mock/portfolio; em produção migraria para server-side.
- **Sem barrel files internos**: imports explícitos e refactors mais seguros.
- **Named exports como padrão**:
  - **Exceção**: arquivos do Next App Router (`app/**/page.tsx`, `app/**/layout.tsx`) exigem `default export`.

## Arquitetura
Organização por domínio (features), com UI base separada de componentes compostos e camada de acesso à API mockada.

### Diagrama (alto nível)
```

app/                  -> rotas e layouts (public/protected)
features/*            -> domínio (hooks + components + schemas/types)
components/ui         -> design system (primitivos)
lib/api               -> mock client + endpoints + query provider
lib/styles            -> tokens + tema
lib/utils             -> helpers (cn, format, money)

```

## Estrutura de pastas
```

src/
app/
(public)/login
(protected)/layout + dashboard + transfers
components/
ui/
common/
features/
auth/
dashboard/
transfers/
lib/
api/
styles/
utils/
tests/

```

## Design System e Tokens (obrigatório)
- Proibido hardcode de cores em componentes.
- Tokens via CSS variables em `src/lib/styles/tokens.css`:
  - `--color-surface`
  - `--color-primary`
  - `--color-secondary`
  - `--color-muted`
  - `--color-destructive`
  - `--radius`
  - `--space-*`
  - `--font-size-*` / `--line-height-*`

### Tema light/dark
- Atributo no `<html>`: `data-theme="light|dark"`
- Persistência: `localStorage` (`bank-demo:theme`)
- Fallback: `prefers-color-scheme`
- Anti-flash: `ThemeScript` roda no `<head>` antes da hidratação

## Autenticação (fake)
- Login fake com persistência em `localStorage` (`bank-demo:auth`)
- Rotas protegidas via `(protected)/layout.tsx` (guard client-side + redirect para `/login?next=...`)
- **Importante:** é uma simulação de UX. Não representa segurança real sem backend.

## API mockada
- Latência e falhas simuladas para demonstrar UX resiliente
- Erros tipados (ex.: NETWORK / VALIDATION / INSUFFICIENT_FUNDS)
- Transferência:
  - validação no client (zod)
  - checagem de saldo antes do submit
  - checagem de saldo no mock server (defesa em profundidade)
  - invalidação de queries: `["transactions"]` e `["balance"]`

## Filtros de transações
Implementados client-side:
- busca textual (recipient/description)
- tipo (credit/debit)
- faixa de datas (from/to)
- ordenação por data
- paginação

> Em um backend real: esses filtros virariam query server-side/paginada.

## Testes
Cobertura mínima (e útil):
- UI base: `Button` (interação)
- Lógica pura: filtros de transações (função pura)
- Domínio: `transferSchema` (validações e transforms)
- Fluxo de feature: submit do `TransferForm` (mocks dos hooks)

## Comandos (pnpm)
- `pnpm dev` — desenvolvimento
- `pnpm build` — build de produção
- `pnpm start` — iniciar build
- `pnpm test` — vitest watch
- `pnpm test:run` — vitest run (CI)
- `pnpm biome:check` — lint/format check
- `pnpm biome:fix` — auto-fix

## Como criar novas features
    1. Criar pasta `src/features/<feature>/`
    2. Adicionar:
        - `types.ts` (tipos do domínio)
        - `schemas.ts` (zod, se houver forms)
        - `hooks/` (TanStack Query wrappers)
        - `components/` (UI da feature)
    3. Rotas em `src/app/` consomem a feature (evitar lógica de domínio em page.tsx)
    4. Testar ao menos:
        - 1 componente UI base OU função pura relevante
        - 1 fluxo principal da feature

## Checklist de PR
- [ ]   TypeScript strict sem `any`
- [ ]   Sem hardcode de cores (apenas tokens CSS)
- [ ]   Componentes aceitam `className`, usam `data-slot` e `focus-visible`
- [ ]   Acessibilidade: labels/aria, navegação por teclado, estados com `aria-live` quando necessário
- [ ]   Estados: loading/error/empty tratados
- [ ]   Testes passando: `pnpm test:run`
- [ ]   Estilo/lint: `pnpm biome:check`
- [ ]   Build: `pnpm build`

## CI
Pipeline mínimo no GitHub Actions:
- `pnpm biome:check`
- `pnpm test:run`
- `pnpm build`

