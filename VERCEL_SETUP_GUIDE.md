# 📋 Guia Passo a Passo — Configuração Vercel para ClubStats

## PASSO 1: Acessar Vercel

1. Acesse **https://vercel.com**
2. Faça login com sua conta (ou crie uma se não tiver)
3. Clique em **"Add New..."** no canto superior direito
4. Selecione **"Project"**

---

## PASSO 2: Conectar Repositório GitHub

1. Na tela "Create a new project", clique em **"Continue with Git"**
2. Selecione **"GitHub"** (ou a plataforma que você usa)
3. Autorize a Vercel a acessar seu GitHub
4. Na lista de repositórios, procure por **"Tracker-Jovem-Nuggs-FC"**
5. Clique em **"Import"**

---

## PASSO 3: Configurar Build Settings

Após clicar em "Import", você verá a tela de configuração. **IMPORTANTE: Não clique em Deploy ainda!**

### 3.1 Framework Preset
- **Campo**: "Framework Preset"
- **Valor**: Deixe como **"Vite"** (Vercel deve detectar automaticamente)
- Se não detectar, selecione manualmente na lista

### 3.2 Build Command
- **Campo**: "Build Command"
- **Valor Atual**: Pode estar vazio ou com outro valor
- **Substitua por**: `pnpm build`

**Como fazer:**
1. Clique no campo "Build Command"
2. Limpe o conteúdo atual (se houver)
3. Digite: `pnpm build`
4. Pressione Enter

### 3.3 Output Directory
- **Campo**: "Output Directory"
- **Valor Atual**: Pode estar como `dist` ou vazio
- **Substitua por**: `dist/public`

**Como fazer:**
1. Clique no campo "Output Directory"
2. Limpe o conteúdo atual
3. Digite: `dist/public`
4. Pressione Enter

### 3.4 Install Command
- **Campo**: "Install Command"
- **Valor Atual**: Pode estar como `npm install` ou vazio
- **Substitua por**: `pnpm install`

**Como fazer:**
1. Clique no campo "Install Command"
2. Limpe o conteúdo atual
3. Digite: `pnpm install`
4. Pressione Enter

### 3.5 Root Directory
- **Campo**: "Root Directory"
- **Valor**: Deixe vazio (ou `/` se obrigatório)
- Não precisa alterar

---

## PASSO 4: Variáveis de Ambiente (Opcional)

- **Campo**: "Environment Variables"
- **Ação**: Deixe em branco (não há variáveis obrigatórias)
- Se precisar adicionar depois, pode fazer nas configurações do projeto

---

## PASSO 5: Deploy

1. Verifique se todas as configurações estão corretas:
   - ✅ Build Command: `pnpm build`
   - ✅ Output Directory: `dist/public`
   - ✅ Install Command: `pnpm install`
   - ✅ Framework: Vite

2. Clique em **"Deploy"** (botão azul no canto inferior direito)

3. Aguarde o build completar (leva ~2-5 minutos)

---

## PASSO 6: Verificar Deploy

1. Quando o build terminar, você verá uma tela com a URL do seu projeto
2. Clique em **"Visit"** para abrir o site
3. Teste a tela de preloading:
   - Digite: `Jovem Nuggs FC`
   - Clique em "Acessar"
   - Você deve ser redirecionado para a página inicial

---

## Configuração Visual (Screenshots dos Campos)

```
┌─────────────────────────────────────────────┐
│ Framework Preset:  [Vite ▼]                 │
├─────────────────────────────────────────────┤
│ Build Command:     [pnpm build]             │
├─────────────────────────────────────────────┤
│ Output Directory:  [dist/public]            │
├─────────────────────────────────────────────┤
│ Install Command:   [pnpm install]           │
├─────────────────────────────────────────────┤
│ Root Directory:    []                       │
├─────────────────────────────────────────────┤
│ Environment Variables: (deixe vazio)        │
└─────────────────────────────────────────────┘
```

---

## Troubleshooting

### ❌ Build falha com erro de dependências
**Solução**: Verifique se o "Install Command" está como `pnpm install`

### ❌ Site fica em branco ou 404
**Solução**: Verifique se "Output Directory" está como `dist/public` (não apenas `dist`)

### ❌ Tela de preloading não aparece
**Solução**: Limpe o cache do navegador (Ctrl+Shift+Delete) e recarregue

### ❌ Imagens não carregam
**Solução**: As imagens estão em URLs externas (`/manus-storage/...`). Verifique sua conexão com a internet

---

## Após o Deploy

1. **Compartilhe a URL** com seu time
2. **Teste todas as funcionalidades**:
   - ✅ Preloading com "Jovem Nuggs FC"
   - ✅ Navegação entre páginas
   - ✅ Busca de clubes
   - ✅ Visualização de perfil
   - ✅ Tabela de elenco
   - ✅ Comparação H2H

3. **Configure domínio personalizado** (opcional):
   - Nas configurações do projeto na Vercel
   - Vá para "Settings" → "Domains"
   - Adicione seu domínio

---

## Dúvidas?

Consulte:
- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev
- **pnpm Docs**: https://pnpm.io

---

**Status**: ✅ Projeto pronto para deploy
**Última atualização**: 13 de julho de 2026
