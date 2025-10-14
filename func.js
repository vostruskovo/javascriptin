/*
----------------------------------------------------------------------------------------------
---bubble sort and return a sorted array 
original array is modified and new array too

two sorted array
*/

/*
Code...
let ar=[e,f,d,c,a,b];
let ar02=[];

ar02=bubbleSort(ar);
*/

/*
result...
ar=[a,b,c,d,e,f];
ar02=[a,b,c,d,e,f];

*/


function bubbleSort(array) 
{
  let temp=""; 
  
  for(i=0;i<array.length;i++)
  {
    for(j=0;j<array.length;j++)
    {
      if(array[j]>array[i])
      {
        temp=array[j];
        array[j]=array[i];
        array[i]=temp;
      }
        
    }
  }
  return array;
}


/*
----------------------------------------------------------------------------------------------
---return backuped up original array  and modify struture of the 1st array 
---
*/

/*
Code...
let ar=[e,f,d,c,a,b];
let ar02=[];

ar02=keepArrayFromBubbleSort(ar);
*/

/*
result...
ar=[a,b,c,d,e,f];
ar02=[e,f,d,c,a,b];

*/

function keepArrayFromBubbleSort(array)
{
	let arrayCopy=[...array];
	for(i=0;i<array.length;i++)
  {
    for(j=0;j<array.length;j++)
    {
      if(array[j]>array[i])
      {
        temp=array[j];
        array[j]=array[i];
        array[i]=temp;
      }
        
    }
  }
  
  return arrayCopy;

}

/*--------------------------------------------------------------------------------------------
---return sorted array and keep struture of the 1st array 
---
*/


/*
Code...
let ar=[e,f,d,c,a,b];
let ar02=[];

ar02=keepArrayFromBubbleSort(ar);
*/

/*
result...
ar=[e,f,d,c,a,b];
ar02=[a,b,c,d,e,f];
*/

function bubbleSortFrom(array)
{
	let arrayCopy=[...array];
	let arrayBCK=[...array];
	for(i=0;i<array.length;i++)
  {
    for(j=0;j<arrayBCK.length;j++)
    {
      if(arrayBCK[j]>arrayBCK[i])
      {
        temp=arrayBCK[j];
        arrayBCK[j]=arrayBCK[i];
        arrayBCK[i]=temp;
      }
        
    }
    array=arrayCopy;
  }
  
  return arrayBCK;

}

/*--------------------------------------------------------------------------------------------
---bubble sort backward
---
*/
/*
Code...
let ar=[e,f,d,c,a,b];
let ar02=[];

ar02=backBubleSort(ar);
*/

/*
result...
ar=[f,e,d,c,b,a];
ar02=[f,e,d,c,b,a];

*/

function backBubleSort(array) 
{
  let temp=""; 
  
  for(i=0;i<array.length;i++)
  {
    for(j=0;j<array.length;j++)
    {
      if(array[j]<array[i])
      {
        temp=array[j];
        array[j]=array[i];
        array[i]=temp;
      }
        
    }
  }
  return array;
}


/*--------------------------------------------------------------------------------------------
---create tab
---
*/

function tab(times=1)
{
	let t=" ";
	for(let i=1;i<=times;i++)
	{
		t+=" ";
	}

	return t;
}


/*--------------------------------------------------------------------------------------------
---check if it's or not a Decimal number
---*/

/*
Code...

isDecimal("14.6")
isDecimal(14)
isDecimal(14.6)

*/

/*
result...

False
False
True
*/

/*
check typeOfChar()
*/

function isDecimal(char)
{

	
	if(pattern.test(char)==true)
	{
		return true;
	}
}


/*--------------------------------------------------------------------------------------------
---check if it's or not a INT
---
*/

/*
Code...
isDecimal("14.6")
isDecimal(14)
isDecimal(14.6)
*/

/*
result...

False
True
False
*/

/*
check typeOfChar()
*/

function isINT(char)
{
	let pattern = /[0-9]/;
	
	if(pattern.test(char)==true)
	{
		return true;
	}
    else
    {
    	return false;
    }
}


/*--------------------------------------------------------------------------------------------
---return if yes or false for a found char
---
*/

/*
Code...
let word="throughout"
findx(word,'a')
*/
/*
result...
false
*/

function findx(variable,char)
{
	for(let i in variable)
    	if(variable[i]==char)
        {
        	return true
        }
        else
        {
        	return false;
        }
}


/*--------------------------------------------------------------------------------------------
---return which one is the type of
---
*/

/*
Code....

typeOfVar('x')
typeOfVar('dog')
typeOfVar(20)
typeOfVar(25.5)


*/
/*
result...
char
string
int
decimal
*/

function TypeOfVar(char)
{
	let dec = /\d\.\d/;
	let int = /[0-9]/;
	let c=	/[a-zA-z]/
	let string = /[a-zA-z]/;

	if(dec.test(char) == true && typeof char != "string"  )
		return "decimal";
	else if(int.test(char) == true && typeof char != "string")
		return "int";
	else if(c.test(char) == true && char.length == 1)
		return "char";
	else if(string.test(char) == true && char.length>1)
		return "string";
	else if(int.test(char) == true && typeof char == "string")
		return "string";
	else if(dec.test(char) == true && typeof char == "string")
		return "int";
	/*
	else if(typeof char == "string" && char.length == 1 )
		return "char";
	else if(typeof char == "string")
		return "string";
	*/
}



