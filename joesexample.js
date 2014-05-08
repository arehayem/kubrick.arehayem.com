var a = [1,2,3];

for(var i=0; i<a.length; i++){
    alert('first  ' + a[i]);
    if(a[i]===2){
        a.splice(i, 1);
        i--;
    }
    alert('second ' + a[i])
}
