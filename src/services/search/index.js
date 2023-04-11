

const njs_azure_url = `https://njs-azure.ueredeveloper.repl.co`;
/**
* Buscar a shape solicitada no servidor
* @param shape Pode ser os valores 'hidrogeo_fraturado' ou 'hidrogeo_poroso'
*
  */
export async function getUsers (us_nome, us_cpf_cnpj, doc_sei, proc_sei) {

    let response = await fetch(njs_azure_url + `/getUsuarios?us_nome=${us_nome}&us_cpf_cnpj=${us_cpf_cnpj}&doc_sei=${doc_sei}&proc_sei=${proc_sei}`, {
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
  