/*--------------------------------------------------------------------------------------------
---print and return array sorted values ahead,forEACH ,loop ahead,return array
---
*/

/*
Code...

array=['1','2','3','4','5'];
obj={'1':'1','2':'2','3':'3','4':'4','5':'5'}
fori(array,',')
fori(obj,'<br>')
*/

/*
result...
1,2,3,4,5

1
2
3
4
5
*/

function fori(param,opt="") 
{

	opt=charToTag(opt);

	if(typeof param == "number")
	{
		param=param.toString();
	}
	let lp=param.length-1 || Object.keys(param).length-1;
	let count=0;
	let ar=[];
	for(let i in param)
	    	if(i==lp || count==lp)
	        {
	    			document.write(param[i]);
	        	ar.push(param[i]);
	       	}
	       else
	       {
	       		document.write(param[i]+opt);
	        	ar.push(param[i]+opt);
	        ++count;
	        }
	return ar;
}

/*
----------------------------------------------------------------------------------------------
---print and return array sorted values backward,foreach backward,fori backward
---
*/

/*
Code...

array=['5','4','3','2','1'];
obj={'5':'5','4':'4','3':'3','2':'2','1':'1'}
fori(array,',')
fori(obj,'<br>')
*/

/*
result...
5,4,3,2,1
5
4
3
2
1
*/

function irof(param,opt="")
{
	
	opt=charToTag(opt);
	if(typeof param=="number")
		param=param.toString();
	let lp=param.length-1 || Object.keys(param).length-1;
	let count=lp;
	let i=0;
	let ar=[];
	
	while(lp>=i)
	{	
		if(typeof param=="object")
		{
	  	let array=getFields(param);
	     if(lp==i)
	     {
	     	document.write(param[array[lp]]);
	     	ar.push(param[array[lp]]);
	     }
	     else
	     {
	     	document.write(param[array[lp]]+opt);
	     	ar.push(param[array[lp]])
	     }
		}
	  else
	  {
	  	if(lp==i)
	    {
	   		document.write(param[lp]);
	   		ar.push(param[lp]);
	    }
	    else
	    {
	     	document.write(param[lp]+opt);
	     	ar.push(param[lp]);
	    }
		}
	  --lp;
	  --count;
	}
	return ar;
}

/*--------------------------------------------------------------------------------------------
---remove special chars from a word
---*/

/*
Code...
let word="alemânténóú";
*/

/*
result...

alemantenou

*/

function  cleanWord(word){
  return word
  .replace(/á|à|ã|â|ä|Á|À|Ã|Â|Ä/,"a")
  .replace(/é|è|ẽ|ê|ë|É|È|Ê|Ë/,"e")
  .replace(/í|ì|ĩ|î|ï|Í|Ì|Î|Ï/,"i")
  .replace(/ó|ò|õ|ô|ö|Ó|Ò|Õ|ö|Ó|Ò|Ô|Ö/,"o")
  .replace(/ú|ù|ũ|û|ü|Ú|Ù|ü/,"u")
  .replace(/ḉ|ç|Ç/,"c");
}

/*--------------------------------------------------------------------------------------------
---remove special chars from a word02
---*/

/*
Code...
let word="alípíóúa";
*/

/*
result...

alipioua

*/

