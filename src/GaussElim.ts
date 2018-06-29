declare const math: any;


class GaussElim {

    public Main(): void {
    }

    public equationCounter(equations: string): number {
        return equations.split(/\r\n|\r|\n/).length;
    }

    public equationReader(equations: string): string[] {
        return equations.split(/\r\n|\r|\n/);
    }

    private equationToRow(equation: string): number[] {
        const lhs = equation.split('=')[0].split(' ');
        const coeffs: number[] = [];
        for (let i = 0; i < lhs.length - 1; i++) {
            if (lhs[i] === '+') {
                if(lhs[i + 1].split('x')[0] === "") {
                    coeffs.push(1);
                }
                else {
                    coeffs.push(parseInt(lhs[i + 1].split('x')[0], 10));
                }
                i++;
            }
            else if (lhs[i] === '-') {
                if(lhs[i + 1].split('x')[0] === "") {
                    coeffs.push(-1);
                } else {
                    coeffs.push(-1 * parseInt(lhs[i + 1].split('x')[0], 10));
                }
                i++;
            }
            else {
                if(lhs[i].split('x')[0] === "") {
                    coeffs.push(1);
                }
                else if(lhs[i].split('x')[0] === "-") {
                    coeffs.push(-1);
                }
                else {
                    coeffs.push(parseInt(lhs[i].split('x')[0], 10));
                }
            }
        }
        const rhs = equation.split('= ')[1];
        if (rhs.split('-')[0] === '') {
            coeffs.push(-1 * parseInt(rhs.split('-')[1]));
        }
        else {
            coeffs.push(parseInt(rhs));
        }
        return coeffs;
    }

    private addRowsToMatrix(coeffs: number[]): any {
        return math.matrix(coeffs);
    }



    private gaussReduction(rows: number, matrix: any): [number[], any[]] {
        const intermediateMatrices: any[] = [];

        let tempMatrix = math.clone(matrix);
        intermediateMatrices.push(tempMatrix);

        for (let i = 0; i < rows; i++) {

            //find element with largest magnitude in column i
            let maxElem = Math.abs(matrix.get([i, i]));
            let maxRow = i;
            for (let j = i + 1; j < rows; j++) {
                if (Math.abs(matrix.get([j, i])) > maxElem) {
                    maxElem = Math.abs(matrix.get([j, i]));
                    maxRow = j;
                }
            }

            //Row Replacement
            for (let k = i; k < rows + 1; k++) {
                const temp = matrix.get([maxRow, k]);
                const replacer =  matrix.get([i, k]);
                matrix.subset(math.index(maxRow, k), replacer);
                matrix.subset(math.index(i, k), temp);
            }

            //Replace elements in column below row i with 0's
            for (let m = i + 1; m < rows; m++) {
                const temp = -1 * matrix.get([m, i]) / matrix.get([i, i]);
                for (let l = i; l < rows + 1; l++) {
                    if (i === l) {
                        matrix.subset(math.index(m, l), 0);
                    }
                    else {
                        const replacer = matrix.get([m, l]) + (temp * matrix.get([i, l]));
                        matrix.subset(math.index(m, l), replacer);
                    }
                }
            }
            tempMatrix = math.clone(matrix);
            intermediateMatrices.push(tempMatrix);
        }

        //Backward Substitution to solve equation
        const x: number[] = [];
        for (let i = rows - 1; i > -1; i--) {
            x[i] = Math.round(matrix.get([i, rows]) / matrix.get([i, i]) * 10000) / 10000;
            for (let k = i - 1; k > -1; k--) {
                const replacer = matrix.get([k, rows]) - (x[i] * matrix.get([k, i]));
                matrix.subset(math.index(k, rows), replacer);

            }
        }
        if (math.compare(intermediateMatrices[intermediateMatrices.length - 1], intermediateMatrices[intermediateMatrices.length - 2]) !== 0) {
            intermediateMatrices.pop();
        }

        return [x, intermediateMatrices];
    }


}

