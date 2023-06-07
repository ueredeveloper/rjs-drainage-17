# Revisões

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

03/03/2023
 * Saulo <br>
    1. Alterar o nome dos poços para:<br>
        a. Manual para Manual/Tubular Raso. <br>
        b. Tubular para tubular profundo
    2. Colocar o nome da UH na Análise.
    3. Alterar o título para balanço hídrico
    4. Retirar a barra de porcentagem
    5. Valores no Chart Bar.<br>
        a. Q explotável (m3/ano)<br>
        b. Q outorgada (m3/ano)<br>
        c. Q disponível (m3/ano)<br>
        d. Q solicitada (m3/ano)<br>
    6. Pergunta
        * Há disponibilidade? <br>
            - Cálculo: 
                * q_disponiveL < q_solicitada = NÃO
                * q_disponivel > q_solicitada = SIM

07/03/2023

1. Botão para duplicar vazao, por exemplo 10 poços com a mesma vazao, porém não pode ser em subsistemas diferentes.2
2. Também mais de um poco no mesmo subsistema com vazões diferentes.

09/03/23

1. Front 
    mudar nome site na tag head
    - 15/05/2023 resolvido.
    Mudei para RJS SAD-DF

2. Bar chart 
    retirar escala logaritma
    18/05/2023 resolvido
        adicionei botão de escolha, se logarítmica ou não.

3. Calculos
    rever somatorio de vazoes dos usuario com as vazoes dos usuarios cadastrados
    18/05/2023 resolvido.

4. Readme 
    renomear readme
        resolvido, criado reviews.md.

5. Adicionar título na análise com o nome da bacia e sub-bacia (uh) e código.
    a. ex: Bacia  Paranoá, UH Riacho Fundo (056_18_R3/Q3)
    -18/05/2023 resolvido.

6. Verificar registros repetidos, a pesoa pesquisou um poço que já está na disponibilidade.
    -18/05/2023
        O próprio técnico pode verificar e retirar do cálculo algum registro.
7.  Adicionar dois tipos de barra (normal e logarítima).
    -17/05/2023 resolvido.

8. Adicionar infowindow com informações da outorga.

9. Poder selecionar várias demandas.

10. Atualizar os pontos no mapa, a análise de disponibilidade e o chart de balanço hídrico ao selecionar pontos na tabela pontos outorgados.
    - 17/05/2023 - resolvido
    O pontos estão aparecendo conforme seleção na tabela de pontos outorgados. Também foi adicionado de a tabela de outorgas inicializar com tudo selecionado, que é o habitual, em poucas vezes será retirado um ponto da tabela.

11. Pesquisar pelo código do sistema a porcentagem utilizada, disponibilidade.
    - 15/05/2023 - Isto pode ser feito pesquisando uma coordenada. Ao pesquisar mostrará o subsistema, vazão utilizada neste subsistema etc...
   
12. Botão para escolher Chart Bar logarítmica ou não
    - 15/05/2023 - Solucionado.

13. Voltar com o botão Fade - loading - ao inserir uma vazão


Lembrete (12/04/2023): 
    Retirar ao atualizar
        busca de usuário: Retirar nome fictício, CIPLAN.
        mapa: Colocar na posição parar de desenhar
        points.js: retirar este arquivo


14. Total outorgada ao ano
    - Valor com muitas casas decimais, ex: 850.618,9789999999
        - Rever função numberWithCommas