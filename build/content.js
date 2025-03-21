// content.ts
var observer = new MutationObserver(findLocation);
observer.observe(document.body, { childList: true, subtree: true });
function findLocation() {
  const location = document.querySelector('div[data-testid="product-aisle-location"] span');
  console.log("LOCATION ELEMENT", location);
  if (location?.innerText)
    injectAddToListButton();
}
function injectAddToListButton() {
  if (document.getElementById("add-to-list"))
    return;
  const addToCartButton = document.querySelector('button[data-automation-id="atc"]');
  if (!addToCartButton)
    return;
  const addToListButton = document.createElement("button");
  addToListButton.id = "add-to-list";
  addToListButton.innerHTML = "Add to List";
  addToListButton.onclick = () => {
    alert("Added to List!");
    addToCartButton.click();
  };
  addToCartButton.parentNode?.appendChild(addToListButton);
}
