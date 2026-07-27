# Zeus Eletropostos — Landing Page

Landing page institucional da **Zeus Eletropostos** para captação de parcerias com pontos comerciais em Manaus - AM.
Site estático (HTML + CSS + JS puro), sem build, pronto para deploy no GitHub Pages.

## Estrutura

```
zeus-eletropostos/
├── index.html            # página única com todas as seções
├── css/styles.css        # design system + responsivo
├── js/main.js            # menu, contadores, animações, WhatsApp
├── assets/
│   ├── favicon.svg
│   └── images/           # fotos do carregador de 80 kW + mockup
├── .nojekyll             # faz o GitHub Pages servir a pasta como está
└── README.md
```

## Antes de publicar — 2 ajustes rápidos

1. **Número do WhatsApp** — em `js/main.js`, edite a constante `WHATSAPP`
   (formato internacional só com dígitos, ex.: `5592981234567`). É por ela que
   todos os botões e o formulário abrem a conversa.
2. **E-mail de contato** (opcional) — em `index.html`, no rodapé, troque
   `contato@zeuseletropostos.com.br` pelo e-mail real.

## Imagens ainda pendentes (ver seção no chat)

- `assets/images/og-image.jpg` — imagem de compartilhamento (1200×630). Sem ela,
  o link ainda funciona, só não mostra prévia no WhatsApp/redes.
- Foto de fundo do hero é opcional — hoje o hero usa a foto real do carregador.

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
cd zeus-eletropostos
python3 -m http.server 8080
# acesse http://localhost:8080
```

## Deploy no GitHub Pages

### Opção A — repositório do projeto (recomendado)

```bash
cd zeus-eletropostos
git init
git add .
git commit -m "Landing page Zeus Eletropostos"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/zeus-eletropostos.git
git push -u origin main
```

Depois, no GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
escolha `main` / `/ (root)` e salve. O site fica em:
`https://SEU-USUARIO.github.io/zeus-eletropostos/`

Os caminhos do projeto são **relativos** (`./css/...`), então funciona tanto na raiz
quanto em subpasta — não precisa mexer em nada.

### Opção B — site principal do usuário

Crie um repositório chamado `SEU-USUARIO.github.io`, coloque estes arquivos na raiz
e faça push. O site fica em `https://SEU-USUARIO.github.io/`.

### Domínio próprio: `zeuseletropostos.iaas.chat`

O arquivo `CNAME` na raiz já contém `zeuseletropostos.iaas.chat`. Para ativar:

1. **DNS** (onde o domínio `iaas.chat` é gerenciado) — crie um registro:
   ```
   Tipo: CNAME   Nome: zeuseletropostos   Valor: SEU-USUARIO.github.io
   ```
   (subdomínio usa CNAME; apex usaria os IPs `185.199.108.153/109/110/111`.)
2. **GitHub** → Settings → Pages → Custom domain → `zeuseletropostos.iaas.chat` → Save.
3. Aguarde o certificado e marque **Enforce HTTPS**.

**Cloudflare:** se o `iaas.chat` estiver na Cloudflare, deixe o registro como
**DNS only** (nuvem cinza) até o GitHub emitir o certificado. Depois, se quiser o
proxy (nuvem laranja), use SSL/TLS em modo **Full** para não dar loop de redirect.

---

**Zeus Eletropostos** · Manaus - AM · Parceria sem custo para o ponto comercial.
