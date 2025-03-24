const API_BASE_URL = 'http://localhost:3000';

type AddItemToListInput = {
  name: string;
  aisle: string;
  imgSrc: string;
  listId: string | null;
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
