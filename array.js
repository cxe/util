// @return ascending or descending range of numbers or strings
export const range = (a,b,d=1) => typeof a === 'string'
        ? range(a.charCodeAt(),b.charCodeAt()).map(v=>String.fromCharCode(v))
        : isNaN(b)
            ? range(0, a-1)
            : b < a
                ? range(b, a, d).reverse()
                : d > 1
                    ? range(a, b).filter(v => v%d === 0)
                    : [a,b].reduce((min,max)=>Array(max+1-min).fill(min).map((v,i)=>v+i));

// Usage
console.assert(
    range(3).toString() === '0,1,2' &&
    range(2,4).toString() === '2,3,4' && 
    range(4,2).toString() === '4,3,2' &&
    range(5,15,5).toString() === '5,10,15' && 
    range('A','C').toString() === 'A,B,C' && 
    range('C','A').toString() === 'C,B,A'
);
