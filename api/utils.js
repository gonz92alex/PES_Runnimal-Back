'use strict';

exports.maxMin = function(firstElement, secondElement){
	if (firstElement > secondElement) return {max: firstElement, min: secondElement}
	else if (firstElement < secondElement) return {max: secondElement, min: firstElement}
	else return {equals: true};
}