import Joi from "joi";


// ID
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");
         

// User Schema
export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Joe").required(),
    lastName: Joi.string().example("Bloggs").required(),
    email: Joi.string().email().example("joe@example.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};


// Run Schema

export const RunSpec = Joi.object()
  .keys({
    title: Joi.string().example("Example Run").required(),
    distance: Joi.number().example(10).required(),
    duration: Joi.number().example(20).required(),
    locationid: IdSpec,
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("RunDetails");

export const RunArray = Joi.array().items(RunSpec).label("RunArray");

// Location Schema

export const LocationSpec = Joi.object()
  .keys({
    title: Joi.string().example("Example Location").required(),
    latitude: Joi.number().example(54).required(),
    longitude: Joi.number().example(-6).required(),
    userid: IdSpec,
    runs: Joi.array().items(RunSpec),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("LocationDetails");

export const LocationArray = Joi.array().items(LocationSpec).label("LocationArray");