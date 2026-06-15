# Boilerplate Synergia

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"      title="React"     alt="React"     width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/meteor/meteor-original.svg"             title="Meteor"    alt="Meteor"    width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg"  title="Mongo"     alt="Mongo"     width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg"     title="Material"  alt="Material"  width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"     title="TS"        alt="TS"        width="40" height="40" />&nbsp;
</div>

<br/>

O **MeteorReactBaseMUI** é um boilerplate desenvolvido pela equipe do Synergia, projetado para acelerar o processo de criação de novos produtos com uma base sólida e madura. Ele integra **MeteorJS**, **ReactJS** e **MongoDB**, proporcionando uma estrutura eficiente para o desenvolvimento ágil e robusto de aplicações.

Entre os principais benefícios de utilizar o **MeteorReactBaseMUI**, destacam-se:

- **Prevenção de erros**: A implementação de classes que encapsulam operações essenciais facilita a interação cliente-servidor e a comunicação com o banco de dados, minimizando falhas comuns no desenvolvimento.
- **Organização de código**: Estrutura o código de forma que o controle das operações no banco de dados seja mais eficiente e centralizado.
- **Gerenciamento de schemas**: Oferece controle e validação automáticos dos schemas das coleções, garantindo consistência nos dados.
- **SysForm**: Automatiza a gestão de formulários, incorporando validações, comportamentos específicos e informações oriundas dos schemas.
- **SysFormFields**: Disponibiliza componentes prontos para integração de formulários, incluindo funcionalidades como upload de arquivos, seleção de itens e estilização de texto.
- **ComplexTable**: Gera tabelas automaticamente a partir dos schemas, apresentando os dados de forma clara e intuitiva.
- **Uploads e anexos**: A coleção `attachmentsCollection` facilita salvar arquivos no servidor e utilizá-los em formulários.
- **APIs modulares**: Segue um padrão de modularização que facilita a implementação e manutenção das funcionalidades do sistema.
- **Estrutura flexível**: Define uma arquitetura padronizada de schemas, layouts e rotas, permitindo maior flexibilidade na navegação e personalização do estilo do produto.
- **Integração facilitada**: Oferece suporte ágil para integrar outros serviços ou consumir APIs externas.
- **Controle de acesso**: Papéis e recursos mapeados em `mapRolesRecursos.tsx` permitem validar permissões nas APIs.
- **Eventos de analytics**: As APIs expõem `Subjects` do RxJS que registram rotas acessadas e chamadas de método.
- **Suporte offline**: Operações de método e dados são mantidas com `jam:offline`, permitindo uso contínuo sem conexão.

## Sumário

