export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function checkRequiredENVs(
  envs = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"]
) {
  for (const env of envs) {
    if (!process.env[env]) {
      console.error(`Error: ${env} environment variable is not set.`);
      process.exit(1);
    }
  }
  return true;
}

export default {
  isValidHttpUrl,
  checkRequiredENVs,
};
