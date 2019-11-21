const RetestWhen = {
    RETEST_NOT_RECOMMENDED: "RETEST_NOT_RECOMMENDED",
    RETEST_RIGHT_NOW_RECOMMENDED: "RETEST_RIGHT_NOW_RECOMMENDED",
    RETEST_IN_15_RECOMMENDED: "RETEST_IN_15_RECOMMENDED"
}

const Color = {
    GREEN: "GREEN",
    YELLOW: "YELLOW",
    RED: "RED"
}


class ReadingRequestAnalysis {

    //pass array of reading
    static computeAdvice(readings) {
        // count green, yellow, and red of analyses
        let retestAdvice;
        let countGreen = 0;
        let countYellow = 0;
        let countRed = 0;
        //check for the readings array and check how many green, yellow, or red is there
        for (let reading of readings) {
            countGreen += reading === Color.GREEN ? 1 : 0;
            countYellow += reading === Color.YELLOW ? 1 : 0;
            countRed += reading === Color.RED ? 1 : 0;
        }

        /*
         *  If 1 reading:
         */
        if (readings.length === 1) {
            if (countGreen == 1) {
                // done if just one reading, and it's green
                retestAdvice = RetestWhen.RETEST_NOT_RECOMMENDED;
            } else if (countYellow == 1) {
                // retest in 15m if just one reading, and it's yellow
                retestAdvice = RetestWhen.RETEST_IN_15_RECOMMENDED;
            } else if (countRed == 1) {
                // retest immediately if just one reading, and it's red
                retestAdvice = RetestWhen.RETEST_RIGHT_NOW_RECOMMENDED;
            }
        }

        /*
         * If 2 readings:
         */
        else if (readings.length === 2) {
            if (countGreen == 2 || countYellow == 2 || countRed == 2) {
                // both readings agree
                retestAdvice = RetestWhen.RETEST_NOT_RECOMMENDED;
            } else {
                // they differ: retest immediately
                retestAdvice = RetestWhen.RETEST_RIGHT_NOW_RECOMMENDED;
            }
        }

        /*
         * If 3+ readings
         */
        else {
            // done if have 3+ readings (using the most recent reading is sufficient)
            retestAdvice = RetestWhen.RETEST_NOT_RECOMMENDED;
        }

        return retestAdvice;
    }


}

export default ReadingRequestAnalysis;