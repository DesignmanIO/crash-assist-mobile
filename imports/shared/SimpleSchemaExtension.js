/**
 * Created by Julian on 10/4/16.
 */
import {Match} from 'meteor/check';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

SimpleSchema.extendOptions({
    index: Match.Optional(Match.OneOf(Number, String, Boolean)),
    unique: Match.Optional(Boolean),
    denyInsert: Match.Optional(Boolean),
    denyUpdate: Match.Optional(Boolean),
    srf: Match.Optional(Object)
});