# 🤖 Sameer's AI Personal Assistant

An AI-powered Personal Assistant built using "Streamlit" and "n8n".

This assistant provides a conversational chat interface while n8n handles workflow automation, AI processing, and external integrations.

---

## ✨ Features

- 💬 AI Chat Assistant
- 📅 Calendar Management
- 📧 Email Reading & Replying
- 📝 Note Taking
- ✅ Task Management
- 💰 Expense Tracking
- 🌐 n8n Workflow Automation
- 🔒 Secure Environment Variables using `.env`
- ⚡ Interactive Streamlit Interface

---

## 🛠️ Tech Stack

- Python
- Streamlit
- n8n Cloud
- Requests
- Python Dotenv

---

## 📂 Project Structure

```
sameer_ai_assistant/
│
├── app.py
├── requirements.txt
├── .gitignore
├── .env.example
├── README.md
├── workflow.json
│
├── assets/
│   ├── home.png
│   ├── chat.png
│   └── architecture.png
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sameer_ai_assistant.git

cd sameer_ai_assistant
```

---

### 2. Create a virtual environment

```bash
python -m venv .venv
```

---

### 3. Activate the virtual environment

Windows

```bash
.venv\Scripts\activate
```

Linux / macOS

```bash
source .venv/bin/activate
```

---

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 5. Configure environment variables

Create a file named

```
.env
```

Copy the contents of

```
.env.example
```

and replace

```
YOUR_N8N_WEBHOOK_URL
```

with your production webhook URL.

---

### 6. Run the application

```bash
streamlit run app.py
```

---

## 📸 Screenshots

### Home Screen

![Home](assets/home.png)

---

### Chat Interface

![Chat](assets/chat.png)

---

## 🏗️ Architecture

![Architecture](assets/architecture.png)

---

## 📦 n8n Workflow

The automation workflow is included as:

```
workflow.json
```

Import it directly into n8n.

---

## 🔐 Security

Sensitive information is **not stored in the source code**.

The project uses environment variables for configuration.

Example:

```
WEBHOOK_URL=YOUR_N8N_WEBHOOK_URL
```

---

## 🌍 Deployment

This project can be deployed using:

- Streamlit Community Cloud
- Render
- Railway

The backend automation runs on **n8n Cloud**.

---

## 👨‍💻 Author

**Sameer**

BS Computer Science Student

Passionate about AI Automation, Agentic AI, and Workflow Development.

---

## 📄 License

This project is open-source and available under the MIT License.