function cleanWord02(string)
{
	let a=/[áÁàÀâÂäÄãÃ]/gi;
	let e=/[éÉèÈêÊëË]/gi;
	let i=/[íÍìÌïÏîÎ]/gi;
	let o=/[óÓõÕöÖôô]/gi;
	let u=/[úÚùÙüÜûÛ]/gi;
	
	let digit=/[0-9]/gi;
	let special=/[\!\@\#\$\%\¨\&\*\(\)\_\-\+\=\`\´\{\\\[\}\]\^\~\|\,\.\:\;\/\?]/gi;
	
	regex=
	{
	"a":a,
	"e":e,
	"i":i,
	"o":o,
	"u":u,
	};
	
	let cw="";
	cw=string;
	for(let i in regex)
		cw=cw.replace(regex[i],i);
	return cw;
}

/*--------------------------------------------------------------------------------------------
---return array of fields from/of a obj
---
*/

/*
	let obj={"name":"alex",
			  "age":"25",
			  "sex":"male"
			};
	let ar=getFields(obj)
	for(let i in ar)
	document.write(ar[i]+"<br>");
	
*/

/*
name
age
sex
*/

function getFields(obj)
{
	let ar=[];
	for(let i in obj)
	{
		ar.push(i);
	}
	return ar;
}



/*
get field of a obj from an index
*/
/*
Code...
let obj={"name":"alex",
			  "age":"25",
			  "sex":"male"
			};
	let field=getFieldByIndex(obj,1)
	document.write(field+"<br>");
*/

/*
result..
age
*/

function getFieldByIndex(obj,index)
{
	
	let p=0;
	let field="";
	for(let i in obj)
	{
		if(p==index)
		{
			field=i;
		}
		++p;
	}
	return field;
}

/*--------------------------------------------------------------------------------------------
---covert char to Tag
---
*/

/*
Code...
let opt=charToTag("\n")
document.write("a"+opt+"b");
*/

/*
result...
a
b
*/

function charToTag(char)
{
	if(char=="\n")
{
	return "<br>";
}
else
{
	return char;
} 

}

/*--------------------------------------------------------------------------------------------
---print and return value backward without modifyin 1st array,structure legit one
---*/

/*
Code...

let obj={"name":"alex",
			  "age":"25",
			  "sex":"male"
			};
	let array=["name","age","sex","salary"];
	let n=5;
	let string="abcdef";	
	
	let array02=reverse(obj,",");
	for(let i in array02)
		document.write(array02[i]+"<br>")
	

*/

/*
//obj
name,age,sexsex
age
name

//array
name,age,sex,salarysalary
sex
age
name

//n
5,4,3,2,1,05
4
3
2
1
0

//string
f,e,d,c,b,af
e
d
c
b
a
*/


function reverse(/*whatever,size,opt=""*/...param)
{
	let whateverField=[];
	let tp=param.length;
	let whatever=param[tp-tp];
	opt=charToTag(param[tp-1]);
	let index=0;
	let field=[];

	for(let i in whatever)
		{
			field[index]=i;
			//whateverField.push(whatever[i])
			++index;
		}
	
	if(typeof whatever=="number")
	{
		let i=whatever;
		while(i>=0)
		{
			if(i==0)
			{
				document.write(i);			
			}
			else
			{
				document.write(i+opt);
			}
				
				whateverField.push(i);
			--i;
		}
		return whateverField;
	}
	else if(typeof whatever=="string")
	{
		let i=whatever.length-1;
		while(i>=0)
		{
			if(i==0)
			{
				document.write(whatever[i]);			
			}
			else
			{
				document.write(whatever[i]+opt);
			}
				
				whateverField.push(whatever[i]);
			--i;
		}
		return whateverField;
	}
	
	
	else if(whatever=="[object Object]")
	{
		let s=Object.keys(whatever).length-1
		let s1=0;	
		for(let i=s;i>=0;--i)
		{
			if(i==0)
			{
				whateverField.push(field[i]);	
				document.write(field[s1]);
			}
			else
			{
				whateverField.push(field[i]);
				document.write(field[s1++]+opt);
			}
		}
			return whateverField;
	
	}
	else
	{
		let s=whatever.length;
		let lp=whatever;
		let v=lp[s-1];
		let p="";
		if(typeof v=="number")
		{
			p=v;
			whatever.pop();
		}
		else
			{
				p=s-1;
			}
		
		let wt=whatever.length-1;
		if(p==0)
		{

			document.write(whatever[wt]);
			for(let i=whatever.length-1;i>=0;--i)
			{
				whateverField.push(whatever[i]);
			}
				return whateverField;
	
		}
		else
		{
			p-=wt;
			if(p<0)
			{
				document.write(whatever[p*-1]+opt);
			}
			else
			{
				document.write(whatever[p]+opt);
			}
			p+=wt;
			--p;
			whatever.push(p);
			return reverse(whatever,opt);	
		}
	}
}


/*
2-2=0
1-2=-1
0-2=-2
*/







	//--------------------------------------------------------------
	/*
	for(let i in whatever)
	{

		if(i==index-1)
		{
			whateverField.push(whatever[index-i-1]);
				document.write(whatever[i])
			
		}
		else
		{
			whateverField.push(whatever[index-i-1]);
			document.write(whatever[i]+opt)

		}
	}
	return whateverField;
}
}
	*/
	//-----------------------------------------------------------------
	/*
let index=0;
let field=[];
let whateverField=[];
let s=(size==undefined?Object.keys(whatever).length:size);
opt=charToTag(opt);
for(let i in whatever)
{
field[index]=i;
whateverField.push(whatever[i])
++index;
}

//let v=(s<=field.length-1?s:s-1);
let v=(s>field.length-1?s-1:s);
if(v==0)
{
	document.write(whatever[field[v]]);
	return whateverField;
}
else
{
	document.write(whatever[field[v]]+opt);
	--v;
	return reverse(whatever,v,opt);
}

}
}
*/












/*--------------------------------------------------------------------------------------------
---print and return value ahead without modifyin 1st array,structure legit one
---*/

/*
let array=["name","age","sex"];	
let array02=reverse(array,array.length,",");
for(let i in array02)
		document.write(array02[i]+"<br>")

*/

/*
sex,age,name
name
age
sex

*/
function ahead(whatever,opt=",")
{

	let whateverField=[];
	let objSize=whatever.length || Object.keys(whatever).length;
	let lastPosition=whatever[objSize-1];
	let position=0
	let optSize=opt.length;
	let lastPositionOPT=opt[optSize-1];

	switch(whatisThat(whatever))
	{
		case "string":
			
			if(isadigit(lastPositionOPT)==true)
			{
				position=Number.parseInt(lastPositionOPT);
				opt=opt.slice(0,optSize-1);
				objSize=whatever.length-1;
			}
			else
			{
				position=position;
			}

			if(position==objSize)
			{

				for(let i=0;i<=objSize;++i)
				{
					whateverField.push(whatever[i]);
				}

				document.write(whatever[position]);
			}

			
			else
			{
				
				document.write(whatever[position]+opt);
				++position;
				opt+=position;
				return ahead(whatever,opt);
			}
		return whateverField;
		break;



		//---------------------------------------------------
		case "array":
		if(isadigit(lastPositionOPT)==true)
			{
				position=Number.parseInt(lastPositionOPT);
				opt=opt.slice(0,optSize-1);
				objSize=whatever.length-1;
			}
			else
			{
				position=position;
			}
			
			if(position==objSize)
			{
				for(let i=0;i<=objSize;++i)
				{
					whateverField.push(whatever[i]);
				}
				document.write(whatever[position]);
			}
			
			else
			{
				
				document.write(whatever[position]+opt);
				++position;
				opt+=position;
				return ahead(whatever,opt);
			}
		
		return whateverField;
		break;
		

		//-----------------------------------------------------
	
		case "object":
		let field=[];

		for(let i in whatever)
		{
			field.push(i);
		}

		
		
		if(isadigit(lastPositionOPT)==true)
			{
				position=Number.parseInt(lastPositionOPT);
				opt=opt.slice(0,optSize-1);
				objSize=objSize=whatever.length-1 || Object.keys(whatever).length-1;

			}
			else
			{
				position=position;

			}
		
		if(position==objSize)
		{
			
			for(let i=0;i<=objSize;++i)
			{
				whateverField.push(whatever[field[i]]);
			}
				document.write(whatever[field[position]]);
		}

		else
		{
			for(let i=0;i<objSize;++i)
			{
				whateverField.push(whatever[field[i]]);
			}
			document.write(whatever[field[position]]+opt);
			++position
			opt+=position;
			ahead(whatever,opt)
		}
			
		return whateverField;
		break;

	
		}
	}


		//-----------------------------------------------------------------------------
//ahead....another one
	/*
	let index=0;
	let field=[];
	opt=charToTag(opt);
	let whateverField=[];
	
	switch(whatisThat(whatever))
	{
		case "array":
		case "string":
			for(let i in whatever)
			{
				if(i==whatever.length-1)
				{
					document.write(whatever[i]);
				}
				else
				{
					document.write(whatever[i]+opt);
				}
				whateverField.push(whatever[i])
			}
		break;
		case "object":
			for(let i in whatever)
			{
				if(index==Object.keys(whatever).length-1)
				{
					document.write(i)
				}
				else
				{
					document.write(i+opt)
				}
				whateverField.push(i)
				++index;

			}
		break;
	}
	return whateverField;
}
	*/





/***-----------------------------------------------------------------------------
 * Print whatever
 * /
 
/*
Code...
let obj={"name":"alex","sex":"male"}
let array=["a","m","5"];
let string="ax";
printwhatever(obj,',');
printwhatever(array,',');
printwhatever(string,',');
*/

/*
name:alex,sex:male
a,m,5
a,x
*/


function printWhatever(whatever,opt="")
{
	let index=0;
	let objSize=whatever.length || Object.keys(whatever).length;
	switch(whatisThat(whatever))
	{
		case "array":
		case "string":
			for(let i in whatever)
			{
				if(index==objSize-1)
				{
					document.write(whatever[i])
				}
				else
				{
					document.write(whatever[i]+opt)
				}
				++index;
			}
			break;
			case "object":
				for(let i in whatever)
				{
					if(index==objSize-1)
					{
						document.write(i+":"+whatever[i]);
					}
					else
					{
						document.write(i+":"+whatever[i]+opt);
					}
					++index;
				}
		break;
	}
}

	/*-----------------------------------------------------------------------------
	---check if it's a digit or not....even if number is in parenthese ...
	--*

	/*
	Code...
	reverse logic
	isadigit("5s5")
	isadigit("55s")
	isadigit("s55")
	isadigit("55")
	
	*/

	/*
		false
		false
		false
		true
	*/
	function isadigit(char)
	{
		let pattern=/[a-z\,]/g;
		if(char.match(pattern))
			return false;
		else
			return true;
}


/*-----------------------------------------------------------------------------
	---check if it's not a digit or not....even if number is in parenthese ...
	--*

	/*
	Code...
	reverse logic
	isadigit("5s5")
	isadigit("55s")
	isadigit("s55")
	isadigit("55")
	
	*/

	/*
		false
		false
		false
		true
	*/
	function isnotadigit(char)
	{
		let pattern=/[a-z]/g;
		if(char.match(pattern))
			return true;
		else
			return false;
  }


/*----------------------------------------------------------------------------------------------
*remove elemnt of array from index
*/

/*
Code...
let array=['a','b','c'];
let array02=shot(array,1)
*/

/*
result...
array=['a',' ','c']
array02=['a','c']
*/

function shot(x,index)
{
	let ar=[];
	let count=0
	for(let i=0;i<x.length;++i)
	{
		if(i==index)
		{
			x[i]="";
		}
	else
	{
		ar.push(x[i])
	}

	}
		return ar;
}



/*------------------------------------------------------------------------------------------------
clean input from id
*/


/*
Code...

 ______________    ______
|__wat's that__|  |_click|
*/


/*
result...

_______________    ______
|______________|  |_click|

*/
function clearTag(id)
{
	document.getElementById(id).value="";
}



/*--------------------------------------------------------------------------------------------
create break lines
*/

/*
Code...
document.write("this is a text");
	brakLine(8);
	document.write("js library");
*/


/*
result...

this is a test







js library
*/

function brakLine(times=1)
{
	for(let i=1;i<=times;++i)
	{
			document.write("<br>");	
	}
}


/*--------------------------------------------------------------------------------------------
*break line inside word[document.write]
*/

/*
Code...

	document.write("this is a "+brline()+"test");

*/

/*
result...
this is a

test
*/

function brline(times=1)
{
	let string="";
	for(let i=1;i<=times;++i)
	{
		string+="<br>";
	}
	return string;	
}

/*-------------------------------------------------------------------------------------------0
check if param is an obj or array
*/

/*
Code...
let x=["name","age","sex","salary"];
let y={"name":"alex","age":25}
document.write(whatisThat(x))
document.write(whatisThat(y))
*/

/*
result...
array
object
*/

function whatisThat(watisthat)
{
	if(typeof watisthat=="object")
	{
		if(watisthat[0]==undefined)
		{
			return "object";
		}
		else
		{
			return "array";
		}	
	}

	
	else
	{
		return "string";
	}
}



/*-------------------------------------------------------------------------------------------0
sort of Elements of a array
*/
/*
result...

x=['b','d','a','c'];
c=selectionSort(x);


['a','b','c','d']
*/


function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // Assume the first unsorted element is the smallest
        let minIndex = i;

        // Check the rest of the array for a smaller element
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first unsorted element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}




