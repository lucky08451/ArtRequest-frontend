import httpInstance from "@/utils/https";

export function getData() {
  return httpInstance({
    url: '/v1/user/',
  })
}