- [Visão Geral da Arquitetura](#visao-geral-da-arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Primeiros Passos](#primeiros-passos)
- [Rodando com Docker](#rodando-com-docker)
- [Publicando em VPS, Droplet ou VM na nuvem](#publicando-em-vps-droplet-ou-vm-na-nuvem)
- [Trabalhando com módulos](#trabalhando-com-modulos)
- [Suporte Offline](#suporte-offline)
- [Testes](#testes)
- [Contribuindo](#contribuindo)

## Requisitos

- Node.js 22 para rodar fora do Docker
- Meteor 3.4.1 (veja `.meteor/release`)
- Um gerenciador de pacotes npm compatível (instalado junto ao Node)
- Docker e Docker Compose Plugin para rodar via containers

## Visão Geral da Arquitetura

Esta base define duas classes principais para padronizar o acesso aos dados:

- **ProductBase** – estende `ApiBase` no cliente, encapsulando as operações da coleção e encaminhando-as para métodos Meteor e publicações. Permite monitorar chamadas e assinaturas para fins de analytics.
- **ProductServerBase** – estende `ServerApiBase` no servidor. Durante a construção o `ServerApiBase` chama `registerAllMethods()` para disponibilizar os métodos CRUD padrão. Use `registerMethod()` apenas para adicionar métodos personalizados.

Para um detalhamento completo consulte [`docs/architecture.md`](docs/architecture.md).

## Estrutura de pastas

- **.meteor**: Arquivos gerados pelo meteor, informações de versões do meteor e seus pacotes e banco de dados local.
- **client**: Pasta que contém o arquivo da página HTML em que o componente react raiz será montado, bem como os arquivos utilizados na customização do estilo do produto.
- **imports**: Pasta que contém os principais arquivos do produto. Esta pasta está organizada com as seguintes pastas:

  ```shell
  ├── api                                 # Contém os arquivos/classes bases para comunicação com o banco de dados
  ├── app                                 # Contém os arquivos de inicialização, configuração e renderização de rotas. Também contém o contexto global e o de interface
  ├── hooks                               # Hooks customizados do projeto
  ├── libs                                # Bibliotecas auxiliares utilizadas em todo o projeto
  ├── modules                             # Contém os módulos do sistema, com seus respectivos arquivos-base (api, schema e rotas da aplicação).
  │   ├── example                         # Exemplo de um módulo
  │   │   ├── api                         # Arquivos relacionados à API, servidor e esquema do módulo
  │   │   ├── components                  # Componentes específicos para utilização do módulo
  │   │   ├── config                      # Configurações de rotas, menus e recursos do módulo
  │   │   ├── pages                       # Componentes de interface do usuário específicos do módulo
  │   │   └── exampleContainer.tsx        # Container do módulo. Arquivo principal do módulo que deve ser chamado para renderização
  ├── security                            # Arquivos relacionados à configuração de segurança
  │   └── config                          # Configurações de segurança, como mapeamento de papéis e recursos
  │       └── mapRolesRecursos.tsx        # Mapeamento de papéis e recursos
  ├── server                              # Configurções do servidor
  │   └── registerApi.ts                  # Arquivo responsável por registrar as APIs do sistema
  ├── sysPages                            # Páginas do sistema. São páginas que não pertencem a nenhum módulo específico e não precisam de uma estrutura de módulo
  │   ├── config                          # Configurações de rotas, menus e recursos das páginas do sistema
  │   └── pages                           # Definições das páginas do sistema
  ├── typings                             # Definições de tipos personalizados utilizados no projeto
  └── ui                                  # Componentes de interface do usuário organizados em subdiretórios
      ├── appComponents                   # Componentes genéricos definidos no contexto de interface da aplciação
      ├── components                      # Componentes genéricos comuns a todo o sistema
      ├── layoutComponents                # Pasta dedicada a definição de componentes estilizados com (styled-components) que podem ser comum a toda a aplicação
      ├── materialui                      # Componentes que utilizam a biblioteca Material-UI, definição de temas, espaçamentos, cores, etc..
      └── templates                       # Definição dos templates que renderizam o conteúdo da aplicação
          ├── components                  # Componentes específicos dos templates
          ├── getTemplate.tsx             # Arquivo responsável por retornar o template correto de acordo com o tipo de rota
          └── templateFiles               # Arquivos de templates específicos
  ```

- **node_modules**: Pasta com as dependencias do produto.
- **private**: Arquivos que não estarão disponíveis para os usuários da aplicação diretamente. Por exemplo, nesta pasta está o template do email que é enviado para os usuários.
- **public**: Arquivos públicos e disponíveis durante o acesso dos usuários: imagens, fontes, etc.
- **server**: Importa o arquivo [`/imports/server/index`](https://github.com/synergia-labs/MeteorReactBaseMUI/blob/master/imports/server/index.ts)
- **tests**: Realiza testes para identifição das camadas da aplicação sendo utilizadas: cliente ou servidor, e exibe mensagem de alerta de acordo

## Primeiros Passos

Para iniciar o desenvolvimento com o **MeteorReactBaseMUI**, siga os passos abaixo:

1. **Clone o repositório**:

   Execute o seguinte comando no seu terminal para clonar o repositório:

   ```bash
   git clone https://github.com/synergia-labs/MeteorReactBaseMUI.git
   ```

2. **Instale as dependências**:

   Navegue até o diretório do projeto e instale as dependências necessárias com o comando:

   ```bash
   cd MeteorReactBaseMUI && meteor npm install
   ```

3. **Execute a aplicação**:

   Após instalar as dependências, você pode rodar o projeto com:

   ```bash
   meteor
   ```

4. **Acesse a aplicação**:

   Abra seu navegador e acesse a aplicação no endereço [http://localhost:3000]("http://localhost:3000"). Para realizar o login como administrador, utilize as credenciais padrão:

   ```text
   login: admin@mrb.com
   password: admin@mrb.com
   ```

   > **Nota**: Os dados do usuário `admin` foram inseridos no banco de dados pelo arquivo [`/imports/server/fixtures.ts`](https://github.com/synergia-labs/MeteorReactBaseMUI/blob/master/imports/server/fixtures.ts)

## Rodando com Docker

O projeto possui duas configurações Docker:

- `docker-compose.dev.yml`: ambiente de desenvolvimento com hot reload, código montado por volume e MongoDB separado.
- `docker-compose.yml`: ambiente de produção, com build otimizado do Meteor e MongoDB persistente.

As duas versões usam MongoDB com replica set `rs0` e `MONGO_OPLOG_URL`, que melhora o funcionamento reativo do Meteor em cima do Mongo. Os uploads feitos pela aplicação também são persistidos em volume Docker.

### Desenvolvimento com hot reload

Suba o ambiente de desenvolvimento:

```bash
npm run docker:dev
```

Ou em segundo plano:

```bash
npm run docker:dev:detached
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

No ambiente de desenvolvimento:

- o código local é montado dentro do container em `/app`;
- `node_modules`, `.meteor/local`, uploads e banco ficam em volumes Docker separados;
- alterações em arquivos do projeto disparam rebuild/hot reload do Meteor;
- o MongoDB fica acessível no host em `localhost:27018`, útil para ferramentas como MongoDB Compass.

Para acompanhar os logs:

```bash
npm run docker:logs:dev
```

Para parar os containers sem apagar dados:

```bash
npm run docker:down
```

Para parar e apagar volumes, incluindo banco e uploads:

```bash
npm run docker:down:volumes
```

Use `docker:down:volumes` com cuidado, pois ele remove os dados persistidos do MongoDB e dos arquivos enviados.

### Produção local

Suba a versão de produção:

```bash
npm run docker:prod
```

Ou em segundo plano:

```bash
npm run docker:prod:detached
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

No Compose de produção:

- o container `app` executa o bundle gerado por `meteor build`;
- o MongoDB não é exposto para fora da rede interna do Docker;
- os dados do banco ficam nos volumes `mongo_data` e `mongo_config`;
- os uploads ficam no volume `app_uploads`;
- `ROOT_URL`, `APP_PORT` e outras variáveis podem ser ajustadas por arquivo `.env` ou pelo shell.

Exemplo de `.env` para produção:

```dotenv
ROOT_URL=https://app.seudominio.com
APP_PORT=127.0.0.1:3000
```

Com `APP_PORT=127.0.0.1:3000`, a aplicação só escuta localmente na máquina. Essa é a configuração recomendada quando existe NGINX na frente.

### Variáveis úteis

Algumas variáveis importantes para operação:

```dotenv
ROOT_URL=https://app.seudominio.com
APP_PORT=127.0.0.1:3000
DEFAULT_ADMIN_USERNAME=Administrador
DEFAULT_ADMIN_EMAIL=admin@seudominio.com
DEFAULT_ADMIN_PASSWORD=troque-esta-senha
MAIL_URL_SMTP=smtp://usuario:senha@smtp.exemplo.com:587
MAIL_NO_REPLY=no-reply@seudominio.com
MAIL_SYSTEM=contato@seudominio.com
CORS_ORIGINS=https://app.seudominio.com
```

Não versionar arquivos com senhas, tokens ou credenciais reais. Em produção, prefira configurar segredos no ambiente da máquina, no painel do provedor ou em um gerenciador de secrets.

### Comandos disponíveis

```bash
npm run docker:dev
npm run docker:dev:detached
npm run docker:prod
npm run docker:prod:detached
npm run docker:logs:dev
npm run docker:logs:prod
npm run docker:down
npm run docker:down:volumes
```

## Publicando em VPS, Droplet ou VM na nuvem

Este roteiro considera uma VM Linux, como Ubuntu Server LTS, com um domínio apontando para o IP público da máquina.

### 1. Preparar DNS

Crie um registro `A` no DNS apontando para o IP da VM:

```text
app.seudominio.com -> IP_DA_VM
```

Aguarde a propagação e valide:

```bash
dig app.seudominio.com
```

### 2. Preparar a máquina

Atualize o sistema e instale os pacotes básicos:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git nginx ufw dnsutils snapd
```

Instale Docker Engine e Docker Compose Plugin conforme a documentação oficial do Docker. Em seguida, habilite o serviço:

```bash
sudo systemctl enable --now docker
```

Opcionalmente, adicione seu usuário ao grupo `docker` para executar comandos sem `sudo`:

```bash
sudo usermod -aG docker $USER
```

Depois disso, saia da sessão SSH e entre novamente.

### 3. Baixar e configurar a aplicação

Clone o projeto em uma pasta de deploy:

```bash
sudo mkdir -p /opt/apps
sudo chown -R $USER:$USER /opt/apps
cd /opt/apps
git clone URL_DO_REPOSITORIO meteor-react-base
cd meteor-react-base
```

Crie um arquivo `.env` para o Compose:

```dotenv
ROOT_URL=https://app.seudominio.com
APP_PORT=127.0.0.1:3000
```

Revise o `settings.json` e configure integrações reais de e-mail, Google, Facebook e mapas quando forem usadas. Em uma instalação nova, troque a senha do administrador padrão imediatamente após o primeiro login ou configure `DEFAULT_ADMIN_PASSWORD` antes da primeira inicialização.

Suba a aplicação:

```bash
docker compose -f docker-compose.yml up -d --build
```

Verifique:

```bash
docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs -f app
```

### 4. Configurar NGINX como proxy reverso

Crie o arquivo:

```bash
sudo nano /etc/nginx/sites-available/meteor-react-base
```

Conteúdo sugerido:

```nginx
map $http_upgrade $connection_upgrade {
	default upgrade;
	'' close;
}

server {
	listen 80;
	server_name app.seudominio.com;

	client_max_body_size 20m;

	location / {
		proxy_pass http://127.0.0.1:3000;
		proxy_http_version 1.1;

		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $connection_upgrade;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;

		proxy_read_timeout 120s;
		proxy_send_timeout 120s;
	}
}
```

Habilite o site:

```bash
sudo ln -s /etc/nginx/sites-available/meteor-react-base /etc/nginx/sites-enabled/meteor-react-base
sudo nginx -t
sudo systemctl reload nginx
```

Esses cabeçalhos são importantes para preservar `Host`, IP real, protocolo original e WebSocket/DDP do Meteor.

### 5. Habilitar HTTPS com Let's Encrypt

Instale o Certbot com suporte ao NGINX usando o método recomendado para sua distribuição. Em Ubuntu, o fluxo comum via Snap é:

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/bin/certbot
```

Emita o certificado:

```bash
sudo certbot --nginx -d app.seudominio.com
```

Teste a renovação automática:

```bash
sudo certbot renew --dry-run
```

Após o certificado ser emitido, confirme que o `.env` usa HTTPS:

```dotenv
ROOT_URL=https://app.seudominio.com
APP_PORT=127.0.0.1:3000
```

Recrie a aplicação se alterar o `.env`:

```bash
docker compose -f docker-compose.yml up -d --build
```

### 6. Firewall e segurança básica

Ative um firewall permitindo apenas SSH, HTTP e HTTPS:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

Boas práticas recomendadas:

- usar login SSH por chave, não por senha;
- desabilitar login direto do usuário `root`;
- manter sistema, Docker, NGINX e imagens atualizados;
- não expor MongoDB publicamente;
- não publicar porta `3000` para a internet quando NGINX estiver na frente;
- usar senhas fortes e únicas para o administrador inicial;
- guardar `.env`, `settings.json` real e backups fora do Git;
- limitar origens em `CORS_ORIGINS` quando APIs externas forem usadas;
- revisar logs periodicamente com `docker compose logs` e `journalctl -u nginx`;
- configurar monitoramento de disco, CPU, memória e disponibilidade.

Antes de desabilitar senha SSH ou login root, abra uma segunda sessão SSH e confirme que consegue entrar por chave. Isso evita ficar bloqueado fora da VM.

### 7. Atualização de versão

Para publicar uma nova versão:

```bash
cd /opt/apps/meteor-react-base
git pull
docker compose -f docker-compose.yml up -d --build
docker image prune -f
```

### 8. Backup e restauração

Crie uma pasta de backups:

```bash
mkdir -p backups
```

Backup do MongoDB:

```bash
docker compose -f docker-compose.yml exec mongo mongodump --archive=/tmp/meteor-react-base.archive.gz --gzip --db meteor-react-base
docker compose -f docker-compose.yml cp mongo:/tmp/meteor-react-base.archive.gz ./backups/meteor-react-base.archive.gz
```

Backup dos uploads:

```bash
docker run --rm -v meteor-react-base-prod_app_uploads:/data -v "$PWD/backups:/backup" busybox tar czf /backup/uploads.tar.gz -C /data .
```

Restauração do MongoDB:

```bash
docker compose -f docker-compose.yml exec -T mongo mongorestore --gzip --archive --drop < ./backups/meteor-react-base.archive.gz
```

Restauração dos uploads:

```bash
docker run --rm -v meteor-react-base-prod_app_uploads:/data -v "$PWD/backups:/backup" busybox sh -c "cd /data && tar xzf /backup/uploads.tar.gz"
```

Valide periodicamente se os backups restauram corretamente em uma máquina de homologação. Backup sem teste de restauração é apenas uma hipótese otimista.

### Referências oficiais úteis

- Docker Compose em produção: https://docs.docker.com/compose/how-tos/production/
- Variáveis de ambiente no Docker Compose: https://docs.docker.com/compose/environment-variables/
- NGINX como proxy reverso: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
- Certbot para NGINX: https://certbot.eff.org/instructions
- OpenSSH no Ubuntu Server: https://ubuntu.com/server/docs/how-to/security/openssh-server/

## Trabalhando com módulos

O projeto organiza as funcionalidades em módulos localizados em `/imports/modules`. Cada módulo agrupa componentes, rotas e APIs relacionadas.

### Estrutura de um módulo

```
/imports/modules/<nome-do-modulo>
├── api        # Classes de API, schemas e acesso ao banco
├── components # Componentes reutilizáveis do módulo
├── config     # Rotas, menus e recursos
├── pages      # Telas apresentadas ao usuário
└── <nome>Container.tsx  # Container principal do módulo
```

### Registro de módulos

Após criar um módulo, importe sua configuração em `/imports/modules/index.ts` e inclua suas rotas e menus:

```ts
import MeuModulo from './meumodulo/config';

const pages = [
	...MeuModulo.pagesRouterList
	// outros módulos
];

const menuItens = [
	...MeuModulo.pagesMenuItemList
	// outros módulos
];
```

Registre a API do módulo no servidor em `/imports/server/registerApi.ts`:

```ts
import '../modules/meumodulo/api/meumoduloServerApi';
```

### Gerando um módulo

A criação e modificação de módulos são tarefas primárias do Agente de IA integrado. Ao solicitar, por exemplo, "Criar um módulo para gerenciar 'Produtos' com campos 'nome', 'preço' e 'descrição'", o Agente **executará diretamente** as seguintes ações: gerar a estrutura de pastas, definir schemas, APIs, configurações e registrar o módulo nos arquivos centrais. Para detalhes sobre como o Agente opera e os arquivos que ele modifica, consulte o [`docs/ai-agent-guide.md`](docs/ai-agent-guide.md) e para a estrutura detalhada que ele segue, veja [`ai_agent/module_creation_standard.md`](ai_agent/module_creation_standard.md).

Para um entendimento completo do processo de geração e como customizar um módulo após sua criação, consulte:

- [`docs/module-generator.md`](docs/module-generator.md): Descreve o processo de geração de módulos pelo Agente de IA.
- [`docs/customizing-modules.md`](docs/customizing-modules.md): Guia para ajustar e personalizar módulos.
- [`docs/ai-agent-guide.md`](docs/ai-agent-guide.md): Documentação completa sobre como interagir com o Agente de IA para esta e outras tarefas.
- [`ai_agent/module_creation_standard.md`](ai_agent/module_creation_standard.md): A especificação técnica detalhada que o Agente de IA segue para criar módulos.

Após a geração pelo Agente, você pode revisar e refinar o módulo conforme necessário, seguindo as orientações nos documentos acima.

### Customizando a Aparência Inicial

Para dar rapidamente uma identidade visual ao seu novo produto:

*   **Logo:** Substitua os arquivos de logo em `public/images/wireframe/` (especialmente `logo.png` e `synergia-logo.svg`) pelos seus.
*   **Cores Primárias:** Edite `imports/ui/materialui/sysColors.ts` para ajustar `sysLightPalette.primary.main` e outras cores do tema. Veja `docs/ui-customization.md` para detalhes completos.
*   **Fonte Principal:** Modifique `imports/ui/materialui/sysFonts.ts`.

Consulte [`docs/ui-customization.md`](docs/ui-customization.md) para um guia completo sobre personalização da UI.

### Suporte offline

Esta base integra os pacotes `jam:offline` e `jam:archive` para permitir que chamadas de método e dados de assinaturas sejam mantidos quando a aplicação estiver sem conexão. Quando o usuário volta a ficar online, as operações pendentes são processadas automaticamente.

Para utilizar o sistema quando não houver conexão com a internet, registre o service worker logo na inicialização da aplicação:

```ts
import '/client/serviceWorker';
```

Personalize o arquivo [`public/sw.js`](public/sw.js) conforme sua necessidade. Ele foi baseado no projeto [pwa-kit](https://github.com/SalesforceCommerceCloud/pwa-kit) e pode ser ajustado para definir quais recursos serão armazenados em cache.

As chamadas feitas durante o período offline são armazenadas e serão enviadas automaticamente quando a conexão for restabelecida. Basta executar `JamOffline.process()` para sincronizar as operações pendentes.

Mais detalhes sobre o funcionamento do service worker e estratégias de cache podem ser encontrados no repositório do PWA kit.

## Renderização no servidor

Alguns módulos podem servir conteúdo otimizado para SEO. O diretório [`imports/ssr`](imports/ssr) reúne as funções para detectar crawlers e renderizar páginas em HTML. O módulo **ArchiText** é um exemplo prático: suas rotas em [`shareRoutes.ts`](imports/modules/architext/server/shareRoutes.ts) devolvem HTML completo quando o acesso é feito por robôs ou via `/share/artigos/:id`. Consulte [`docs/ssr.md`](docs/ssr.md) para implementar fluxos semelhantes em outros módulos.

## Testes

Execute os testes unitarios com:

```bash
npm run test
```

Para rodar os testes de integracao do Cypress utilize:

```bash
npm run cypress:headless
```

## Próximos Passos / Para Onde Ir Agora?

*   **Entender a fundo a criação de módulos:** Leia [`docs/module-generator.md`](docs/module-generator.md) (como o Agente IA cria) e [`ai_agent/module_creation_standard.md`](ai_agent/module_creation_standard.md) (a especificação técnica).
*   **Customizar a UI em detalhes:** Mergulhe em [`docs/ui-customization.md`](docs/ui-customization.md).
*   **Explorar a arquitetura de dados:** Consulte [`docs/architecture.md`](docs/architecture.md).
*   **Precisa de uma funcionalidade específica?** Veja os guias em `docs/` para SSR, offline, anexos, etc.
*   **Preparando para produção?** Confira o novo [`docs/deployment-guide.md`](docs/deployment-guide.md).
*   **Fluxos de desenvolvimento comuns?** Veja [`docs/typical-developer-workflows.md`](docs/typical-developer-workflows.md).

## Contribuindo

Utilize `npm run precommit` para aplicar o Prettier antes de enviar suas alteracoes.

## Documentação complementar

O diretório [`docs/`](docs/) contém referências adicionais, incluindo os guias mencionados acima e:

- [`docs/architecture.md`](docs/architecture.md) – detalhes da camada de dados.
- [`docs/customizing-modules.md`](docs/customizing-modules.md) – passos para personalizar o módulo recém-criado.
- [`docs/attachments.md`](docs/attachments.md) – gerenciamento de uploads com `ostrio:files`.
- [`docs/analytics.md`](docs/analytics.md) – como capturar eventos de navegação e métodos.
- [`docs/coding-patterns.md`](docs/coding-patterns.md) – resumo de padrões de código e arquitetura.
