import { User } from './user.models';

export interface Friend{
	"user":User,
	"follow":boolean,
	"followed":boolean
};
