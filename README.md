
# Observações:

23/02/2023 <br>
1. Adicionar o Sistema e Código na tabela de análise: 

| Sistema| Código | Q Explotável (m³/ano) | Nº Poços | ... |
|:---|:---:|:---:|:---:|---: 
| FQM     | FQM_123 |...       |...       | ...|

24/02/2023 <br>
1. Adicinar botão para limpar os dados do usuário na parte de análise. No caso, se adicionar um usuário conta-se mais um dentro da disponibilidade e se não for aquele usuário que a pessoa quer ele tem que subtrair o usuário adicionado para adiiconar aquele usuário que ela realmente quer na disponibilidade.

2. Verificar se o usuário buscado está dentro da shape de disponibilidade solicitada

3. Trabalhando com as cores da página, o objetivo é que a pessoa possa escolher uns três tipos de cores diferentes.
Utilizei o site `https://hue.tools/` para gerar cores para o site.

27/02/2023
1. Está dando evento duplicado, a pessoa procura usuário que já existe no banco, assim pode haver no cálculo a mesma demanda do usuário calculada duas vezes.

2. Verificar cálculo de vazao mensal (m³/mês) pois não está vindo a vírgula.

```
mes: "28"
periodo_d: "28"
tempo_h: "1"
vazao_dia: "4370"
vazao_lh: "4370"
vazao_mh: "4"
vol_max_md: "4"
vol_mensal_mm: "122"

```
O valor da variável `vol_mensal_mm` deveria ser `periodo_d` * `vazao_dia` / 1000 = 122,36.


01/03/2023

Verificar a tabela de vazões editável, está sendo aberto duas linhas (rows) com o clique na linha 2 - tempo(h/dia).



