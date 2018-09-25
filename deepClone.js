if(!Array.isArray){
    Array.isArray = function(arr){
        return Object.prototype.toString.call(arr) === '[object Array]';
    }
}

function deepClone(obj, parents, parentsCopy){
    
    parents = parents || [];
    parentsCopy = parentsCopy || [];

    if(typeof obj === 'function'){	// 拷贝函数
        return new Function('return '+obj.toString())();
    } else if(typeof obj === 'object' && obj !== null){	// 拷贝对象
        var cp = Array.isArray(obj) ? [] : {};
        for(var i in obj){
            
            // 循环引用处理
            var index = parents.indexOf(obj[i]);
            if(index !== -1){
                cp[i] = parentsCopy[index];
                continue;
            }
            
            // 递归拷贝
            cp[i] = deepClone(obj[i], parents.concat(obj), parentsCopy.concat(cp));
        }
        return cp;
    } else {	// null和其他基本类型
        return obj;
    }
}