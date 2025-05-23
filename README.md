<p align="center">
  <img src="img/logo.png" alt="Password Generator Logo" width="150" />
</p>

# <img src="img/icon128.png" alt="App Icon" width="32" valign="middle" /> Password Generator

A lightweight Chrome & Mozilla extension for creating strong, customizable passwords using a Linear Feedback Shift Register (LFSR) algorithm.

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/elmpkbhpalfhdfdkmllnfaknboibanba?label=Get%20it%20on%20Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/password-generator/elmpkbhpalfhdfdkmllnfaknboibanba) [![Firefox Add-on](https://img.shields.io/amo/v/powerful-password-generator?label=Get%20it%20on%20Firefox)](https://addons.mozilla.org/en-US/firefox/addon/powerful-password-generator/)
---

## 📝 Overview

This extension helps you generate one or more secure passwords with fine-grained control over:

- Minimum & maximum **alphabetic** characters  
- Minimum & maximum **numeric** characters  
- Minimum & maximum **special** characters  
- Total password **length**  
- Optional **separator** character at a fixed **interval**  
- Password **history** (view, copy, delete)  

Built with **HTML**, **CSS**, and **vanilla JavaScript**, it leverages an LFSR-based PRNG to ensure unpredictability and performance.

---

## ✨ Features

- **Instant Generation**  
  Click “Generate” and get a ready-to-use password in seconds.  
- **History Management**  
  Review previously generated passwords, copy them back, or delete individual entries.  
- **Flexible Settings**  
  Dial in exactly how many letters, digits, and symbols you want.  
- **Separators**  
  Insert a dash (or any character) every _N_ characters for readability.  
- **Batch Mode**  
  Generate multiple passwords at once.  

---

## 📥 Installation

### From Chrome Web Store  
1. Visit the [Password Generator page](https://chromewebstore.google.com/detail/password-generator/elmpkbhpalfhdfdkmllnfaknboibanba)  
2. Click **Add to Chrome**  

### From Mozilla Firefox Web Store
1. Visit the [Password Generator page](https://addons.mozilla.org/en-US/firefox/addon/powerful-password-generator/)
2. Click **Add to Mozilla Firefox**

### From Source  
1. Clone this repo  
   ```bash
   git clone https://github.com/0xDRAGOS/password-generator.git
2. Open Chrome → **Extensions** → Enable **Developer mode**
3. Click **Load unpacked** and select the project folder

---

## 🚀 Usage

1. Click the dials icon in your toolbar.
2. Under **Input**, optionally enter a keyword (e.g. site name) to seed the generator.
3. Adjust **Length**, **Min/Max** sliders for letters, numbers, symbols.
4. (Optional) Set a **Separator** and **Interval** to break the password into chunks.
5. Hit **Generate Password**.
6. Copy your new password or save it to **History**.

---


## 🎥 Demo Video

[![Watch the demo](https://img.youtube.com/vi/eEX7e2zIL88/0.jpg)](https://www.youtube.com/watch?v=eEX7e2zIL88)

---


## 📸 Screenshots

<p align="center">
  <img src="img/default.png" alt="Default popup" width="180" />&nbsp;
  <img src="img/with-input.png" alt="With input & generated password" width="180" />&nbsp;
  <img src="img/history.png" alt="Password history" width="180" />&nbsp;
  <img src="img/settings.png" alt="Advanced settings" width="180" />
</p>

---

## 🛠️ Tech Stack

* **Core**: HTML5, CSS3, ES6 JavaScript
* **Algorithm**: Linear Feedback Shift Register (LFSR)
* **Manifest v3** for Chrome compatibility

---

## 🛠️ Development

* **`popup.html`** – Extension UI
* **`css/`** – Stylesheets
* **`js/`** – Logic & LFSR implementation
* **`libs/`** – Third-party helpers
* **`manifest.json`** – Extension metadata

To modify, simply edit and reload the extension in Chrome’s **Extensions** page.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to origin and open a PR

Please file issues for bugs or feature requests!



> Developed by *0xDRAGOS* • Hosted on [GitHub](https://github.com/YourUsername/password-generator) • Version-controlled & open-source


