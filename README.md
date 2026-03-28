# SPA Bets Whitelist Pipeline 🇧🇷

Pipeline automatizado para extração, tratamento e disponibilização da lista oficial de empresas de apostas autorizadas no Brasil, publicada pela Secretaria de Prêmios e Apostas (SPA/MF).

O projeto foi desenvolvido para suportar áreas de **Compliance, Risco e Prevenção à Lavagem de Dinheiro (PLD)**, garantindo uma base confiável e estruturada de operadores regulados.

---

## 📌 Contexto

A SPA/MF disponibiliza a lista de empresas autorizadas por meio de uma página pública.

Entretanto:

* Não existe **API pública de consulta**
* Os dados são fornecidos via **CSV embutido em HTML**
* O arquivo possui **estrutura hierárquica inconsistente** (campos omitidos em linhas subsequentes)

Este projeto resolve essas limitações construindo um pipeline de **extração e normalização de dados**.

---

## ⚙️ Como funciona

O pipeline foi implementado em **Google Apps Script** e segue três etapas principais:

### 1. Extração

* Acessa a página oficial da SPA
* Identifica dinamicamente o link do CSV
* Realiza o download do arquivo bruto

### 2. Transformação

* Reconstrói a hierarquia (empresa → marca → domínio)
* Normaliza o CNPJ (somente números)
* Preenche campos ausentes com base em memória da última linha válida
* Aplica fallback para marcas a partir do domínio
* Corrige problemas de encoding

### 3. Carga

* Publica os dados tratados no Google Sheets
* Aplica formatação para facilitar análise e integrações

---

## 🧠 Principais diferenciais

* Reconstrução hierárquica (evita registros órfãos)
* Padronização de CNPJ para joins confiáveis
* Fallback inteligente de marca via domínio
* Sanitização automática de caracteres
* Estrutura pronta para uso em monitoramento de risco

---

## 📊 Modelo de dados

| Campo              | Descrição                    | Função                   |
| ------------------ | ---------------------------- | ------------------------ |
| ID                 | Identificador da autorização | Auditoria                |
| PORTARIA           | Número da portaria           | Validação legal          |
| DENOMINAÇÃO SOCIAL | Razão social                 | Identificação da empresa |
| CNPJ               | CNPJ numérico                | Chave principal          |
| MARCAS             | Nomes fantasia               | Matching de transações   |
| DOMÍNIOS           | URLs autorizadas             | Detecção de fraude       |
| REQUERIMENTO       | Protocolo                    | Controle temporal        |

---

## 🚨 Casos de uso

* Identificação de bets não autorizadas
* Monitoramento de transações suspeitas
* Cruzamento com base de merchants
* Detecção de tentativa de fraude por similaridade de marca

---

## 📂 Estrutura do projeto

```
apps_script/     → Script principal em Google Apps Script
docs/            → Documentação técnica
data_sample/     → Exemplo de saída do pipeline
```

---

## ▶️ Como utilizar

1. Abra o Google Sheets
2. Vá em **Extensões → Apps Script**
3. Copie o conteúdo de:

```
apps_script/importarAutorizadasFinal.gs
```

4. Atualize o ID da planilha:

```javascript
const SPREADSHEET_ID = 'SEU_SPREADSHEET_ID';
```

5. Execute a função:

```javascript
importarAutorizadasFinal()
```

6. (Opcional) Configure um gatilho diário para atualização automática

---

## ⚠️ Limitações

* Não há API oficial disponível pela SPA/MF
* Dependência da estrutura HTML da página
* Mudanças no site podem exigir ajustes no script

---

## 🔒 Observação de Compliance

Este projeto tem finalidade de:

* Monitoramento regulatório
* Apoio à análise de risco
* Estruturação de dados para PLD

Não substitui fontes oficiais do governo.

---

## 👤 Autor

Dante Chacon

---

## 📄 Licença

MIT License
