function importarAutorizadasFinal() {
  const SPREADSHEET_ID = '[INSIRA_AQUI_O_ID_DA_SUA_PLANILHA]'; 
  const NOME_ABA = '[INSIRA_AQUI_O_NOME_DA_ABA]';

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(NOME_ABA) || ss.insertSheet(NOME_ABA);

  const urlPagina = "<https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/lista-de-empresas>";
  
  try {
    const responsePagina = UrlFetchApp.fetch(urlPagina);
    const html = responsePagina.getContentText();
    const csvUrlMatch = html.match(/href="([^"]+\\.csv)"/);
    if (!csvUrlMatch) throw new Error("Link do CSV não encontrado.");
    
    let csvUrl = csvUrlMatch[1];
    if (csvUrl.startsWith('/')) csvUrl = "<https://www.gov.br>" + csvUrl;

    const csvResponse = UrlFetchApp.fetch(csvUrl);
    let csvContent = csvResponse.getContentText("UTF-8");
    csvContent = csvContent.replace(/nÂº/g, "nº").replace(/Âº/g, "º");

    let dadosBrutos = Utilities.parseCsv(csvContent, ";");
    let registros = dadosBrutos.slice(2); 

    const cabecalhoLimpo = ["ID", "PORTARIA DE AUTORIZACAO", "DENOMINACAO SOCIAL", "CNPJ", "MARCAS", "DOMINIOS", "NUMERO E ANO DO REQUERIMENTO"];
    let resultadoFinal = [cabecalhoLimpo];

    let ultimoId = "", ultimaPortaria = "", ultimaEmpresa = "", ultimoCnpj = "", ultimaMarca = "", ultimoReq = "";

    for (let i = 0; i < registros.length; i++) {
      let linhaOriginal = registros[i];
      if (!linhaOriginal[5] && !linhaOriginal[2]) continue;

      // 1. Atualiza memória se for uma nova empresa
      if (linhaOriginal[2] && linhaOriginal[2].trim() !== "") {
        ultimoId = (linhaOriginal[0] || "").trim();
        ultimaPortaria = (linhaOriginal[1] || "").trim();
        ultimaEmpresa = (linhaOriginal[2] || "").trim();
        ultimoCnpj = (linhaOriginal[3] || "").replace(/\\D/g, ''); 
        ultimaMarca = (linhaOriginal[4] || "").trim();
        ultimoReq = (linhaOriginal[6] || "").trim();
      } 
      // 2. Se a linha tem uma nova marca mas não nova empresa, atualiza a marca
      else if (linhaOriginal[4] && linhaOriginal[4].trim() !== "") {
        ultimaMarca = linhaOriginal[4].trim();
      }

      // 3. Lógica de Preenchimento (Hierarquia de Segurança)
      let marcaNaLinha = (linhaOriginal[4] || "").trim();
      let marcaFinal = "";

      if (marcaNaLinha !== "") {
        marcaFinal = marcaNaLinha;
      } else if (ultimaMarca !== "") {
        marcaFinal = ultimaMarca;
      } else {
        // fallback c/ extração do domínio se tudo falhar
        let dominio = (linhaOriginal[5] || "").trim();
        if (dominio.includes(".bet.br")) {
          marcaFinal = dominio.split(".bet.br")[0].toUpperCase();
        }
      }

      let novaLinha = [
        ultimoId,
        ultimaPortaria,
        ultimaEmpresa,
        ultimoCnpj,
        marcaFinal, 
        (linhaOriginal[5] || "").trim(),
        ultimoReq
      ];
      resultadoFinal.push(novaLinha);
    }

    // 4. Escrita na Planilha
    sheet.clear();
    if (resultadoFinal.length > 1) {
      let range = sheet.getRange(1, 1, resultadoFinal.length, cabecalhoLimpo.length);
      range.setValues(resultadoFinal);
      
      // Formatações de segurança
      sheet.getRange(1, 4, resultadoFinal.length).setNumberFormat("@"); // CNPJ como texto
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, cabecalhoLimpo.length).setFontWeight("bold");
      sheet.autoResizeColumns(1, cabecalhoLimpo.length);
      
      // forçando o sheets a atualizar a interface
      SpreadsheetApp.flush(); 
    }
    console.log("Importação concluída.");

  } catch (e) {
    console.error("Erro: " + e.message);
  }
}
