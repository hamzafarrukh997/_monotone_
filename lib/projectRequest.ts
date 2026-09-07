export const PROJECT_REQUEST_EVENT = "monotone:open-project-request";

export function openProjectRequest() {
  window.dispatchEvent(new Event(PROJECT_REQUEST_EVENT));
}