/*-------------------------------------------------------------------------------------------0
sort of Elements of a array
*/
/*
result...

x=['b','d','a','c'];
c=quickSort(x);


['a','b','c','d']
*/



function quickSort(arr) 
{
	if (arr.length <= 1)
	{
 		return arr;
  }
  const pivot = arr[arr.length - 1];
  const left = []; // Elements less than the pivot
  const right = []; // Elements greater than the pivot

  for (let i = 0; i < arr.length - 1; i++)
  {
  	if (arr[i] < pivot)
  	{
			left.push(arr[i]);
    } 
    else
    {
    	right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
} 



/*-------------------------------------------------------------------------------------------0
sort of Elements of a array
*/
/*
result...

x=['b','d','a','c'];
c=quickSort(x);


['a','b','c','d']
*/

function quickSort(arr) 
{
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = arr.filter(el => el < pivot);
    const right = arr.filter(el => el >= pivot && el !== pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}


//---------------------------------------------------------------------
/*

*/
function table(whatever,domain="")
{
	let whoami=whatisThat(whatever);
	let s="=";
	let e=",";
	let x=0,y=5;
	let field="user";
	

	document.write("<style>table,td {border:1px solid black;}</style>");
	document.write("<table style='width:50'>");
	document.write("<tr>banco de dados!");
	if(whoami=="object")
	{
		let size=Object.keys(whatever[field]).length;
		for(let i=0;i<size;++i)
		{
			document.write("<tr>");
  		document.write("<td>"+sha256(whatever[field][i])+"</td>");
			document.write("</tr>");
  }
	}
	else if(whoami=="array")
	{

		for(let i=0;i<whatever.length;++i)
 		{
			document.write("<tr>");
  		document.write("<td>"+sha256(whatever[i])+"</td>");
  		document.write("</tr>");
  	}

   }


  document.write("</table>");
   
}



//-------------------------------------------------------------------


function validatePasswords(password, confirmPassword) {
    const passwordValidation = {
        isValid: true,
        errors: []
    };

    // Validation rules for the password
    if (password.length < 8) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Password must be at least 8 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Password must contain at least one number.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Password must contain at least one special character.");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Passwords do not match.");
    }

    return passwordValidation;
}


//------------------------------------------------------------


function trueAnswer(password,confirmPassword)
{
	let answer=true;

    // Validation rules for the password
    if (password.length < 8) {
        answer = false;
  }

    if (!/[A-Z]/.test(password)) {
        answer = false;
    }

    if (!/[a-z]/.test(password)) {
        answer = false;
  
    }

    if (!/[0-9]/.test(password)) {
        answer = false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        answer = false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        answer = false;
    }
    
    return answer;
}
function validatePasswords02(password, confirmPassword) {
const passwordValidation = {
        isValid: true,
        errors: []
    };

    // Validation rules for the password
    if (password.length < 8) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Senha que conter peolo menos 8 caracteres.");
  pass.focus();
  }

    if (!/[A-Z]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Senha tem que existir pelo menos uma letra maiúscula.");
   pass.focus();
    }

    if (!/[a-z]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Senha tem que existir pelo menos uma letra minúscula.");
   pass.focus();
    }

    if (!/[0-9]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Senha tem que existir pelo menos um número.");
   pass.focus();
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Senha tem que existir pelo menos um caracter especial.");
  pass.focus();
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        passwordValidation.isValid = false;
        passwordValidation.errors.push("Senhas não conferem!");
  pass.focus();
    }
    
    
    if (passwordValidation.isValid)
    {
    	alert("Sua senha é uma senha válida e segue aos nossos padrões de segurança.");
	} 
	else
    {
    	alert("Senha não segue nossos padrões de segurança ou não conferem uma com a outra");
 pass.focus();
  }

}


