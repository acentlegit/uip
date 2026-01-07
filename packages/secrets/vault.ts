
export async function getSecret(path: string) {
  return process.env[path];
}
