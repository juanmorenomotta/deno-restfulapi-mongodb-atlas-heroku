import { 
  RouterContext,
  helpers,  
} from "../deps.ts";

import db  from "../Database/mongoDb.ts";

import { IUser, IUserSchema } from '../Models/User.ts';

const userCollection = db.getCollection<IUserSchema>("users");

export const getUsers = async (context: RouterContext) => {
  const { request, response } = context;
  const users = await userCollection.find({ username: { $ne: null } });
  response.status = 200;
  response.body = {
    success: true,
    msg: "Metodo GET HTTP que actua sobre el recurso /users",
    data: users,
  }
};

export const getUser = async (context: RouterContext) => {
  const { params, response } = context;
  const user = await userCollection.find({ username: params.username });
  const data: any = user.length > 0 ? user: `No existe ${params.username}`;
  response.status = user.length > 0 ? 200 : 404;
  response.body = {
    success: user.length > 0,
    msg: `Metodo GET HTTP que actua sobre el recurso /users/${params.username}`,
    data: data,
  }
};

export const postUser = async (context: RouterContext) => {
  const { request, response } = context;
  if ( !request.hasBody ) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No se enviaron datos en el cuerpo del mensaje",
    }
    return;
  }
  const result = await request.body({ type: "json" });
  const userBody: IUser = await result.value;
  const insertId = await userCollection.insertOne(userBody);
  response.status = 201;
  response.body = {
    success: true,
    msg: `Metodo POST HTTP que actua sobre el recurso /users`,
    data: insertId,
  }

};

export const putUser = async (context: RouterContext) => {
  const { request, response } = context;
  const { username } = helpers.getQuery(context, { mergeParams: true });
  if ( !request.hasBody ) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No se enviaron datos en el cuerpo del mensaje",
    }
    return;
  }
  const user = await userCollection.find({ username: username  });
  if ( user.length == 0 ) {
    response.status = 404;
    response.body = {
      success: false,
      msg: `Metodo PUT HTTP que actua sobre el recurso /users/${username}`,
    }
    return;    
  }
  const result = await request.body({ type: "json" });
  const userBody: IUser = await result.value;
  const updateOne: any = await userCollection.updateOne(
    { username: username },
    { $set: userBody }
  );
  response.status = 200;
  response.body = {
    success: true,
    msg: `Metodo GET HTTP que actua sobre el recurso /users${username}`,
    data: updateOne,
  }
};

export const deleteUser = async (context: RouterContext) => {
  const { params, response } = context; 
  const user = await userCollection.find({ username: params.username  });
  if (user.length == 0) {
    response.status = 404;
    response.body = {
      success: false,
      msg: `Metodo DELETE HTTP que actua sobre el recurso /users/${params.username}`,
    }
    return;    
  }  
  const deleteOne = await userCollection.deleteOne({ username: params.username });
  response.status = 200;
  response.body = {
    success: true,
    msg: `Metodo DELETE HTTP que actua sobre el recurso /users/${params.username}`,
    data: deleteOne,
  }
};