//--------------------------------------------------------------------


function generateAsciiTable(){
    let table = "ASCII Table:\n";
    table += "Char | Decimal\n";
    table += "-----+--------\n";

    for (let i = 32; i <= 126; i++) {
        const char = String.fromCharCode(i);
        const decimal = i;
  
        table += `${char.padEnd(4)} | ${decimal.toString().padEnd(7)}\n`;
    }

    document.write(table);
}


//generateAsciiTable()



//------------------------------------------------------------------
/*
for each word is 1st letter converted into UpperCase
*/
/*
result.

autoCapitalizeInput("armour","black","cout","dino")

["Armour","Black","Cout","Dino"]
*/
function autoCapitalizeInput(...inputElement) {
for(let i in inputElement)
{
    inputElement[i].addEventListener('input', function () {
        const cursorPosition = inputElement[i].selectionStart;
        inputElement[i].value = inputElement[i].value.charAt(0).toUpperCase() + inputElement[i].value.slice(1);
        inputElement[i].setSelectionRange(cursorPosition, cursorPosition);
    });
}
}

//--------------------------------------------------------------------


function capitalizeFirstLetter(word) {
    if (typeof word !== 'string' || word.length === 0) {
        return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

//--------------------------------------------------------------------------

function addinputFields(...inputFields)
{
for(let i in inputFields)
{
	document.body.appendChild(inputFields[i]);

}
}


//--------------------------------------------------------------------


function handleTabPress(inputElement) {
	inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
     			validatePasswords02(document.getElementById('pass1').value,document.getElementById('pass2').value)
       
        }
    });
}






