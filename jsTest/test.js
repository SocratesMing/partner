console.log("xx")

var xx = [{
    label: 'csv file',
    key: 'mail',
    children: []
},
{
    label: 'parquet file',
    key: 'app',
    children: []
},]

// xx[0]["children"].push(0)
let yy = xx.map((e, i) => {
    if (i === 1) {

        e["children"] = [...e["children"], "ddd"]
        
    }
    return e;
})
console.log(yy[0])
console.log(yy[1])

var arr = [100,20,50,58,6,69,36,45,78,66,45]
let ddd = "dadfa.dfa"
let arrx = ddd.split(".")[0]
console.log(arrx)