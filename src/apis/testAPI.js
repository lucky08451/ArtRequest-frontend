import httpInstance from "@/utils/https";

export function getData() {
  return httpInstance({
    url: '/api/v1/user/',
  })
}
