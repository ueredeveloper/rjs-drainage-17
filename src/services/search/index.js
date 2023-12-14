const url = 'https://njs-drainage.ueredeveloper.repl.co';

/**
* Buscar a shape solicitada no servidor
* @param us_nome Nome do usuário de recursos hídricos.
* @param us_cpf_cnpj CPF ou CNPJ do usuário de recursos hídr
* @param doc_sei Número do documento no portal SEI.
* @param proc_sei Número do processo.
*
  */
export async function getUsers (us_nome, us_cpf_cnpj, doc_sei, proc_sei) {

    let response = await fetch(url + `/azure/getUsuarios?us_nome=${us_nome}&us_cpf_cnpj=${us_cpf_cnpj}&doc_sei=${doc_sei}&proc_sei=${proc_sei}`, {
      method: 'GET',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      }
  
    }).then(res => {
      return res.json();
    })
    return response;
  }
  