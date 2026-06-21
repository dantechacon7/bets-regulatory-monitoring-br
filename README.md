# SPA Regulated Operators Pipeline 🇧🇷

Automated pipeline for extracting, transforming, and publishing the official list of regulated betting operators in Brazil, maintained by the Secretariat of Prizes and Betting (SPA/MF).

The project was designed to support **Compliance, Risk, and AML (Anti-Money Laundering)** teams by providing a reliable and structured dataset of authorized operators.

[EN](#en-overview) • [PT-BR](#pt-br-visão-geral)

---

# EN Overview

## 📌 Context

SPA/MF publishes the list of authorized operators through a public webpage.

However:

* No public API is available
* Data is exposed through a CSV embedded in HTML
* The source contains inconsistent hierarchical structures, with omitted values across rows

This project addresses these challenges through an automated extraction and normalization pipeline.

---

## ⚙️ Pipeline Architecture

### 1. Extraction

* Accesses the official SPA webpage
* Dynamically locates the CSV file
* Downloads the raw dataset

### 2. Transformation

* Reconstructs hierarchy (company → brand → domain)
* Standardizes tax IDs (CNPJ)
* Propagates missing values from previous rows
* Applies brand fallback based on domains
* Fixes encoding issues

### 3. Load

* Publishes the processed dataset to Google Sheets
* Applies formatting for analytics and integrations

---

## 🧠 Key Features

* Hierarchical reconstruction to prevent orphan records
* CNPJ standardization for reliable joins
* Intelligent brand fallback using domains
* Automatic character sanitization
* Data structure optimized for AML and risk monitoring

---

## 📊 Data Model

| Field        | Description                 | Purpose                |
| ------------ | --------------------------- | ---------------------- |
| ID           | Authorization identifier    | Auditing               |
| ORDINANCE    | Regulatory ordinance number | Legal validation       |
| COMPANY_NAME | Legal entity name           | Company identification |
| CNPJ         | Standardized tax identifier | Primary key            |
| BRANDS       | Trade names                 | Transaction matching   |
| DOMAINS      | Authorized websites         | Fraud detection        |
| REQUEST_ID   | Registration request        | Temporal tracking      |

---

## 🚨 Use Cases

* Identification of unauthorized betting operators
* Suspicious transaction monitoring
* Merchant database matching
* Brand similarity and fraud detection

---

## ⚠️ Limitations

* No official API is available
* Dependent on the SPA webpage structure
* Changes in the source page may require adjustments

---

## 🔒 Compliance Notice

This project is intended for:

* Regulatory monitoring
* Risk analysis support
* AML data preparation

It does not replace official government sources.

---

## 🔄 Similar Applications

The same approach can be extended to other Brazilian public datasets lacking APIs, such as:

* Central Bank (BCB)
* Securities Commission (CVM)
* National Electric Agency (ANEEL)
* Transparency Portal (CGU)
* Ministry of Education datasets
* Federal Official Gazette (DOU)

---

# PT-BR Visão Geral

## 📌 Contexto

A SPA/MF disponibiliza a lista de operadores autorizados por meio de uma página pública.

Entretanto:

* Não existe API pública
* Os dados são disponibilizados em CSV embutido em HTML
* A estrutura apresenta inconsistências hierárquicas

Este projeto resolve essas limitações por meio de um pipeline de extração e normalização.

---

## ⚙️ Arquitetura

### 1. Extração

* Acessa a página oficial da SPA
* Localiza dinamicamente o arquivo CSV
* Realiza o download dos dados

### 2. Transformação

* Reconstrói a hierarquia (empresa → marca → domínio)
* Padroniza CNPJ
* Propaga valores ausentes
* Aplica fallback de marca baseado em domínio
* Corrige problemas de encoding

### 3. Carga

* Publica os dados em Google Sheets
* Aplica formatação para análises e integrações

---

## 🧠 Principais diferenciais

* Reconstrução hierárquica
* Padronização de CNPJ
* Fallback inteligente de marca
* Sanitização automática
* Estrutura preparada para monitoramento de risco e PLD

---

## 🚨 Casos de uso

* Identificação de operadores não autorizados
* Monitoramento de transações suspeitas
* Cruzamento com bases de merchants
* Detecção de fraude por similaridade de marca

---

## 🔒 Observação de Compliance

Este projeto tem finalidade de:

* Monitoramento regulatório
* Apoio à análise de risco
* Estruturação de dados para PLD

Não substitui fontes oficiais do governo.
