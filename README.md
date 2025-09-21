AI-Based Cyber Threat Detection

📌 Project Overview

This project focuses on developing an AI-powered Cyber Threat Detection System that analyzes network traffic in real-time, detects anomalies, and classifies potential cyber threats using machine learning techniques.

With the growing number of cyberattacks like Brute Force, SQL Injection, XSS, and DDoS, traditional rule-based systems are often insufficient. Our system leverages AI and ML models to detect both known and unknown (zero-day) attacks with high accuracy.

This project was developed as part of my Final Year Software Development Project (SDP).

🎯 Objectives

🔎 Detect and classify cyber threats in real-time using AI models

📡 Automate network traffic analysis to identify malicious behavior

🧠 Implement anomaly detection for unusual patterns not caught by static rules

📊 Provide an admin dashboard for monitoring, visualization, and alerts

🛡️ Enable proactive defense against common attack vectors

⚙️ System Architecture

1. Data Collection Layer

Captures network traffic logs, IP addresses, login attempts, and requests

Stores structured data for analysis

2. Preprocessing Layer

Cleans and normalizes data

Extracts features like request frequency, payload patterns, session duration, protocol type

3. AI/ML Detection Engine

Uses Supervised and Unsupervised ML models (Random Forest, SVM, Neural Networks)

Implements anomaly detection for unknown attack patterns

Detects threats such as Brute Force, SQL Injection, XSS, and DDoS

4. Response & Alerting Layer

Generates real-time alerts for admins

Blocks malicious IP addresses automatically

Logs detected threats for further analysis

5. Dashboard (Frontend)

Built with React/Next.js + TailwindCSS

Provides visualizations for threat statistics, attack breakdown, and real-time monitoring

🛠️ Tech Stack

Frontend: React.js / Next.js, TailwindCSS

Backend: Node.js, Express.js

Database: MongoDB / PostgreSQL

AI/ML Models: Python (Scikit-learn, TensorFlow/Keras, Pandas, NumPy)

Visualization: Chart.js / D3.js / Recharts

Security: Secure APIs, SSL/TLS, Firewall rules

Hosting: Heroku / Vercel / Self-hosted server

📊 Features

✔️ Real-time threat detection with AI models

✔️ Automatic malicious IP blocking

✔️ Visualization dashboard for monitoring

✔️ Threat classification (SQLi, XSS, brute force, etc.)

✔️ Admin alerts & notifications

✔️ Scalable and modular design

🔬 Dataset

Datasets Used: NSL-KDD, CICIDS2017, and custom log data

Preprocessing: Extracted features like packet size, protocol, request rate, session time

Balanced Dataset: Applied sampling techniques to handle class imbalance

🚀 Results

✅ Achieved 85–95% accuracy depending on attack type

✅ Successfully detected SQL Injection & XSS payloads using NLP-based payload analysis

✅ Reduced false positives with anomaly detection

✅ Provided real-time visualization of threats through an admin dashboard

📌 Future Enhancements

🔗 Integration with SIEM tools for enterprise deployment

🤖 Use of Deep Reinforcement Learning for adaptive defense

🌐 Extend coverage to IoT network attacks

☁️ Deploy on cloud platforms for large-scale traffic monitoring

📷 Screenshots / Demo

Brute Force Attack
<img width="900" height="500" src="https://github.com/user-attachments/assets/f579080c-1418-44fe-8c96-f87f581a9247" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/5e8e083f-538f-4b8a-a1f2-2d6d5a400f2e" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/0c2d3981-6c76-48cd-83e7-d264e3886e32" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/31bc3406-569b-4f26-b5d4-7f291d769234" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/77664176-8fa9-4a42-bf1c-d05261bfc4ed" />

SQL Injection
<img width="900" height="500" src="https://github.com/user-attachments/assets/a09dbc80-29ea-4afe-a46a-c1a8118d09ea" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/e588fa28-4a5c-4509-b26b-4ae6715e1c5e" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/6d3fbe17-d351-4a89-8b9d-930727f052c4" />

XSS Attack
<img width="900" height="500" src="https://github.com/user-attachments/assets/4f39da97-1711-4204-9bae-7ae54fcaa5f9" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/60c06dbf-59fd-4118-ba30-bea3c5f297c0" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/30e95629-83a6-4ecc-92b8-7c736e9f1126" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/d27d0ac3-1d3d-4f6b-94e5-237cd7f674a5" />

AI/ML Prediction
<img width="900" height="500" src="https://github.com/user-attachments/assets/0b25e415-f071-410a-9973-433be93628ee" />
<img width="900" height="500" src="https://github.com/user-attachments/assets/81e95cec-c730-4f70-a1c7-6426fd1e05d2" />

👨‍💻 Contributors

Ramteja Reddy Boggala – Project Lead, AI/ML & Backend

Vooranduru Sujan Venkat – Cyber Security

Devendra Shendkar – Frontend

📜 License

This project is licensed under the MIT License – free to use and modify for academic or research purposes.