// Example usage of password validation
/*
const password = "MySecureP@ss1";
const confirmPassword = "MySecureP@ss1";

const result = validatePasswords(password, confirmPassword);

if (result.isValid) {
    console.log("Password is valid and matches the confirmation field.");
} else {
    console.error("Validation errors:", result.errors);
}

const inputField = document.createElement("input");
const inputField02 = document.createElement('input');
const inputField03 = document.createElement('input');

addinputFields(inputField,inputField02,inputField03);
autoCapitalizeInput(inputField,inputField02,inputField03);
handleTabPress(inputField02);
*/









//-------------------------------------------------------------------


function handleTabPress02(inputElement, updateElement) {
    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            event.preventDefault(); // Prevent default tab behavior

            const start = inputElement.selectionStart;
            const end = inputElement.selectionEnd;

            // Insert tab character (or spaces) at the cursor position
            const tabCharacter = "\t"; // Use "    " for spaces instead of \t if preferred
            inputElement.value = inputElement.value.substring(0, start) + tabCharacter + inputElement.value.substring(end);

            // Move cursor to the end of the inserted tab
            inputElement.selectionStart = inputElement.selectionEnd = start + tabCharacter.length;

            // Update another element on the same page
            if (updateElement) {
                updateElement.textContent = `Updated Value: ${inputElement.value}`;
            }
        }
    });
}



//-------------------------------------------------------------

function capitalizeWords(event) {
            const input = event.target;
            input.value = input.value
                .split(' ') // Split by spaces
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
                .join(' '); // Rejoin with spaces
        }



        /*

        <label for="textInput">Type something:</label>
    <input 
        id="textInput" 
        type="text" 
        oninput="capitalizeWords(event)" 
        placeholder="Start typing..." 
    />
    */



    //----------------------------------------------------------------

function FirstForEachWord()
    {
        const inputText = document.getElementById("inputText");

        inputText.addEventListener("input", () => {
            const cursorPosition = inputText.selectionStart;

            inputText.value = inputText.value.replace(/(?:^|\.\s*)([a-z])/g, (match, char) => {
                return match.replace(char, char.toUpperCase());
            });

            // Restore the cursor position
            inputText.setSelectionRange(cursorPosition, cursorPosition);
        });
        }

         //<textarea id="inputText" rows="5" cols="40" placeholder="Type here..."></textarea>
        //FirstForEachWord()



//--------------------------------------------------------------
/*
x="www.example.com/index.php"

["index.php"]
*/

function getFileExtension(filename) {
    // Check if the filename contains a dot
    if (filename.includes('.')) {
        // Extract the extension using the last dot
        return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    } else {
        // Return null if no extension exists
        return null;
    }
}


//------------------------------------------------------------------
/*
x="www.example.com/index.php"

["index.php"]
*/


function getPageName() {
    // Get the current URL path
    const path = window.location.pathname;

    // Extract the last part of the path
    const pageName = path.substring(path.lastIndexOf('/') + 1);

    // Return the page name
    return pageName;
}


//------------------------------------------------------------------
/*
var webPage="Anuário De Curso";
var logIn=[
			["text","username","Username"],
			["password","password","Password"],
		];

*/

/*
result

*/

function addInput(array,input)
{
	if(input!=undefined)
	{
			let j=0;
		    document.write("<input type='"+array[input][j++]+"' class='"+array[input][j]+"' id='"+array[input][j++]+"' placeholder='"+array[input][j]+"' />");
      
	
	}
	else
	{
	for(let i=0;i<array.length;++i)
        {
          for(let j=0;j<array[i].length;++j)
          {
        document.write("<input type='"+array[i][j++]+"' class='"+array[i][j]+"' id='"+array[i][j++]+"' placeholder='"+array[i][j]+"' />");
  }
    }
  }
}


//----------------------------------------------------------------------



function addBtn(array,btn)
{



	if(btn!=undefined)
	{
			let j=0;
		  document.write("<button class='"+array[btn][j]+"' id='"+array[btn][j++]+"' onclick='"+array[btn][j++]+"' >"+array[btn][j]+"</button>");
      
	
	}
	else
	{
		for(let i=0;i<array.length;++i)
        {
          for(let j=0;j<array[i].length;++j)
          {
document.write("<button class='"+array[i][j]+"' id='"+array[i][j++]+"' onclick='"+array[i][j++]+"' >"+array[i][j]+"</button>");
	
     }
    }
  }
  
}




