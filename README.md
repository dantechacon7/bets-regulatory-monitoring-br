# SPA Bets Whitelist Pipeline 🇧🇷

Automated pipeline to extract, clean and publish the official whitelist of regulated betting companies in Brazil (SPA/MF).

This project was designed to support **Compliance, Risk and Anti-Money Laundering (PLD)** workflows by providing a structured and reliable dataset of authorized betting operators.

---

## 📌 Context

The Brazilian Ministry of Finance (SPA/MF) publishes the official list of authorized betting companies via a public webpage.

However:

* There is **no public API** for structured access
* Data is provided as a **CSV embedded in HTML**
* The file has **hierarchical inconsistencies** (missing repeated fields)

This project solves that by building a **data extraction and normalization pipeline**.

---

## ⚙️ How it works

The pipeline is implemented using **Google Apps Script** and follows three steps:

### 1. Extract

* Access SPA webpage
* Identify CSV link dynamically
* Download raw dataset

### 2. Transform

* Reconstruct hierarchical relationships (company ↔ brand ↔ domain)
* Normalize CNPJ (numbers only)
* Fill missing values using memory logic
* Extract brand names from domains when necessary
* Fix encoding issues

### 3. Load

* Publish cleaned dataset into Google Sheets
* Apply formatting for usability and joins

---

## 🧠 Key Features

* Hierarchical data reconstruction (no orphan records)
* CNPJ normalization for database joins
* Intelligent fallback for missing brand names
* Encoding sanitization (UTF-8 fixes)
* Ready for compliance monitoring workflows

---

## 📊 Data Model

| Field              | Description                     | Purpose               |
| ------------------ | ------------------------------- | --------------------- |
| ID                 | Authorization identifier        | Audit tracking        |
| PORTARIA           | Official authorization document | Legal validation      |
| DENOMINAÇÃO SOCIAL | Company legal name              | Entity identification |
| CNPJ               | Company identifier              | Primary key for joins |
| MARCAS             | Brand names                     | Transaction matching  |
| DOMÍNIOS           | Authorized domains              | Fraud detection       |
| REQUERIMENTO       | Request protocol                | Temporal tracking     |

---

## 🚨 Use Cases

* Detect unauthorized betting operators
* Monitor suspicious transaction patterns
* Cross-check merchants against regulated entities
* Identify brand impersonation attempts

---

## 📂 Project Structure

```
apps_script/     → Google Apps Script implementation
docs/            → Technical documentation
data_sample/     → Example output dataset
```

---

## ▶️ How to use

1. Open Google Sheets
2. Go to Extensions → Apps Script
3. Paste the script from:

```
apps_script/importarAutorizadasFinal.gs
```

4. Update:

```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
```

5. Run the function:

```javascript
importarAutorizadasFinal()
```

6. (Optional) Set a daily trigger for automatic updates

---

## ⚠️ Limitations

* No official API available from SPA/MF
* Depends on HTML structure of government page
* Changes in webpage may require script updates

---

## 🔒 Compliance Note

This project is intended for:

* Risk analysis
* Regulatory monitoring
* Internal compliance workflows

It does not replace official regulatory sources.

---

## 👤 Author

Dante Chacon

---

## 📄 License

MIT License
