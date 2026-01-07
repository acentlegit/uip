
export async function getSecret(name: string) {
  return process.env[name];
}
