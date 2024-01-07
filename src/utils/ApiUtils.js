const eco_explore_api = "http://ec2-3-137-140-200.us-east-2.compute.amazonaws.com:8000";

const getImageUri = (item) => {
	if(item !== undefined && item.PuntosInteres.length){
		return {uri:item.PuntosInteres[0].UrlMedia};
	}
	else return require("../../assets/image-load-failed.jpg");
};

export {eco_explore_api, getImageUri};