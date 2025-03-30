window.addEventListener('DOMContentLoaded', async (_event) => {
  const listLink = document.getElementById('go-to-list') as HTMLAnchorElement;
  if (!listLink) return;

  const { listId } = await chrome.storage.local.get('listId');
  if (listId) listLink.href = `https://walmart-list.l8a.dev/list/${listId}`;
});
