# FullStack Afiliados SPA

This is a challenge by [Coodesh](https://coodesh.com/)

## Descrição

Aplicação desenhada para providenciar uma entrada de arquivos de texto no formato `txt`, capturar, analisar, guardar e exibir a informação contida em dito arquivo.

## Tecnologias e ferramentas utilizadas

- react
- javascrip
- html
- css
- yarn
- github

## Para que serve?

A empresa que solicitou esta aplicação teve um incremento no número de transações e estas transações precisam ser registradas e analisadas. O ingreso manual de informação leva muito tempo e ainda aumenta o risco de informação omitida ou mal ingresada.

Esta aplicação captura toda esta informação contida no `arquivo.txt`:

- separa o texto por linhas
- divide os dados de cada linha
- cria objetos `{chave: valor}`
- guarda a informação na entidade correspondente e
- apresenta na tela toda essa informação de uma forma ordenada e compreensível, de tal forma que possa ser analisada e assimilada ao máximo.

Sendo assim, em resposta a esta pergunta, esta aplicação vem para agilizar todo esse procedimento, com todos os beneficios que significam o poupar tempo e recursos. Se faz necessário salientar o fato de que o `arquivo.txt` tem o layout predeterminado, o que significa que qualquer alteração em dito layout pode fazer que a aplicação devolva informação defeituosa.

## Como funciona?

Uma vez que o usuario acessa a aplicação, deve fazer login e automáticamente é direcionado à tela principal onde tem um butão para carregar o `arquivo.txt` e outro butão para enviar a informação. Pronto!

### Login?

Sim, mesmo que não era prioridade ter uma verificação de usuário, a aplicação inicia com um formulário de Login onde o usuário e senha por defeito é `admin`. Nas condições atuais, a aplicação, cadastra usuários sem cadastrar senha somente via `arquivo.txt`, porém, o único usuário autorizado para utilizar a aplicação é o `admin`.

![login](public/fullstack-afiliados-login.png)

Logo depois de fazer login, é apresentada a tela contendo todas as transações recebidas do `arquivo.txt`, na primeira coluna temos a data do movimento, na segunda coluna temos o tipo de movimento : Entrada ou saída. Na coluna central temos os produtos, seguida da coluna do preço e por último a coluna dos vendedores. Nesta tabela não se mostra o total.

![all-movements](public/fullstack-afiliados-all.png)

Se clicar em `Agrupados por Produto` vai ativar a aba mostrando um relatório de movimentos por produto onde vai ter em destaque a descrição do produto, o dono do produto e a renda total por dito produto.

![by-product](public/fullstack-afiliados-by-product.png)

Ativando a aba `Agrupados por Vendedor` vai ter em destaque o nome de cada produtor/afiliado e a renda total para cada um deles.

![by-user](public/fullstack-afiliados-by-user.png)

Em todas as abas a informação está ordenada pela data de forma ascedente. Sem importar qual seja a aba ativa, o usuário pode escolher e enviar outro `arquivo.txt`, igualmente pode sair da aplicação clicando no butão `SAIR`.
