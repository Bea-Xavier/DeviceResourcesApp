# 📱 DeviceResourcesApp — Aplicativo de Recursos Nativos do Dispositivo

Esta é uma aplicação mobile desenvolvida em **React Native com Expo** para explorar e demonstrar o uso de recursos nativos do dispositivo, como câmera, galeria de fotos e agenda de contatos. O app permite selecionar imagens diretamente da câmera ou da galeria, listar os contatos salvos no aparelho e iniciar uma ligação telefônica para o contato desejado com um único toque.

---

## 📋 Descrição do Projeto

O aplicativo integra três recursos nativos distintos do dispositivo, cada um encapsulado em seu próprio componente reutilizável, exibidos juntos na tela principal.

### Como o problema foi resolvido

A aplicação foi dividida em componentes independentes, cada um responsável por um recurso nativo:

- **Seleção de imagens:** o componente `ImagePickerComponent` utiliza o módulo **expo-image-picker** para oferecer ao usuário a escolha entre tirar uma foto pela câmera ou selecionar uma já existente na galeria, por meio de um `Alert` de confirmação. As permissões de câmera e galeria são solicitadas individualmente, apenas no momento em que são necessárias, e a imagem selecionada é exibida na tela logo abaixo do botão.

- **Listagem e ligação para contatos:** o componente `ContactsComponent` utiliza o módulo **expo-contacts** para solicitar permissão de acesso à agenda e carregar todos os contatos do dispositivo, exibindo nome, telefone(s) e e-mail(s) em uma `FlatList`. Ao tocar em um contato da lista, o app aciona o módulo **Linking**, nativo do React Native, que abre o discador do sistema já com o número preenchido (`tel:`), permitindo iniciar a ligação sem sair do fluxo do aplicativo.

- **Permissões:** todas as permissões necessárias (câmera, galeria, contatos) estão declaradas no `app.json`, tanto para iOS (`infoPlist`) quanto para Android (`permissions`), garantindo que o sistema operacional exiba corretamente os diálogos de autorização em cada plataforma.

---

## ⚙️ Funcionalidades

💠 **Seleção de imagem via câmera** — captura uma foto diretamente pelo dispositivo, com solicitação de permissão em tempo real;

💠 **Seleção de imagem via galeria** — escolhe uma imagem já existente na biblioteca de mídia do dispositivo;

💠 **Pré-visualização da imagem** selecionada, exibida instantaneamente na tela;

💠 **Listagem de contatos** salvos no dispositivo, com nome completo, telefone(s) e e-mail(s);

💠 **Recarregar contatos** sob demanda, com botão dedicado;

💠 **Ligação direta para o contato** — toque em qualquer contato da lista para abrir o discador nativo já com o número preenchido;

💠 **Tratamento de permissões negadas** e de erros no carregamento, com feedback via `Alert` em todos os fluxos.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **React Native** | Construção da interface mobile |
| **Expo** | Ambiente de desenvolvimento e execução do app |
| **expo-image-picker** | Acesso à câmera e à galeria de fotos |
| **expo-contacts** | Leitura da agenda de contatos do dispositivo |
| **Linking (React Native)** | Abertura do discador nativo para ligação telefônica |

💠 React Native &nbsp;|&nbsp; 💠 Expo &nbsp;|&nbsp; 💠 expo-image-picker &nbsp;|&nbsp; 💠 expo-contacts

[![My Skills](https://skillicons.dev/icons?i=git,nodejs,js,npm,vscode&theme=dark)](https://skillicons.dev)

---

## 🖥️ Configuração do Ambiente

Antes de começar, certifique-se de ter instalado em sua máquina:

- [**Node.js**](https://nodejs.org/en) (versão recomendada: LTS)
- [**Expo Go**](https://expo.dev/client) instalado no seu celular (Android ou iOS)
- **npm** (já vem junto com o Node.js)

---

## 📦 Instalação

**1.** Clone o repositório:

```bash
git clone https://github.com/Bea-Xavier/DeviceResourcesApp.git
cd DeviceResourcesApp
```

**2.** Instale as dependências:

```bash
npm install
```

**3.** Instale as dependências nativas necessárias:

```bash
npx expo install expo-image-picker
npx expo install expo-contacts
```

> ℹ️ O módulo `Linking`, usado para acionar o discador, já vem embutido no React Native — não é necessário instalá-lo separadamente.

---

## ▶️ Execução

### 1. Iniciar o aplicativo

```bash
npx expo start --tunnel
```

Será gerado um **QR Code** no terminal. Abra o **Expo Go** no seu celular e escaneie para rodar o app.

### 2. Conceder as permissões

Ao interagir com cada recurso pela primeira vez (câmera, galeria ou contatos), o sistema operacional exibirá um diálogo de permissão — aceite para que o componente correspondente funcione corretamente.

---

## 📌 Considerações Finais

- Cada recurso nativo foi implementado como um componente independente e reutilizável, facilitando a manutenção e a adição de novos recursos no futuro.
- As permissões são solicitadas individualmente, no momento do uso de cada funcionalidade, seguindo as boas práticas recomendadas pela Expo.
- A ligação para o contato utiliza o esquema de URL `tel:`, que no iOS exige confirmação do usuário antes de discar (restrição do próprio sistema) e no Android abre o discador já com o número preenchido.
- Para testar localmente sem celular, é possível usar um emulador Android/iOS junto com o Expo — a funcionalidade de ligação, porém, depende de um dispositivo físico com suporte a chamadas.

---

## 👩‍💻 Autora

*Nome:* [Beatriz V. Xavier](https://github.com/Bea-Xavier)

---

## 📄 Licença

Este projeto é desenvolvido apenas para fins acadêmicos e de estudo. 🚀
