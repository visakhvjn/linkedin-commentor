# LinkedIn Comment Generator

This Chrome extension reads the content of a LinkedIn post, generates a relevant comment using OpenAI, and allows you to insert or copy the comment.

## Features
- Extracts the content of the first LinkedIn post in your feed.
- Generates a short, relevant comment using OpenAI's GPT model.
- Allows you to insert the generated comment into the LinkedIn comment box or copy it to the clipboard.

---

## How to Load the Extension

### Step 1: Download the Extension
1. Clone or download this repository to your local machine.
2. Ensure all files are in the same directory (e.g., `/Users/vjnvisakh/Documents/vjnvisakh/ai/basics/linkedin-extension`).

### Step 2: Open Chrome Extensions Page
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top-right corner).

### Step 3: Load the Extension
1. Click **Load unpacked**.
2. Select the directory where the extension files are located (e.g., `/Users/vjnvisakh/Documents/vjnvisakh/ai/basics/linkedin-extension`).
3. The extension will now appear in your list of extensions.

---

## How to Use the Extension

1. Navigate to [LinkedIn](https://www.linkedin.com/) and log in.
2. Open your LinkedIn feed and ensure the first post is visible.
3. Click the **LinkedIn Comment Generator** extension icon in the Chrome toolbar.
4. In the popup:
   - Click **Generate** to generate a comment for the first post.
   - Wait for the comment to be generated. A "Comment generated successfully!" message will appear.
   - Click **Copy** to copy the comment to your clipboard or let it insert into the LinkedIn comment box automatically.

---

## Notes
- Ensure you have an active OpenAI API key and replace the placeholder in `background.js` with your actual API key.
- This extension only works on LinkedIn posts and requires the comment box to be visible for insertion.
- If you encounter any issues, check the browser console for logs.

---

## Video
Watch this video to see how the extension works:  
[![Watch the video](https://img.youtube.com/vi/q_Vwp2rnQLo/0.jpg)](https://youtu.be/q_Vwp2rnQLo)

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
