
export async function showRanking(req,res) {
    const ranking = res.locals.ranking

    return res.status(200).send(ranking)
}