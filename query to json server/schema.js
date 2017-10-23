
const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');




/*const customers = [
{id:1, name:'arun', age:24, email:'coolcool@gamil.com'},
{id:2, name:'ashok', age:19, email:'ashokcool@gamil.com'},
{id:3, name:'rasak', age:29, email:'rasakcool@gamil.com'},
{id:4, name:'riswan', age:34, email:'riswancool@gamil.com'},
]*/


// Customer Type
const CustomerType = new GraphQLObjectType({
	name : 'Customer',
	fields : () => ({

        id   : {type:GraphQLString},
		name : {type:GraphQLString},
		age  : {type:GraphQLInt},
		email: {type:GraphQLString}


	})
})


// Root Query
const RootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
    fields : () =>({

    	customer:{
		type : CustomerType,
		args : {
			id : {type : GraphQLString}
		},
		resolve(parentValue, args){
			/*for (let i=0;i<customers.length;i++){
				if(customers[i].id == args.id){
					return customers[i];
				}
			}*/
			return axios.get(`http://localhost:3000/customers/${args.id}`)
			                .then(res => res.data)
		}
	},


	customers : {
		type: new GraphQLList(CustomerType),
		resolve(parentValue, agrs){
			return axios.get(`http://localhost:3000/customers`)
			                .then(res => res.data)
		}
	}

    })
	
});

// Mutations
const mutation = new GraphQLObjectType({
	name:'Mutation',
	fields:{
		addCustomer : {
			type:CustomerType,
			args : {
				name : {type: new GraphQLNonNull(GraphQLString)},
				email : {type: new GraphQLNonNull(GraphQLString)},
				age : {type: new GraphQLNonNull(GraphQLInt)},
				id : {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parentValue, args){
				return axios.post('http://localhost:3000/customers',{
					name : args.name,
					email : args.email,
					id : args.id,
					age : args.age
				})
				.then(res => res.data);
			}
		}
	}
})



module.exports = new GraphQLSchema({

	query : RootQuery,
	mutation

});