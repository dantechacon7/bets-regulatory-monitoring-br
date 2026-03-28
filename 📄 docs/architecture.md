# Arquitetura do Pipeline

## Visão geral

O projeto segue um fluxo simples de ETL:

Página da SPA (HTML)
↓
Extração do CSV
↓
Transformação e limpeza
↓
Publicação no Google Sheets

---

## Decisões técnicas

### 1. Ausência de API

Devido à inexistência de uma API pública, a extração é feita diretamente do HTML da página.

---

### 2. Reconstrução hierárquica (lógica de memória)

O CSV apresenta um padrão onde:

* A empresa aparece uma única vez
* Marcas e domínios aparecem em linhas subsequentes
* Campos são omitidos nessas linhas

Solução adotada:

* Armazenar os últimos valores válidos
* Reaplicar nas linhas seguintes

---

### 3. Normalização de dados

* CNPJ convertido para formato numérico
* Correção automática de encoding
* Garantia de integridade relacional

---

## Justificativa do Google Sheets

* Fácil acesso para times de negócio
* Integração rápida com ferramentas internas
* Baixa barreira técnica para consumo

---

## Possíveis evoluções

* Migração para pipeline em Python
* Armazenamento em Data Warehouse
* Criação de API interna
* Monitoramento automático de mudanças na lista
