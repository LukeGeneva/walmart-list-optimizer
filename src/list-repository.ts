export async function getListId() {
  const { listId } = await chrome.storage.local.get('listId');
  return listId ?? null;
}

export async function setListId(listId: string) {
  await chrome.storage.local.set({ listId });
}

export async function deleteListId() {
  await chrome.storage.local.set({ listId: null });
}
