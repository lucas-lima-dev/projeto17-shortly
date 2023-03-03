

export async function showMyUrls(req, res) {
  const userUrls = res.locals.userUrls;

  return res.status(200).send(userUrls);
}
