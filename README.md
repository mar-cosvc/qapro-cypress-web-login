# QAZANDO Cypress Web Automation - Login

## Visão geral
Este projeto reúne uma suíte de automação de testes web para a tela de login do site QAZANDO Automation Practice, com foco em:
- usabilidade e interface
- validações de UI
- segurança básica (incluindo cenários de SQL Injection)
- reuso de massa de dados
- estrutura pronta para execução em pipeline e regressão

## Objetivos
- Validar comportamentos de login com diferentes entradas
- Cobrir cenários de erro, campos vazios e segurança
- Gerar logs e relatórios para histórico e auditoria
- Facilitar execução periódica em ambiente CI/CD

## Tecnologias
- Cypress 15.x
- JavaScript
- Node.js
- Mochawesome Reporter
- Estrutura de massa de dados em JSON

## Estrutura do projeto
- cypress/e2e/login.cy.js: suíte de testes da tela de login
- cypress/fixtures/loginUsers.json: massa de dados reutilizável
- cypress/support/e2e.js: configuração global do Cypress
- scripts/run-cypress-with-logging.js: executor com log de execução
- reports/logs: logs detalhados por execução
- reports/backup: histórico organizado para backup após 30 dias

## Como executar localmente
1. Instale as dependências:
   npm install
2. Execute a suíte:
   npm run test
3. Consulte os relatórios em:
   cypress/reports/
4. Consulte os logs em:
   reports/logs/

## Cenários cobertos
- Login com credenciais válidas
- Login com senha inválida
- Login com usuário inexistente
- Login com campos vazios
- Tentativa de SQL Injection
- Validações de usabilidade e acessibilidade básica

## Estratégia de logs e histórico
- Cada execução gera um log em reports/logs
- Os logs antigos com mais de 30 dias são movidos para reports/backup
- Os relatórios HTML/JSON ficam disponíveis para análise e regressão

## Pipeline e regressão
A suíte está preparada para integrar em pipelines com execução periódica diuturna. O fluxo ideal é:
- disparo automático em cada commit ou PR
- execução diária/diuturna em horários programados
- armazenamento de artefatos (relatórios e logs)

## Versionamento
- Versão atual: 1.0.0
- Estrutura sugerida para GitHub:
  - main: branch principal
  - release/v1.0.0: branch de release
  - feature/*: branch de desenvolvimento

## Release notes
### v1.0.0
- Implementação inicial da suíte de automação para login
- Cobertura de cenários de sucesso, erro, UI, usabilidade e segurança
- Massa de dados reutilizável via fixture
- Geração de logs e relatórios para histórico
- Estrutura preparada para CI/CD e regressão

## Recomendação de fluxo no GitHub
1. Criar branch de feature
2. Implementar alterações
3. Abrir PR para main
4. Validar execução da suíte
5. Criar release tag v1.0.0

## Comandos úteis
- npm run test
- npx cypress run --e2e --browser electron --spec cypress/e2e/login.cy.js
