import * as math from 'mathjs'

class GaussElim {
    matrixRows: number[][] = [];
    matrix: any;
    resultingMatrix: any;
    vector: number[] = [];
    n: number = 0;

    public Main(): void {
        this.equationToRow('1x - 3y + 1z + 4a = 4');
        this.equationToRow('2x - 8y + 8z - 5a = -2');
        this.equationToRow('-6x + 45y - 15z + 16a = 9');
        this.equationToRow('3x + 5y - 1z + 6a = 3');
        this.addRowsToMatrix();
        this.gaussReduction();

    }

    private equationToRow(equation: string): number[] {
        const lhs = equation.split('=')[0].split(' ');
        const coeffs: number[] = [];
        for (let i = 0; i < lhs.length - 1; i++) {
            if (lhs[i] === '+') {
                coeffs.push(parseInt(lhs[i + 1], 10));
                i++;
            }
            else if (lhs[i] === '-') {
                coeffs.push(-1 * parseInt(lhs[i + 1], 10));
                i++;
            }
            else {
                coeffs.push(parseInt(lhs[i], 10));
            }
        }
        this.n ++;
        const rhs = equation.split('= ')[1];
        if (rhs.split('-')[0] === '') {
            coeffs.push(-1 * parseInt(rhs.split('-')[1]));
        }
        else {
            coeffs.push(parseInt(rhs));
        }
        this.matrixRows.push(coeffs);
        return coeffs;
    }

    private addRowsToMatrix(): void {
        this.matrix = math.matrix(this.matrixRows);
        // console.log(this.matrix);
    }


    private gaussReduction(): number[] {
        for (let i = 0; i < this.n; i++) {
            //find element with largest magnitude in column i
            let maxElem = Math.abs(this.matrix.get([i, i]));
            let maxRow = i;
            for (let j = i + 1; j < this.n; j++) {
                if (Math.abs(this.matrix.get([j, i])) > maxElem) {
                    maxElem = Math.abs(this.matrix.get([j, i]));

                    maxRow = j;
                }
            }

            //Row Replacement
            for (let k = i; k < this.n + 1; k++) {
                const temp = this.matrix.get([maxRow, k]);
                const replacer =  this.matrix.get([i, k]);
                this.matrix.subset(math.index(maxRow, k), replacer);
                this.matrix.subset(math.index(i, k), temp);
                // const vecTemp =
            }

            //Replace elements in column below row i with 0's
            for (let m = i + 1; m < this.n; m++) {
                const temp = -1 * this.matrix.get([m, i]) / this.matrix.get([i, i]);
                for (let l = i; l < this.n + 1; l++) {
                    if (i === l) {
                        this.matrix.subset(math.index(m, l), 0);
                    }
                    else {
                        const replacer = this.matrix.get([m, l]) + (temp * this.matrix.get([i, l]));
                        this.matrix.subset(math.index(m, l), replacer);
                    }
                }
            }
        }

        //Backward Substitution to solve equation
        const x: number[] = [];
        for (let i = this.n - 1; i > -1; i--) {
            x[i] = Math.round(this.matrix.get([i, this.n]) / this.matrix.get([i, i]) * 1000) / 1000;
            for (let k = i - 1; k > -1; k--) {
                const replacer = this.matrix.get([k, this.n]) - (x[i] * this.matrix.get([k, i]));
                this.matrix.subset(math.index(k, this.n), replacer);

            }
        }
        console.log(this.matrix);
        console.log(x);
        return x;
    }


}

(new GaussElim().Main());