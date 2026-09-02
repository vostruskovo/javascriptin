
function lengthFromObject(obj)
{
	let ob=0;
	for(let i in obj)
	{
		ob++;
	}
	return ob;
}


function getSizeObj(obj)
{
	return Object.keys(obj).length;
}


function getFields(obj)
{
	let ar=[];
	for(let i in obj)
	{
		ar.push(i);
	}
	return ar;
}

function getFieldFromIndex(obj,position)
{
	let index=0;
	let ar="";
	for(let i in obj)
	{
		if(index==position)
		{
			return i;
		}
		++index;
	}

}


function getValueFromIndex(obj,position)
{
	let index=0;
	let ar="";
	for(let i in obj)
	{
		if(index==position)
		{
			return obj[i];
		}
		++index;
	}
}
