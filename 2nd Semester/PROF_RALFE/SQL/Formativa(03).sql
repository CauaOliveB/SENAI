/*
1. (emprestimo) Consulte a data de solicitação, valor solicitado e se o emprestimo foi 
("Aprovado" quando 1) ou ("Negado" quando 0) nomeando essa coluna como "Analise".
*/

/*
alter table emprestimo rename column aprovado to Analise;  
select data_solicitacao, valor_solicitado ,Analise from emprestimo;
*/


/*
2. (contato) Consulte todos os números de telefones e suas respectivas observações.
Caso não haja observações apresente "Nada consta".
*/



/*
3. (cartao, bandeira) Consulte os numeros dos cartões, suas validades e bandeiras. Apresente o resultado 
em ordem crescente de bandeiras e para cada bandeira em ordem decrescente de validade
*/


-- alter table bandeira rename column descricao to bandeira;

/*
select numero,descricao as bandeira, validade 
from bandeira, cartao 
order by bandeira asc, validade desc; 
*/

/*
4. (movimentacao, operacao) Consulte a operação e o valor dos três maiores creditos movimentados. 
Apresente os valores formatados como reais.
*/

/*
select 
		operacao.descricao as operacao,
		concat('R$', format(movimentacao.valor, 2, 'PT-BR')) as valor
    from movimentacao
    join operacao on movimentacao.codigo_operacao = operacao.codigo
    where operacao.descricao = 'Crédito'
    order by movimentacao.valor desc
    limit 3;
*/

/*
5. (investimento, investimento_tipo) Qual o menor valor investido em ações
*/

/*
select aporte from investimento
order by investimento.aporte asc
limit 1;
 */

/*
6. (cliente) Consulte o nome, a data de nascimento/abertura e a idade (em anos) das pessoas e das 
empresas
 */
 
/*
 select nome_razaosocial as nome,
 datanascimento_abertura as data_de_nascimeto_abertura,
 timestampdiff (year, datanascimento_abertura, curdate()) as idade
 from cliente;
*/

/*
7. (empréstimo_parcela) Consulte quantas parcelas faltam para quitar o emprestimo de código 5.
*/

/*
select count(*) as parcelas_futuras
from emprestimo_parcela
where codigo_emprestimo = 5 and data_pagamento is null;
*/

/*
 8. (conta, conta_tipo) Consulte o menor e o maior limite das contas correntes ativas.
*/

/*
 select min(limite), max(limite) 
 from conta
 join conta_tipo on conta.codigo_conta_tipo = conta_tipo.codigo
 where conta_tipo.descricao = 'corrente' and conta.ativa = True;
 */
 
 /*
 9. (movimentação, operacao) Consulte a média de valores movimentados por operação.
  */
  
   /*
  select 
  operacao.descricao,
  avg(movimentacao.valor) as valor_medio
  from movimentacao
  join operacao on movimentacao.codigo_operacao = operacao.codigo
  group by operacao.descricao
 */
 
   /*
 10. (emprestimo_parcela) Consulte os valores totais pagos em cada emprestimo.
  */
  
select
codigo_emprestimo,
sum(valor_pago) as total
from emprestimo_parcela
where valor_pago is not null
group by codigo_emprestimo
  