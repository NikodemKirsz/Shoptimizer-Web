export function refreshPage() {
  window.location.reload();
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}