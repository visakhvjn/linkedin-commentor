chrome.action.onClicked.addListener((tab) => {
  // Check if the current tab's URL matches LinkedIn
  if (tab.url && tab.url.startsWith("https://www.linkedin.com/")) {
    console.log("Extension icon clicked. Injecting content script...");
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"]
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting content script:", chrome.runtime.lastError.message);
          return;
        }
        console.log("Content script injected.");
      }
    );
  } else {
    console.warn("This extension only works on LinkedIn.");
    alert("This extension only works on LinkedIn.");
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateComment") {
    console.log("Received request to generate comment.");
    generateComment(request.postContent)
      .then((comment) => sendResponse({ comment }))
      .catch((error) => {
        sendResponse({ comment: "Failed to generate comment 3." });
      });
    return true; // Indicate that the response will be sent asynchronously
  }
});

async function generateComment(postContent) {
  console.log("Calling OpenAI API...");
  const apiKey = "<OPENAI_API_KEY>"; // Replace with your actual API key
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a software engineer with over 5 years experience. You love to work on new technology."
        },
        {
          role: "user",
          content: `Generate a short relevant comment for this LinkedIn post: "${postContent}"`
        }
      ],
    })
  });
  const data = await response.json();
  return data.choices[0]?.message?.content.trim();
}
