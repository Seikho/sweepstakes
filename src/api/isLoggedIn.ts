import * as sessions from '../store/sessions'; 
export = function isLoggedIn(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
	var method = descriptor.value;
	
	// sessions.isValid(token)
	// 	.then(isValid => {
			
	// 	});
}