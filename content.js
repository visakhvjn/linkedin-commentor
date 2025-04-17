console.log("Content script loaded.");

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractPost") {
    console.log("Extracting post content...");
    try {
      // Safely extract text content from the LinkedIn post
      const postContent = document.querySelector(".feed-shared-update-v2__description")?.textContent.trim() || "";
      console.log("Extracted post content:", postContent);
      sendResponse({ postContent }); // Send the response back
    } catch (error) {
      console.error("Error extracting post content:", error);
      sendResponse({ postContent: "" }); // Send an empty response in case of error
    }
    return true; // Indicate that the response will be sent asynchronously
  }

  if (request.action === "insertComment") {
    console.log("Inserting generated comment into the comment box...");
    try {
      // Locate the comment box of the currently visible or selected post
      const commentBox = document.querySelector(".comments-comment-box__editor");
      if (commentBox) {
        commentBox.innerText = request.comment; // Insert the generated comment
        console.log("Comment inserted successfully:", request.comment);
        sendResponse({ success: true });
      } else {
        console.error("Comment box not found.");
        sendResponse({ success: false, error: "Comment box not found." });
      }
    } catch (error) {
      console.error("Error inserting comment:", error);
      sendResponse({ success: false, error: error.message });
    }
    return true; // Indicate that the response will be sent asynchronously
  }
});
