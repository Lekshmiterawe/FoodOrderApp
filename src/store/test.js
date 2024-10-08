let t = ['a','b','c','d','e'];

//console.log(t[3])

t.splice(3,1)
//console.log(t)


const scores = [98,45,33,47,100,80];
const totalScores = scores.reduce(
    (previousScore, currentScore)=>previousScore+currentScore, 
    1);
console.log(totalScores);