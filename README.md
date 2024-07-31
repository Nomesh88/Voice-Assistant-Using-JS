# Voice Assistant

## Description

The Voice Assistant is a simple and intuitive application that utilizes vanilla JavaScript to provide voice-controlled functionality. It enables users to interact with the application through voice commands, perform various tasks, and receive vocal responses. This project demonstrates the use of the Web Speech API for speech recognition and synthesis without relying on external libraries.

## Features

- **Voice Recognition**: Understand and process voice commands using the Web Speech API.
- **Voice Synthesis**: Provide vocal responses using text-to-speech capabilities.
- **Command Execution**: Execute predefined actions based on recognized commands (e.g., greeting, setting reminders).
- **Interactive UI**: Simple and clean interface to interact with the voice assistant.

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Voice Recognition**: Web Speech API (SpeechRecognition)
- **Voice Synthesis**: Web Speech API (SpeechSynthesis)

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/voice-assistant.git
cd Friday
```

### Open in Browser

1. Open `index.html` in your preferred web browser.

   ```bash
   open index.html
   ```

2. Ensure that your browser supports the Web Speech API. Most modern browsers like Google Chrome and Firefox provide support.

## Usage

1. **Start Listening**: Click the "Start" button or use a predefined hotkey to activate voice recognition.
2. **Give Commands**: Speak commands like "Hello", "What time is it?", or "Set a reminder" to interact with the assistant.
3. **Receive Responses**: Listen to the assistant's voice responses based on your commands.
4. **Stop Listening**: Click the "Stop" button to end voice recognition.

## Example Commands

- **Greeting**: "Hello" – The assistant will greet you back.
- **Time Inquiry**: "What time is it?" – The assistant will tell you the current time.
- **Reminder**: "Set a reminder for 5 PM" – The assistant will set a reminder for the specified time.

## Code Structure

- `index.html`: The main HTML file that provides the structure of the application.
- `styles.css`: CSS file for styling the application.
- `app.js`: JavaScript file containing the logic for voice recognition and synthesis.

## Browser Compatibility

The Web Speech API is supported in most modern browsers. However, it may not be available in all browsers or on all platforms. Please check the compatibility on [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a Pull Request.