function addLabel(array,label)
{



	if(label!=undefined)
	{
			let j=0;

			document.write("<label for='"+array[label][j++]+"' class='"+array[label][j]+" id='"+array[label][j]+"'>"+array[label][0]+"</label>");
	    
	
	}
	else
	{
		for(let i=0;i<array.length;++i)
        {
          for(let j=0;j<array[i].length;++j)
          {
		  document.write("<label for='"+array[i][j++]+"' class='"+array[i][j]+"' id='"+array[i][j]+"'>"+array[i][0]+"</label>");
	   document.write("</br>");
	     }
    }
  }
  
}


function sendMessage(action,method)
{
	document.write(
		"<form name='formMessage' id='formMessage' action='"+action+"' method='"+method+"'>"+
		"<input type='text' name='formName' id='formName' placeholder='Your Name' required>"+
		"<input type='email' name='formEmail' id='formEmail' placeholder='Your Email' required>"+
		"<textarea name='formMessage' id='formMessage' rows='5' placeholder='Your Message' required></textarea>"+
		"<button type='submit' name='formSubmit' id='formSubmit'>Send Message</button>");

}

function footer(message)
{
document.write(
"<footer><p>"+message+"</p></footer>");
}
 //&copy; 2024 Engineering Company. All rights reserved.


/*-------------------------------------------------------------------------------------------0
create signupFrom
*/

function signupForm(action,method,array)
{
	document.write(
		"<form action='"+action+"' method='"+method+"'>"+
 			"<fieldset>"+
  		"<legend>User:</legend>");
			for(let i=0;i<array.length-1;++i)
			{
  			document.write(
  				"<label for='"+array[i][1]+"'>"+array[i][2]+":</label>");
  			for(let j=0;j<array[i].length;++j)
  			{
  				document.write("<input type='"+array[i][j]+"' id='"+array[i][j]+"Form_"+array[i][++j]+"' name='"+array[i][--j]+"Form_"+array[i][++j]+"' placeholder='"+array[i][++j]+"'><br><br>");
				}

			}
			let i=array.length-1;
			let j=0;
  		document.write("<input type='"+array[i][j]+"' id='"+array[i][j]+"Form_"+array[i][++j]+"' name='"+array[i][--j]+"Form_"+array[i][++j]+"' value='"+array[i][++j]+"'>");
 			document.write("</fieldset>");
 }




/*-------------------------------------------------------------------------------------------0
create signinFrom
*/

function signinForm(action,method,array)
{
	document.write(
		"<form action='"+action+"' method='"+method+"'>"+
 			"<fieldset>"+
  		"<legend>User:</legend>");
			for(let i=0;i<array.length-1;++i)
			{
  			document.write(
  				"<label for='"+array[i][1]+"'>"+array[i][2]+":</label>");
  			for(let j=0;j<array[i].length;++j)
  			{
  				document.write("<input type='"+array[i][j]+"' id='"+array[i][j]+"Form_"+array[i][++j]+"' name='"+array[i][--j]+"Form_"+array[i][++j]+"' placeholder='"+array[i][++j]+"'><br><br>");
				}

			}
			let i=array.length-1;
			let j=0;
  		document.write("<input type='"+array[i][j]+"' id='"+array[i][j]+"Form_"+array[i][++j]+"' name='"+array[i][--j]+"Form_"+array[i][++j]+"' value='"+array[i][++j]+"'>");
 			document.write("</fieldset>");
 }





 /*-------------------------------------------------------------------------------------------0
check if param is an obj or array
*/


function textArea(c,l,action)
{
	document.write(
	"<form action='"+action+"'>"+
  "<p><label for='areaReview'>Review da mensagem:</label></p>"+
  "<textarea id='areaReview' name='areaReview' rows="+l+" cols="+c+" placeholder='olá,eu gostaria de fazer parte do seu circulo de amizade aqui no adventNET.'></textarea>"+
  "<br>"+
  "<input type='submit' value='Submit'>"+
	"</form>");

}



/*-------------------------------------------------------------------------------------------0
Calculates the sum of values from the 'values' array where the corresponding date in the
'dates' array matches today's date.

This function mimics the behavior of Excel's SOMARPRODUTO formula with a condition:
(interest!K:K = HOJE()) * (interest!L:L)

Steps:
1. Converts today's date to ISO format (YYYY-MM-DD) for consistent comparison.
2. Loops through each item in the 'dates' array.
3. For each date, checks if it matches today's date.
4. If it matches, adds the corresponding value from the 'values' array to the total sum.
5. Returns the final sum of all matching values.

Example:
dates = ["2025-10-14", "2025-10-13", "2025-10-14"]
values = [10, 20, 30]
→ Output: 40 (because only the 1st and 3rd dates match today)
*/


		function somarProduto(dates, values) {
  const today = new Date().toISOString().slice(0, 10);
  let sum = 0;

  for (let i = 0; i < dates.length; i++) {
    const date = new Date(dates[i]).toISOString().slice(0, 10);
    if (date === today) {
      sum += values[i];
    }
  }

  return sum;
}



/*-------------------------------------------------------------------------------------------0
Calculates the total sum of all numbers in the input array.

Equivalent to Excel's SOMA function.

Example:
sum([10, 20, 30]) → 60
*/
function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}


