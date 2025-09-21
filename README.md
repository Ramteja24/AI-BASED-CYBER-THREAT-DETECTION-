🔒 AI-Based Cyber Threat Detection
📌 Project Overview

This project focuses on developing an AI-powered Cyber Threat Detection System that analyzes network traffic in real time, detects anomalies, and classifies potential cyber threats using machine learning techniques.
With the growing number of attacks such as Brute Force, SQL Injection, XSS, and DDoS, traditional rule-based systems often fall short. Our solution leverages AI/ML models to detect both known and unknown (zero-day) attacks with high accuracy.
This project was developed as part of my Final Year Software Development Project (SDP).

🎯 Objectives

🔎 Detect and classify cyber threats in real time using AI models

📡 Automate network traffic analysis to identify malicious behavior

🧠 Implement anomaly detection for patterns not caught by static rules

📊 Provide an admin dashboard for monitoring, visualization, and alerts

🛡️ Enable proactive defense against common attack vectors

⚙️ System Architecture
1. Data Collection Layer

Captures network traffic logs, IPs, login attempts, and requests

Stores structured data for analysis

2. Preprocessing Layer

Cleans and normalizes data

Extracts features like request frequency, payload patterns, session duration, and protocol type

3. AI/ML Detection Engine

Supervised & Unsupervised ML models: Random Forest, SVM, Neural Networks

Anomaly Detection for unknown attacks

Detects:

Brute Force Attempts

SQL Injection Payloads

Cross-Site Scripting (XSS)

Distributed Denial of Service (DDoS)

4. Response & Alerting Layer

Generates real-time alerts

Blocks malicious IPs automatically

Logs threats for further analysis

5. Dashboard (Frontend)

Built with React/Next.js + TailwindCSS

Provides real-time visualizations:

📊 Threat statistics

🔍 Attack type breakdown

🖥️ Active session monitoring

🛠️ Tech Stack

Frontend: React.js / Next.js, TailwindCSS

Backend: Node.js, Express.js

Database: MongoDB / PostgreSQL

AI/ML: Python (Scikit-learn, TensorFlow/Keras, Pandas, NumPy)

Visualization: Chart.js / D3.js / Recharts

Security: Secure APIs, SSL/TLS, Firewall rules

Hosting: Heroku / Vercel / Self-hosted

📊 Features

✔️ Real-time AI-powered threat detection
✔️ Automatic malicious IP blocking
✔️ Admin dashboard with visualization
✔️ Threat classification (SQLi, XSS, brute force, DDoS, etc.)
✔️ Alerts & notifications for admins
✔️ Scalable and modular design

🔬 Dataset

Datasets Used: NSL-KDD, CICIDS2017, and custom log data

Preprocessing: Extracted features like packet size, protocol, request rate, session time

Balanced Dataset: Sampling techniques to handle class imbalance

🚀 Results

✅ Achieved 85–95% accuracy depending on attack type

✅ Detected SQL Injection & XSS using NLP-based payload analysis

✅ Reduced false positives with anomaly detection

✅ Real-time visualization dashboard for threats

📌 Future Enhancements

🔗 Integration with SIEM tools for enterprise use

🤖 Apply Deep Reinforcement Learning for adaptive defense

🌐 Extend detection to IoT network attacks

☁️ Deploy on cloud platforms for large-scale monitoring

📷 Screenshots / Demo
Brute Force Attack
<img width="818" alt="Brute Force" src="https://github.com/user-attachments/assets/5e8e083f-538f-4b8a-a1f2-2d6d5a400f2e" />
SQL Injection
<img width="940" alt="SQL Injection" src="https://github.com/user-attachments/assets/a09dbc80-29ea-4afe-a46a-c1a8118d09ea" />
XSS Attack
<img width="940" alt="XSS Attack" src="https://github.com/user-attachments/assets/4f39da97-1711-4204-9bae-7ae54fcaa5f9" />
AI/ML Prediction
<img width="892" alt="AIML Prediction" src="https://github.com/user-attachments/assets/81e95cec-c730-4f70-a1c7-6426fd1e05d2" />
👨‍💻 Contributors

Ramteja Reddy Boggala – Project Lead, AI/ML & Backend

Vooranduru Sujan Venkat – Cyber Security

Devendra Shendkar – Frontend

📜 License

This project is licensed under the MIT License – free to use and modify for academic or research purposes.
