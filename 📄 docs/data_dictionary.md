# Dicionário de Dados

## Estrutura da tabela final

### ID

Identificador sequencial da autorização.

---

### PORTARIA DE AUTORIZAÇÃO

Número oficial da portaria publicada pela SPA/MF.

---

### DENOMINAÇÃO SOCIAL

Razão social da empresa autorizada.

---

### CNPJ

Número do CNPJ sem formatação.

Formato:

* Apenas números
* Sem pontos, traços ou barras

---

### MARCAS

Nome fantasia associado à empresa.

Pode ser:

* Diretamente informado no CSV
* Derivado do domínio (.bet.br)

---

### DOMÍNIOS

Lista de domínios autorizados pela SPA.

Utilização:

* Identificação de origem de transações
* Comparação com domínios não autorizados

---

### REQUERIMENTO

Número e ano do protocolo do pedido de autorização.

---

## Observações importantes

* Nenhuma linha fica sem vínculo com CNPJ
* Estrutura pronta para JOIN com bases transacionais
* Campos tratados para evitar inconsistências operacionais
