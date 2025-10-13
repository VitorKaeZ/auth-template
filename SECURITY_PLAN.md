# Plano de Análise e Melhoria de Segurança

Este documento detalha uma análise de segurança da aplicação e um plano de ação para fortalecer suas defesas contra vulnerabilidades comuns.

### **Avaliação Geral de Segurança**

A aplicação possui uma **base de segurança muito boa**. O uso de tecnologias e padrões modernos já protege contra várias ameaças graves:

- **Prisma como ORM:** Protege contra **SQL Injection**.
- **Hashing de Senhas com `bcryptjs`:** É a melhor prática para armazenamento de senhas.
- **Uso de JWTs:** Padrão moderno para gerenciamento de sessões em APIs.
- **Estrutura com Casos de Uso:** Ajuda a centralizar e padronizar a lógica, evitando erros.

---

### **1. Broken Authentication (Autenticação Quebrada)**

Refere-se a falhas no login, na redefinição de senha e no gerenciamento dos tokens.

**O que a aplicação faz bem:**
- ✅ **Armazenamento de Senha:** Usa `bcrypt` para gerar um hash com "salt" da senha.
- ✅ **Tokens JWT:** Usa tokens assinados com tempo de expiração razoável (1 hora).

**O que pode ser melhorado:**
- 🚨 **Falta de Rate Limiting (Limite de Tentativas):** Vulnerável a ataques de força bruta no endpoint de login.
    - **Solução:** Implementar um "rate limiter" (ex: `@fastify/rate-limit`) para bloquear múltiplas tentativas de login falhas de um mesmo IP ou para um mesmo usuário.

- 🚨 **Segurança na Redefinição de Senha:** A segurança depende da implementação dos tokens de reset.
    - **Checklist de Segurança:** O token de redefinição de senha deve ser:
        1.  **Longo e Criptograficamente Aleatório.**
        2.  **De Uso Único** (invalidado após o uso).
        3.  **Com Expiração Curta** (ex: 10-15 minutos).

### **2. Broken Access Control (Controle de Acesso Quebrado)**

Refere-se a falhas que permitem que um usuário acesse dados ou execute ações que não deveria.

**O que a aplicação faz bem:**
- ✅ **Implementação de RBAC (Role-Based Access Control):** O middleware `authenticateJwt` que checa por `roles` é a solução correta e padrão da indústria.

**O que pode ser melhorado:**
- ⚠️ **Dependência do Desenvolvedor:** A segurança depende da aplicação correta e consistente do middleware em todas as rotas que precisam de proteção.
    - **Solução:** Disciplina, revisão de código e, se possível, testes automatizados para rotas sensíveis.

### **3. Sensitive Data Exposure (Exposição de Dados Sensíveis)**

Refere-se à proteção de dados como senhas e tokens, em trânsito (na rede) e em repouso (no banco).

**O que a aplicação faz bem:**
- ✅ **Segredos da Aplicação:** `DATABASE_URL` e `JWT_TOKEN` são gerenciados corretamente via arquivo `.env`.
- ✅ **Senhas em Repouso:** As senhas no banco de dados estão protegidas por hash.

**O que pode ser melhorado:**
- 🚨 **Falta de HTTPS:** A aplicação roda em HTTP, o que expõe todo o tráfego (senhas, tokens) a interceptação na rede.
    - **Solução (Nível de Infraestrutura):** Em produção, a aplicação **obrigatoriamente** deve rodar por trás de um "reverse proxy" (como Nginx) que gerencie o certificado SSL/TLS e force todo o tráfego para HTTPS. O proxy reverso deve ser configurado para redirecionar permanentemente (301) todo o tráfego HTTP para HTTPS.

### **4. Security Misconfiguration (Más Configurações de Segurança)**

Erros comuns que vêm de configurações padrão ou mensagens de erro muito detalhadas.

**O que a aplicação faz bem:**
- ✅ **Tratamento de Erros:** A aplicação utiliza classes de erro específicas, evitando vazar stack traces ou erros brutos do banco de dados.

**O que pode ser melhorado:**
- ⚠️ **Configuração do CORS:** A configuração padrão (`app.register(cors)`) geralmente permite acesso de **qualquer origem** (`*`).
    - **Solução:** Em produção, configurar o CORS para permitir acesso apenas ao domínio exato do seu front-end. Ex: `app.register(cors, { origin: 'https://meu-site.com' })`.

---

### **Checklist de Ação (Próximos Passos)**

- [x] **Implementar Rate Limiting** no endpoint de login.
- [x] **Revisar e Garantir a Segurança do Fluxo de Redefinição de Senha** (revisão concluída, implementação segura).
- [ ] **Planejar a infraestrutura de produção para usar HTTPS.**
- [x] **Configurar o CORS** para permitir apenas o domínio de front-end em produção.
