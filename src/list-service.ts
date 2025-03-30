const API_BASE_URL = 'https://walmart-list.l8a.dev';
//const API_BASE_URL = 'http://localhost:3000';

type AddItemToListInput = {
  name: string;
  aisle: string;
  imgSrc: string;
  listId: string | null;
  quantity: number;
};

export async function addItemToList(input: AddItemToListInput) {
  const response = await fetch(url('/list'), {
    method: 'POST',
    body: JSON.stringify(input),
  });
  const output = await response.json();
  return output;
}

function url(route: string) {
  return `${API_BASE_URL}${route}`;
}
