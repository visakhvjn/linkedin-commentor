document.getElementById("generateComment").addEventListener("click", () => {
  const generateButton = document.getElementById("generateComment");
  const statusMessage = document.createElement("p");
  statusMessage.style.color = "green";
  statusMessage.innerText = "Generating comment...";
  generateButton.insertAdjacentElement("afterend", statusMessage);

  // Disable the Generate button while generating
  generateButton.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab.url && currentTab.url.startsWith("https://www.linkedin.com/")) {
      chrome.tabs.sendMessage(currentTab.id, { action: "extractPost" }, (response) => {
        console.log("Response from content script:", response);

        if (chrome.runtime.lastError) {
          console.error("Error sending message to content script:", chrome.runtime.lastError.message);
          statusMessage.innerText = "Failed to extract post content.";
          generateButton.disabled = false;
          return;
        }

        if (response?.postContent) {
          console.log("Post content extracted:", response.postContent);

          // Request comment generation from the background script
          chrome.runtime.sendMessage(
            { action: "generateComment", postContent: response.postContent },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Error generating comment:", chrome.runtime.lastError.message);
                statusMessage.innerText = "Failed to generate comment.";
                generateButton.disabled = false;
                return;
              }
              console.log("Generated Comment:", response.comment);
              document.getElementById("comment").innerText = response.comment || "Failed to generate comment.";
              statusMessage.innerText = "Comment generated successfully!";
              generateButton.disabled = false;

              // Show the "Copy" button
              const copyButton = document.getElementById("copyComment");
              copyButton.style.display = "inline-block";
              copyButton.onclick = () => {
                navigator.clipboard.writeText(response.comment).then(() => {
                  console.log("Comment copied to clipboard.");
                  const copyStatus = document.createElement("p");
                  copyStatus.style.color = "green";
                  copyStatus.innerText = "Comment copied!";
                  copyButton.insertAdjacentElement("afterend", copyStatus);

                  // Remove the "Comment copied!" message after 2 seconds
                  setTimeout(() => {
                    copyStatus.remove();
                  }, 2000);
                }).catch((error) => {
                  console.error("Failed to copy comment:", error);
                });
              };

              // Send the generated comment to content.js to insert it into the comment box
              chrome.tabs.sendMessage(tabs[0].id, { action: "insertComment", comment: response.comment }, (insertResponse) => {
                if (insertResponse?.success) {
                  console.log("Comment inserted successfully.");
                } else {
                  console.error("Failed to insert comment:", insertResponse?.error);
                }
              });
            }
          );
        } else {
          console.error("No post content received.");
          statusMessage.innerText = "No post content found.";
          generateButton.disabled = false;
        }
      });
    } else {
      statusMessage.innerText = "Invalid URL. Please navigate to LinkedIn.";
      generateButton.disabled = false;
    }
  });
});
