# Anotações sobre o Projeto

## Objetivo

Criar uma plataforma de gestão de lojas.

## Estrutura do Banco de Dados => Inicialmente Classes e Interfaces

- Usuário
- Loja
- Produtos
- Funcionarios
- Categorias
- Pedidos
- Reunioes
- Vendas

## Atualizações dia 31/11/2004

### Validações  

- Validações melhoradas em services como product e store

### Implementações

- Implementação do FileRepository onde usamos para armazenar os dados das classes, instanciamos FileRepository nos services e chamamos metodos especificos criados para cada service!

- Simução de banco de dados com "fs" utilizando arquivo json local para armazenar os dados e manipular!

- Implementações ampliadas de novas classes como User,Cart e Orders

## Atualizações dia 01/12/2004

### Novas implementações

- Modificado FileRepository antes sincrono agora ele funciona de maneira assincrona!
Detalhes: Foi preciso usar o init em vez de um constructor para inicializar o FileRepository, isso porque constructores por padrão não funcionam de maneira assincrona!
- Criados services para User e Employees além de dto e contants completos!

### Novas validações

- Modificado FileRepository, agora possui verificação se o arquivo existe, caso não exista a criação é feita automaticamente, a validação ocorre da seguinte forma, se o erro for do tipo "ENOENT" ele vai criar o arquivo, isso porque esse tipo de erro por padrão representa que o arquivo não existe ou não foi encontrado!

### Modificações finais

- Correções e melhorias no codigo!

## Implementações futuras

- Implementação de um banco de dados

- Implementação de um servidor NestJS

- Implementação de controllers para gerenciamento de endpoints
