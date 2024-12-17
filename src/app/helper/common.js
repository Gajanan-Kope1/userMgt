exports.getPagignationLimit = (req_query={}) =>{ //set pagignation limit default value
	let limit=0;
	try{
		if(Object.prototype.hasOwnProperty.call(req_query,"limit") && req_query.limit > 0){
			limit = req_query.limit;
		}
	}
	catch(e){console.log(e.message)} // eslint-disable-line

	return parseInt(limit);
};

exports.getPagignationSkip = (req_query={}) =>{ //set pagignation skip values by page number
	let skip=0;
	try {
		let limit= this.getPagignationLimit(req_query);
		if(Object.prototype.hasOwnProperty.call(req_query,"page_no") && req_query.page_no > 0){
			let page_no = parseInt(req_query.page_no) - 1;
			skip = page_no*limit;
		}
	}
	catch(e){console.log(e.message)} // eslint-disable-line

	return skip;
};