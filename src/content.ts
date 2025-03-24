import { getListId, setListId } from './list-repository';
import { addItemToList } from './list-service';

const observer = new MutationObserver(searchForProduct);
observer.observe(document.body, { childList: true, subtree: true });

type PageItem = {
  name: string;
  aisle: string;
  imgSrc: string;
};

async function searchForProduct() {
  const name = findProductName();
  const aisle = findProductAisle();
  const imgSrc = findImageSrc();
  if (!name || !aisle || !imgSrc) return;
  const item = { name, aisle, imgSrc };
  createListButtonFor(item);
}

function findProductName() {
  const title = document.getElementById('main-title');
  if (!title) return null;
  return title.innerText;
}

function findProductAisle() {
  const location = document.querySelector<HTMLSpanElement>(
    'div[data-testid="product-aisle-location"] span'
  );
  if (!location?.innerText) return null;
  const aisle = location.innerText.replace('Aisle', '').trim();
  return aisle;
}

function findImageSrc() {
  const img = document.querySelector<HTMLImageElement>(
    'img[data-testid="hero-image"]'
  );
  if (!img) return null;
  return img.src;
}

function createListButtonFor(item: PageItem) {
  if (document.getElementById('add-to-list')) return;

  const addToCartButton = document.querySelector<HTMLButtonElement>(
    'button[data-automation-id="atc"]'
  );
  if (!addToCartButton) return;

  const addToListButton = document.createElement('button');
  addToListButton.id = 'add-to-list';
  addToListButton.innerHTML = 'Add to List';
  addToListButton.onclick = () => addToList(item);
  addToCartButton.parentNode?.appendChild(addToListButton);
}

async function addToList(item: PageItem) {
  const listId = await getListId();
  const output = await addItemToList({ ...item, listId });
  await setListId(output.listId);
}
