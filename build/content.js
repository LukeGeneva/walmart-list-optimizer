// src/list-repository.ts
async function getListId() {
  const { listId } = await chrome.storage.local.get("listId");
  return listId ?? null;
}
async function setListId(listId) {
  await chrome.storage.local.set({ listId });
}

// src/list-service.ts
var API_BASE_URL = "http://localhost:3000";
async function addItemToList(input) {
  const response = await fetch(url("/list"), {
    method: "POST",
    body: JSON.stringify(input)
  });
  const output = await response.json();
  return output;
}
function url(route) {
  return `${API_BASE_URL}${route}`;
}

// src/content.ts
var observer = new MutationObserver(searchForProduct);
observer.observe(document.body, { childList: true, subtree: true });
async function searchForProduct() {
  const name = findProductName();
  const aisle = findProductAisle();
  const imgSrc = findImageSrc();
  if (!name || !aisle || !imgSrc)
    return;
  const item = { name, aisle, imgSrc };
  createListButtonFor(item);
}
function findProductName() {
  const title = document.getElementById("main-title");
  if (!title)
    return null;
  return title.innerText;
}
function findProductAisle() {
  const location = document.querySelector('div[data-testid="product-aisle-location"] span');
  if (!location?.innerText)
    return null;
  const aisle = location.innerText.replace("Aisle", "").trim();
  return aisle;
}
function findImageSrc() {
  const img = document.querySelector('img[data-testid="hero-image"]');
  if (!img)
    return null;
  return img.src;
}
function createListButtonFor(item) {
  if (document.getElementById("add-to-list"))
    return;
  const addToCartButton = document.querySelector('button[data-automation-id="atc"]');
  if (!addToCartButton)
    return;
  const addToListButton = document.createElement("button");
  addToListButton.id = "add-to-list";
  addToListButton.innerHTML = "Add to List";
  addToListButton.onclick = () => addToList(item);
  addToCartButton.parentNode?.appendChild(addToListButton);
}
async function addToList(item) {
  const listId = await getListId();
  const output = await addItemToList({ ...item, listId });
  await setListId(output.listId);
}
