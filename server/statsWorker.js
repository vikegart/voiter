const recalculateStats = (reponses) => {
    let countAnswer = {};
    let percentageAnswer = {};
    reponses.forEach(answer => {
        if (countAnswer[answer]) {
            countAnswer[answer] += 1;
        } else {
            countAnswer[answer] = 1;
        }
    });
    return countAnswer;
}

module.exports = recalculateStats;