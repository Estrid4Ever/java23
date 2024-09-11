
// async function fetchData() {
    
//     try {
//         const response = await fetch('./sthlmMalls.json')
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("error: ", error);
        
//     }
// }

// const data = fetchData();
// console.log(data);

var frukter = ["banan", "äpple", "päron", "melon", "kiwi"];

frukter.sort();

console.log(frukter);


var nums = [1, 4, 5, 8, 3, 5, 2, 7, 4, 22];

nums.sort()

console.log(nums)


var obs = [
    {name: "hej"},
    {name: "då"},
    {name: "bang"}
];

obs.sort(a, b (a.name > b.name))

console.table(obs)
