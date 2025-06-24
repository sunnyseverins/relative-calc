function calc() {
    const w_max = +document.getElementById("w-max").value;
    const w_min = +document.getElementById("w-min").value;
    const y_max = +document.getElementById("y-max").value;
    const y_min = +document.getElementById("y-min").value;

    if (!(w_max && w_min && y_max && y_min)) return document.getElementById("result").innerText = "Invalid data";
    if (w_max <= w_min)                      return document.getElementById("result").innerText = "W max must be bigger than W min";

    let result = '';
    result = shortFormula_max(result);
    result = longFormula_max(result);
    // result = shortFormula_min(result);
    // result = longFormula_min(result);

    function shortFormula_max(log) {
        const k = (y_max - y_min) / (w_max - w_min);
        if (!isFinite(k) || k === 0) return document.getElementById("result").innerText = "Invalid data";
        const a = 100 * k;
        const b = w_max * k - y_max;
        log += `\n Results:`
        if (b === 0) return log += `\n${a}vw`;
        log += `\n ${a.toFixed(2)}vw ${(b < 0) ? "+" : "-"} ${Math.abs(b.toFixed(2))}px`;
        log += `\n${Math.abs(a.toFixed(4))} & ${Math.abs(b.toFixed(4))} for precision`;
        return log;
    }
    // function shortFormula_min(log) {
    //     const k = (y_max - y_min) / (w_max - w_min);
    //     if (!isFinite(k) || k === 0) return document.getElementById("result").innerText = "Invalid data";
    //     const a = 100 * k;
    //     const b = w_min * k - y_min;
    //     log += `\n\n By Min:`
    //     if (b === 0) return log += `\n${a}vw`;
    //     log += `\n ${a.toFixed(2)}vw ${(b < 0) ? "=" : "-"} ${Math.abs(b.toFixed(2))}px`;
    //     log += `\n (${Math.abs(a.toFixed(4))} and ${Math.abs(b.toFixed(4))})`;
    //     return log;
    // }
    function longFormula_max(log) {
        let c = (y_max - y_min) * 100;
        let d = (y_max - y_min) * w_max;
        let e = w_max - w_min;

        let eCopy = e; 
        let eDivisors = [];
        for (let i = 2; i < Math.abs(eCopy);) {
            if (eCopy % i === 0) {
                eDivisors.push(i);
                eCopy /= i;
            } else i++;
        }
        let divisorForC = 1;
        for (let j = eDivisors.length - 1; j >= 0; j--) {
            if (c % eDivisors[j] === 0) {
                c /= eDivisors[j];
                divisorForC *= eDivisors[j];
            }
        }
        let divisorForD = 1;
        for (let k = eDivisors.length - 1; k >= 0; k--) {
            if (d % eDivisors[k] === 0) {
                d /= eDivisors[k];
                divisorForD *= eDivisors[k];
            }
        }
        
        let dRemainder = d % (e / divisorForD);
        let dFull = Math.trunc(d / (e / divisorForD));
        console.log(d, e / divisorForD);
    
        log += `\nor\n ${c}vw / ${e / divisorForC} ${(dRemainder / e === 0) ? "" : (dRemainder < 0) ? `+ ${-dRemainder / (e / divisorForD)} ` : `- ${dRemainder} / ${(e / divisorForD)} `}${(y_max === dFull) ? "" : (y_max - dFull < 0) ? ` - ${dFull - y_max}` : ` + ${y_max - dFull}`}`;
        return log;
    }
    // function longFormula_min(log) {
    //     let c = (y_max - y_min) * 100;
    //     let d = (y_max - y_min) * w_min;
    //     let e = w_max - w_min;

    //     let eCopy = e; 
    //     let eDivisors = [];
    //     for (let i = 2; i < Math.abs(eCopy);) {
    //         if (eCopy % i === 0) {
    //             eDivisors.push(i);
    //             eCopy /= i;
    //         } else i++;
    //     }
    //     let divisorForC = 1;
    //     for (let j = eDivisors.length - 1; j >= 0; j--) {
    //         if (c % eDivisors[j] === 0) {
    //             c /= eDivisors[j];
    //             divisorForC *= eDivisors[j];
    //         }
    //     }
    //     let divisorForD = 1;
    //     for (let k = eDivisors.length - 1; k >= 0; k--) {
    //         if (d % eDivisors[k] === 0) {
    //             d /= eDivisors[k];
    //             divisorForD *= eDivisors[k];
    //         }
    //     }
        
    //     let dRemainder = d % (e / divisorForD);
    //     let dFull = Math.trunc(d / (e / divisorForD));
    //     console.log(d, e / divisorForD);
    
    //     log += `\nor\n ${c}vw / ${e / divisorForC} ${(dRemainder / e === 0) ? "" : (dRemainder < 0) ? `+ ${-dRemainder / (e / divisorForD)} ` : `- ${dRemainder} / ${(e / divisorForD)} `}${(y_min === dFull) ? "" : (y_min - dFull < 0) ? ` - ${dFull - y_min}` : ` + ${y_min - dFull}`}`;
    //     return log;
    // }
    document.getElementById("result").innerText = result;
}