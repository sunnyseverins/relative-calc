function calc() {
    const w_max = +document.getElementById("w-max").value;
    const w_min = +document.getElementById("w-min").value;
    const y_max = +document.getElementById("y-max").value;
    const y_min = +document.getElementById("y-min").value;

    if (!(isFinite(w_max) && isFinite(w_min) && isFinite(y_max) && isFinite(y_min)))
        return document.getElementById("result").innerText = "Invalid data";
    if (w_max <= w_min) 
        return document.getElementById("result").innerText = "W max must be bigger than W min";

    let result = '';
    shortFormula();
    longFormula();
    document.getElementById("result").innerText = result;

    function shortFormula() {
        const k = (y_max - y_min) / (w_max - w_min);
        if (!isFinite(k) || k === 0) return document.getElementById("result").innerText = "Invalid data";
        const a = 100 * k;
        const b = w_max * k - y_max;
        result += `\n Results:`
        if (b === 0) return result += `\ncalc(${a.toFixed(4)}vw); /*${y_max}-${y_min} until w${w_min}*/`;
        result += `\n calc(${a.toFixed(2)}vw ${(b < 0) ? "+" : "-"} ${Math.abs(b.toFixed(2))}px); /*${y_max}-${y_min} until w${w_min}*/`;
        result += `\n \xA0or \xA0${a.toFixed(4)} & ${Math.abs(b.toFixed(4))}`;
    }
    function longFormula() {
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
    
        result += `\n\xA0or\n ${c}vw / ${e / divisorForC} ${(dRemainder / e === 0) ? "" : (dRemainder < 0) ? `+ ${-dRemainder} / ${(e / divisorForD)} ` : `- ${dRemainder} / ${(e / divisorForD)} `}${(y_max === dFull) ? "" : (y_max - dFull < 0) ? ` - ${dFull - y_max}` : ` + ${y_max - dFull}`}`;
    }
}