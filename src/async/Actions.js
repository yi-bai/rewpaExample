import $ from 'jquery';
import axios from 'axios';

var API_PATH = '/api/';

const Actions = {
	updateUserAsync: (userinfo) => axios.put(API_PATH + 'users/' + userinfo.id, userinfo),
	getUserAsync: () => axios.get(API_PATH + 'users/123'),
	getProductsAsync: () => axios.get(API_PATH + 'products/'),
	getProductAsync: (id) => axios.get(API_PATH + 'products/' + id),
	searchProductAsync: (string) => axios.get(API_PATH + 'products/'), //TODO: real API
	createProductAsync: (product) => axios.post(API_PATH + 'products/', product),
	updateProductAsync: (product) => axios.put(API_PATH + 'products/' + product.id, product),
	deleteProductAsync: (id) => axios.delete(API_PATH + 'products/' + id)
}

export default Actions;