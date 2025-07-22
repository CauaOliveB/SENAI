'''
1)Faça um código que fale se o ano é bissexto ou não.
ano=int(input("Digite o ano:"))

if ano % 4 == 0:
    print("Ano bissexto!")

else:
    print("Não é bissexto!")
'''

'''
2) Faça uma calculadora de IMC (Índice de Massa Corporal). A partir dos dados do usuário, retorne para ele o IMC e em qual faixa ele está.
peso= float(input("Digite seu peso:"))
altura=float(input("Digite sua altura:"))
imc= peso // altura**2
print("Seu indíce de massa corporal é:" ,imc)

if imc <= 16.9:
    print("Muito abaixo do peso")
elif imc <= 18.4:
    print("Abaixo do peso")
elif imc <= 24.9:
    print("Peso normal")
elif imc <= 29.9:
    print("Acima do peso")
elif imc <= 34.9:
    print("Obesidade grau I")
elif imc <= 40:
    print("Obesidade grau II")
elif imc > 40:
    print("Obesidade grau III")
'''

'''
3) Calculadora de Desconto de Produto. Peça ao usuário que digite a quantidade de produtos a ser adquirido e o valor de cada unidade. 
Caso a quantidade seja superior a 100 dê desconto de 10%, caso contrário dê desconto de 5%. 
Exiba o valor inicial do produto, a quantidade solicitada, o desconto por unidade e o valor final a pagar.

qtdade=int(input("Quantos produtos deseja adquirir:"))
vunidade=qtdade*5
print("R$ -",vunidade)
if qtdade > 100:
    print("Seu valor com desconto é de:" ,vunidade-10/100)

else:
    print("Seu valor com desconto é de:" , vunidade-5/100)
'''