/*-------------------------------------------------------------------------------------------0
Calculates the average (mean) of all numbers in the input array.

Equivalent to Excel's MÉDIA function.

Example:
average([10, 20, 30]) → 20
*/
function average(arr) {
  return arr.length ? sum(arr) / arr.length : 0;
}


/*-------------------------------------------------------------------------------------------0
Returns the highest number in the input array.

Equivalent to Excel's MÁXIMO function.

Example:
max([10, 20, 30]) → 30
*/
function max(arr) {
  return Math.max(...arr);
}




/*-------------------------------------------------------------------------------------------0
Returns the lowest number in the input array.

Equivalent to Excel's MÍNIMO function.

Example:
min([10, 20, 30]) → 10
*/
function min(arr) {
  return Math.min(...arr);
}


/*-------------------------------------------------------------------------------------------0
Returns one value if the condition is true, another if false.

Equivalent to Excel's SE (IF) function.

Example:
ifCondition(10 > 5, "yes", "no") → "yes"
*/
function ifCondition(condition, valueIfTrue, valueIfFalse) {
  return condition ? valueIfTrue : valueIfFalse;
}


/*-------------------------------------------------------------------------------------------0
Counts how many elements in the array match a given condition.

Equivalent to Excel's CONT.SE function.

Example:
countIf([1, 2, 3, 2], x => x === 2) → 2
*/
function countIf(arr, conditionFn) {
  return arr.filter(conditionFn).length;
}




/*-------------------------------------------------------------------------------------------0
Sums values in the array that match a given condition.

Equivalent to Excel's SOMASE function.

Example:
sumIf([10, 20, 30], x => x > 15) → 50
*/
function sumIf(arr, conditionFn) {
  return arr.filter(conditionFn).reduce((acc, val) => acc + val, 0);
}




/*-------------------------------------------------------------------------------------------0
Multiplies corresponding elements in two arrays and returns the sum of the results.

Equivalent to Excel's SOMARPRODUTO function.

Example:
sumProduct([1, 2, 3], [4, 5, 6]) → 1×4 + 2×5 + 3×6 = 32
*/
function sumProduct(arr1, arr2) {
  return arr1.reduce((acc, val, i) => acc + val * arr2[i], 0);
}



/*-------------------------------------------------------------------------------------------0
Searches for a value in the first column of a 2D array and returns the value in the same row from another column.

Equivalent to Excel's PROCV (VLOOKUP) function.

Example:
vlookup("B", [["A", 1], ["B", 2], ["C", 3]], 1) → 2
*/
function vlookup(lookupValue, tableArray, colIndex) {
  for (let row of tableArray) {
    if (row[0] === lookupValue) {
      return row[colIndex];
    }
  }
  return null;
}




/*-------------------------------------------------------------------------------------------0
Returns today's date in YYYY-MM-DD format.

Equivalent to Excel's HOJE function.

Example:
today() → "2025-10-14"
*/
function today() {
  return new Date().toISOString().slice(0, 10);
}



/*-------------------------------------------------------------------------------------------0
Returns the value at a specific position in an array.

Equivalent to Excel's ÍNDICE (INDEX) function.

Example:
index([10, 20, 30], 2) → 20
*/
function index(arr, position) {
  return arr[position - 1]; // Excel is 1-based, JS is 0-based
}

/*-------------------------------------------------------------------------------------------0
Returns the position of a value in an array.

Equivalent to Excel's CORRESP (MATCH) function.

Example:
match(20, [10, 20, 30]) → 2
*/
function match(value, arr) {
  return arr.indexOf(value) + 1; // Excel is 1-based
}


/*-------------------------------------------------------------------------------------------0
Joins multiple strings into one.

Equivalent to Excel's CONCATENAR (CONCATENATE) function.

Example:
concatText("Hello", " ", "World") → "Hello World"
*/
function concatText(...args) {
  return args.join('');
}


/*-------------------------------------------------------------------------------------------0
Formats a date object into a custom string format.

Equivalent to Excel's TEXTO function for dates.

Example:
formatDate(new Date(), "DD/MM/YYYY") → "14/10/2025"
*/
function formatDate(date, format) {
  const d = new Date(date);
  const pad = n => n.toString().padStart(2, '0');

  return format
    .replace("DD", pad(d.getDate()))
    .replace("MM", pad(d.getMonth() + 1))
    .replace("YYYY", d.getFullYear());
}


/*-------------------------------------------------------------------------------------------0
Rounds a number to a specified number of decimal places.

Equivalent to Excel's ARRED (ROUND) function.

Example:
round(3.14159, 2) → 3.14
*/
function round(num, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}


/*-------------------------------------------------------------------------------------------0
Returns true if all conditions are true.

Equivalent to Excel's E (AND) function.

Example:
andCondition(true, true, false) → false
*/
function andCondition(...conditions) {
  return conditions.every(Boolean);
}


/*-------------------------------------------------------------------------------------------0
Returns true if at least one condition is true.

Equivalent to Excel's OU (OR) function.

Example:
orCondition(false, false, true) → true
*/
function orCondition(...conditions) {
  return conditions.some(Boolean);
}


/*-------------------------------------------------------------------------------------------0
Returns the opposite of a boolean value.

Equivalent to Excel's NÃO (NOT) function.

Example:
notCondition(true) → false
*/
function notCondition(value) {
  return !value;
}























