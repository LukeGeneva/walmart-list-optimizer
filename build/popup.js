// src/popup.ts
window.addEventListener("DOMContentLoaded", async (_event) => {
  const message = document.getElementById("message");
  if (!message)
    return;
  const { listId } = await chrome.storage.local.get("listId");
  if (listId)
    message.innerHTML = `Working with list ${listId}`;
  else
    message.innerHTML = "Add a product to start a new list.";
});
